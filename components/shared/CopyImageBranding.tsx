import Image from "next/image";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import openSaucedImg from "img/openSauced-icon.png";

export default function CopyImageBranding({ repository }: { repository: string }) {
  return (
    <section
      data-copy-image-branding
      className="hidden flex w-full justify-between rounded-t-lg h-fit p-4 bg-dark-slate-100"
    >
      <div className="flex gap-2">
        <Avatar size="sm" avatarURL={getAvatarByUsername(repository.split("/")[0])} />
        <p>{repository}</p>
      </div>

      <div className="flex justify-center my-2">
        <Image className="rounded" alt="OpenSauced Logo" width={13} height={13} src={openSaucedImg} />
        <p className={"font-semibold text-white ml-1"} style={{ fontSize: "8px" }}>
          OpenSauced
        </p>
      </div>
    </section>
  );
}
