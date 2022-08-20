declare namespace GlobalTypes {
  type User = {
    userid: string;
    username: string;
    password: string;
  };
}

declare namespace Express {
  interface Request {
    user: GlobalTypes.User & { _id: import("mongoose").Types.ObjectId };
  }
}
