import { render, screen, fireEvent } from "@testing-library/react"
import ThemeToggle from "@/components/ThemeToggle"
import { ThemeProvider } from "@/context/ThemeContext"

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe("ThemeToggle", () => {
  it("should render with initial light theme", () => {
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("Dark")
  })

  it("should toggle theme when clicked", () => {
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole("button")
    
    expect(button).toHaveTextContent("Dark")
    
    fireEvent.click(button)
    
    expect(button).toHaveTextContent("Light")
  })

  it("should have correct initial styling for light theme", () => {
    renderWithTheme(<ThemeToggle />)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("bg-gray-800")
  })
})