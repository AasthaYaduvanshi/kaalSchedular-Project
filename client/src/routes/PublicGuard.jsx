import { Navigate } from "react-router-dom"
import useAuth from "@hooks/useAuth"

export default function PublicGuard({ children }) {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated) {
    const useUrl = user?.role === "admin" ? "admin/home" : "user/home"
    return <Navigate to={useUrl} />
  }

  return <>{children}</>
}
