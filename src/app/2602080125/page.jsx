import Script from "next/script";
import MyPage from '../../../views/2602080125';

export default function Page() {
    return (
        <>
            <Script
                src="https://cdn.tailwindcss.com"
                strategy="beforeInteractive"
            />
            <MyPage />;
        </>
    )
}