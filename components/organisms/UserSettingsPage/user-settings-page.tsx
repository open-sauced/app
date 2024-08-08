import { useState, useEffect, useRef } from "react";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { User } from "@supabase/supabase-js";

import { usePostHog } from "posthog-js/react";
import Button from "components/shared/Button/button";
import Checkbox from "components/atoms/Checkbox/checkbox";
import TextInput from "components/atoms/TextInput/text-input";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";

import { updateUser, UpdateUserPayload } from "lib/hooks/update-user";

import useSession from "lib/hooks/useSession";
import { validateEmail } from "lib/utils/validate-email";
import { timezones } from "lib/utils/timezones";
import { updateEmailPreferences } from "lib/hooks/updateEmailPreference";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { getInterestOptions } from "lib/utils/getInterestOptions";
import { useToast } from "lib/hooks/useToast";
import { validateTwitterUsername } from "lib/utils/validate-twitter-username";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/molecules/Dialog/dialog";
import { LanguageSwitch } from "components/shared/LanguageSwitch/language-switch";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import CouponForm from "./coupon-form";
import DeveloperPackForm from "./developer-pack-form";

interface UserSettingsPageProps {
  user: User | null;
}

type EmailPreferenceType = {
  display_email?: boolean;
  receive_collaboration?: boolean;
  receive_product_updates?: boolean;
};

interface DeleteAccountModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
}

