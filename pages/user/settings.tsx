import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import UserSettingsPage from "components/organisms/UserSettingsPage/user-settings-page";
import ProfileLayout from "layouts/profile";
import { WithPageLayout } from "interfaces/with-page-layout";

const ProfileSettings: WithPageLayout = () => {
  const { user } = useSupabaseAuth();

  return (
    <>
      {user ? (
        <div className="w-full px-4 py-16 md:px-16 lg:px-48">
          <UserSettingsPage user={user} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

ProfileSettings.PageLayout = ProfileLayout;
ProfileSettings.isPrivateRoute = true;
ProfileSettings.SEO = {
  title: "Account Settings | OpenSauced Insights",
  noindex: true,
};
export default ProfileSettings;
