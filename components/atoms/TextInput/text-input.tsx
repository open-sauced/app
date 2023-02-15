import { CheckCircleFillIcon, XCircleFillIcon } from "@primer/octicons-react";
import React, { useRef } from "react";
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
  defaultValue?: string;
  required?: boolean;
  fieldRef?: React.RefObject<HTMLInputElement>;
  pattern?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
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
  defaultValue,
  onChange,
  onReset,
  required,
  fieldRef,
  pattern,
  errorMsg = ""
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleResetInput = () => {
    console.log({fieldRef});
    fieldRef ? fieldRef.current!.value = ""
      :
      onReset?.();
  };

  return (
    <>
      <label className="flex w-full flex-col">
        {label && <p className="mb-2   text-light-slate-9 text-sm">{label}</p>}
        <div
          className={clsx(
            "flex-1 px-3 text-light-slate-12 bg-white shadow-input border transition rounded-lg py-1 flex items-center",
            borderless && "!border-none",
            state === "invalid" ? " focus-within:border-light-red-10 " : "focus-within:border-light-orange-9 ",
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
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            className={`flex-1 focus:outline-none  ${classNames} ${
              disabled && "bg-light-slate-3 cursor-not-allowed  text-light-slate-9"
            }`}
            autoFocus={autoFocus}
            disabled={disabled}
            required={required}
            pattern={pattern}
          />
          {!disabled && (
            <>
              {state === "valid" ? (
                <CheckCircleFillIcon className="text-light-orange-9" size={14} />
              ) : !!value ? (
                <span className="flex items-center" onClick={handleResetInput}>
                  <XCircleFillIcon className="text-light-red-11" size={14} />
                </span>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </label>
      {descriptionText ? <p className="mt-2 text-light-slate-9 text-sm">{descriptionText}</p> : ""}
      {state === "invalid" && errorMsg ? <p className="mt-3 text-sm text-light-red-11  ">{errorMsg}</p> : ""}
    </>
  );
};

export default TextInput;
