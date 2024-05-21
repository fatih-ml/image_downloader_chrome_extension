chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: downloadImages
    });
  });
  
  function downloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      const url = img.src;
      if (url) {
        chrome.runtime.sendMessage({ url: url, index: index });
      }
    });
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.url) {
      chrome.downloads.download({
        url: message.url,
        filename: `image_${message.index}.jpg`
      });
    }
  });
  