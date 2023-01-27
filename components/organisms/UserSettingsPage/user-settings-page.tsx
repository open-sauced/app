import React, { useState , useEffect} from "react";

import Button from "components/atoms/Button/button";
import Checkbox from "components/atoms/Checkbox/checkbox";
import TextInput from "components/atoms/TextInput/text-input";
import Title from "components/atoms/Typography/title";
import Select from "components/atoms/Select/select";
import SelectOption from "components/atoms/Select/select-option";
import LanguagePill from "components/atoms/LanguagePill/LanguagePill";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { UpdateUser } from "lib/hooks/update-user";

const UserSettingsPage = () => {
  let error;
  const { user, sessionToken } = useSupabaseAuth();
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const interestArray = ["javascript", "python", "rust", "ML", "AI", "react"];

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(()=>{
    if(user) setEmail(user.email);
  },[user]);

  const handleSelectInterest = (interest: string) => {
    if (selectedInterest.length > 0 && selectedInterest.includes(interest)) {
      setSelectedInterest((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterest((prev) => [...prev, interest]);
    }
  };

  const handleUpdateInterest = async () => {
    const data = await UpdateUser({
      token: sessionToken || "",
      data: { email: user?.user_metadata.email, interests: selectedInterest },
      params: "interests"
    });
    console.log(data);
  };
  const handleUpdateProfile = async () => {
    if(validateEmail(email || "")){
      const data = await UpdateUser({
        token: sessionToken || "",
        data: { email: user?.user_metadata.email, interests: selectedInterest }
      });
      console.log(data);
    }else{
      console.log("email is not valid");
      error = "email is not valid";
    };
   
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-48 gap-4 text-sm text-light-slate-11">
        <div>
          <Title className="!text-2xl !text-light-slate-11" level={2}>
            Public profile
          </Title>
          <form onSubmit={(e)=> e.preventDefault()} className="flex flex-col gap-6 mt-6">
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              label="Name*"
              placeholder="April O'Neil"
              value={user?.user_metadata.full_name}
              disabled
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="april@stockgen.com"
              onChange={(e)=> setEmail(e.target.value)}
              label="Email*"
              value={email}
              
            />

            {/* Bio section */}
            <div className="flex flex-col gap-2">
              <label className="text-light-slate-11 text-sm font-normal">Bio</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself."
                className="bg-light-slate-4 rounded-lg px-3 py-2 "
                readOnly
              ></textarea>
            </div>
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="https://turtlepower.pizza"
              label="URL"
              disabled
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11"
              placeholder="@aprilcodes"
              label="Twitter Username"
              disabled
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="StockGen"
              label="Company"
              disabled
            />
            <TextInput
              classNames="bg-light-slate-4 text-light-slate-11 font-medium"
              placeholder="USA"
              label="Location"
              disabled
            />
            <div>
              <Checkbox disabled value={"true"} title="profile email" label="Display current local time" />
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
            <Button onClick={handleUpdateProfile} type="primary">Update profile</Button>
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
                  classNames={`${selectedInterest.includes(topic) && "bg-light-orange-10 text-white"}`}
                  topic={topic}
                  key={index}
                />
              ))}
            </div>
            <button className="px-4 w-max py-2  rounded-lg bg-light-slate-4 border border-light-slate-8">
              Update Interests
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 ">
              <label className="text-light-slate-11 text-2xl  font-normal">Email Preferences</label>
              <Checkbox value={"true"} title="profile email" label="Display Email On Profile" />
              <Checkbox value={"true"} title="collaboration requests" label="Receive collaboration requests" />
            </div>
            <button
              onClick={handleUpdateInterest}
              className="px-4 w-max py-2  rounded-lg bg-light-slate-4 border border-light-slate-8"
            >
              Update Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
