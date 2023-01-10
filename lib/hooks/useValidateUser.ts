import useSWR from "swr";

interface UserResponseProps{
  data: DbUser
}
const useValidateUser = (username:string)=>{

  const {data, error} = useSWR<UserResponseProps, Error>(`user/${username}`);

  return {
    isValid: data?.data.is_open_sauced_member || false,
    isLoading: !error && !data,
    isError: !!error
  };
};

export {useValidateUser};
