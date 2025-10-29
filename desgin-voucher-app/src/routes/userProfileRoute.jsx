import { lazy } from "react";
const UserProfilePage = lazy(() =>
  import("../features/user-profile/pages/UserProfilePage")
);
const userProfileRoute = [
  {
    path: "user-profile",
    element: <UserProfilePage />,
  }
];

export default userProfileRoute;
