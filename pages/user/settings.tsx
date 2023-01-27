import UserSettingsPage from "components/organisms/UserSettingsPage/user-settings-page";
import ProfileLayout from "layouts/profile";

const ProfileSettings = (): JSX.Element => {
  return (
    <div className="w-full px-48 py-16">
      <UserSettingsPage />
    </div>
  );
};

ProfileSettings.PageLayout = ProfileLayout;
export default ProfileSettings;
