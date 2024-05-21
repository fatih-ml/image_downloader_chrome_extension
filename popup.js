document.getElementById('download-images').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: downloadImages
      });
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
  