import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";
import useSupabaseAuth from "./useSupabaseAuth";
import { useToast } from "./useToast";

interface UserCollaborationResponse {
  data?: DbUserCollaboration;
  meta: Meta;
}

type collaborationRequestPayload = {
  username: string;
  message: string;
};
const useUserCollaborations = () => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const { data, error } = useSWR<UserCollaborationResponse, Error>(
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

  async function updateCollaborationStatus() {}

  async function deleteCollaborationRequest() {}

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
