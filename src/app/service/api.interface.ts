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

export type GetQuestionRes = {
  questionId: number;
  imageUrl: string;
  choices: Choice[];
  correctChoiceId: number;
};

export type PostQuestionAnswerReq = {
  choiceId: number;
};

export type Choice = {
  choiceId: number;
  text: string;
};

export type ApiError = {
  error: { code: number; message: string };
};
