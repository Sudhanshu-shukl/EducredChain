import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

/**
 * Generate an AI-based summary of given credential content
 */
export const generateSummary = async (text: string): Promise<string> => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize the given credential text in a concise, professional tone." },
        { role: "user", content: text }
      ],
      max_tokens: 150
    });

    return response.choices[0].message.content || "Summary unavailable.";
  } catch (error) {
    console.error("Summary generation failed:", error);
    throw error;
  }
};
/**
 * Answer user questions based on credential content
 */
export const askQuestion = async (question: string, context: string): Promise<string> => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert credential analyst. Answer questions strictly based on the provided credential content."
        },
        {
          role: "user",
          content: `Credential Content: ${context}\n\nQuestion: ${question}`
        }
      ],
      max_tokens: 200
    });

    return response.choices[0].message.content || "No answer generated.";
  } catch (error) {
    console.error("AI question answering failed:", error);
    throw error;
  }
};
