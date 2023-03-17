import Image from "next/image";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "components/atoms/Toast/toast";

import successIcon from "img/icons/success.svg";
import warningIcon from "img/icons/info.svg";
import dangerIcon from "img/icons/error.svg";

import { useToast } from "lib/hooks/useToast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="up">
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-2 items-center rounded-lg">
              {variant === "success" && <Image src={successIcon} alt="success status icon" />}
              {variant === "warning" && <Image src={warningIcon} alt="warning status icon" />}
              {variant === "danger" && <Image src={dangerIcon} alt="error status icon" />}
              <div className="text-left">
                {title && <ToastTitle>{title}</ToastTitle>}
                <ToastDescription>{description}</ToastDescription>
              </div>
              <ToastClose className="ml-auto" />
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
