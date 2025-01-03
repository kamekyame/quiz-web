export type SignUpReq = {
  username: string;
  password: string;
  inviteCode: string;
};

export type SignUpRes = {
  accessToken: string;
};

export type SignInReq = {
  username: string;
  password: string;
};

export type SignInRes = {
  accessToken: string;
};

export type GetMeRes = {
  username: string;
  role: string;
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

export type GetQuestionAnswerRes = {
  // サーバー側がtypoしてる
  choiseId: number;
};

export type Choice = {
  choiceId: number;
  text: string;
};

export type PostStatusReq = {
  status: string;
  questionId?: number;
};

export type PostQuestionReq = {
  questionId: number;
  imageUrl: string;
  choices: Choice[];
  correctChoiceId: number;
};

export type GetQuestionForProjectorRes = {
  questionId: number;
  imageUrl: string;
  choices: Choice[];
  correctChoiceId: number;
};

export type Answer = {
  choiceId: number;
  count: number;
};

export type GetAnswersRes = {
  answers: Answer[];
};

export type GetRanking = {
  ranking: {
    rank: number;
    username: string;
    score: number;
  }[]
}

export type Status =
  | { status: 'waiting' | 'finish' | 'before' | 'none' } // none は初期描画時のフロント独自のステータス
  | { status: 'open' | 'close'; questionId: number };

export type ApiError = {
  error: { code: number; message: string };
};
