import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema<GlobalTypes.Employee>({
  empId: { type: Number },
  imgURL: { type: String },
  namePrefix: { type: String },
  name: { type: String },
  subject: { type: String },
  designation: { type: String },
  department: { type: String },
  qualifications: [
    {
      degree: { type: String },
      institute: { type: String },
      date: { type: String },
    },
  ],
  experience: [
    {
      designation: { type: String },
      institue: { type: String },
      date: { type: String },
    },
  ],
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
