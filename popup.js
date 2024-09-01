// カスタムアラート関数
function showCustomAlert(message) {
  const modal = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  const closeButton = modal.querySelector('.close-button');

  alertMessage.textContent = message;
  modal.style.display = 'block';

  closeButton.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
   // Localize UI
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = chrome.i18n.getMessage(element.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    element.placeholder = chrome.i18n.getMessage(element.getAttribute('data-i18n-placeholder'));
  });
  // 保存されたデバイスキーを読み込む
  chrome.storage.sync.get(['device1', 'device2'], function(result) {
    document.getElementById('device1').value = result.device1 || '';
    document.getElementById('device2').value = result.device2 || '';
  });

  document.getElementById('sendButton').addEventListener('click', function() {
    let device1 = document.getElementById('device1').value;
    let device2 = document.getElementById('device2').value;

    // デバイスキーを保存
    chrome.storage.sync.set({device1: device1, device2: device2});

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let currentUrl = tabs[0].url;


      chrome.runtime.sendMessage({
        action: "sendUrl",
        url: currentUrl,
        message: chrome.i18n.getMessage("urlMessage", [currentUrl]),
        devices: [device1, device2].filter(Boolean) // 空のデバイスキーを除外
      }, function(response) {
        if (response.success) {
          showCustomAlert(chrome.i18n.getMessage("successMessage"));
        } else {
          showCustomAlert(chrome.i18n.getMessage("failureMessage"));
        }
      });
    });
  });
});

// QRコード生成ボタンのクリックイベント
document.getElementById('createQR').addEventListener('click', () => {
  const qrImage = document.getElementById('qr');
  
  // 現在のタブのURLを取得
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url; // 現在のタブのURLを取得
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}`;

    // QRコードの表示/非表示をトグル
    if (qrImage.style.display === 'block') {
      qrImage.style.display = 'none'; // 既に表示されている場合は非表示にする
    } else {
      qrImage.src = qrCodeUrl; // QRコードのURLを設定
      qrImage.style.display = 'block'; // QRコードを表示する
    }
  });
});


// モーダルダイアログを閉じる処理
document.querySelector('.close-button').addEventListener('click', () => {
  document.getElementById('customAlert').style.display = 'none';
});
