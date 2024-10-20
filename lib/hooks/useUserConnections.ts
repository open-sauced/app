import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import useSupabaseAuth from "./useSupabaseAuth";
import { useToast } from "./useToast";

interface UserConnectionResponse {
  data?: DbUserConnection[];
  meta: Meta;
}

type ConnectionsRequestPayload = {
  username: string;
  message: string;
};
const useUserConnections = () => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const { data, error, mutate } = useSWR<UserConnectionResponse, Error>(
    "user/collaborations",
    publicApiFetcher as Fetcher<UserConnectionResponse, Error>
  );

  async function requestConnection(payload: ConnectionsRequestPayload) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/collaborations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (req && req.ok) {
      toast({ description: "Connection request Sent!", title: "Success", variant: "success" });
    } else {
      const response = await req?.json();
      toast({ description: response.message, title: "Error", variant: "danger" });
    }
  }

  async function updateConnectionStatus(requestId: string) {
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

  async function deleteConnectionRequest(requestId: string) {
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
    requestConnection,
    updateConnectionStatus,
    deleteConnectionRequest,
  };
};

export { useUserConnections };
