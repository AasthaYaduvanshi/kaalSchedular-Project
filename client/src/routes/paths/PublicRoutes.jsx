import BaseLayout from "@components/layouts/base"
import PublicGuard from "@routes/PublicGuard"
import AccountBox from "@pages/auth/AccountBox"
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
      element: <AccountBox />,
    },
    {
      path: "/signup",
      element: (
        <PublicGuard>
          <AccountBox />
        </PublicGuard>
      ),
    },
  ],
}

export default PublicRoutes
