import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";
import clsx from "clsx";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import SaucedLogo from "img/fallbackImageColor.svg";
import { validateEmail } from "lib/utils/validate-email";

/*
 * cursed: this form needs a refactor as it won't actually subscribe the user to
 * the newsletter while still returning success. This is related to breaking changes
 * with how Next works with Netlify forms: https://docs.netlify.com/frameworks/next-js/overview/#breaking-changes
 *
 * For now, use NewsletterLink which is a simple link off to the ghost.io blog directly.
 *
 * related to: https://github.com/open-sauced/app/issues/3796
 */

const NewsletterForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail) {
      setErrorMsg("Please enter a valid email");
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form) as unknown as string;

    setLoading(true);

    try {
      const res = await fetch("/__newsletter.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (res.ok) {
        setIsSubscribed(true);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validateEmail(email));
  };

  useEffect(() => {
    if (isValidEmail) {
      setErrorMsg("");
    }
  }, [isValidEmail]);
  return (
    <>
      {isSubscribed ? (
        <div className="flex items-center justify-center w-full gap-3 p-6 pt-5 border rounded-lg h-44 bg-light-slate-1">
          <div className="text-2xl text-center ">
            <Image className="mx-auto" src={SaucedLogo} alt="Sauced Logo" />
            <p>You’re Subscribed!</p>
          </div>
        </div>
      ) : (
        <aside
          aria-labelledby="subscribe-to-newsletter"
          className="newsletter-wrap flex flex-col w-full gap-3 p-6 pt-5 border rounded-lg bg-light-slate-1"
        >
          <div className="w-64 space-y-1">
            <h2 className="text-lg" id="subscribe-to-newsletter">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm font-normal text-light-slate-11">
              Stay up to date with the latest OpenSauced news and trends!
            </p>
          </div>
          <form name="newsletter" method="post" autoComplete="off" className="w-full" onSubmit={handleSubmit}>
            <div hidden aria-hidden="true">
              <label>
                Try your luck
                <input type="hidden" value="newsletter" name="form-name" />
              </label>
            </div>
            <div className="form-wrap flex items-center justify-between gap-1 w-full">
              <TextInput
                handleChange={(value) => handleChange(value)}
                state={isValidEmail ? "valid" : "invalid"}
                value={email}
                className="text-sm focus:outline-none"
                type="text"
                name="email"
                placeholder="Email"
              />
              <Button
                loading={loading}
                className={clsx(
                  "flex flex-none justify-center py-1 border-light-orange-7 text-light-orange-10",
                  loading && "px-2"
                )}
                showLoadingText={false}
                type="submit"
                variant="text"
              >
                Subscribe
              </Button>
            </div>

            {errorMsg && (
              <p className="flex items-center gap-1 mt-2 text-xs font-light ">
                <AiFillCloseCircle onClick={() => setErrorMsg("")} className="text-sm cursor-pointer" /> {errorMsg}
              </p>
            )}
          </form>
        </aside>
      )}
    </>
  );
};

export default NewsletterForm;
