import { useState } from "react";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";

interface CreateListPayload {
  name: string;
  is_public: boolean;
  contributors: { id: number; login: string }[];
}

const TeamImport = () => {
  const { providerToken, sessionToken, user } = useSupabaseAuth();
  const [teams, setTeams] = useState<any[]>([]);
  const { toast } = useToast();

  const createList = async (payload: CreateListPayload) => {
    if (!payload.name) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  async function getOrgTeams(org: string) {
    if (!providerToken) {
      toast({
        description: `No token`,
        variant: "warning",
      });
    }
    console.log("pt", providerToken);

    try {
      const response = await fetch(`https://api.github.com/orgs/${org}/teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${providerToken}`,
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const teams = (await response.json()) as unknown as any[];
        setTeams(teams);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function loadTeamContributors(org: string, teamSlug: string, teamName: string) {
    const response = await fetch(`https://api.github.com/orgs/${org}/teams/${teamSlug}/members`, {
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
    });

    if (!response.ok) {
      return;
    }

    const contributors = (await response.json()) as unknown as any[];

    const list = await createList({
      name: `${teamName} List`,
      contributors: contributors.map((contributor) => ({ id: contributor.id, login: contributor.login })),
      is_public: false,
    });

    if (list) {
      toast({
        description: `List created`,
        variant: "success",
      });
    }
  }

  return (
    <div>
      <button onClick={() => getOrgTeams("open-sauced")}>Load Teams</button>

      <ul>
        {teams.map((team) => {
          return (
            <li key={team.id}>
              {" "}
              {team.name} -{" "}
              <button onClick={() => loadTeamContributors("open-sauced", team.slug, team.name)}>Create List</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TeamImport;
