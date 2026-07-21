# Task Manager — Next.js + Firestore

A real-time task management app built with Next.js (App Router), demonstrating custom hooks,
Context API for global settings, Firestore `onSnapshot` real-time updates, and Jest unit tests.

## Requirements → where they live

| Requirement | File |
|---|---|
| Custom hook `useLocalStorage` | `src/hooks/useLocalStorage.js` |
| Context API for global settings (theme, language) | `src/context/SettingsContext.jsx` — internally uses `useLocalStorage` so theme/language/sort order all persist |
| Firestore CRUD + real-time `onSnapshot` | `src/hooks/useTasks.js` |
| Unit test: utility function | `src/__tests__/taskUtils.test.js` (tests `sortTasks` and `getTaskStats` from `src/lib/taskUtils.js`) |
| Unit test: React component | `src/__tests__/TaskForm.test.jsx` (tests `src/components/TaskForm.jsx`) |
| Responsive design | `app/globals.css` — flex layouts + a mobile breakpoint at 480px; theme variables also support light/dark |

## 1. Create a Firebase project

1. [Firebase Console](https://console.firebase.google.com/) → **Add project**.
2. **Build → Firestore Database → Create database** (production mode is fine).
3. **Project settings → General → Your apps** → click the web icon `</>` to register a web app, copy the config.

No Firebase Authentication is required for this assignment — the `tasks` collection is open to any client, matching the brief (see `firestore.rules` for the exact validation rules that are still enforced server-side: title must be a non-empty string ≤200 chars).

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Firebase config values in `.env.local`.

## 3. Deploy Firestore rules

Paste the contents of `firestore.rules` into **Firestore Database → Rules** in the console and publish. (Or use the Firebase CLI: `firebase deploy --only firestore:rules`.)

## 4. Install, run, test

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # run Jest unit tests
```

## Features

- **Add / edit / delete / toggle-complete** tasks, all synced live via Firestore `onSnapshot` — open the app in two tabs and changes in one appear instantly in the other.
- **Sort order** (newest / oldest / alphabetical) is a user preference persisted to `localStorage` via the custom `useLocalStorage` hook, so it survives a page refresh.
- **Theme (light/dark) and language (English/Bahasa Indonesia)** are global settings managed through React Context (`SettingsContext`), also persisted via `useLocalStorage`.
- **Responsive layout**: single-column, touch-friendly controls on mobile; form and task rows reflow at the 480px breakpoint.

## Project structure

```
task-manager-app/
├── firestore.rules
├── .env.local.example
├── jest.config.js
├── jest.setup.js
├── app/
│   ├── layout.jsx        # wraps app in SettingsProvider
│   ├── page.jsx           # main task manager screen
│   └── globals.css
└── src/
    ├── lib/
    │   ├── firebase.js    # Firebase init
    │   └── taskUtils.js   # pure functions: sortTasks, getTaskStats
    ├── hooks/
    │   ├── useLocalStorage.js
    │   └── useTasks.js    # Firestore CRUD + onSnapshot
    ├── context/
    │   └── SettingsContext.jsx
    ├── components/
    │   ├── TaskForm.jsx
    │   ├── TaskList.jsx
    │   ├── TaskItem.jsx
    │   └── SettingsBar.jsx
    └── __tests__/
        ├── taskUtils.test.js
        └── TaskForm.test.jsx
```
