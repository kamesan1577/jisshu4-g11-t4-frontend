import { viewSuggestion } from "./suggest"
import { checkTextGpt, createFixTextGpt, checkTimelineTextGpt } from "./gpt"
import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

let isSuggestions = false
export let postButton

/**
 * ポストボタンが存在する場合にsetPostButtonを呼び出す関数
 * @returns 存在する場合はtrue、しない場合はfalseを返す。
 */
export const checkPostButton = (node: HTMLElement) => {
  // ポストボタンを取得
  postButton = node.querySelector<HTMLElement>(
    "[data-testid='tweetButton']"
  )
  // ポストボタンが存在する場合
  if (postButton) {
    setPostButtonStyle()
    isSuggestions = false
    return true
  }
  // 存在しない場合
  return false
}

/**
 * ポストボタンのスタイルを設定する関数
 * @param postButton - スタイルを設定するポストボタンの要素
 */
const setPostButtonStyle = () => {
  postButton.style.backgroundColor = "#333333";
  console.log("Post button style updated!");

  // ボタンがクリックされた時のイベントリスナー
  postButton.addEventListener("click", async () => { // 非同期関数内でのasyncの追加
    console.log("Button pressed!");
    // ここにボタンが押された時の追加の処理を書くことができます
    if (!isSuggestions) {
      let checkTimelineTextGptResult = await checkTimelineTextGpt()
      console.log(checkTimelineTextGptResult)
      isSuggestions = true;
      console.log("Checking...");
      try {
        let checkTextGptResult = await checkTextGpt();

        if (checkTextGptResult) {
          console.log("Fix text Loading...");
          let createFixTextGptResult = await createFixTextGpt();
          console.log(createFixTextGptResult);
          viewSuggestion(createFixTextGptResult);
        } else {
          console.log("No suggestions!");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
  });
};

