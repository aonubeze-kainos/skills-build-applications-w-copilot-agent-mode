import mongoose, { Types } from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const user = User;
const team = Team;
const activity = Activity;
const leaderboard = Leaderboard;
const workout = Workout;

type ActivitySeed = {
  user: Types.ObjectId;
  type: 'running' | 'walking' | 'strength';
  durationMinutes: number;
  distanceKm?: number;
  points: number;
  notes: string;
  daysAgo: number;
};

const ids = {
  teams: {
    striders: new Types.ObjectId('670000000000000000000001'),
    trailblazers: new Types.ObjectId('670000000000000000000002'),
  },
  users: {
    alex: new Types.ObjectId('670000000000000000000011'),
    jordan: new Types.ObjectId('670000000000000000000012'),
    riley: new Types.ObjectId('670000000000000000000013'),
    casey: new Types.ObjectId('670000000000000000000014'),
  },
  activities: [
    new Types.ObjectId('670000000000000000000021'),
    new Types.ObjectId('670000000000000000000022'),
    new Types.ObjectId('670000000000000000000023'),
    new Types.ObjectId('670000000000000000000024'),
    new Types.ObjectId('670000000000000000000025'),
    new Types.ObjectId('670000000000000000000026'),
    new Types.ObjectId('670000000000000000000027'),
    new Types.ObjectId('670000000000000000000028'),
    new Types.ObjectId('670000000000000000000029'),
    new Types.ObjectId('67000000000000000000002a'),
    new Types.ObjectId('67000000000000000000002b'),
    new Types.ObjectId('67000000000000000000002c'),
  ],
  leaderboard: [
    new Types.ObjectId('670000000000000000000031'),
    new Types.ObjectId('670000000000000000000032'),
    new Types.ObjectId('670000000000000000000033'),
    new Types.ObjectId('670000000000000000000034'),
    new Types.ObjectId('670000000000000000000035'),
    new Types.ObjectId('670000000000000000000036'),
  ],
  workouts: [
    new Types.ObjectId('670000000000000000000041'),
    new Types.ObjectId('670000000000000000000042'),
    new Types.ObjectId('670000000000000000000043'),
    new Types.ObjectId('670000000000000000000044'),
  ],
};

