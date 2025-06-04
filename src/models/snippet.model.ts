import { Document, Schema, model, Types } from 'mongoose';

export interface ISnippet extends Document {
  _id: Types.ObjectId;
  text: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

const SnippetSchema = new Schema<ISnippet>(
  {
    text: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true },
);

const Snippet = model<ISnippet>('Snippet', SnippetSchema);
export default Snippet;
