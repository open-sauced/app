import { usePostHog } from "posthog-js/react";
import { useEffectOnce } from "react-use";

type WorkspaceBannerProps = {
  workspaceId: string;
  openModal: () => void;
};

export default function WorkspaceBanner({ workspaceId, openModal }: WorkspaceBannerProps) {
  const posthog = usePostHog();

  useEffectOnce(() => {
    posthog.capture("shown: Upgrade Workspace Banner", { workspaceId });
  });

  return (
    <button
      onClick={openModal}
      className="absolute top-0 inset-x-0 w-full h-fit px-4 py-2 bg-light-orange-10 text-white"
    >
      This insight page is over the free limit. <span className="font-bold underline">Upgrade to a PRO Workspace.</span>
    </button>
  );
}
