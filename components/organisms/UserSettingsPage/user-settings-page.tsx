import React, { useState } from "react";

import Button from "components/atoms/Button/button";
import Checkbox from "components/atoms/Checkbox/checkbox";
import TextInput from "components/atoms/TextInput/text-input";
import Title from "components/atoms/Typography/title";
import Select from "components/atoms/Select/select";
import SelectOption from "components/atoms/Select/select-option";
import LanguagePill from "components/atoms/LanguagePill/LanguagePill";

const UserSettingsPage = () => {
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const interestArray = ["javascript", "python", "rust", "ML", "AI", "react"];

  const handleSelectInterest = (interest: string) => {
    if (selectedInterest.length > 0 && selectedInterest.includes(interest)) {
      setSelectedInterest((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterest((prev) => [...prev, interest]);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 text-sm text-light-slate-11">
        <div>
          <Title className="!text-2xl !text-light-slate-11" level={2}>
            Public profile
          </Title>
          <form className="flex flex-col gap-6 mt-6">
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              label="Name*"
              placeholder="April O'Neil"
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="april@stockgen.com"
              label="Email*"
            />
            <div className="flex flex-col gap-3 ">
              <label className="text-light-slate-11  font-normal">Email Preferences</label>
              <Checkbox value={"true"} title="profile email" label="Display Email On Profile" />
              <Checkbox value={"true"} title="collaboration requests" label="Receive collaboration requests" />
            </div>

            <button className="px-4 w-max py-2  rounded-lg bg-light-slate-4 border border-light-slate-8">
              Update Preferences
            </button>

            {/* Bio section */}
            <div className="flex flex-col gap-2">
              <label className="text-light-slate-11 text-sm font-normal">Bio</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself."
                className="bg-light-slate-4 rounded-lg px-3 py-2 "
              ></textarea>
            </div>
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="https://turtlepower.pizza"
              label="URL"
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11"
              placeholder="@aprilcodes"
              label="Twitter Username"
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="StockGen"
              label="Company"
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="USA"
              label="Location"
            />
            <div>
              <Checkbox value={"true"} title="profile email" label="Display current local time" />
              <span className="ml-7 text-light-slate-9 text-sm font-normal">
                Other users will see the time difference from their local time.
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label>Time zone*</label>
              <Select>
                <SelectOption value="Wat+1">Select time zone</SelectOption>
              </Select>
            </div>
            <Button type="primary">Update profile</Button>
          </form>
        </div>
        <div className="flex flex-col gap-6">
          <Title className="!text-2xl !font-normal !text-light-slate-11" level={2}>
            Interests
          </Title>
          <div className="flex gap-3 w-72 flex-wrap">
            {interestArray.map((topic, index) => (
              <LanguagePill
                onClick={() => handleSelectInterest(topic)}
                classNames={`${selectedInterest.includes(topic) && "bg-light-orange-10 text-white"}`}
                topic={topic}
                key={index}
              />
            ))}
          </div>
          <button className="px-4 w-max py-2  rounded-lg bg-light-slate-4 border border-light-slate-8">
            Update Interest
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
