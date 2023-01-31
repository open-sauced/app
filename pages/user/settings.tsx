import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import UserSettingsPage from "components/organisms/UserSettingsPage/user-settings-page";
import ProfileLayout from "layouts/profile";

const ProfileSettings = (): JSX.Element => {
  const { sessionToken, user } = useSupabaseAuth();

  return (
    <>
      {sessionToken ? (
        <div className="w-full px-4 md:px-16 lg:px-48 py-16">
          <UserSettingsPage sessionToken={sessionToken} user={user} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

ProfileSettings.PageLayout = ProfileLayout;
export default ProfileSettings;
