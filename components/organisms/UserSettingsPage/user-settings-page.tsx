import { useState, useEffect, useRef } from "react";

import { User } from "@supabase/supabase-js";

import Button from "components/atoms/Button/button";
import Checkbox from "components/atoms/Checkbox/checkbox";
import TextInput from "components/atoms/TextInput/text-input";
import Title from "components/atoms/Typography/title";
import Select from "components/atoms/Select/select";
import SelectOption from "components/atoms/Select/select-option";
import LanguagePill from "components/atoms/LanguagePill/LanguagePill";

import { updateUser, updateUserPayload } from "lib/hooks/update-user";
import { ToastTrigger } from "lib/utils/toast-trigger";
import { authSession } from "lib/hooks/authSession";
import { validateEmail } from "lib/utils/validate-email";
import { timezones } from "lib/utils/timezones";
import { updateEmailPreferences } from "lib/hooks/updateEmailPreference";
import { useFetchUser } from "lib/hooks/useFetchUser";

interface userSettingsPageProps {
  user: User | null;
}

type EmailPreferenceType = {
  display_email?: boolean;
  receive_collaboration?: boolean;
};
const UserSettingsPage = ({ user }: userSettingsPageProps) => {
  const { data: insightsUser } = useFetchUser(user?.user_metadata.user_name);

  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [displayLocalTime, setDisplayLocalTime] = useState(false);
  const [timezone, setTimezone] = useState("");
  const [userInfo, setUserInfo] = useState<DbUser>();
  const [email, setEmail] = useState<string | undefined>("");
  const [emailPreference, setEmailPreference] = useState<EmailPreferenceType>({
    // eslint-disable-next-line camelcase
    display_email: false,
    // eslint-disable-next-line camelcase
    receive_collaboration: false
  });
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const interestArray = ["javascript", "python", "rust", "ML", "AI", "react"];

  useEffect(() => {
    async function fetchAuthSession() {
      const response = await authSession();
      if (response !== false) {
        setUserInfo(response);
        formRef.current!.nameInput.value = response.name;
        setEmail(response.email);
        formRef.current!.bio.value = response.bio;
        formRef.current!.url.value = response.url;
        formRef.current!.twitter_username.value = response.twitter_username;
        formRef.current!.company.value = response.company;
        formRef.current!.location.value = response.location;
      }
    }
    fetchAuthSession();
  }, [user]);

  useEffect(() => {
    if (insightsUser) {
      setEmailPreference({
        // eslint-disable-next-line camelcase
        display_email: insightsUser?.display_email,
        // eslint-disable-next-line camelcase
        receive_collaboration: insightsUser?.receive_collaboration
      });
      setSelectedInterest(insightsUser?.interests?.split(","));
      setDisplayLocalTime(insightsUser?.display_local_time);
      setTimezone(insightsUser?.timezone || "");
    }
  }, [insightsUser]);

  const handleSelectInterest = (interest: string) => {
    if (selectedInterest.length > 0 && selectedInterest.includes(interest)) {
      setSelectedInterest((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterest((prev) => [...prev, interest]);
    }
  };

  const handleUpdateEmailPreference = async () => {
    const data = await updateEmailPreferences({ ...emailPreference });
    if (data) {
      ToastTrigger({ message: "Updated successfully", type: "success" });
    } else {
      ToastTrigger({ message: "An error occured!!!", type: "error" });
    }
  };

  const handleUpdateInterest = async () => {
    const data = await updateUser({
      data: { interests: selectedInterest },
      params: "interests"
    });
    if (data) {
      ToastTrigger({ message: "Updated successfully", type: "success" });
    } else {
      ToastTrigger({ message: "An error occured!!!", type: "error" });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: updateUserPayload = {
      name: formRef.current!.nameInput.value,
      email,
      bio: formRef.current!.bio.value,
      // eslint-disable-next-line camelcase
      twitter_username: formRef.current!.twitter_username.value,
      company: formRef.current!.company.value,
      location: formRef.current!.location.value,
      // eslint-disable-next-line camelcase
      display_local_time: displayLocalTime,
      timezone
    };
    if(formRef.current?.url.value) {
      payload.url = formRef.current!.url.value;
    }

    const data = await updateUser({
      data: payload
    });

    if (data) {
      ToastTrigger({ message: "Updated successfully", type: "success" });
    } else {
      ToastTrigger({ message: "An error occured!!!", type: "error" });
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-48 gap-4 text-sm text-light-slate-11">
        <div>
          <Title className="!text-2xl !text-light-slate-11" level={2}>
            Public profile
          </Title>
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6 mt-6" ref={formRef}>
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              label="Name*"
              placeholder="April O'Neil"
              required
              name="nameInput"
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="april@stockgen.com"
              onChange={(e) => {
                setEmail(e.target.value);
                if (validateEmail(e.target.value)) {
                  setIsValidEmail(true);
                } else {
                  setIsValidEmail(false);
                }
              }}
              label="Email*"
              value={email}
              required
            />

            {/* Bio section */}
            <div className="flex flex-col gap-2">
              <label className="text-light-slate-11 text-sm font-normal">Bio</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself."
                className="bg-light-slate-4 rounded-lg px-3 py-2 disabled:cursor-not-allowed "
                name="bio"
              ></textarea>
            </div>
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="https://opensauced.pizza"
              label="URL"
              pattern="http[s]?://.*\..{2,}"
              name="url"
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11"
              placeholder="@saucedopen"
              label="Twitter Username"
              name="twitter_username"
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="OpenSauced"
              label="Company"
              name="company"
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="USA"
              label="Location"
              name="location"
            />
            <div>
              <Checkbox
                checked={displayLocalTime}
                title="profile email"
                label="Display current local time on profile"
                onChange={e => setDisplayLocalTime(e.target.checked)}
              />
              <span className="ml-7 text-light-slate-9 text-sm font-normal">
                Other users will see the time difference from their local time.
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label>Time zone*</label>
              <Select value={timezone} onChange={e => setTimezone(e.target.value)} required>
                <SelectOption value="">Select time zone</SelectOption>
                {timezones.map((timezone, index) => (
                  <SelectOption key={index} value={timezone.value}>
                    {timezone.text}
                  </SelectOption>
                ))}
              </Select>
            </div>
            <Button disabled={!isValidEmail} type="primary">
              Update profile
            </Button>
          </form>
        </div>
        <div className="flex flex-col-reverse md:flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Title className="!text-2xl !font-normal !text-light-slate-11" level={2}>
              Interests
            </Title>
            <div className="flex gap-3 w-72 flex-wrap">
              {interestArray.map((topic, index) => (
                <LanguagePill
                  onClick={() => handleSelectInterest(topic)}
                  classNames={`${(selectedInterest || []).includes(topic) && "bg-light-orange-10 text-white"}`}
                  topic={topic}
                  key={index}
                />
              ))}
            </div>
            <Button
              type="default"
              disabled={selectedInterest.length === 0}
              onClick={handleUpdateInterest}
              className="!px-4 !text-light-slate-11 !py-2  !bg-light-slate-4"
            >
              Update Interests
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 ">
              <label className="text-light-slate-11 text-2xl  font-normal">Email Preferences</label>
              <Checkbox
                // eslint-disable-next-line camelcase
                onChange={() => setEmailPreference((prev) => ({ ...prev, display_email: !prev.display_email }))}
                checked={emailPreference.display_email}
                title="profile email"
                label="Display email on profile"
              />
              <Checkbox
                onChange={() =>
                  // eslint-disable-next-line camelcase
                  setEmailPreference((prev) => ({ ...prev, receive_collaboration: !prev.receive_collaboration }))
                }
                checked={emailPreference.receive_collaboration}
                title="collaboration requests"
                label="Receive collaboration requests"
              />
            </div>
            <Button
              onClick={handleUpdateEmailPreference}
              type="default"
              className="!px-4 w-max !py-2  !bg-light-slate-4 "
            >
              Update Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
