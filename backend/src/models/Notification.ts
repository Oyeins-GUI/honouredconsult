import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  type: 'consultation' | 'application' | 'search' | 'system';
  title: string;
  message: string;
  recipient: mongoose.Types.ObjectId;
  read: boolean;
  data?: any;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  type: { 
    type: String, 
    enum: ['consultation', 'application', 'search', 'system'], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  read: { type: Boolean, default: false },
  data: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', NotificationSchema);
