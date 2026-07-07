import "../css/Footer.css";

const Footer = () => {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <footer className="footer">
      <p>
        © Assignment Frontend Bootcamp Sesi 8 | Kevin Petersen | 2602136713 | {date}
      </p>
    </footer>
  );
};

export default Footer;