export const Completion = class {
    constructor() {
        this.systemPrompt = "あなたにはユーザーのツイート内容が入力されます。入力に含まれる不適切な表現を柔らかい表現に置き換えてください。返答は変換結果のみを返してください。";
        this.END_POINT = "https://api.openai.com/v1";
    }
    // 本家のAPIを叩く(多分もう使わない)
    async sendPrompt(prompt) {
        const API_KEY = await chrome.storage.local.get(["token"]);
        const END_POINT = this.END_POINT;
        const systemPrompt = this.systemPrompt;
        const userPrompt = prompt;
        console.log(userPrompt);
        const response = await fetch(`${END_POINT.endpoint}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY.token}`,
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                    "role": "system",
                    "content": systemPrompt,
                },
                {
                    "role": "user",
                    "content": userPrompt,
                }],
            }),
        });
        const data = await response.json();
        console.log(data);
        return data.choices[0].message.content;
    }
    // TODO: 誰でも使えるので何かしらの制限をかける
    // AWS lambda経由でAI-MOPを叩く
    async sendPromptWithWrapper(prompt) {
        const END_POINT = "https://95nbyqlsr2.execute-api.us-east-1.amazonaws.com/test";
        const userPrompt = prompt;
        console.log(userPrompt);
        const response = await fetch(`${END_POINT}?prompt="${userPrompt}"`);
        let data = await response.json();

        //余計な'"'の削除
        if (data[0] == '"') {
            data = data.slice(1);
        }
        if (data[data.length - 1] == '"') {
            data = data.slice(0, -1);
        }

        console.log(data);
        return data;
    }
}

export const ModerateWithLlmButton = class {
    constructor(textArea) {
        this.button = document.createElement("button");
        this.buttonName = "修正";
        this.buttonValue = textArea.value;
        this.button.textContent = this.buttonName;
        this.button.className = "exButton";
        this.button.addEventListener("click", async () => {
            const completion = new Completion();
            const newText = await completion.sendPromptWithWrapper(textArea.value);
            textArea.value = newText;
            textArea.dispatchEvent(new Event("input", { bubbles: true }));
        });
    }
}
