import { CheckCircleFillIcon, XCircleFillIcon } from "@primer/octicons-react";
import React, { useState } from "react";
import clsx from "clsx";
interface TextInputProps {
  label?: string;
  placeholder?: string;

  name?: string;

  state?: "default" | "valid" | "invalid";
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  borderless?: boolean;

  descriptionText?: string;
  classNames?: string;
  errorMsg?: string;
  value?: string;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  name,
  label,
  placeholder,
  state = "default",
  id,
  descriptionText,
  classNames,
  disabled = false,
  autoFocus,
  borderless = false,
  value,
  onChange,
  errorMsg = ""
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const handleResetInput = () => {
    setInputValue("");
  };
  return (
    <>
      <label className="flex w-full flex-col">
        {label && <p className="mb-2 text-light-slate-9 text-sm">{label}</p>}
        <div
          className={clsx(
            classNames,
            "flex-1 px-3 text-light-slate-12 shadow-input border transition rounded-lg py-1 flex items-center",
            borderless && "!border-none",
            state === "invalid"
              ? " focus-within:border-light-red-10 "
              : "focus-within:border-light-orange-9 ",
            disabled && "bg-light-slate-3"
          )}
        >
          <input
            type="text"
            name={name}
            id={id || name || ""}
            placeholder={placeholder || ""}
            onChange={onChange}
            value={inputValue}
            className="flex-1 focus:outline-none "
            autoFocus={autoFocus}
            disabled={disabled}
          />
          {state === "valid" ? (
            <CheckCircleFillIcon className="text-light-orange-9" size={14} />
          ) : state === "invalid" ? (
            <span
              className="flex items-center"
              onClick={() => handleResetInput()}
            >
              <XCircleFillIcon className="text-light-red-11" size={14} />
            </span>
          ) : (
            ""
          )}
        </div>
      </label>
      {descriptionText ? (
        <p className="mt-3 text-light-slate-9 text-sm">{descriptionText}</p>
      ) : (
        ""
      )}
      {state === "invalid" && errorMsg ? (
        <p className="mt-3 text-sm text-light-red-11 font-medium">{errorMsg}</p>
      ) : (
        ""
      )}
    </>
  );
};

export default TextInput;
