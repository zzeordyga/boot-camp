export function requireAuth(router) {
  const uid = localStorage.getItem("uid");
  if (!uid) router.push("/login");
}

export function requireAdmin(router) {
  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("role");

  if (!uid) router.push("/login");
  else if (role !== "admin") router.push("/user/profile");
}
