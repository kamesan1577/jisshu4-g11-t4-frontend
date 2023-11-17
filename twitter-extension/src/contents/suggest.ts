import "../style.css"

import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
}

/**
 * 提案を表示する関数
 * @returns {void}
 */
export const viewSuggestion = () => {
  // 提案表示場所の要素を取得
  const targetElement = document.querySelector(
    ".css-1dbjc4n .r-14lw9ot .r-1h8ys4a"
  )
  // 要素が存在する場合
  if (targetElement) {
    // 新しいdiv要素を作成
    // このdivタグ内に提案を表示する
    const newElement = document.createElement("div")
    newElement.classList.add("suggest")

    // タイトルの作成
    const title = document.createElement("p")
    title.classList.add("suggest", "title")
    title.textContent = "発言を見直してみませんか？"
    newElement.appendChild(title)

    // 修正提案テキスト表示作成
    const newText = document.createElement("p")
    newText.classList.add("suggest", "content")
    // TODO: ここにGPTから返ってきた修正提案テキストを入れる
    newText.textContent = "少しあなたとは考えが合わないや" // 仮のテキスト
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

    // 投稿画面上の「ポストする」ボタンを取得
    const tweetButton = document.querySelector<HTMLElement>(
      "[data-testid='tweetButton']"
    )
    // 「棄却してポストする」ボタンが押されたら、投稿画面上の「ポストする」ボタンを押した扱いとする
    newButton2.addEventListener("click", () => {
      tweetButton.click()
    })

    // 「修正してポストする」ボタンをクリックしたときの処理
    newButton.addEventListener("click", () => {
      // TODO: 投稿文にテキストを挿入する処理を行う
      //addButtonClickHandler();
    })
  }
  // targetElementが存在しない場合
  else {
    console.log("Target element not found")
  }
}

/**
 * この関数は、ツイート欄において、特定のテキストを挿入するためのものです。
 * 具体的には、テキストエリアにフォーカスがあたっている状態で、特定のボタンを押すことで、
 * 「uoo!」というテキストを挿入します。
 */
export const insertSuggestions = () => {
  // data-offset-keyの初期化
  let dataOffsetKey = null

  // 「Fix!!」ボタンをクリックしたときの処理
  const addButtonClickHandler = () => {
    const textWrapper =
      fetchTextArea().querySelector('[data-text="true"]')?.parentElement
    if (textWrapper) {
      while (textWrapper.firstChild) {
        textWrapper.removeChild(textWrapper.firstChild)
      }
      const newTextNode = document.createTextNode("uoo!")
      textWrapper.appendChild(newTextNode)
      textWrapper.dispatchEvent(
        new Event("input", { bubbles: true, cancelable: true })
      )
    } else {
      console.log("textWrapperが見つかりません")
    }
  }

  const fetchTextArea = () => {
    let currentTextArea: Element | null = document.querySelector(
      '[data-testid="tweetTextarea_0"]'
    )
    currentTextArea = currentTextArea?.querySelector('[data-text="true"]')
      ?.parentNode as Element
    return currentTextArea
  }

  // ツイート欄の要素を取得
  const targetElement2 = document.querySelector(
    ".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr"
  )

  // ツイート欄の要素が存在する場合
  if (targetElement2) {
    // data-offset-keyを取得
    dataOffsetKey = targetElement2.getAttribute("data-offset-key")
    console.log("data-offset-keyの内容:", dataOffsetKey)
  } else {
    console.log("要素が見つかりません")
  }
}
