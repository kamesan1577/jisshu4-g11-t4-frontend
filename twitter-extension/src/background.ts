chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === "getLocalStorage") {
      chrome.storage.local.get([request.key], function(result) {
        sendResponse({ data: result[request.key] });
      });
    } else if (request.method === "setApiKey" || request.method === "setPost" || request.method === "setTimeline") {
      chrome.storage.local.set({ [request.key]: request.value });
      sendResponse({});
    } else {
      sendResponse({});
    }
  });
  