import mongoose, { Schema, Document } from 'mongoose';

export interface ISearch extends Document {
  query?: string;
  filters?: {
    level?: string;
    destination?: string;
    field?: string;
  };
  searchedAt: Date;
  userId?: mongoose.Types.ObjectId;
  sessionId?: string;
}

const SearchSchema: Schema = new Schema({
  query: String,
  filters: {
    level: String,
    destination: String,
    field: String
  },
  searchedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  sessionId: String
}, { timestamps: true });

export default mongoose.model<ISearch>('Search', SearchSchema);
