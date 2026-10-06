import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