/** Seed the octofit_db database with test data. */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    const seededUserIds = Object.values(ids.users);
    const seededTeamIds = Object.values(ids.teams);

    await leaderboard.deleteMany({ _id: { $in: ids.leaderboard } });
    await activity.deleteMany({ _id: { $in: ids.activities } });
    await workout.deleteMany({ _id: { $in: ids.workouts } });
    await team.deleteMany({ _id: { $in: seededTeamIds } });
    await user.deleteMany({ _id: { $in: seededUserIds } });

    const users = await user.insertMany([
      {
        _id: ids.users.alex,
        username: 'alex-morgan',
        email: 'alex.morgan@example.com',
        displayName: 'Alex Morgan',
        team: ids.teams.striders,
        points: 420,
      },
      {
        _id: ids.users.jordan,
        username: 'jordan-lee',
        email: 'jordan.lee@example.com',
        displayName: 'Jordan Lee',
        team: ids.teams.striders,
        points: 365,
      },
      {
        _id: ids.users.riley,
        username: 'riley-chen',
        email: 'riley.chen@example.com',
        displayName: 'Riley Chen',
        team: ids.teams.trailblazers,
        points: 510,
      },
      {
        _id: ids.users.casey,
        username: 'casey-patel',
        email: 'casey.patel@example.com',
        displayName: 'Casey Patel',
        team: ids.teams.trailblazers,
        points: 290,
      },
    ]);

    const teams = await team.insertMany([
      {
        _id: ids.teams.striders,
        name: 'Stellar Striders',
        description: 'A steady team focused on building healthy running and walking habits.',
        members: [ids.users.alex, ids.users.jordan],
        points: 785,
      },
      {
        _id: ids.teams.trailblazers,
        name: 'Trail Blazers',
        description: 'A versatile crew mixing outdoor cardio with strength sessions.',
        members: [ids.users.riley, ids.users.casey],
        points: 800,
      },
    ]);

    const today = new Date();
    const activityRecords: ActivitySeed[] = [
      { user: ids.users.alex, type: 'running', durationMinutes: 35, distanceKm: 5, points: 180, notes: 'Easy after-school run', daysAgo: 0 },
      { user: ids.users.alex, type: 'walking', durationMinutes: 30, distanceKm: 2.4, points: 120, notes: 'Lunch-break walk', daysAgo: 2 },
      { user: ids.users.alex, type: 'strength', durationMinutes: 25, points: 120, notes: 'Bodyweight circuit', daysAgo: 4 },
      { user: ids.users.jordan, type: 'running', durationMinutes: 28, distanceKm: 3.8, points: 135, notes: 'Neighborhood jog', daysAgo: 1 },
      { user: ids.users.jordan, type: 'strength', durationMinutes: 30, points: 110, notes: 'Core and mobility', daysAgo: 3 },
      { user: ids.users.jordan, type: 'walking', durationMinutes: 30, distanceKm: 2.2, points: 120, notes: 'Weekend walk', daysAgo: 5 },
      { user: ids.users.riley, type: 'running', durationMinutes: 42, distanceKm: 6.2, points: 200, notes: 'River trail run', daysAgo: 0 },
      { user: ids.users.riley, type: 'strength', durationMinutes: 40, points: 160, notes: 'Full-body strength', daysAgo: 2 },
      { user: ids.users.riley, type: 'walking', durationMinutes: 38, distanceKm: 3, points: 150, notes: 'Hills and steps', daysAgo: 4 },
      { user: ids.users.casey, type: 'running', durationMinutes: 24, distanceKm: 3.2, points: 100, notes: 'Short morning run', daysAgo: 1 },
      { user: ids.users.casey, type: 'strength', durationMinutes: 22, points: 90, notes: 'Beginner strength set', daysAgo: 3 },
      { user: ids.users.casey, type: 'walking', durationMinutes: 25, distanceKm: 2, points: 100, notes: 'Evening walk', daysAgo: 6 },
    ];

    const activities = await activity.insertMany(
      activityRecords.map((record, index) => {
        const completedAt = new Date(today);
        completedAt.setDate(today.getDate() - record.daysAgo);
        return {
          _id: ids.activities[index],
          user: record.user,
          type: record.type,
          durationMinutes: record.durationMinutes,
          ...(record.distanceKm === undefined ? {} : { distanceKm: record.distanceKm }),
          points: record.points,
          notes: record.notes,
          completedAt,
        };
      }),
    );

    const period = today.toISOString().slice(0, 7);
    const leaderboardEntries = await leaderboard.insertMany([
      { _id: ids.leaderboard[0], user: ids.users.riley, period, points: 510 },
      { _id: ids.leaderboard[1], user: ids.users.alex, period, points: 420 },
      { _id: ids.leaderboard[2], user: ids.users.jordan, period, points: 365 },
      { _id: ids.leaderboard[3], user: ids.users.casey, period, points: 290 },
      { _id: ids.leaderboard[4], team: ids.teams.trailblazers, period, points: 800 },
      { _id: ids.leaderboard[5], team: ids.teams.striders, period, points: 785 },
    ]);

    const workouts = await workout.insertMany([
      {
        _id: ids.workouts[0],
        name: 'Starter Strength Circuit',
        category: 'strength',
        level: 'beginner',
        durationMinutes: 20,
        description: 'A low-equipment circuit with bodyweight squats, wall push-ups, and a gentle cooldown.',
        tags: ['strength', 'bodyweight', 'starter'],
      },
      {
        _id: ids.workouts[1],
        name: 'Walk-Run Builder',
        category: 'cardio',
        level: 'beginner',
        durationMinutes: 25,
        description: 'Alternate comfortable walking and easy jogging intervals to build endurance gradually.',
        tags: ['running', 'walking', 'endurance'],
      },
      {
        _id: ids.workouts[2],
        name: 'Steady 5K Session',
        category: 'cardio',
        level: 'intermediate',
        durationMinutes: 35,
        description: 'A relaxed warm-up, steady conversational-pace run, and short cooldown walk.',
        tags: ['running', 'endurance', 'outdoors'],
      },
      {
        _id: ids.workouts[3],
        name: 'Mobility and Core Reset',
        category: 'mobility',
        level: 'intermediate',
        durationMinutes: 18,
        description: 'Gentle mobility flows and controlled core exercises for recovery days.',
        tags: ['mobility', 'core', 'recovery'],
      },
    ]);

    console.log(
      `Database seeding complete: ${users.length} users, ${teams.length} teams, ` +
        `${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, ` +
        `and ${workouts.length} workouts.`,
    );
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
