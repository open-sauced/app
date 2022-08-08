export interface PrivateAccessTokensDBInterface {
  user_id: number;
  is_deleted: boolean;
  created_at: string | null;
  expired_at: string | null;
  token: string;
}