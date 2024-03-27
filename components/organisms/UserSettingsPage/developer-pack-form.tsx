import { useState } from "react";

import Button from "components/shared/Button/button";
import { useToast } from "lib/hooks/useToast";
import { supabase } from "lib/utils/supabase";

interface DeveloperPackFormProps {
  providerToken?: string | null;
  refreshUser: () => void;
}

const DeveloperPackForm = ({ refreshUser, providerToken }: DeveloperPackFormProps) => {
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  const handeVerification = async () => {
    if (!providerToken) {
      toast({ description: "Unable to connect to GitHub! Try logging out and re-connecting.", variant: "warning" });
      return;
    }

    const sessionResponse = await supabase.auth.getSession();
    const sessionToken = sessionResponse?.data.session?.access_token;
    setUpdating(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile/developer-pack`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        token: providerToken,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as { eligible: boolean };
      if (data.eligible) {
        toast({ description: "Developer pack eligibility verified!", variant: "success" });
        refreshUser?.();
      } else {
        toast({ description: "Your account is not currently eligible for the developer pack", variant: "warning" });
      }
    } else {
      toast({ description: "Could not verify developer pack!", variant: "danger" });
    }

    setUpdating(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <Button
        onClick={handeVerification}
        variant="primary"
        className="px-4 py-2 w-max bg-light-slate-4 "
        disabled={updating}
      >
        Verify Account
      </Button>
    </div>
  );
};

export default DeveloperPackForm;
