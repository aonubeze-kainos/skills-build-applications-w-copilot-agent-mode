import { model, Schema, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: '' },
    members: [{ type: Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default model('Team', teamSchema);
