import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  university: mongoose.Types.ObjectId;
  status: 'draft' | 'submitted' | 'under-review' | 'accepted' | 'rejected' | 'waitlisted';
  documents: {
    type: string;
    url: string;
    uploadedAt: Date;
  }[];
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    nationality: string;
    passportNumber?: string;
  };
  academicInfo: {
    currentLevel: string;
    institution: string;
    gpa: number;
    graduationDate: Date;
    testScores?: {
      ielts?: number;
      toefl?: number;
      gre?: number;
      gmat?: number;
    };
  };
  notes?: string;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
}

const ApplicationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  status: { 
    type: String, 
    enum: ['draft', 'submitted', 'under-review', 'accepted', 'rejected', 'waitlisted'], 
    default: 'draft' 
  },
  documents: [{
    type: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  }],
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    passportNumber: String
  },
  academicInfo: {
    currentLevel: { type: String, required: true },
    institution: { type: String, required: true },
    gpa: { type: Number, required: true },
    graduationDate: { type: Date, required: true },
    testScores: {
      ielts: Number,
      toefl: Number,
      gre: Number,
      gmat: Number
    }
  },
  notes: String,
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model<IApplication>('Application', ApplicationSchema);
