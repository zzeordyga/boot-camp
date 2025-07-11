export default function Layout({ children }) {
  return (
    <div style = {{fontFamily:"Arial, sans-serif"}}>
      <header style={{padding: "24px 0",textAlign:"center", background: "#212121",color:"#fff"}}>
        <h1>2501959775 - Michelle Valencia Nurdi</h1>
        <p>Bootcamp Assignment Session 8</p>
      </header>
      <main style={{ textAlign: "center", padding: "32px 16px" }}>
        {children}
      </main>
    </div>
  );
}
