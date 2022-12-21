import Text from "components/atoms/Typography/text";
import Button from "components/atoms/Button/button";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import { getStripe } from "lib/utils/stripe-client";

const StripeCheckoutButton = () => {
  const { sessionToken } = useSupabaseAuth();
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/checkout/session`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sessionToken}`
        }
      });

      if (response.ok) {
        const { sessionId } = await response.json();

        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
      } else {
        // display error to user
        console.error(response.statusText);
      }
    } catch (e) {
      //
    }
  };

  return (
    <div>
      <Text className="">Purchase a subscription to gain access to generate custom reports!</Text>

      <p className="flex justify-center py-4 px-2">
        <form onSubmit={handleFormSubmit}>
          <Button type="primary" className="w-52 h-[38px]">
            Checkout with Stripe
          </Button>
        </form>
      </p>
    </div>
  );
};

export default StripeCheckoutButton;
