import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

const BASE_URL = "https://b0861yd058.execute-api.us-east-1.amazonaws.com/dev/";


export const checkTextGpt = async () => {
    const END_POINT = BASE_URL + "moderations/suggestions/safety";
    try {
        const response = await fetch(END_POINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: "グダクダしてんじゃねぇよ死ねやカス",
                user_id: "test",
            }),
        });
        const data = await response.json();
        return data.is_required_moderation;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const createFixTextGpt = async () => {
    const END_POINT = BASE_URL + "moderations";
    try {
        const response = await fetch(END_POINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: "グダクダしてんじゃねぇよ死ねやカス",
                user_id: "test",
            }),
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const checkTimelineTextGpt = async () => {
    const END_POINT = BASE_URL + "moderations/suggestions/timeline-safety";
    try {
        const response = await fetch(END_POINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompts: [
                    "hoge",
                    "huga",
                    "poko"
                ],
                index: [],
            }),
        });
        const data = await response.json();
        console.log(data)
        return data.response;
    } catch (error) {
        console.log(error);
        return false;
    }
}