import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import SaucedLogo from "img/fallbackImageColor.svg";

const NewsletterForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail) {
      setErrorMsg("Please enter a valid email");
      return;
    }

    setLoading(true);

    // TODO: Add API call to subscribe user
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
    }, 3000);
  };

  const handleChange = (value: string) => {
    setEmail(value);
    const isValidEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setIsValidEmail(!!isValidEmail);
  };

  useEffect(() => {
    if (isValidEmail) {
      setErrorMsg("");
    }
  }, [isValidEmail]);
  return (
    <>
      {isSubscribed ? (
        <div className="flex items-center justify-center gap-3 px-4 py-6 border rounded-lg h-44 bg-light-slate-1 w-80">
          <div className="text-2xl text-center ">
            <Image className="mx-auto" src={SaucedLogo} alt="Sauced Logo" />
            <p>You’re Subscribed!</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4 py-6 border rounded-lg w-max">
          <div className="w-64 space-y-1">
            <h2 className="text-lg">Subscribe to our newsletter</h2>
            <p className="text-sm text-light-slate-11">Stay up to date with the latest OpenSauced news and trends!</p>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between gap-1 ">
              <TextInput
                handleChange={(value) => handleChange(value)}
                state={isValidEmail ? "valid" : "invalid"}
                value={email}
                className="w-32 text-sm focus:outline-none"
                type="text"
                placeholder="Email"
              />
              <Button
                loading={loading}
                className="inline-block py-1 border-light-orange-7 text-light-orange-10"
                type="submit"
                variant="text"
              >
                Subscribe
              </Button>
            </div>
            {errorMsg && (
              <p className="flex items-center gap-1 mt-2 text-xs font-light text-red-500">
                <AiFillCloseCircle onClick={() => setErrorMsg("")} className="text-sm cursor-pointer" /> {errorMsg}
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default NewsletterForm;
