import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

const BASE_URL =
  "https://l3g8ddslol.execute-api.ap-northeast-1.amazonaws.com/dev/"

export const checkTextGpt = async (postText: String) => {
  const END_POINT = BASE_URL + "moderations/suggestions/safety"
  try {
    const response = await fetch(END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: postText,
        user_id: "test"
      })
    })
    const data = await response.json()
    return data.is_required_moderation
  } catch (error) {
    console.log(error)
    return false
  }
}

export const createFixTextGpt = async (postText: String) => {
  const END_POINT = BASE_URL + "moderations"
  try {
    const response = await fetch(END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: postText,
        user_id: "test"
      })
    })
    const data = await response.json()
    return data.response.trim()
    .replace(/^\"/g, "")
    .replace(/\"$/g, "")
    .trim();
  } catch (error) {
    console.log(error)
    return false
  }
}

export const checkTimelineTextGpt = async (timelineList: String[]) => {
  const END_POINT = BASE_URL + "moderations/suggestions/timeline-safety"
  try {
    /*
    const response = await fetch(END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompts: timelineList,
        index: []
      })
    })
    const data = await response.json()
    const result: number[] = data.response.map(({ post, level }) => level)
    return result
    */
    throw new Error("API無効化中")
  } catch (error) {
    console.log("🔴 ERROR  | " + error)
    const result: number[] = timelineList.map(() => -1)
    return result
  }
}
