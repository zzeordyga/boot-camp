# Assignment 10 – Authentication, Authorization & Route Protection with Firebase

**Ishvara Pranidhana Lakshmana · 2602181004**

A Next.js (App Router) app using Firebase Authentication (email & password) and Firestore. Users register and log in, every account has a role (`user` or `admin`) stored in Firestore, and pages and data are protected based on that role.

## Authentication vs authorization

- **Authentication** answers *who are you?* Firebase Authentication checks the email and password, hashes and stores passwords, and issues the ID token the app uses.
- **Authorization** answers *what are you allowed to do?* The role in `users/{uid}` decides which pages you can open, and the Firestore Security Rules decide which documents you can read or change.
