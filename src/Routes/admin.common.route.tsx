import EditProfile from "../pages/Common/EditProfile";
import Profile from "../pages/Common/Profile";
// import AboutUs from "../pages/Common/settings/AboutUs";
import ChangePassword from "../pages/Common/settings/ChangePassword";
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
// import Support from "../pages/Common/settings/Support";
import TermsOfService from "../pages/Common/settings/TermsOfService";
import profileLogo from "/images/dashboard-logo/profile.svg";
import settingLogo from "/images/dashboard-logo/setting.svg";

export const adminCommonPaths = [
  {
    path: "profile",
    element: <Profile />,
    key: "profile",
    name: "Profile",
    icon: profileLogo,
  },
  {
    path: "profile/edit-profile",
    element: <EditProfile />,
    key: "edit-profile",
  },
  {
    key: "setting",
    name: "Setting",
    icon: settingLogo,
    children: [
      {
        key: "change-password",
        path: "settings/change-password",
        element: <ChangePassword />,
        name: "Change Password",
      },
      {
        key: "privacy-policy",
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
        name: "Privacy Policy",
      },
      {
        key: "terms-of-service",
        path: "settings/terms-of-service",
        element: <TermsOfService />,
        name: "Terms of Service",
      },
      // {
      //   key: "about-us",
      //   path: "settings/about-us",
      //   element: <AboutUs />,
      //   name: "About Us",
      // },
      // {
      //   key: "support",
      //   path: "settings/support",
      //   element: <Support />,
      //   name: "Support",
      // },
    ],
  },
];
