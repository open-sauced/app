import { CopyIcon } from "@primer/octicons-react";
import { useRef, useState } from "react";
import { Options } from "html2canvas-pro";
import { Spinner } from "components/atoms/SpinLoader/spin-loader";
import { useToast } from "lib/hooks/useToast";
import { copyNodeAsImage } from "lib/utils/copy-to-clipboard";

interface CopyContainerProps {
  copySuccessMessage?: string;
  copyErrorMessage?: string;
  options?: Partial<Options>;
  onCopyClick?: () => void;
  children: React.ReactNode;
}

export const CopyContainer = ({
  copySuccessMessage = "Copied image to clipboard",
  copyErrorMessage = "Error copying image",
  options,
  onCopyClick,
  children,
}: CopyContainerProps) => {
  const { toast } = useToast();
  const copyRef = useRef<HTMLDivElement>(null);
  const [processing, setProcessing] = useState(false);

  return (
    <div className="relative group" aria-busy={processing}>
      <button
        className="absolute top-2 right-2 p-2 bg-white rounded-md shadow-md opacity-0 group-hover:opacity-100 focus-within:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 ease-in-out transform"
        onClick={async () => {
          onCopyClick?.();

          const node = copyRef.current;

          try {
            setProcessing(true);
            await copyNodeAsImage(node, options);
            toast({ description: copySuccessMessage, variant: "success" });
          } catch (error) {
            toast({ description: copyErrorMessage, variant: "danger" });
          } finally {
            setProcessing(false);
          }
        }}
      >
        <span className="sr-only">Copy</span>
        {processing ? <Spinner className="text-slate-800 w-4 h-4" /> : <CopyIcon className="text-slate-800 w-4 h-4" />}
      </button>
      <span ref={copyRef}>{children}</span>
    </div>
  );
};
