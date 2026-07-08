# Assignment 09 — Next.js + Firebase (Firestore) — NIM: 2502031261

A Next.js (App Router) app that connects to Firebase Firestore to fetch,
search, and display a `posts` collection in real time, with loading/error
states and a React Error Boundary.

## What's inside

| Requirement | Where it's implemented |
|---|---|
| Firebase SDK setup | `lib/firebase.js` |
| `posts` collection + sample docs | `scripts/seed.mjs` (programmatic seeding) |
| Fetch with `getDocs` | `app/posts/page.js` |
| Real-time `onSnapshot` | `app/posts/realtime/page.js` |
| Search/filter by title | `app/posts/realtime/page.js` (search input, live filtering) |
| Loading state | Both pages show a "Loading posts..." message while fetching |
| Error message on failure | Both pages catch errors and show `components/FallbackUI.jsx` |
| React Error Boundary | `components/ErrorBoundary.jsx` wraps both posts pages |
| Fallback UI component | `components/FallbackUI.jsx` (reused by both the boundary and fetch errors) |

## 1. Create your Firebase project

1. Go to https://console.firebase.google.com and click **Add project**.
2. Give it a name (e.g. `bootcamp-assignment-09`) and finish the wizard
   (Google Analytics is optional — you can disable it).
3. Once the project is created, click the **Web** icon (`</>`) on the
   project overview page to register a new web app.
4. Give the app a nickname and click **Register app**. Firebase will show
   you a `firebaseConfig` object — copy those values.
5. In the left sidebar, go to **Build > Firestore Database** and click
   **Create database**. Choose a location and start in **test mode**
   (so reads/writes work immediately during development).

## 2. Configure environment variables

Copy the example env file and fill in the values you copied above:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 3. Install dependencies

```bash
npm install
```

## 4. Seed the `posts` collection

This runs `scripts/seed.mjs`, which programmatically adds 3 sample posts
(`title`, `content`, `createdAt`) to Firestore:

```bash
npm run seed
```

You should see console output confirming each post was added. You can also
add documents manually from the Firestore Console if you prefer.

## 5. Run the app

```bash
npm run dev
```

- Visit **http://localhost:3000/posts** — fetches posts once via `getDocs`.
- Visit **http://localhost:3000/posts/realtime** — subscribes via
  `onSnapshot` for live updates, and includes a search box that filters
  posts by title as you type. Try adding/editing a document in the
  Firestore Console and watch this page update without a refresh.

## Testing the error states

- **Loading state**: visible briefly on page load (and on retry).
- **Fetch error**: temporarily set an invalid `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  in `.env.local` (or turn off Firestore access rules) and reload — the
  fallback UI with a "Try again" button will appear.
- **Runtime error / Error Boundary**: the `ErrorBoundary` component wraps
  the posts content; any render-time JS error inside it will be caught and
  replaced with the same friendly fallback UI instead of crashing the page.

## Firestore Security Rules (development)

For this assignment, test-mode rules are fine:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

(Not for production use — tighten these before deploying anywhere public.)
