import mongoose, { Schema, Document } from 'mongoose';

export interface INotificationSettings extends Document {
  ownerEmail: string;
  enableNotifications: boolean;
  notifyOnSubmission: boolean;
  notifyOnApplication: boolean;
  notifyOnSearch: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const NotificationSettingsSchema: Schema = new Schema({
  ownerEmail: { type: String, required: true },
  enableNotifications: { type: Boolean, default: true },
  notifyOnSubmission: { type: Boolean, default: true },
  notifyOnApplication: { type: Boolean, default: true },
  notifyOnSearch: { type: Boolean, default: false },
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<INotificationSettings>('NotificationSettings', NotificationSettingsSchema);
