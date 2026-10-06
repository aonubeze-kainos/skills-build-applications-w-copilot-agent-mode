import { model, Schema, Types } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    team: { type: Types.ObjectId, ref: 'Team' },
    period: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, points: -1 });

export default model('Leaderboard', leaderboardSchema);
