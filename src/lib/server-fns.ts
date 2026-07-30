import { createServerFn } from "@tanstack/react-start";
import OpenAI from "openai";
import { getSessionData, setSessionData } from "./store";
import { getUserId } from "./auth";

// Initialize OpenAI client (only on the server side)
function getOpenAI(): OpenAI {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// CSV upload server function — accepts CSV text + filename
// Now requires Clerk authentication — ties session data to the user's ID.
export const uploadCSV = createServerFn({ method: "POST" })
  .validator((data: { csvText: string; fileName: string }) => {
    if (!data.csvText || !data.fileName) {
      throw new Error("Missing csvText or fileName");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const userId = await getUserId();
    if (!userId) {
      return { error: "Please sign in to upload a CSV." };
    }

    const { csvText, fileName } = data;

    if (!fileName.endsWith(".csv")) {
      return { error: "Please upload a CSV file" };
    }

    const lines = csvText.trim().split("\n");

    if (lines.length < 2) {
      return {
        error: "CSV must have a header row and at least one data row",
      };
    }

    const columns = parseCSVLine(lines[0]);
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: Record<string, string> = {};
      columns.forEach((col, idx) => {
        row[col] = values[idx] ?? "";
      });
      rows.push(row);
    }

    const sessionId = Math.random().toString(36).substring(2, 15);

    setSessionData(sessionId, {
      userId,
      csvData: rows,
      columns,
      fileName,
      rowCount: rows.length,
    });

    return {
      sessionId,
      fileName,
      rowCount: rows.length,
      columns,
      preview: rows.slice(0, 3),
    };
  });

// Chat server function
// Validates that the session belongs to the authenticated user.
export const sendChat = createServerFn({ method: "POST" })
  .validator(
    (data: { message: string; sessionId: string }) => {
      if (!data.message || !data.sessionId) {
        throw new Error("Missing message or sessionId");
      }
      return data;
    },
  )
  .handler(async ({ data }) => {
    const { message, sessionId } = data;

    const userId = await getUserId();
    if (!userId) {
      return { error: "Please sign in to use the chat." };
    }

    const sessionData = getSessionData(sessionId);

    if (!sessionData) {
      return { error: "Session expired. Please upload your CSV again." };
    }

    // Ensure the session belongs to this user
    if (sessionData.userId !== userId) {
      return { error: "Session does not belong to your account." };
    }

    try {
      const response = await generateAIResponse(
        message,
        sessionData.csvData,
        sessionData.columns,
        sessionData.fileName,
        sessionData.rowCount,
      );

      return { response };
    } catch (err) {
      console.error("OpenAI API error:", err);
      return {
        error:
          "I'm having trouble analyzing your data right now. Please try again in a moment. If this persists, check that your CSV has valid data and try re-uploading.",
      };
    }
  });

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }
  result.push(current.trim());
  return result;
}

const SYSTEM_PROMPT = `You are an AI marketing analyst for Social Metrics AI. You analyze social media data exports and provide clear, narrative insights that explain WHY things happened and WHAT to do next.

Your voice: helpful, conversational, and insightful — like a skilled analyst explaining findings to a colleague. Never sound like a dashboard or report generator.

Guidelines:
- Be conversational and narrative. Explain the WHY behind the numbers, not just what they are.
- Calculate key metrics from the data when the columns allow it: engagement rate (total engagements / reach or impressions), reach, top and worst performers, best posting times, best posting days, content type comparisons, etc.
- Always end with an "**What to do next**" section with 1-3 specific, actionable recommendations based on the data.
- Never just dump raw numbers — always add context, interpretation, and comparison.
- Keep responses concise but insightful (3-5 paragraphs, including recommendations).
- If the data doesn't contain certain metrics, acknowledge that limitation and work with what's available.
- When the user's question is vague, ask a clarifying follow-up question after giving what insights you can.
- If asked about something not in the data, honestly say so and suggest what data they'd need.
- Format key numbers with commas and percentages where appropriate. Use **bold** for key takeaways.`;

async function generateAIResponse(
  userMessage: string,
  csvData: Record<string, string>[],
  columns: string[],
  fileName: string,
  rowCount: number,
): Promise<string> {
  const openai = getOpenAI();

  // Build data summary: include a sample of rows (first 20, or all if fewer)
  const sampleSize = Math.min(csvData.length, 20);
  const sample = csvData.slice(0, sampleSize);

  const dataContext = {
    fileName,
    rowCount,
    columns,
    sampleRows: sample,
    totalRows: csvData.length,
  };

  const userContent = `I've uploaded a CSV file called "${fileName}" with ${rowCount} rows and the following columns: ${columns.join(", ")}.

Here's a sample of the first ${sampleSize} rows from the data:
\`\`\`json
${JSON.stringify(sample, null, 2)}
\`\`\`

My question: ${userMessage}

Please analyze this data and give me your insights.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userContent },
    ],
    temperature: 0.7,
    max_tokens: 800,
  });

  const responseText = completion.choices[0]?.message?.content;

  if (!responseText) {
    throw new Error("OpenAI returned an empty response");
  }

  return responseText;
}
