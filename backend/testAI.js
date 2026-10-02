require("dotenv").config();

const {
    generateAIResponse
} = require("./services/aiService");

async function testAI() {
    try {
        const answer = await generateAIResponse({
            systemPrompt:
                "You are a friendly programming tutor. Explain concepts simply.",
            userMessage:
                "What is a Java variable? Give one simple example."
        });

        console.log("\nAI response:\n");
        console.log(answer);
    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

testAI();