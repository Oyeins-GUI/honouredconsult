import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  university: mongoose.Types.ObjectId;
  degree: 'Bachelor' | 'Master' | 'PhD' | 'Diploma';
  duration: string;
  tuitionFee: number;
  intakeMonths: string[];
  requirements: {
    ielts: number;
    toefl?: number;
    gpa: number;
    documents: string[];
  };
  tags: string[];
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  degree: { 
    type: String, 
    enum: ['Bachelor', 'Master', 'PhD', 'Diploma'], 
    required: true 
  },
  duration: { type: String, required: true },
  tuitionFee: { type: Number, required: true },
  intakeMonths: [{ type: String }],
  requirements: {
    ielts: { type: Number, required: true },
    toefl: Number,
    gpa: { type: Number, required: true },
    documents: [{ type: String }]
  },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', CourseSchema);