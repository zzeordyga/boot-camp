import { useState, useEffect, useMemo, useRef } from "react";

export default function Page(){
    const [seq, setSeq] = useState([0,1]);
    const count = seq.length - 1;

    const newestRef = useRef(null);

    useEffect(() => {
        document.title = 'Fibonacci Counter: ' + count;
    }, [count]);

    useEffect(() => {
        newestRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [seq]);

    const currFiboVal = useMemo(() => {
        return seq[seq.length - 1];
    }, [seq]);

    function contFibonacci(){
        const nextVal = seq[seq.length - 1] + seq[seq.length - 2];
        setSeq([...seq, nextVal]);
    }

    return (
        <div style={{
            fontFamily: "system-ui",
            backgroundColor: "#f4f4f4",
            color: "white"
        }}>
            <div 
            style={{
                    background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                    padding: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "50px",
                    minHeight: "50vh"
                }}>
                <img src="juanbjir.jpg" alt="profile" style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)"
                }} />
                <div style={{maxWidth: "600px"}}>
                    <h1 style={{fontSize: "40px", marginBottom: "10px"}}>Juan Xavier Soegiarto - 2602105512</h1>
                    <h2 style={{fontSize: "30px", marginBottom: "20px", color: "#dbeafe"}}>Game Application and Technology</h2>
                    <h3 style={{fontSize: "20px", lineHeight: "1.8"}}>GAT is a program that focuses on Game Development with the basis of Software Engineering.</h3>
                    <p style={{fontSize: "18px", lineHeight: "1.8", marginBottom: "20px"}}>This is my introduction page! Down there, lies a spot for Fibonacci.</p>
                    <ul style={{listStle: "disc", marginBottom: "20px", color: "#facc15"}}>
                        <li>useState helps set the initial values of the Fibonacci</li>
                        <li>useEffect updates the document title</li>
                        <li>useMemo memorizes the latest Fibonacci value</li>
                        <li>useRef tracks the newest Fibonacci value</li>
                    </ul>
                    <p><a href="https://www.instagram.com/juanxav_" target="_blank" rel="noopener noreferrer" style={{
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "darkorange",
                        padding: "10px 10px",
                        borderRadius: "15px",
                        transition: "0.3s"
                    }}>Instagram</a></p>
                </div>
            </div>
            <div 
                style={{
                    background: "linear-gradient(135deg, #ea580c, #fb923c)",
                    padding: "60px",
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                    gap: "40px",
                    minHeight: "50vh"
                    }}>
            
                {/* LEFT */}
                <div style={{
                    flex: 1,
                    maxWidth: "500px",
                    backgroundColor: "#1e293b",
                    borderRadius: "16px",
                    padding: "30px",
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.25)"
                }}>
                    <h2 style={{marginBottom: "20px", color: "#38bdf8"}}>Fibonacci Pseudocode</h2>
                    <pre style={{
                        color: "#e2e8f0",
                        lineHeight: "1.8",
                        fontSize: "16px",
                        overflowX: "auto"
                    }}>
                        {`
                            fibonacci(n):
                                if n <= 1:
                                    return n
                            return fibonacci(n-1) + fibonacci(n-2)
                        `}
                    </pre>
                </div>
            {/* RIGHT */}
                <div style={{flex: 1, maxWidth: "500px"}}>
                    <h2 style={{fontSize: "30px", marginBottom: "10px"}}>Interactive Fibonacci</h2>
                    <p style={{fontSize: "18px", marginBottom: "10px"}}>Current Fibonacci Value: {currFiboVal}</p>
                    <button onClick={contFibonacci} style={{
                        padding: "14px 28px",
                        border: "none",
                        borderRadius: "12px",
                        backgroundColor: "#0f172a",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        transition: "0.3s",
                        marginBottom: "30px"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.backGroundColor = "1e293b";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.backGroundColor = "#000000";
                    }}
                    >Continue Calculation</button>
                        <div style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap"
                        }}>
                            {seq.map((num, index) =>
                                <div key={index} 
                                    ref={index === seq.length - 1 ? newestRef : null}
                                    style={{
                                        backgroundColor: "white",
                                        color: "#111827",
                                        padding: "14px 18px",
                                        borderRadius: "10px",
                                        fontWeight: "bold",
                                        minWidth: "40px",
                                        textAlign: "center",
                                        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)"
                                    }}>
                                    {num}
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}