import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: mongoose.Types.ObjectId;
  featuredImage?: string;
  tags: string[];
  category: string;
  published: boolean;
  publishedAt?: Date;
  views: number;
  likes: number;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  featuredImage: String,
  tags: [{ type: String }],
  category: { type: String, required: true },
  published: { type: Boolean, default: false },
  publishedAt: Date,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

// Create slug from title before saving
BlogSchema.pre<IBlog>('save', async function() {
  if (this.isModified('title')) {
    const title = this.title as string;
    this.slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

export default mongoose.model<IBlog>('Blog', BlogSchema);
