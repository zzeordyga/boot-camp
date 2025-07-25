export default function Layout({ children }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1 className="font-bold text-xl">Devani Marcellina Calista - 2540124570</h1>
        <p>Fresh Graduate Computer Science from Binus University</p>
        <hr />
        {children}
    </div>
  );
}
