import BaseLayout from "@components/layouts/base"
import PublicGuard from "@routes/PublicGuard"
import AccountBoxLogin from "@pages/auth/AccountBoxLogin"
import AccountBoxSignup from "@pages/auth/AccountBoxSignup"
import Profile from "@pages/admin/Profile"
const PublicRoutes = {
  element: (
    <PublicGuard>
      <BaseLayout />
    </PublicGuard>
  ),
  children: [
    {
      path: "/",
      element: <Profile />,
    },
    {
      path: "/login",
      element: <AccountBoxLogin />,
    },
    {
      path: "/signup",
      element: (
        <PublicGuard>
          <AccountBoxSignup />
        </PublicGuard>
      ),
    },
  ],
}

export default PublicRoutes
