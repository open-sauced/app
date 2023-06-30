import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { set } from "date-fns";
import React, { useState } from "react";
import SaucedLogo from "img/fallbackImageColor.svg";
import Image from "next/image";

const NewsletterForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    setIsValidEmail(!!isValidEmail);
    if (!isValidEmail) return;
    setLoading(true);

    // TODO: Add API call to subscribe user
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
    }, 3000);
  };
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-32 text-sm focus:outline-none"
                type="email"
                placeholder="Email"
                required
              />
              <Button
                loading={loading}
                className="py-1 border-light-orange-7 text-light-orange-10"
                type="submit"
                variant="text"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewsletterForm;
