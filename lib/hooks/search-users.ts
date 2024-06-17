async function searchOpenSaucedAPI(username: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/search?username=${encodeURIComponent(
      username.replaceAll("user:", "")
    )}&limit=5`
  );

  return response;
}

async function searchGitHubAPI(username: string, providerToken?: string | null | undefined) {
  const response = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(username)} type:user&sort=followers&per_page=5`,
    {
      ...(providerToken
        ? {
            headers: {
              Authorization: `Bearer ${providerToken}`,
            },
          }
        : {}),
    }
  );

  return response;
}

const searchUsers = async (username: string, providerToken?: string | null | undefined) => {
  try {
    const response = await searchOpenSaucedAPI(username);

    if (response.status === 200) {
      const responseData = ((await response.json()).data as DbUser[]) || [];

      if (responseData.length > 0) {
        const data = responseData.map((user) => ({
          id: user.id,
          login: user.login,
          full_name: user.name,
          updated_at: user.updated_at,
        })) as unknown as GhUser[];

        return { data };
      }

      const res = await searchGitHubAPI(username, providerToken);
      const githubUserData = (await res.json()).items as GhUser[];

      return { data: githubUserData };
    } else if (response.status === 403) {
      const res = await searchGitHubAPI(username, providerToken);

      if (res.status === 200) {
        const data = (await res.json()).items as GhUser[];
        return { data };
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export { searchUsers };
