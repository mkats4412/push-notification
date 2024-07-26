# URL Dispatcher

## Idea
URL Dispatcher is a Chrome extension that allows users to quickly send the current tab's URL to specified devices.
Not all brower can send your browser's url so I made this.

## Preparation
You need to install an app called "Push Notify API" - NotifyDroid beforehand. I recommend this app because over 10,000 people are using it. I don't know much about this app or if there is a version for iOS.

After installing the app on your phone, open it and try this command:

```bash
curl https://xdroid.net/api/message -X POST -d "k=your API KEY" -d "t=your title" -d "c=your message" -d "u=http://url you are sending"
```

## Features

- Send the current tab's URL to up to two devices
- Bilingual support (English and Japanese)
- Custom alert dialogs for better user experience
- Persistent device keys for convenience

## Installation

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click on the URL Dispatcher icon in your Chrome toolbar.
2. Enter the device keys for the devices you want to send URLs to.
3. Click the "Dispatch URL" button to send the current tab's URL.
4. A custom alert will inform you of the success or failure of the operation.

## Configuration

Device keys are saved in Chrome's storage and will persist between sessions. To change a device key, simply overwrite it in the input field and send a URL.

## Localization

The extension supports English and Japanese. It will automatically use the language set in your Chrome settings.

## Files

- `manifest.json`: Extension manifest file
- `popup.html`: HTML for the extension popup
- `popup.js`: JavaScript for handling popup interactions
- `background.js`: Background script for handling URL dispatch
- `_locales/en/messages.json`: English localization strings
- `_locales/ja/messages.json`: Japanese localization strings
- `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`: Extension icons

## Development

To modify the extension:

1. Edit the relevant files.
2. If adding new user-facing strings, add them to both `messages.json` files.
3. Reload the extension in `chrome://extensions/`.


## License

[MIT License](LICENSE)

## Support
No Support are available.

## Finally 
Please Check License Agreement of MIT, and use this extension on your risk. 
