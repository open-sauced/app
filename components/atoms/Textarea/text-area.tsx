import React, { ChangeEvent, useRef } from "react";
import clsx from "clsx";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  defaultRow?: number;
  onChangeText?: (value: string) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, onChangeText, ...props }, ref) => {
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
    <textarea
      onChange={handleInputChange}
      className={clsx(
        "flex h-20 md:min-h-26 md:h-auto w-full rounded-md  py-2  text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={textareaRef}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
