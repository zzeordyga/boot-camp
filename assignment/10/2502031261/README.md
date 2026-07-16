# Firebase Authentication, Authorization & Route Protection

A small full-stack React + Firebase app demonstrating:

- **Authentication** (Firebase Authentication, email/password)
- **Authorization** (Role-Based Access Control via Firestore `users` collection)
- **Route protection** (frontend guards + Firestore Security Rules)
- **Form validation** (HTML5 + manual JS validation)

## Concepts, mapped to code

| Concept | Where |
|---|---|
| Authentication (who are you?) | `src/context/AuthContext.jsx` — `register()`, `login()`, `onAuthStateChanged` |
| Authorization (what can you do?) | `role` fetched from Firestore `users/{uid}` doc after login |
| Route protection (frontend) | `src/components/ProtectedRoute.jsx` (auth only), `src/components/AdminRoute.jsx` (auth + role) |
| Route protection (backend) | `firestore.rules` — a non-admin's read of `/users` or `/adminData` is denied even if the frontend guard is bypassed |
| Forms & validation | `src/pages/Login.jsx`, `src/pages/Register.jsx` — `required`, `type="email"`, `minLength` (HTML5) + a `validate()` function (manual) |
| Persistence | `src/firebase.js` — `setPersistence(auth, browserLocalPersistence)` |
| Logout | `Navbar.jsx` — `logout()` from `AuthContext` |

## 1. Create a Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/) → **Add project**.
2. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
3. In **Build → Firestore Database**, click **Create database** (start in production mode).
4. In **Project settings → General → Your apps**, click the web icon `</>` to register a web app and copy the config values.

## 2. Configure the app

```bash
cd firebase-rbac-app
cp .env.example .env
```

Paste your Firebase config values into `.env`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 3. Deploy the Firestore security rules

Easiest path — paste the contents of `firestore.rules` into **Firestore Database → Rules** in the console and click **Publish**.

Or, with the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase init firestore   # point it at this project, keep the existing firestore.rules
firebase deploy --only firestore:rules
```

## 4. Install and run

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## 5. Try it out

1. **Register** a new account → you land on `/user/profile`. Check Firestore: a `users/{uid}` doc was created with `role: "user"`.
2. Try visiting `/admin/dashboard` → you get redirected to `/unauthorized`, because your role isn't `admin`.
3. **Promote yourself to admin for testing**: in the Firestore console, open your `users/{uid}` document and manually change `role` to `admin`. Log out and back in (or refresh) — you'll now see the "Admin Dashboard" link and can access it.
4. On the Admin Dashboard, all registered users and their roles are listed — this read only succeeds because `firestore.rules` allows it for admins.

This manual-promotion-only design is intentional: it's the whole point of RBAC that a user can never grant themselves elevated permissions through the app's own UI — that has to happen through a trusted, separate channel (console, or an admin-only backend action).

## Project structure

```
firebase-rbac-app/
├── firestore.rules
├── .env.example
├── src/
│   ├── firebase.js          # Firebase init + persistence
│   ├── context/AuthContext.jsx   # auth state, role fetching, register/login/logout
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx    # authentication guard
│   │   └── AdminRoute.jsx        # authorization guard
│   └── pages/
│       ├── Home.jsx (+ Unauthorized)
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── UserProfile.jsx       # /user/profile — any authenticated user
│       └── AdminDashboard.jsx    # /admin/dashboard — admin role only
```
