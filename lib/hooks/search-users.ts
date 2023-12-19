const searchUsers = async (username: string, providerToken?: string | null | undefined) => {
  try {
    const res = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(username)} type:user&sort=followers&per_page=10`,
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

    if (res.status === 200) {
      const data = (await res.json()).items as GhUser[];
      return { data };
    } else if (res.status === 403) {
      // Use our API as a fallback
      const fallbackResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/search?username=${encodeURIComponent(
          username.replaceAll("user:", "")
        )}&limit=10`
      );

      if (fallbackResponse.status === 200) {
        const data = ((await fallbackResponse.json()).data as DbUser[]).map((user) => ({
          id: user.id,
          login: user.login,
          full_name: user.name,
          updated_at: user.updated_at,
        })) as unknown as GhUser[];
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
