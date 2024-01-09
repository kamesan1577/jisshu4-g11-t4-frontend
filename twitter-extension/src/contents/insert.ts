import { viewSuggestion } from "./suggest"
import { checkTextGpt, createFixTextGpt } from "./gpt"
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
  if (node.querySelector<HTMLElement>("[data-testid='tweetButton']")) {
    postButton = node.querySelector<HTMLElement>(
      "[data-testid='tweetButton']"
    )
  } else if (node.querySelector<HTMLElement>("[data-testid='tweetButtonInline']")) {
    postButton = node.querySelector<HTMLElement>(
      "[data-testid='tweetButtonInline']"
    )
  }
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
  const appendPostButton = document.createElement('button')
  appendPostButton.textContent = "ポストする";
  appendPostButton.classList.add('fixPostButton')
  postButton.parentNode.insertBefore(appendPostButton, postButton);
  console.log("Post button style updated!");

  // ボタンがクリックされた時のイベントリスナー
  appendPostButton.addEventListener("click", async () => { // 非同期関数内でのasyncの追加
    console.log("Button pressed!");
    const postText = document.querySelector<HTMLElement>("[data-text='true']").textContent;
    if (document.querySelector(".suggest")) {
      isSuggestions = false;
      document.querySelector(".suggest").remove();
    }
    if (!isSuggestions) {
      isSuggestions = true;
      try {
        let checkTextGptResult = await checkTextGpt(postText);

        if (checkTextGptResult) {
          console.log("Text Checking...");
          viewSuggestion(await createFixTextGpt(postText));
        } else {
          console.log("No suggestions!");
          isSuggestions = false;
          postButton.click();
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
  });
};

