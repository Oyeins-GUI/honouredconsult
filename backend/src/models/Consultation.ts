import mongoose, { Schema, Document } from 'mongoose';

export interface IConsultation extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  destination?: string;
  service?: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'completed';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  notes?: string;
}

const ConsultationSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: String,
  destination: String,
  service: String,
  message: String,
  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'contacted', 'completed'], 
    default: 'pending' 
  },
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: Date,
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: String
}, { timestamps: true });

export default mongoose.model<IConsultation>('Consultation', ConsultationSchema);
