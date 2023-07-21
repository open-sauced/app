import { useState, useEffect, useRef } from "react";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { User } from "@supabase/supabase-js";

import Button from "components/atoms/Button/button";
import Checkbox from "components/atoms/Checkbox/checkbox";
import TextInput from "components/atoms/TextInput/text-input";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";
import LanguagePill from "components/atoms/LanguagePill/LanguagePill";
import StripeCheckoutButton from "components/organisms/StripeCheckoutButton/stripe-checkout-button";

import { updateUser, UpdateUserPayload } from "lib/hooks/update-user";

import useSession from "lib/hooks/useSession";
import { validateEmail } from "lib/utils/validate-email";
import { timezones } from "lib/utils/timezones";
import { updateEmailPreferences } from "lib/hooks/updateEmailPreference";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { getInterestOptions } from "lib/utils/getInterestOptions";
import { useToast } from "lib/hooks/useToast";
import { validateTwitterUsername } from "lib/utils/validate-twitter-username";

interface userSettingsPageProps {
  user: User | null;
}

type EmailPreferenceType = {
  display_email?: boolean;
  receive_collaboration?: boolean;
};
const UserSettingsPage = ({ user }: userSettingsPageProps) => {
  const { data: insightsUser, mutate } = useFetchUser(user?.user_metadata.user_name, {
    revalidateOnFocus: false,
  });

  const { hasReports } = useSession();

  const { toast } = useToast();

  const [updating, setUpdating] = useState({
    profile: false,
    emailPreferences: false,
    interests: false,
  });
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [displayLocalTime, setDisplayLocalTime] = useState(false);
  const [timezone, setTimezone] = useState("");
  const [userInfo, setUserInfo] = useState<DbUser>();
  const [email, setEmail] = useState<string | undefined>("");
  const [emailPreference, setEmailPreference] = useState<EmailPreferenceType>({
    // eslint-disable-next-line camelcase
    display_email: false,
    // eslint-disable-next-line camelcase
    receive_collaboration: false,
  });
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const interestArray = getInterestOptions();

  const { session } = useSession(true);

  useEffect(() => {
    async function fetchAuthSession() {
      const response = session;
      if (response && !userInfo) {
        setUserInfo(response);
        formRef.current!.nameInput.value = response.name;
        setEmail(response.email);
        setDisplayLocalTime(response.displayLocalTime);
        formRef.current!.bio.value = response.bio;
        formRef.current!.url.value = response.url;
        formRef.current!.twitter_username.value = response.twitter_username;
        formRef.current!.company.value = response.company;
        formRef.current!.location.value = response.location;
        formRef.current!.github_sponsors_url.value = response.github_sponsors_url;
        formRef.current!.linkedin_url.value = response.linkedin_url;
        formRef.current!.discord_url.value = response.discord_url;
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
        receive_collaboration: insightsUser?.receive_collaboration,
      });
      setSelectedInterest(insightsUser?.interests?.split(","));
      setDisplayLocalTime(insightsUser?.display_local_time);
      setTimezone(insightsUser?.timezone || "");
    }
  }, [insightsUser]);

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (validateEmail(value)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleTwitterUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity(validateTwitterUsername(event.target.value).message);
    event.target.reportValidity();
  };

  const handleSelectInterest = (interest: string) => {
    if (selectedInterest.length > 0 && selectedInterest.includes(interest)) {
      setSelectedInterest((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterest((prev) => [...prev, interest]);
    }
  };

  const handleUpdateEmailPreference = async () => {
    setUpdating((prev) => ({ ...prev, emailPreferences: true }));

    const data = await updateEmailPreferences({ ...emailPreference });
    if (data) {
      toast({ description: "Updated successfully", variant: "success" });
    } else {
      toast({ description: "An error occured!", variant: "danger" });
    }

    setUpdating((prev) => ({ ...prev, emailPreferences: false }));
  };

  const handleUpdateInterest = async () => {
    setUpdating((prev) => ({ ...prev, interests: true }));

    const data = await updateUser({
      data: { interests: selectedInterest },
      params: "interests",
    });

    setUpdating((prev) => ({ ...prev, interests: false }));

    if (data) {
      mutate();
      toast({ description: "Updated successfully", variant: "success" });
    } else {
      toast({ description: "An error occured!", variant: "danger" });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating((prev) => ({ ...prev, profile: true }));
    const payload: UpdateUserPayload = {
      name: formRef.current!.nameInput.value,
      email,
      bio: formRef.current!.bio.value,
      // eslint-disable-next-line camelcase
      twitter_username: formRef.current!.twitter_username.value,
      company: formRef.current!.company.value,
      location: formRef.current!.location.value,
      // eslint-disable-next-line camelcase
      display_local_time: displayLocalTime,
      timezone,
      // eslint-disable-next-line camelcase
      github_sponsors_url:
        formRef.current!.github_sponsors_url.value !== "" ? formRef.current!.github_sponsors_url.value : undefined,
      // eslint-disable-next-line camelcase
      linkedin_url: formRef.current!.linkedin_url.value !== "" ? formRef.current!.linkedin_url.value : undefined,
    };
    if (formRef.current?.url.value) {
      payload.url = formRef.current!.url.value;
    }

    const data = await updateUser({
      data: payload,
    });

    setUpdating((prev) => ({ ...prev, profile: false }));

    if (data) {
      mutate();
      toast({ description: "Updated successfully", variant: "success" });
    } else {
      toast({ description: "An error occured!", variant: "danger" });
    }
  };

  return (
    <div className="container mx-auto md:px-16">
      <div className="flex flex-col gap-4 text-sm md:flex-row md:gap-42 lg:gap-48 text-light-slate-11">
        <div>
          <Title className="!text-2xl !text-light-slate-11" level={2}>
            Public profile
          </Title>
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6 mt-6" ref={formRef}>
            <TextInput
              className="font-medium bg-light-slate-4 text-light-slate-11"
              label="Name*"
              placeholder="April O'Neil"
              required
              name="nameInput"
            />
            <TextInput
              className="font-medium bg-light-slate-4 text-light-slate-11"
              placeholder="april@stockgen.com"
              handleChange={handleEmailChange}
              label="Email*"
              value={email}
              required
            />

            {/* Bio section */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-normal text-light-slate-11">Bio</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself."
                className="px-3 py-2 rounded-lg bg-light-slate-4 disabled:cursor-not-allowed "
                name="bio"
              ></textarea>
            </div>
            <TextInput
              className="font-medium bg-light-slate-4 text-light-slate-11"
              placeholder="https://opensauced.pizza"
              label="URL"
              pattern="http[s]?://.*\..{2,}"
              name="url"
            />
            <TextInput
              className="font-medium bg-light-slate-4 text-light-slate-11"
              placeholder="https://github.com/sponsors/open-sauced"
              label="GitHub Sponsors URL"
              pattern="http[s]?://.*\..{2,}"
              name="github_sponsors_url"
            />
            <TextInput
              className="font-medium bg-light-slate-4 text-light-slate-11"
              placeholder="https://www.linkedin.com/in/brianldouglas"
              label="LinkedIn URL"
              pattern="http[s]?://.*\..{2,}"
              name="linkedin_url"
            />
            <TextInput
              className="bg-light-slate-4 text-light-slate-11"
              placeholder="saucedopen"
              label="Twitter Username"
              onChange={handleTwitterUsernameChange}
              name="twitter_username"
            />
            <TextInput
              className="font-medium bg-light-slate-4 text-light-slate-11"
              placeholder="OpenSauced"
              label="Company"
              name="company"
            />
            <TextInput
              className="font-medium bg-light-slate-4 text-light-slate-11"
              placeholder="USA"
              label="Location"
              name="location"
            />
            <div>
              <Checkbox
                checked={displayLocalTime}
                title="profile email"
                label="Display current local time on profile"
                onCheckedChange={(state) => setDisplayLocalTime(state as boolean)}
              />
              <span className="text-sm font-normal ml-7 text-light-slate-9">
                Other users will see the time difference from their local time.
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label>Time zone*</label>
              <Select onValueChange={(value) => setTimezone(value)} value={timezone} required>
                <SelectTrigger
                  selectIcon={
                    <div className="relative pr-4">
                      <RiArrowUpSLine size={16} className="absolute -top-3" />
                      <RiArrowDownSLine size={16} className="absolute -bottom-3" />
                    </div>
                  }
                >
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>

                <SelectContent position="item-aligned" className="bg-white">
                  {timezones.map((timezone, index) => (
                    <SelectItem key={`timezone_${index}`} value={timezone.value}>
                      {timezone.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-max"
              disabled={!isValidEmail || updating.profile}
              variant="primary"
              loading={updating.profile}
            >
              Update profile
            </Button>
          </form>
        </div>
        <div className="flex flex-col-reverse gap-6 md:flex-col">
          <div className="flex flex-col gap-6">
            <Title className="!text-2xl !font-normal !text-light-slate-11" level={2}>
              Interests
            </Title>
            <div className="flex flex-wrap gap-3 w-72">
              {interestArray.map((topic, index) => (
                <LanguagePill
                  onClick={() => handleSelectInterest(topic)}
                  classNames={`${(selectedInterest || []).includes(topic) && "bg-light-orange-10 !text-white"}`}
                  topic={topic}
                  key={index}
                />
              ))}
            </div>
            <Button
              variant="default"
              disabled={selectedInterest.length === 0 || updating.interests}
              onClick={handleUpdateInterest}
              className="w-max"
              loading={updating.interests}
            >
              Update Interests
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 ">
              <label className="text-2xl font-normal text-light-slate-11">Email Preferences</label>
              <Checkbox
                // eslint-disable-next-line camelcase
                onCheckedChange={() => setEmailPreference((prev) => ({ ...prev, display_email: !prev.display_email }))}
                checked={emailPreference.display_email}
                title="profile email"
                label="Display email on profile"
              />
              <Checkbox
                onCheckedChange={() =>
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
              variant="default"
              className="px-4 py-2 w-max bg-light-slate-4 "
              disabled={updating.emailPreferences}
              loading={updating.emailPreferences}
            >
              Update Preferences
            </Button>
          </div>
          {!hasReports && (
            <div className="flex flex-col gap-6 order-first md:order-last">
              <div className="flex flex-col gap-3">
                <label className="text-2xl font-normal text-light-slate-11">Upgrade Access</label>
                <div className="w-full sm:max-w-80">
                  <Text>Upgrade to a subscription to gain access to generate custom reports!</Text>
                </div>
              </div>
              <StripeCheckoutButton variant="primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
