export default function Layout({children}) {
    return (
        <div style = {{fontFamily:"Arial, sans-serif"}}>
            <header style={{padding: "24px 0",textAlign:"center", background: "#2563eb",color:"#fff"}}>
                <h1>Owen Maha Putra - 2502000363</h1>
                <p>Front-End IT Bootcamap Assignment</p>
                </header>
                <main style={{maxWidth: 800, margin:"40px auto", padding: 24}}>
                    {children}
                </main>
                </div>
                
    )
}