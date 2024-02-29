type WorkspaceBannerProps = {
  openModal: () => void;
};

export default function WorkspaceBanner({ openModal }: WorkspaceBannerProps) {
  return (
    <button
      onClick={openModal}
      className="absolute top-0 inset-x-0 w-full h-fit px-4 py-2 bg-light-orange-10 text-white"
    >
      This insight page is over the free limit. <span className="font-bold">Upgrade to a PRO Workspace.</span>
    </button>
  );
}
