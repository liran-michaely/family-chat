# Family Chat

**Family Chat** is a lightweight messaging application that runs entirely in your
browser. It is designed to be hosted on [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and does
not require any server‑side infrastructure. All messages and user data are
persisted locally using the browser’s `localStorage` API, which means that
messages persist even after closing and reopening the page【781363637916180†L110-L115】.

## Features

* **Local persistence:** Messages are stored in `localStorage`, so they remain
  available across page reloads and browser sessions【781363637916180†L110-L115】. Because
  GitHub Pages only serves static content, no database or server is required.
* **Username prompt:** On first launch the app asks for your name and
  remembers it for future visits.
* **Responsive layout:** The interface adapts to both desktop and mobile screens.
* **User/other differentiation:** Messages sent by you are aligned to the right
  with a distinct colour, while messages from other users (as stored in the
  same browser) are aligned to the left.

## Limitations

GitHub Pages hosts static files only—it cannot run server‑side code or store
data on the server【727785442464678†L84-L88】. As a result, **messages are not shared
between devices or browsers**. Each browser stores its own copy of the chat.
If you need real‑time synchronisation across users, you will need a backend
service such as Firebase or a custom server.

## Getting started locally

1. Download or clone this repository.
2. Open `index.html` in your browser. The app will prompt you for a
   username and then display the chat interface.
3. Start sending messages. Your chat history is saved locally.

To clear all stored data, open your browser’s developer tools and remove
the `familyChatMessages` and `familyChatUsername` keys from `localStorage`.

## Deploying to GitHub Pages

Follow these steps to host the app on GitHub Pages:

1. Create a new repository on GitHub (e.g. `family-chat`).
2. Copy the contents of this folder (`index.html`, `style.css`, `script.js`, and
   `README.md`) into your repository.
3. Commit and push the files.
4. In your repository settings, navigate to **Pages** and choose the branch
   (e.g. `main`) and root directory as the publishing source. Enable GitHub Pages.
   GitHub Pages will build and deploy your site at a URL like
   `https://<username>.github.io/family-chat/`. For more information, see
   GitHub’s documentation on GitHub Pages【727785442464678†L84-L88】.

After publishing, you and your family can access the chat app at the
provided URL. Remember that the chat history is stored per‑device—family
members on different devices will not see each other’s messages without a
shared backend.

## Customisation

You can modify the colours, fonts and layout by editing `style.css`. The
JavaScript logic lives in `script.js`; feel free to extend it with
additional features such as exporting chat history, clearing messages, or
integrating a real‑time database.