import { CheckCircleFillIcon, XCircleFillIcon } from "@primer/octicons-react";
import React, { useRef } from "react";
import clsx from "clsx";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  state?: "default" | "valid" | "invalid";
  borderless?: boolean;
  descriptionText?: string;
  classNames?: string;
  errorMsg?: string;
  fieldRef?: React.RefObject<HTMLInputElement>;
  handleChange?: (value: string) => void;
}

const TextInput = ({
  name,
  label,
  placeholder,
  state = "default",
  id,
  value,
  descriptionText,
  classNames,
  fieldRef,
  disabled = false,
  borderless = false,
  handleChange,
  errorMsg = "",
  ...props
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleResetInput = () => {
    handleChange?.("");
    if (fieldRef) {
      fieldRef.current!.value = "";
    }
  };

  const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange?.(event.target.value);
  };

  return (
    <>
      <label className="flex flex-col w-full">
        {label && <p className="mb-2 text-sm text-light-slate-9">{label}</p>}
        <div
          className={clsx(
            "flex-1 px-3 text-light-slate-12 bg-white shadow-input border transition rounded-lg py-1 flex items-center",
            borderless && "!border-none",
            state === "invalid" ? "focus-within:border-light-red-10" : "focus-within:border-light-orange-9 ",
            disabled && "bg-light-slate-3 text-light-slate-6",
            classNames
          )}
        >
          <input
            ref={fieldRef || inputRef}
            type="text"
            name={name}
            id={id || name || ""}
            placeholder={placeholder || ""}
            className={`flex-1 focus:outline-none  ${
              disabled && "bg-light-slate-3  cursor-not-allowed  text-light-slate-9"
            } `}
            disabled={disabled}
            value={value}
            onChange={handleChangeState}
            {...props}
          />
          {!disabled && (
            <>
              {state === "valid" ? (
                <CheckCircleFillIcon className="ml-1  text-light-orange-9" size={12} />
              ) : !!value ? (
                <span title="Clear input" className="flex items-center ml-1" onClick={handleResetInput}>
                  <XCircleFillIcon
                    className={clsx(
                      state === "invalid" && errorMsg ? "text-light-red-11" : "text-light-slate-8",
                      "cursor-pointer"
                    )}
                    size={12}
                  />
                </span>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </label>
      {descriptionText ? <p className="mt-2 text-sm text-light-slate-9">{descriptionText}</p> : ""}
      {state === "invalid" && errorMsg ? <p className="mt-3 text-sm text-light-red-11 ">{errorMsg}</p> : ""}
    </>
  );
};

export default TextInput;
