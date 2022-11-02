import Text from "components/atoms/Typography/text";
import Button from "components/atoms/Button/button";

interface WaitlistButtonProps {
  waitlisted: boolean | undefined;
  submitting: boolean;
  handleJoinClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const WaitlistButton = ({ submitting, waitlisted, handleJoinClick }: WaitlistButtonProps) => {
  return (
    <>
      {waitlisted === true ? (
        <Text className="! ">You&apos;re on the waitlist to gain access to generate custom reports!</Text>
      ) : (
        <div>
          <Text className="! ">Join the waitlist to gain access to generate custom reports!</Text>

          <p className="flex justify-center py-4 px-2">
            <Button type="primary" onClick={handleJoinClick} disabled={submitting} className="w-52 h-[38px]">
              Join Waitlist
            </Button>
          </p>
        </div>
      )}
    </>
  );
};

export default WaitlistButton;
