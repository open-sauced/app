import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { isToday, isYesterday, formatDistanceToNowStrict } from "date-fns";
import CollaborationCard from "components/molecules/CollaborationCard/collaboration-card";
import DashContainer from "components/atoms/DashedContainer/DashContainer";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Text from "components/atoms/Typography/text";

import { useToast } from "lib/hooks/useToast";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { useUserCollaborations } from "lib/hooks/useUserCollaborations";
import { updateEmailPreferences } from "lib/hooks/updateEmailPreference";

import type { User } from "@supabase/supabase-js";

function formatPostDate(date: Date) {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }
}

type EmailPreferenceType = {
  display_email?: boolean;
  receive_collaboration?: boolean;
};

interface CollaborationRequestsWrapperProps {
  user: User
}

const CollaborationRequestsWrapper = ({ user }: CollaborationRequestsWrapperProps) => {
  const { toast } = useToast();
  const { data: insightsUser } = useFetchUser(user?.user_metadata.user_name, {
    revalidateOnFocus: false
  });

  const [emailPreference, setEmailPreference] = useState<EmailPreferenceType>({
    display_email: false,
    receive_collaboration: false
  });

  useEffect(() => {
    if (insightsUser) {
      setEmailPreference({
        display_email: insightsUser.display_email,
        receive_collaboration: insightsUser.receive_collaboration
      });
    };
  }, [insightsUser]);

  const handleUpdateReceiveCollaboration = async () => {
    setEmailPreference((prev) => ({
      ...prev, 
      receive_collaboration: !prev.receive_collaboration
    }));

    const data = await updateEmailPreferences({ 
      display_email: insightsUser?.display_email,
      receive_collaboration: !insightsUser?.receive_collaboration
    });

    if (data) {
      toast({ description: "Updated successfully", variant: "success" });
    } else {
      toast({ description: "An error occured!", variant: "danger" });
    };

    return;
  };

  const { data, updateCollaborationStatus, deleteCollaborationRequest } = useUserCollaborations();
  let currentDate: string;

  const getDateGroupHeader = (date: Date, index: number) => {
    const dateString = date.toLocaleDateString();
    if (dateString !== currentDate) {
      currentDate = dateString;

      return (
        <p className={`mt-4 text-light-slate-10 md:pt-4 md:mt-8 ${index !== 0 && " border-t"}`}>
          {formatPostDate(new Date(date))}
        </p>
      );
    }
    return;
  };

  return (
    <div>
      <div className={clsx(
        "flex flex-col sm:flex-row rounded-md border py-2 px-3 my-4 sm:space-x-2 space-y-2 sm:space-y-0 items-center",
        emailPreference.receive_collaboration ? "border-green-500 bg-green-200" : "border-light-red-6 bg-light-red-4"
      )}>
        <Text className={clsx(
          "font-semibold !text-sm md:mr-2 grow",
          emailPreference.receive_collaboration ? "!text-green-600" :"!text-light-red-10"
        )}>
          { emailPreference.receive_collaboration ? (
            "You are currently accepting collaboration requests."
          ) : (
            "You are currently not accepting collaboration requests." 
          )}
        </Text>
        <div className="flex items-center">
          <span className={clsx(
            "pr-2 !text-sm truncate",
            emailPreference.receive_collaboration ? "!text-green-600" :"!text-light-red-10"
          )}>
            Change Status
          </span> 
          <ToggleSwitch
            name="receive_collaboration"
            size="sm"
            checked={emailPreference.receive_collaboration as boolean} 
            classNames={`${emailPreference.receive_collaboration && "!bg-green-600"}`}
            handleToggle={handleUpdateReceiveCollaboration}   
          />
        </div>
      </div>

      {data && data.length > 0 ? (
        data
          .slice()
          .filter((request) => request.status === "pending")
          .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
          .map((requests, i) => {
            return (
              <div className="flex flex-col w-full " key={i}>
                <div className="w-full mt-1 text-center md:text-left">
                  {getDateGroupHeader(new Date(requests.created_at), i)}
                </div>
                <CollaborationCard
                  onDecline={deleteCollaborationRequest}
                  onAccept={updateCollaborationStatus}
                  requestId={requests.id}
                  className="self-end w-full mt-1 md:w-5/6 md:mt-1"
                  outreachMessage={requests.message}
                  requestor={requests.request_user}
                />
              </div>
            );
          })
      ) : (
        <DashContainer className="flex-col gap-6 md:gap-8 text-light-slate-9">
          <p>No pending requests.</p>
          <p className="text-center md:px-16">
            Sometimes you got to be a friend to make a friend. Considering requesting collaboration on sharing profile
            on social channels like GitHub or Twitter
          </p>
        </DashContainer>
      )}
    </div>
  );
};

export default CollaborationRequestsWrapper;
