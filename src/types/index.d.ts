declare namespace GlobalTypes {
  type User = {
    userid: string;
    username: string;
    password: string;
  };
  type Employee = {
    empId: number;
    imgURL: string;
    namePrefix: string;
    name: string;
    subject: string;
    designation: string;
    department: string;
    qualifications: Qualification[];
    experience: Experience[];
  };

  type Qualification = {
    degree: string;
    institute: string;
    date: string;
  };
  type Experience = {
    designation: string;
    institue: string;
    date: string;
  };
}

declare namespace Express {
  interface Request {
    user: GlobalTypes.User & { _id: import("mongoose").Types.ObjectId };
  }
}
