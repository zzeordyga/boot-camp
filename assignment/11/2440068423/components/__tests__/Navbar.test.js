import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";

// Mock next/navigation dan context
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));
jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  setPersistence: jest.fn(() => Promise.resolve()),
  browserSessionPersistence: "SESSION",
  signOut: jest.fn(),
}));

let assignMock;

beforeAll(() => {
  assignMock = jest.spyOn(window.location, 'assign').mockImplementation(() => {});
});

afterAll(() => {
  assignMock.mockRestore();
});

describe("Navbar", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/2440068423/posts");
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("menampilkan link login dan register saat user belum login", () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    render(<Navbar />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("menampilkan email dan tombol logout saat user login", () => {
    useAuth.mockReturnValue({
      user: { email: "test@example.com" },
      userData: { role: "user" },
      loading: false,
    });
    render(<Navbar />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("menampilkan link Dashboard jika user adalah admin", () => {
    useAuth.mockReturnValue({
      user: { email: "admin@example.com" },
      userData: { role: "admin" },
      loading: false,
    });
    render(<Navbar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("memanggil signOut saat logout ditekan", () => {
    useAuth.mockReturnValue({
      user: { email: "admin@example.com" },
      userData: { role: "admin" },
      loading: false,
    });
    render(<Navbar />);
    fireEvent.click(screen.getByText("Logout"));
    expect(signOut).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Logout berhasil");
    expect(window.location.assign).toHaveBeenCalledWith("/2440068423/login");
  });

  it("menampilkan pesan memuat saat loading", () => {
    useAuth.mockReturnValue({ user: null, loading: true });
    render(<Navbar />);
    expect(screen.getByText(/memuat/i)).toBeInTheDocument();
  });
});
