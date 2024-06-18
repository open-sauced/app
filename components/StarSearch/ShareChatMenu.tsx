import { HiOutlineShare } from "react-icons/hi";
import { BsLink45Deg, BsTwitterX } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { useRef, useState } from "react";
import { LinkIcon } from "@primer/octicons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";

interface ShareMenuProps {
  shareUrl: string | null | undefined;
  copyLinkHandler: (url: string) => Promise<void>;
  createLink?: () => void;
}

export function ShareChatMenu({ shareUrl, copyLinkHandler, createLink }: ShareMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let twitterUrl = "https://twitter.com/intent/tweet";
  let linkedInUrl = "https://www.linkedin.com/sharing/share-offsite/";

  if (shareUrl) {
    const twitterParams = new URLSearchParams();
    const linkedinParams = new URLSearchParams();
    twitterParams.set("text", `Here's my StarSearch prompt!\n\nTry it out for yourself. #StarSearch`);
    twitterParams.set("url", shareUrl);
    twitterUrl += `?${twitterParams}`;

    linkedinParams.set("url", shareUrl);
    linkedInUrl += `?${linkedinParams}`;
  }

  return (
    <DropdownMenu open={dropdownOpen} modal={false}>
      <DropdownMenuTrigger onClick={() => setDropdownOpen(!dropdownOpen)} aria-label="Share prompt options">
        <HiOutlineShare width={22} height={22} />
      </DropdownMenuTrigger>

      <DropdownMenuContent ref={dropdownRef} align="end" className="flex flex-col gap-1 py-2 rounded-lg">
        {createLink ? (
          <DropdownMenuItem className="pl-4 rounded-md">
            <button
              className="flex items-center w-full gap-1"
              onClick={() => {
                createLink();
              }}
            >
              <LinkIcon size={12} />
              <span>Create Share Link</span>
            </button>
          </DropdownMenuItem>
        ) : (
          <>
            {shareUrl ? (
              <>
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
                    await copyLinkHandler(shareUrl);
                    setDropdownOpen(false);
                  }}
                  className="rounded-md"
                >
                  <div className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer">
                    <BsLink45Deg size={22} />
                    <span>Copy link</span>
                  </div>
                </DropdownMenuItem>
              </>
            ) : null}
          </>
        )}
        <p className="px-4 pt-3 ml-0 text-xs border-t text-light-slate-11">Creating a link makes this chat public</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
