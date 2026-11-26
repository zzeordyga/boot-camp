# Firebase Auth with Next.js (App Router)

Authentication, role-based authorization and route protection using Firebase Auth + Firestore.

## Setup
1. Firebase Console: create a project, enable **Authentication > Email/Password**, create a **Firestore** database.
2. Add a Web app and copy the config into `.env.local` (see `.env.local.example`).
3. Firestore > Rules: paste the content of `firestore.rules` and publish.
4. Run:
   ```bash
   npm install
   npm run dev
   ```

## Making an admin
Everyone registers as `user`. To create the first admin, open Firestore Console >
`users` > your document and change the `role` field to `admin`. After that, admins can
promote/demote others from `/admin/dashboard`.

## Routes
| Route              | Access          |
|--------------------|-----------------|
| `/`                | public          |
| `/login`           | public          |
| `/register`        | public          |
| `/user/profile`    | logged-in users |
| `/admin/dashboard` | admin only      |
