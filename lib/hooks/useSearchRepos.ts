const baseUrl = "https://api.github.com/search/repositories";
const useSearchRepos = (searchTerm: string, providerToken?: string | null | undefined, limit = 100) => {
  return {
    data: [
      {
        id: 688352,
        name: "jmeter",
        full_name: "apache/jmeter",
        owner: {
          login: "apache",
        },
      },
      {
        id: 434708679,
        name: "test2",
        full_name: "vitest-dev/vitest",
        owner: {
          login: "vitest-dev",
        },
      },
    ],
    isLoading: false,
    isError: false,
  };
  // try {
  //   const query = new URLSearchParams({
  //     q: searchTerm,
  //     per_page: `${limit}`,
  //   });
  //   const res = await fetch(`${baseUrl}${query}`, {
  //     ...(providerToken
  //       ? {
  //         headers: {
  //           Authorization: `Bearer ${providerToken}`,
  //         },
  //       }
  //       : {}),
  //   });

  //   if (res.status === 200) {
  //     const data = (await res.json()).items as GhRepo[];
  //     return { data, isLoading: false, isError: false };
  //   } else {
  //     // TODO
  //     return { isError: true, isLoading: false, data: null };
  //   }

  //   // } else if (res.status === 403) {
  //   //   // Use our API as a fallback
  //   //   const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/repos/search`);

  //   //   if (fallbackResponse.status === 200) {
  //   //     const data = ((await fallbackResponse.json()).data as DbUser[]).map((user) => ({
  //   //       id: user.id,
  //   //       login: user.login,
  //   //       full_name: user.name,
  //   //       updated_at: user.updated_at,
  //   //     })) as unknown as GhUser[];
  //   //     return { data };
  //   //   } else {
  //   //     return false;
  //   //   }
  //   // } else {
  //   //   return false;
  //   // }
  // } catch (e) {
  //   return { isError: true, isLoading: false, data: null };
  // }
};

export { useSearchRepos };
