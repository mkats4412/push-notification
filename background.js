chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "sendUrl") {
    const sendToDevice = async (deviceKey) => {
      if (!deviceKey) return { 
        success: false, 
        error: chrome.i18n.getMessage("emptyDeviceKeyError")
      };

      let url = "https://xdroid.net/api/message";
      
      let data = new URLSearchParams();
      data.append("k", deviceKey);
      data.append("t", chrome.i18n.getMessage("urlReceivedMessage"));
      data.append("c", request.message);
      data.append("u", request.url);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: data
        });
        const responseData = await response.json();
        console.log('success:', deviceKey, responseData);
        return { success: true, data: responseData };
      } catch (error) {
        console.error('failure:', deviceKey, error);
        return { success: false, error: error.toString() };
      }
    };

    // 指定されたデバイスに送信
    Promise.all(request.devices.map(sendToDevice)).then(results => {
      const allSuccessful = results.every(result => result.success);
      sendResponse({ success: allSuccessful });
    });

    return true;  // 非同期レスポンスのために必要
  }
});