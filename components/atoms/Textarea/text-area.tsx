import React, { ChangeEvent, useRef } from "react";
import clsx from "clsx";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value: string;
  borderless?: boolean;
  warnMsg?: string;
  maxChar?: number;
  defaultRow?: number;
  onChangeText?: (value: string) => void;
}

const Textarea = ({
  name,
  label,
  placeholder,
  value,
  className,
  defaultRow = 4,
  maxChar,
  borderless = false,
  warnMsg = "",
  onChangeText,
  ...props
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoGrowTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText?.(event.target.value);
    autoGrowTextarea();
  };

  return (
    <>
      <label className="flex flex-col w-full">
        {label && <p className="mb-2 text-sm text-light-slate-9">{label}</p>}
        <div
          className={clsx(
            "mb-1 flex-1 px-2 text-light-slate-12 bg-white shadow-input border transition rounded-lg py-1 flex items-center",
            borderless && "!border-none",
            maxChar && value?.length > maxChar
              ? "focus-within:border-light-red-10"
              : "focus-within:border-light-orange-9",
            className
          )}
        >
          <textarea
            placeholder={placeholder || ""}
            rows={props.rows && defaultRow}
            onChange={handleInputChange}
            value={value}
            className={"w-full focus:outline-none placeholder:font-normal placeholder-slate-400 bg-inherit"}
            ref={textareaRef}
            {...props}
          />
        </div>
        {maxChar &&
          (value?.length > maxChar ? (
            <p aria-live="assertive" className="text-light-red-10 text-xs">
              {warnMsg}
            </p>
          ) : (
            <p aria-live="polite" className="text-xs">
              {value?.length} / {maxChar}
            </p>
          ))}
      </label>
    </>
  );
};
Textarea.displayName = "Textarea";

export { Textarea };
