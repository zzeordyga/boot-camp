'use client'
import StoreList from "../../../components/storeList";
import '../globals.css'
import {useRouter} from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter();
    return (
        <>
            <div>
                {StoreList()}
            </div>
        </>
    );
}
