# React - Progressive Decouple Custom Theme Demo

## React

- `npm install`
- `npm run build` - creates bundle.js file
- `npm run start` - starts local server and reloads when code is updated.
- `dist/index.html` - Initial markup when server is running.
- `src/index.tsx` - Entry file. Currently 4 'apps' are loaded and mount to the DOM supplied in `dist/index.html`. Remove DOM to test different configurations.

You can add this as a custom theme to a Drupal project by including it `themes/custom/olas`.

## Codesandbox (the server)

- The server is located in a [codesandbox](https://codesandbox.io/s/node-express-server-forked-0il32?file=/src/index.js).
- Fork that sandbox if you plan to make any updates.
- The sandbox will go to sleep if inactive.
- Make sure the `API_URL` the app refrences matches the sandbox's browser url, for example: `https://0il32.sse.codesandbox.io/`.

## DB (Google Sheets)

- The server is connected to a google spreadsheet. Create a new create a new spreadsheet.
- Follow the steps to create a [service account](https://www.twilio.com/blog/2017/03/google-spreadsheets-and-javascriptnode-js.html).
- Make sure to add the `id` from the new google sheet.
