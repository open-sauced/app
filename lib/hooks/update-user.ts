interface useUpdateUserProps {
  token: string;
  data: { email?: string; interests?: string[] };
  params?: string
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const UpdateUser = async ({ token, data, params }: useUpdateUserProps) => {
  try {
    const res = await fetch(`${baseUrl}/auth/profile/${params || undefined}`, {
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      method: "PATCH",
      body: JSON.stringify({ ...data })
    });

    if (res.status === 200) {
      return res;
    } else {
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};

export { UpdateUser };
