import { HiOutlineShare } from "react-icons/hi";
import { BsLink45Deg, BsTwitterX } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";

interface ShareMenuProps {
  promptUrl: string;
  copyLinkHandler: (url: string) => Promise<void>;
}

export function SharePromptMenu({ promptUrl, copyLinkHandler }: ShareMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let twitterUrl = "https://twitter.com/intent/tweet";
  let linkedInUrl = "https://www.linkedin.com/sharing/share-offsite/";
  const twitterParams = new URLSearchParams();
  const linkedinParams = new URLSearchParams();
  twitterParams.set("text", `Here's my StarSearch prompt!\n\nTry it out for yourself. #StarSearch`);
  twitterParams.set("url", promptUrl);
  twitterUrl += `?${twitterParams}`;

  linkedinParams.set("url", promptUrl);
  linkedInUrl += `?${linkedinParams}`;

  return (
    <DropdownMenu open={dropdownOpen} modal={false}>
      <DropdownMenuTrigger onClick={() => setDropdownOpen(!dropdownOpen)} aria-label="Share prompt options">
        <HiOutlineShare width={22} height={22} />
      </DropdownMenuTrigger>

      <DropdownMenuContent ref={dropdownRef} align="end" className="flex flex-col gap-1 py-2 rounded-lg">
        <DropdownMenuItem className="rounded-md">
          <a
            href={twitterUrl}
            target="_blank"
            onClick={() => {
              setDropdownOpen(false);
            }}
            className="flex gap-2.5 py-1 items-center pl-3 pr-7"
          >
            <BsTwitterX size={22} />
            <span>Share to Twitter/X</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-md">
          <a
            href={linkedInUrl}
            target="_blank"
            onClick={() => {
              setDropdownOpen(false);
            }}
            className="flex gap-2.5 py-1 items-center pl-3 pr-7"
          >
            <FiLinkedin size={22} />
            <span>Share to LinkedIn</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await copyLinkHandler(promptUrl);
            setDropdownOpen(false);
          }}
          className="rounded-md"
        >
          <div className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer">
            <BsLink45Deg size={22} />
            <span>Copy link</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
