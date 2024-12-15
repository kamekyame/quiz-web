export type SignUpReq = {
  username: string;
  password: string;
  inviteCode: string;
};

export type SignUpRes = {
  username: string;
};

export type SignInReq = {
  username: string;
  password: string;
};

export type SignInRes = {
  username: string;
};

export type ApiError = {
  error: { code: number; message: string };
};
