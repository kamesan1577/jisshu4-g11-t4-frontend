import type { PlasmoCSConfig } from "plasmo";
import { viewSuggestion } from "./suggest";

// TwitterのポストページのURLにマッチするPlasmoCSConfigを定義
export const config: PlasmoCSConfig = {
    matches: ["https://twitter.com/*"]
};

let isSuggestions = true;

/**
 * ポストボタンが存在する場合にsetPostButtonを呼び出す関数
 * @returns 存在する場合はtrue、しない場合はfalseを返す。
 */
const checkPostButton = () => {
    // ポストボタンを取得
    const postButton = document.querySelector<HTMLElement>("[data-testid='tweetButton']");
    // ポストボタンが存在する場合
    if (postButton) {
        setPostButtonStyle(postButton);
        return true;
    }
    // 存在しない場合
    console.log("Hmm... Post button not found yet.");
    return false;
};

/**
 * ポストボタンのスタイルを設定する関数
 * @param postButton - スタイルを設定するポストボタンの要素
 */
const setPostButtonStyle = (postButton: HTMLElement) => {
    postButton.style.backgroundColor = "#333333";
    console.log("Post button style updated!");

    // ボタンがクリックされた時のイベントリスナー
    postButton.addEventListener("click", () => {
        console.log("Button pressed!");
        // ここにボタンが押された時の追加の処理を書くことができます
        if (isSuggestions) {
            isSuggestions = false;
            viewSuggestion();
        }
    });
};

/**
 * ドキュメントが読み込まれたときに実行される関数。
 * ポストボタンの存在を確認し、最終的な確認を行う。
 */
const onDocumentLoad = () => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const handleInterval = () => {
        if (checkPostButton()) {
            clearInterval(intervalId);
        }
    };

    // 1秒ごとにポストボタンの存在を確認する
    intervalId = setInterval(handleInterval, 1000);

    // ページのDOMContentLoadedイベントを待ち、最終的な確認を行う
    // TODO: 一度ポストボタンが見つかったら実行が終了してしまうので、一度投稿画面を閉じて再度投稿画面を開くと、ポストボタンが見つからないという問題がある
    document.addEventListener("DOMContentLoaded", () => {
        clearInterval(intervalId);
        checkPostButton();
    });
};

// ページのロード完了時に処理を開始
window.addEventListener("load", onDocumentLoad);
