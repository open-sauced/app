import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSupabaseAuth from "./useSupabaseAuth";
import { useToast } from "./useToast";

interface UserCollaborationResponse {
  data?: DbUserCollaboration[];
  meta: Meta;
}

type collaborationRequestPayload = {
  username: string;
  message: string;
};
const useUserCollaborations = () => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const { data, error, mutate } = useSWR<UserCollaborationResponse, Error>(
    "user/collaborations",
    publicApiFetcher as Fetcher<UserCollaborationResponse, Error>
  );

  async function requestCollaboration(payload: collaborationRequestPayload) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/collaborations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (req && req.ok) {
      const response = await req.json();
      toast({ description: "Collaboration request Sent!", title: "Success", variant: "success" });
    } else {
      const response = await req?.json();
      toast({ description: response.message[0], title: "Error", variant: "danger" });

      console.log(response.message);
    }
  }

  async function updateCollaborationStatus(requestId: string) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/collaborations/${requestId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    });

    if (req.ok) {
      toast({ description: "Request accepted successfully!", title: "Success", variant: "success" });
      mutate();
    }
  }

  async function deleteCollaborationRequest(requestId: string) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/collaborations/${requestId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "content-type": "application/json",
      },
    });
    if (req.ok) {
      toast({ description: "Request deleted successfully!", title: "Success", variant: "success" });
      mutate();
    }
  }

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    requestCollaboration,
    updateCollaborationStatus,
    deleteCollaborationRequest,
  };
};

export { useUserCollaborations };
