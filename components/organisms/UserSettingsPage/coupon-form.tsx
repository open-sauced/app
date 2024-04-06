import { useState } from "react";

import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { useToast } from "lib/hooks/useToast";
import { supabase } from "lib/utils/supabase";

interface CouponFormProps {
  refreshUser: () => void;
}

const CouponForm = ({ refreshUser }: CouponFormProps) => {
  const [updating, setUpdating] = useState(false);
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handeApplyCoupon = async () => {
    const sessionResponse = await supabase.auth.getSession();
    const sessionToken = sessionResponse?.data.session?.access_token;
    setUpdating(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile/coupon`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        couponCode: code,
      }),
    });

    if (response.ok) {
      toast({ description: "Coupon applied successfully", variant: "success" });
      setCode("");
      refreshUser?.();
    } else {
      toast({ description: "Coupon not found!", variant: "danger" });
    }

    setUpdating(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 ">
        <label className="text-2xl font-normal text-light-slate-11">Add Coupon</label>
        <TextInput
          className="bg-light-slate-4 text-light-slate-11 w-3/4"
          placeholder="Enter Coupon"
          label="Enter provided coupon code to upgrade your account"
          name="couponCode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <Button
        onClick={handeApplyCoupon}
        variant="default"
        className="px-4 py-2 w-max bg-light-slate-4 "
        disabled={updating}
      >
        Apply Coupon
      </Button>
    </div>
  );
};

export default CouponForm;
