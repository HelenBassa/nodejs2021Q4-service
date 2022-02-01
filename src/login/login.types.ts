export type LoginBody = {
  login: string;
  password: string;
};

export type PostLoginReq = {
  body: LoginBody;
};
