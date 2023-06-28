import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import React from "react";

const NewsletterForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="flex flex-col gap-3 p-4 border rounded-lg w-80">
      <div className="space-y-1">
        <h2 className="text-lg">Subscribe to our newsletter</h2>
        <p className="text-sm text-light-slate-11">Stay up to date with the latest OpenSauced news and trends!</p>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center gap-1 ">
          <TextInput className="text-sm w-36 focus:outline-none" type="email" placeholder="Email" required />
          <Button className="py-1 border-light-orange-7 text-light-orange-10" type="submit" variant="text">
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;
