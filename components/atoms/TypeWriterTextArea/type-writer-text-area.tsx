import React, { ChangeEvent, useEffect, useRef } from "react";
import clsx from "clsx";

interface TypeWriterTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChangeText?: (value: string) => void;
  typewrite?: boolean;
  textContent?: string;
  defaultRow?: number;
}

const TypeWriterTextArea = React.forwardRef<HTMLTextAreaElement, TypeWriterTextAreaProps>(
  ({ className, onChangeText, typewrite, textContent, defaultRow, ...props }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const autoGrowTextarea = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const typeWrite = (text: string) => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.focus();
        textarea.value = "";
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        const interval = setInterval(() => {
          if (textarea.value.length === text.length) {
            clearInterval(interval);
          } else {
            textarea.value = text.slice(0, textarea.value.length + 1);
          }
        }, 10);
      }
    };

    useEffect(() => {
      if (typewrite && textContent) {
        typeWrite(textContent);
      }
    }, [typewrite, textContent]);

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
        rows={defaultRow}
        ref={textareaRef}
        {...props}
      />
    );
  }
);
TypeWriterTextArea.displayName = "TypeWriterTextArea";

export { TypeWriterTextArea };
