import { Schema } from "mongoose";
import { model } from "mongoose";

const certificateSchema = new Schema({
    course: String,
    certificateId: Number,   
    candidatename: String,
    grade: String,
    date: Number
});


const Certificates = model("Certificates", certificateSchema);

export default Certificates;
