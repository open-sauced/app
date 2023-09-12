const searchUsers = async (username: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/search?page=1&username=${username}&limit=10`);

    if (res.status === 200) {
      return res.json();
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export { searchUsers };
