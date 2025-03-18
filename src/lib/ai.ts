import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Ensure API key is defined
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}

interface AIClient {
  generateQuestions(prompt: string): Promise<any>;
}

class GoogleAIClient implements AIClient {
  private model: GenerativeModel;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateQuestions(prompt: string): Promise<any> {
    const result = await this.model.generateContent(prompt);
    const responseText = result.response?.text();

    if (!responseText) {
      throw new Error("Empty response from AI model.");
    }

    try {
      return JSON.parse(responseText);
    } catch {
      console.warn("Response is not valid JSON. Returning raw text.");
      return { rawResponse: responseText };
    }
  }
}

class QuestionGenerator {
  private client: AIClient;

  constructor(client: AIClient) {
    this.client = client;
  }

  private createPrompt(data: { moods: any[]; journals: any[] }): string {
    const moodSummary = data.moods?.length
      ? data.moods
          .map((mood) => `- ${mood.date}: Mood: ${mood.mood}, Stress Level: ${mood.stressLevel}`)
          .join("\n")
      : "No mood data available.";

    const journalEntries = data.journals?.length
      ? data.journals.map((entry) => `- ${entry.date}: ${entry.entry}`).join("\n\n")
      : "No journal entries available.";

    return `
      Analyze the following user data and generate insightful reflection questions:

      Mood Summary:
      ${moodSummary}

      Journal Entries:
      ${journalEntries}

      Please generate:
      - 3 Open-ended questions for deeper reflection
      - 2 Multiple-choice questions with 4 options each (focus on potential coping strategies)

      Focus on:
      1. Understanding the underlying causes of mood changes
      2. Identifying potential coping strategies
      3. Encouraging self-awareness and personal growth

      Format the response as a clear, structured JSON with question types and details.
    `;
  }

  async generateQuestions(userData: { moods: any[]; journals: any[] }): Promise<any> {
    const prompt = this.createPrompt(userData);
    return this.client.generateQuestions(prompt);
  }
}


const questionGenerator = new QuestionGenerator(new GoogleAIClient(apiKey));
export default questionGenerator;
