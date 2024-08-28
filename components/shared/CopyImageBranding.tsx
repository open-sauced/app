import Image from "next/image";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import openSaucedImg from "img/logo-slice-gradient.svg";

export default function CopyImageBranding({ repository }: { repository: string }) {
  return (
    <section
      data-copy-image-branding
      className="hidden flex w-full justify-between rounded-t-lg h-fit p-4 bg-black text-white"
    >
      <div className="flex gap-2 items-center">
        <Avatar size="sm" avatarURL={getAvatarByUsername(repository.split("/")[0])} />
        <p className="font-medium text-sm">{repository}</p>
      </div>

      <div className="flex items-center">
        <Image className="rounded" alt="OpenSauced Logo" width={16} height={16} src={openSaucedImg} />
        <p className="font-semibold text-sm ml-2">OpenSauced</p>
      </div>
    </section>
  );
}
