import Button, { ButtonsProps } from "components/atoms/Button/button";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { getStripe } from "lib/utils/stripe-client";

interface StripeCheckoutButtonProps extends ButtonsProps {}

const StripeCheckoutButton = ({ children, ...props }: StripeCheckoutButtonProps) => {
  const { sessionToken } = useSupabaseAuth();

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/checkout/session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
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
    <form onSubmit={handleFormSubmit}>
      <Button {...props}>{children || "Upgrade Access"}</Button>
    </form>
  );
};

export default StripeCheckoutButton;
