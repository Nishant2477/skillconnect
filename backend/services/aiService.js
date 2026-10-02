const OpenAI = require("openai");

const apiKey = process.env.REQUESTY_API_KEY;
const model = process.env.REQUESTY_MODEL || "openai/gpt-4o-mini";

const requesty = apiKey ? new OpenAI({
    apiKey,
    baseURL: "https://router.requesty.ai/v1",
    defaultHeaders: {
        "X-Title": "SkillConnect"
    }
}) : null;

// Reusable AI response function
async function generateAIResponse({
    systemPrompt,
    userMessage
}) {
    if (!userMessage || !userMessage.trim()) {
        throw new Error("User message cannot be empty");
    }
    if (!requesty) {
        throw new Error(
            "REQUESTY_API_KEY is missing from the backend .env file"
        );
    }

    try {
        const response = await requesty.chat.completions.create({
            model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            max_tokens: 1000
        });

        return response.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("AI service error:", error.message);
        throw new Error("Unable to generate an AI response");
    }
}

module.exports = {
    generateAIResponse
};