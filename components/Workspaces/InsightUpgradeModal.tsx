import { ReactNode, useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { usePostHog } from "posthog-js/react";
import { useRouter } from "next/router";
import { Dialog, DialogTitle, DialogContent, DialogCloseButton } from "components/molecules/Dialog/dialog";
import Button from "components/shared/Button/button";
import Card from "components/atoms/Card/card";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { Drawer } from "components/shared/Drawer";

type InsightUpgradeModalProps = {
  workspaceId: string;
  overLimit?: number;
  variant: "repositories" | "contributors" | "workspace" | "all";
  isOpen: boolean;
  onClose: () => void;
};

export default function InsightUpgradeModal({ workspaceId, variant, isOpen, onClose }: InsightUpgradeModalProps) {
  const posthog = usePostHog();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const title = variant !== "workspace" ? "This Workspace is over the free limit" : "Upgrade to a PRO Workspace";
  const description =
    variant !== "workspace"
      ? `Your workspace has exceeded the limit for free usage. Free Workspaces only allow for 20 repositories
    and 10 contributors tracked per insight page and 100 workspace repositories. Don't worry, your insights won't be deleted. If you want to
    continue using OpenSauced you should upgrade your Workspace to a PRO Account.`
      : `Setting your workspace to private is a PRO feature. Upgrade your Workspace and get exclusive access to
    your work for you and your team!`;
  useEffect(() => {
    if (isOpen) {
      posthog.capture("clicked: Upgrade Workspace Modal", { workspaceId });
    }
  }, [isOpen]);

  return isMobile ? (
    <Drawer title={title} description={description} isOpen={isOpen} onClose={onClose} trigger={null}>
      <section className="flex flex-col gap-4 justify-between w-full max-h-64 overflow-y-scroll">
        <Card className="basis-1/2 px-4 py-4 flex flex-col gap-4 justify-between">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-semibold">Pro Workspace</h3>
              <p className="text-xs text-slate-500">Ideal for teams </p>
            </div>

            <div className="flex flex-col gap-0.5 items-end">
              <p className="text-2xl font-semibold">
                <span className="text-lg">$</span>100<span className="text-lg text-slate-500">/mth</span>
              </p>
              <p className="text-xs font-semibold text-slate-500">charged per Workspace</p>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            <ChecklistItem color="green">Private or public Workspaces, you choose!</ChecklistItem>
            <ChecklistItem color="green">
              Up to <span className="font-bold">1,000</span> workspace repositories
            </ChecklistItem>
            <ChecklistItem color="green">
              Up to <span className="font-bold">100</span> contributors per insight page
            </ChecklistItem>
            <ChecklistItem color="green">
              Up to <span className="font-bold">100</span> repositories per insight page
            </ChecklistItem>
          </ul>

          <Button
            onClick={() => {
              if (variant !== "workspace") {
                router.push(`/workspaces/${workspaceId}/settings#upgrade`);
              }
              if (variant === "workspace" || variant === "all") onClose();
            }}
            variant="primary"
            className="flex justify-center"
          >
            Upgrade
          </Button>
        </Card>

        <Card className="basis-1/2 px-4 py-4 flex flex-col gap-4 justify-between">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-semibold">Free Workspace</h3>
              <p className="text-xs text-slate-500">Ideal for individuals</p>
            </div>

            <p className="text-2xl font-semibold">
              <span className="text-lg">$</span>0<span className="text-lg text-slate-500">/mth</span>
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            <ChecklistItem color="orange">Public Workspaces only!</ChecklistItem>
            <ChecklistItem color="orange">
              Up to <span className="font-bold">100</span> workspace repositories
            </ChecklistItem>
            <ChecklistItem color="orange">
              Up to <span className="font-bold">10</span> contributors per insight page
            </ChecklistItem>
            <ChecklistItem color="orange">
              Up to <span className="font-bold">20</span> repositories per insight page
            </ChecklistItem>
          </ul>

          <Button
            variant="default"
            className="flex w-full py-3 justify-center !border !border-orange-600 !text-orange-600"
          >
            Your Plan
          </Button>
        </Card>
      </section>
    </Drawer>
  ) : (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onClose} onPointerDownOutside={onClose}>
        <Card className="p-8 max-w-4xl">
          <div className="min-w-[712px] flex flex-col gap-8">
            <DialogCloseButton onClick={onClose} />
            <section className="flex flex-col gap-2">
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <p className="text-sm text-slate-500">{description}</p>
            </section>

            <section className="flex gap-8 justify-between w-full">
              <Card className="basis-1/2 px-6 py-6 flex flex-col gap-6 justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-lg font-semibold">Free Workspace</h3>
                    <p className="text-sm text-slate-500">Ideal for individuals</p>
                  </div>

                  <p className="text-4xl font-semibold">
                    <span className="text-lg">$</span>0<span className="text-2xl text-slate-500">/mth</span>
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  <ChecklistItem color="orange">Public Workspaces only!</ChecklistItem>
                  <ChecklistItem color="orange">
                    Up to <span className="font-bold">100</span> workspace repositories
                  </ChecklistItem>
                  <ChecklistItem color="orange">
                    Up to <span className="font-bold">10</span> contributors per insight page
                  </ChecklistItem>
                  <ChecklistItem color="orange">
                    Up to <span className="font-bold">20</span> repositories per insight page
                  </ChecklistItem>
                </ul>

                <Button
                  variant="default"
                  className="flex w-full py-3 justify-center !border !border-orange-600 !text-orange-600"
                >
                  Your Plan
                </Button>
              </Card>

              <Card className="basis-1/2 px-6 py-6 flex flex-col gap-6 justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-lg font-semibold">Pro Workspace</h3>
                    <p className="text-sm text-slate-500">Ideal for teams </p>
                  </div>

                  <div className="flex flex-col gap-0.5 items-end">
                    <p className="text-4xl font-semibold">
                      <span className="text-xl">$</span>100<span className="text-2xl text-slate-500">/mth</span>
                    </p>
                    <p className="text-xs font-semibold text-slate-500">charged per Workspace</p>
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  <ChecklistItem color="green">Private or public Workspaces, you choose!</ChecklistItem>
                  <ChecklistItem color="green">
                    Up to <span className="font-bold">1,000</span> workspace repositories
                  </ChecklistItem>
                  <ChecklistItem color="green">
                    Up to <span className="font-bold">100</span> contributors per insight page
                  </ChecklistItem>
                  <ChecklistItem color="green">
                    Up to <span className="font-bold">100</span> repositories per insight page
                  </ChecklistItem>
                </ul>

                <Button
                  onClick={() => {
                    if (variant !== "workspace") {
                      router.push(`/workspaces/${workspaceId}/settings#upgrade`);
                    }
                    if (variant === "workspace" || variant === "all") onClose();
                  }}
                  variant="primary"
                  className="py-3 flex justify-center"
                >
                  Upgrade
                </Button>
              </Card>
            </section>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

function ChecklistItem({ color, children }: { color: "orange" | "green"; children: ReactNode }) {
  return (
    <li className="flex gap-3 items-center">
      <FaRegCheckCircle className={`w-5 h-5 text-${color}-500`} />
      <p className="text-sm text-slate-500">{children}</p>
    </li>
  );
}
