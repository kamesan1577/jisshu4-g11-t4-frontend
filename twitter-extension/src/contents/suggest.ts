import "../style.css"
import { publishSuggestion } from "./inputText"
import { postButton } from "./insert"
import type { PlasmoCSConfig } from "plasmo"
import { fetchTextArea } from "./inputText"
 
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}

/**
 * 提案を表示する関数
 * @returns {void}
 */
export const viewSuggestion = (inputText: string) => {
  const inputTextFix = inputText
  let targetElement;
  let thema = 'light';
  // 提案表示場所の要素を取得
  if(document.querySelector(".css-175oi2r .r-kemksi .r-1h8ys4a")) {
    targetElement = document.querySelector(
      ".css-175oi2r .r-kemksi .r-1h8ys4a"
    )
    thema = 'dark';
  } else if(document.querySelector(".css-175oi2r .r-yfoy6g .r-1h8ys4a")) {
    targetElement = document.querySelector(
      ".css-175oi2r .r-yfoy6g .r-1h8ys4a"
    )
    console.log(targetElement)
    thema = 'blueDark';
  } else if(document.querySelector(".css-175oi2r .r-14lw9ot .r-1h8ys4a")) {
    targetElement = document.querySelector(
      ".css-175oi2r .r-14lw9ot .r-1h8ys4a"
    )
  }
  // 要素が存在する場合
  if (targetElement) {
    // 新しいdiv要素を作成
    // このdivタグ内に提案を表示する
    const newElement = document.createElement("div")
    if (thema === 'dark') {
      newElement.classList.add("suggest", "suggestDark")
    } else if (thema === 'blueDark') {
      newElement.classList.add("suggest", "suggestBlueDark")
    } else {
      newElement.classList.add("suggest", "suggestLight")
    }

    // タイトルの作成
    const title = document.createElement("p")
    title.classList.add("suggest", "title")
    title.textContent = "発言を見直してみませんか？"
    newElement.appendChild(title)

    // 修正提案テキスト表示作成
    let newText = document.createElement("p")
    newText.classList.add("suggest", "content")
    newText.textContent = inputText 
    newElement.appendChild(newText)

    // ボタン要素「修正してポストする」を作成
    const newButton = document.createElement("button")
    newButton.classList.add("suggest", "agree")
    newButton.textContent = "修正してポストする"
    newElement.appendChild(newButton)

    // ボタン要素「棄却してポストする」を作成
    const newButton2 = document.createElement("button")
    newButton2.classList.add("suggest", "disagree")
    newButton2.textContent = "棄却してポストする"
    newElement.appendChild(newButton2)

    // 提案表示場所にこの要素を挿入
    targetElement.insertBefore(newElement, targetElement.firstChild)
    console.log("Suggestions inserted!")

    // 「棄却してポストする」ボタンが押されたら、投稿画面上の「ポストする」ボタンを押した扱いとする
    newButton2.addEventListener("click", () => {
      postButton.click()
      document.querySelector(".suggest").remove()
    })

    // 「修正してポストする」ボタンをクリックしたときの処理
    newButton.addEventListener("click", async(e) => {
      e.stopPropagation()
      await publishSuggestion(inputTextFix)
      document.querySelector(".suggest").remove()
    })

    let textWrapper = fetchTextArea().querySelector('[data-text="true"]')?.parentElement

    textWrapper.addEventListener('onClick', (e) => {
      console.log('入力値が変更されました: ', e.target);
    });
  }
  // targetElementが存在しない場合
  else {
    console.log("Target element not found")
  }
}