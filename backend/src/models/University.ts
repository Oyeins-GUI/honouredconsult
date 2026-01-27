import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversity extends Document {
  name: string;
  country: string;
  city: string;
  description: string;
  website: string;
  logo?: string;
  ranking?: {
    world?: number;
    national?: number;
  };
  tuitionRange: {
    min: number;
    max: number;
    currency: string;
  };
  programs: string[];
  facilities: string[];
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  admissionRequirements: {
    ielts?: number;
    toefl?: number;
    minGPA?: number;
  };
}

const UniversitySchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  logo: String,
  ranking: {
    world: Number,
    national: Number
  },
  tuitionRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
  },
  programs: [{ type: String }],
  facilities: [{ type: String }],
  contact: {
    email: { type: String, required: true },
    phone: String,
    address: String
  },
  admissionRequirements: {
    ielts: Number,
    toefl: Number,
    minGPA: Number
  }
}, { timestamps: true });

export default mongoose.model<IUniversity>('University', UniversitySchema);
