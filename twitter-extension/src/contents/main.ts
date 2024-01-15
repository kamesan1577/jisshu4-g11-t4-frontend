import { checkPostButton } from "./insert"
import { checkTimelinePost, getTimelinePost, getTimelinePostList } from "./getTimelinePost"
import type { PlasmoCSConfig } from "plasmo"
import { setTimelinePost } from "./setTimelinePost"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

let timeline = "unchecked";
let post = "unchecked";

chrome.runtime.sendMessage({ method: "getLocalStorage", key: "timelineCheck" }, function(response) {
  timeline = response.data;
});
chrome.runtime.sendMessage({ method: "getLocalStorage", key: "postCheck" }, function(response) {
  post = response.data;
});

/**
 * DOMの変更を監視し、それに応じてアクションを実行するMutation Observer.
 * @param {MutationRecord[]} mutations - 発生した変更のリスト。
 */
const observer = new MutationObserver(async (mutations) => {
  // 変更のリストを反復処理する
  mutations.forEach((mutation) => {
    // 追加されたノードがある場合
    if (mutation.addedNodes.length) {
      // 追加されたノードを反復処理する
      mutation.addedNodes.forEach((node) => {
        // ノードがHTMLElementの場合
        if (node instanceof HTMLElement && (node.querySelector<HTMLElement>("[data-testid='tweetButton']") || node.querySelector<HTMLElement>("[data-testid='tweetButtonInline']")) && post === "checked") {
          checkPostButton(node)
        } else if (node instanceof HTMLElement && (node.querySelector<HTMLElement>("[data-testid='tweetText']") || node.querySelector<HTMLElement>("[data-testid='tweetTextarea_0_label']")) && timeline === "checked") {
          getTimelinePost(node)
        }
      })
    }
  })
  if (getTimelinePostList().length !== 0) {
    //console.log(getTimelinePostList());
    let checkTimelineTextGptResult = await checkTimelinePost(getTimelinePostList())
    setTimelinePost(checkTimelineTextGptResult);
  }
  //resetTimelinePostList();
})

// DOMの変更を監視する
observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
})