const DeleteAccountModal = ({ open, setOpen, onDelete }: DeleteAccountModalProps) => {
  const [confirmText, setConfirmText] = useState("");
  const disabled = confirmText !== "DELETE";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle className="text-left">Delete Account</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Text>Are you sure you want to delete your account?</Text>
          <Text>
            Type <span className="font-bold text-light-red-10">DELETE</span> in all caps to confirm
          </Text>
          <TextInput
            onChange={(e) => {
              setConfirmText(e.target.value);
            }}
          />
          <div className="flex gap-4">
            <Button type="submit" variant="destructive" onClick={onDelete} disabled={disabled}>
              Delete
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const UserSettingsPage = ({ user }: UserSettingsPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteFormRef = useRef<HTMLFormElement>(null);
  const { data: insightsUser, mutate } = useFetchUser(user?.user_metadata.user_name, {
    revalidateOnFocus: false,
  });

  const { session } = useSession(true);
  const { providerToken } = useSupabaseAuth();

  const { toast } = useToast();
  const posthog = usePostHog();

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
  const [bio, setBio] = useState("");
  const [emailPreference, setEmailPreference] = useState<EmailPreferenceType>({
    display_email: false,
    receive_collaboration: false,
    receive_product_updates: false,
  });
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const interestArray = getInterestOptions();
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const response = session;

    if (response && !userInfo) {
      setUserInfo(response);
      formRef.current!.nameInput.value = response.name;
      setEmail(response.email);
      setDisplayLocalTime(response.display_local_time);
      setCoupon(response.coupon_code);
      setBio(response.bio);
      formRef.current!.url.value = response.url;
      formRef.current!.twitter_username.value = response.twitter_username;
      formRef.current!.company.value = response.company;
      formRef.current!.location.value = response.location;
      formRef.current!.github_sponsors_url.value = response.github_sponsors_url;
      formRef.current!.linkedin_url.value = response.linkedin_url;
      formRef.current!.discord_url.value = response.discord_url;
    }
  }, [user, session, userInfo]);

  useEffect(() => {
    if (insightsUser) {
      setEmailPreference({
        display_email: insightsUser?.display_email,
        receive_collaboration: insightsUser?.receive_collaboration,
        receive_product_updates: insightsUser?.receive_product_updates,
      });
      setSelectedInterest(insightsUser?.interests?.split(",") || []);
      setDisplayLocalTime(insightsUser?.display_local_time);
      setTimezone(insightsUser?.timezone || "");
    }
  }, [insightsUser]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const handleTwitterUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity(validateTwitterUsername(event.target.value).message);
    event.target.reportValidity();
  };

  const handleValidateDiscordUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^https:\/\/discord(app)?\.com\/users\/\d{17,}$/);
    event.target.setCustomValidity(regex.test(event.target.value) ? "" : "Invalid Discord URL");
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
      toast({ description: "An error occurred!", variant: "danger" });
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
      toast({ description: "An error occurred!", variant: "danger" });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating((prev) => ({ ...prev, profile: true }));
    const payload: UpdateUserPayload = {
      name: formRef.current!.nameInput.value,
      email,
      bio,
      twitter_username: formRef.current!.twitter_username.value,
      company: formRef.current!.company.value,
      location: formRef.current!.location.value,
      display_local_time: displayLocalTime,
      timezone,
      github_sponsors_url:
        formRef.current!.github_sponsors_url.value !== "" ? formRef.current!.github_sponsors_url.value : undefined,
      linkedin_url: formRef.current!.linkedin_url.value !== "" ? formRef.current!.linkedin_url.value : undefined,
      discord_url: formRef.current!.discord_url.value !== "" ? formRef.current!.discord_url.value : undefined,
    };
    if (formRef.current?.url.value) {
      payload.url = formRef.current!.url.value;
    }

    posthog.capture("Updated user profile", {
      profile: user?.user_metadata.user_name,
    });

    const data = await updateUser({
      data: payload,
    });

    setUpdating((prev) => ({ ...prev, profile: false }));

    if (data) {
      mutate();
      toast({ description: "Updated successfully", variant: "success" });
    } else {
      toast({ description: "An error occurred!", variant: "danger" });
    }
  };

  return (
    <div className="container mx-auto md:px-16">
      <div className="flex flex-col gap-4 text-sm md:flex-row md:gap-42 lg:gap-48">
        <div>
          <Title className="!text-2xl" level={2}>
            Public profile
          </Title>
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6 mt-6" ref={formRef}>
            <TextInput
              className="bg-light-slate-4"
              label="Name*"
              placeholder="April O'Neil"
              required
              name="nameInput"
            />
            <TextInput
              className="bg-light-slate-4"
              placeholder="april@stockgen.com"
              handleChange={handleEmailChange}
              label="Email*"
              value={email}
              required
            />

            {/* Bio section */}
            <div className="flex flex-col gap-2">
              <label className="flex flex-col w-full text-sm">
                Bio
                <div className="flex-1 px-2 shadow-input border transition rounded-lg py-1 flex items-center bg-light-slate-4 disabled:cursor-not-allowed focus-within:border-light-orange-9">
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself."
                    name="bio"
                    className="w-full focus:outline-none placeholder:font-normal placeholder-slate-400 bg-inherit"
                    value={bio}
                    maxLength={255}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
              </label>

              <p aria-live="polite" className="text-xs flex gap-1">
                <span>{bio?.length}/255</span>
                {bio?.length === 255 ? <span>(max characters reached)</span> : null}
              </p>
            </div>
            <TextInput
              className="bg-light-slate-4"
              placeholder="https://opensauced.pizza"
              label="URL (Personal website, portfolio, or any page that showcases your work or interests)"
              pattern="http[s]?://.*\..{2,}"
              name="url"
            />
            <TextInput
              className="bg-light-slate-4"
              placeholder="https://github.com/sponsors/open-sauced"
              label="GitHub Sponsors URL"
              pattern="http[s]?://.*\..{2,}"
              name="github_sponsors_url"
            />
            <TextInput
              className="bg-light-slate-4"
              placeholder="https://www.linkedin.com/in/brianldouglas"
              label="LinkedIn URL"
              pattern="http[s]?://.*\..{2,}"
              name="linkedin_url"
            />
            <TextInput
              className="bg-light-slate-4"
              placeholder="https://discord.com/users/832877193112762362"
              label="Discord URL"
              onChange={handleValidateDiscordUrl}
              name="discord_url"
            />
            <TextInput
              className="bg-light-slate-4"
              placeholder="saucedopen"
              label="Twitter Username"
              onChange={handleTwitterUsernameChange}
              name="twitter_username"
            />
            <TextInput className="bg-light-slate-4" placeholder="OpenSauced" label="Company" name="company" />
            <TextInput className="bg-light-slate-4" placeholder="USA" label="Location" name="location" />
            <div>
              <Checkbox
                checked={displayLocalTime}
                title="profile email"
                label="Display current local time on profile"
                onCheckedChange={(state) => setDisplayLocalTime(state as boolean)}
              />
              <span className="text-sm font-normal ml-7">
                Other users will see the time difference from their local time.
              </span>
            </div>

            <div id="upgrade" className="flex flex-col gap-2">
              <label className="flex flex-col w-full gap-2">
                Time zone*
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
              </label>
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
            <Title className="!text-2xl !font-normal" level={2}>
              Interests
            </Title>
            <div className="flex flex-wrap gap-3 w-72">
              {interestArray.map((topic, index) => (
                <LanguageSwitch
                  checked={selectedInterest.includes(topic)}
                  onClick={() => handleSelectInterest(topic)}
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
            <div className="flex flex-col gap-3">
              <label className="text-2xl font-normal">Email Preferences</label>
              <Checkbox
                onCheckedChange={() => setEmailPreference((prev) => ({ ...prev, display_email: !prev.display_email }))}
                checked={emailPreference.display_email}
                title="profile email"
                label="Display email on profile"
              />
              <Checkbox
                onCheckedChange={() =>
                  setEmailPreference((prev) => ({ ...prev, receive_collaboration: !prev.receive_collaboration }))
                }
                checked={emailPreference.receive_collaboration}
                title="connections requests"
                label="Receive connections requests"
              />
              <Checkbox
                onCheckedChange={() =>
                  setEmailPreference((prev) => ({ ...prev, receive_product_updates: !prev.receive_product_updates }))
                }
                checked={emailPreference.receive_product_updates}
                title="Receive Product Updates"
                label="Receive product updates"
              />
            </div>
            <Button
              onClick={handleUpdateEmailPreference}
              variant="default"
              className="px-4 py-2 w-max bg-light-slate-4"
              disabled={updating.emailPreferences}
              loading={updating.emailPreferences}
            >
              Update Preferences
            </Button>
          </div>
          {userInfo && (
            <>
              <div>
                {!coupon ? (
                  <div className="flex flex-col order-first gap-6 md:order-last">
                    <div className="flex flex-col gap-3">
                      <label className="text-2xl font-normal">Developer Pack</label>
                      <div className="w-full sm:max-w-80">
                        <Text>Verify your developer pack eligibilty to get an upgrade!</Text>
                      </div>
                    </div>
                    <DeveloperPackForm
                      providerToken={providerToken}
                      refreshUser={() => {
                        mutate();
                        setCoupon("verified");
                      }}
                    />

                    {!coupon && <CouponForm refreshUser={mutate} />}
                  </div>
                ) : null}
              </div>
              <form
                name="delete-account"
                action="/api/delete-account"
                method="POST"
                className="flex flex-col order-first gap-6 md:order-last p-6 rounded-2xl bg-light-slate-4"
                ref={deleteFormRef}
                onSubmit={(e) => {
                  setIsModalOpen(true);
                  e.preventDefault();
                }}
              >
                <div className="flex flex-col gap-3">
                  <label className="text-2xl font-normal">Delete Account</label>
                  <div className="w-full md:w-96">
                    <Text>
                      Please note that account deletion is irreversible. Proceed only if you are certain about this
                      action.
                    </Text>
                  </div>
                </div>
                <Button type="submit" rel="noopener noreferrer" target="_blank" variant="destructive" className="w-max">
                  Delete Account
                </Button>
                <DeleteAccountModal
                  open={isModalOpen}
                  setOpen={setIsModalOpen}
                  onDelete={() => {
                    setIsModalOpen(false);
                    deleteFormRef.current?.submit();
                  }}
                />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
