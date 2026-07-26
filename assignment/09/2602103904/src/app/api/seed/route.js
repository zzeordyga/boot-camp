import { notes } from "@/app/data/notes";
import getDatabase from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function GET() {
    const db = getDatabase();

    try {
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            await addDoc(collection(db, "notes"), {
                subject: note.subject,
                material: note.material,
                courseSchedule: Timestamp.fromDate(new Date(note.courseSchedule)),
                timeCreated: Timestamp.now(),
            });
        }
        return Response.json({
            success: true,
            message: "Data Added"
        });
    } catch (error) {
        return Response.json({
            success: false,
            message: error.message,
        });
    }
}