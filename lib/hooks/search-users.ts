const searchUsers = async (username: string, providerToken?: string | null | undefined) => {
  try {
    const res = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(username)}&sort=followers&per_page=10`,
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
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export { searchUsers };
