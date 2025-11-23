export function useNavigate() {
  return (url) => { window.location.href = url }
}

// default export used by some components
export default function useNavigateShim() {
  return (url) => { window.location.href = url }
}