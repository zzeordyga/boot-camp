import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"
import "./css/layout.css"

const layout = ({children}) => {
  return (
    <div className="layout">
        <Navbar />

        <main className="main">
            {children}
        </main>

        <Footer />
    </div>
  )
}

export default layout