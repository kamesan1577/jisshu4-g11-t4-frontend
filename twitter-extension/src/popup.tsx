import { ChakraProvider, Switch } from "@chakra-ui/react"

import "./style.css"
import { useEffect, useState } from "react";

function IndexPopup() {
  const localStoragePost = "postCheck";
  const localStorageTimeline = "timelineCheck";
  const [post, setPost] = useState(true);
  const [timeline, setTimeline] = useState(true);

  useEffect(() => {
    chrome.storage.local.get([localStoragePost], (result) => {
      setPost(result[localStoragePost] === "checked" || result[localStoragePost] === undefined ? true : false);
    });
    chrome.storage.local.get([localStorageTimeline], (result) => {
      setTimeline(result[localStorageTimeline] === "checked" || result[localStorageTimeline] === undefined ? true : false);
    });
  }, []);
  

  const handlePostCheckboxChange = (value) => {
    setPost(value);
    const serializedValue = value ? "checked" : "unchecked";
    chrome.storage.local.set({ [localStoragePost]: serializedValue });
    chrome.runtime.sendMessage({ method: "setPost", key: localStoragePost, value: serializedValue });
  };

  const handleTimelineCheckboxChange = (value) => {
    setTimeline(value);
    const serializedValue = value ? "checked" : "unchecked";
    chrome.storage.local.set({ [localStorageTimeline]: serializedValue });
    chrome.runtime.sendMessage({ method: "setTimeline", key: localStorageTimeline, value: serializedValue });
  };
  
  return (
    <ChakraProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 250
        }}
        className="">
        <div className="text-center bg-gray-100 py-3">
          <h1 className="px-1">へいたんは動作しています。</h1>
        </div>
        <div className="container px-2 pt-2">
          <div className="flex items-center pb-2">
            <div className="flex-1">
              <h2>タイムラインの検閲</h2>
            </div>
            <div className="flex-none">
              <Switch colorScheme="teal" id="checkTimeline" type="checkbox" name="checkTimeline" isChecked={timeline} onChange={() => handleTimelineCheckboxChange(!timeline)} />
            </div>
          </div>
          <div className="flex items-center pb-2">
            <div className="flex-1">
              <h2>ポスト文の検閲</h2>
            </div>
            <div className="flex-none">
              <Switch colorScheme="teal" id="checkPost" type="checkbox" name="checkPost" isChecked={post} onChange={() => handlePostCheckboxChange(!post)} />
            </div>
          </div>
          <div className="text-center pb-2">
            <p className="text-xs">変更はリロード後に反映されます。</p>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default IndexPopup
