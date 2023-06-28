import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import React from "react";

const NewsletterForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput type="email" placeholder="Email" />
        <Button type="submit" variant="text">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default NewsletterForm;
