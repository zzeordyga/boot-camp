import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db, auth } from "@/firebase/Init";

// jest.mock("firebase/app", () => ({
//     initializeApp: jest.fn(() => "mockApp"),
// }));

// jest.mock("firebase/firestore", () => ({
//     getFirestore: jest.fn(() => "mockDb"),
// }));

// jest.mock("firebase/auth", () => ({
//     getAuth: jest.fn(() => "mockAuth"),
// }));

// beforeEach(() => {
//     jest.clearAllMocks();
// });

test("initializeApp dipanggil sekali", () => {
    expect(initializeApp).toHaveBeenCalledTimes(1);
});

// test("initializeApp menggunakan konfigurasi yang benar", () => {
//     expect(initializeApp).toHaveBeenCalledWith({
//         apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//         authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//         projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//         storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//         appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     });
// });

// test("Firestore diinisialisasi", () => {
//     expect(getFirestore).toHaveBeenCalledWith("mockApp");
// });

// test("Auth diinisialisasi", () => {
//     expect(getAuth).toHaveBeenCalledWith("mockApp");
// });

// test("db dan auth berhasil diexport", () => {
//     expect(db).toBe("mockDb");
//     expect(auth).toBe("mockAuth");
// });