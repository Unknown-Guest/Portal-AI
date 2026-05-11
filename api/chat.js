export default async function handler(req, res) {
    try {

        const { provider, model, messages } = req.body;

        let url = "";
        let key = "";

        if (provider === "groq") {
            url = "https://api.groq.com/openai/v1/chat/completions";
            key = process.env.GROQ_API_KEY;
        }

        else if (provider === "openrouter") {
            url = "https://openrouter.ai/api/v1/chat/completions";
            key = process.env.OPENROUTER_API_KEY;
        }

        else {
            return res.status(400).json({ error: "Invalid provider" });
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: "system",
                        content: "You are AI HUB, a helpful coding assistant."
                    },
                    ...messages
                ]
            })
        });

        const data = await response.json();

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}