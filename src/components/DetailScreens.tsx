import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Bell, Check, X, History, Trophy, Crown, Target, Calendar, BarChart3, TrendingUp, Sparkles, Leaf, Flame, Star, Heart, Settings, Lock, Eye, Zap } from 'lucide-react';

interface Action {
  id: string;
  action: string;
  points: number;
  time: string;
  date?: string;
  category?: string;
}

interface Notification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  type: 'achievement' | 'challenge' | 'reward' | 'general';
}

interface RedeemedReward {
  id: string;
  reward: string;
  points: number;
  category: string;
  redeemedAt: string;
}

// Enhanced Back Button Component
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, x: -3 }}
      whileTap={{ scale: 0.9 }}
      className="border-[3px] border-gray-900 p-2 bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      <ArrowLeft className="w-5 h-5" />
    </motion.button>
  );
}

// Enhanced Notifications Screen
interface NotificationsScreenProps {
  notifications: Notification[];
  onBack: () => void;
  onMarkAsRead: (id: string) => void;
}

export function NotificationsScreen({ notifications, onBack, onMarkAsRead }: NotificationsScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b-[3px] border-gray-900 bg-white shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">Notifications</div>
          </div>
          <div className="border-2 border-gray-900 bg-gray-100 px-2 py-0.5 text-xs">
            {notifications.filter(n => !n.read).length} new
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-auto p-4 space-y-2">
        <AnimatePresence mode="popLayout">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ delay: index * 0.05, type: 'spring', damping: 20 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`border-[3px] border-gray-900 p-3 shadow-md relative overflow-hidden ${
                !notif.read ? 'bg-gradient-to-r from-gray-50 to-white' : 'bg-white'
              }`}
              onClick={() => !notif.read && onMarkAsRead(notif.id)}
            >
              {!notif.read && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <div className="flex gap-3 relative z-10">
                <div className={`border-[3px] border-gray-900 p-2 flex-shrink-0 ${
                  !notif.read ? 'bg-gray-900' : 'bg-white'
                }`}>
                  {notif.type === 'achievement' && <Trophy className={`w-4 h-4 ${!notif.read ? 'text-white' : ''}`} />}
                  {notif.type === 'challenge' && <Target className={`w-4 h-4 ${!notif.read ? 'text-white' : ''}`} />}
                  {notif.type === 'reward' && <Sparkles className={`w-4 h-4 ${!notif.read ? 'text-white' : ''}`} />}
                  {notif.type === 'general' && <Bell className={`w-4 h-4 ${!notif.read ? 'text-white' : ''}`} />}
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1">{notif.text}</div>
                  <div className="text-xs text-gray-600">{notif.time}</div>
                </div>
                {!notif.read && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-gray-900 rounded-full flex-shrink-0 mt-2"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Enhanced History Screen
interface HistoryScreenProps {
  actions: Action[];
  onBack: () => void;
}

export function HistoryScreen({ actions, onBack }: HistoryScreenProps) {
  const groupedActions = actions.reduce((acc, action) => {
    const date = action.date || 'Unknown';
    if (!acc[date]) acc[date] = [];
    acc[date].push(action);
    return acc;
  }, {} as Record<string, Action[]>);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b-[3px] border-gray-900 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">Activity History</div>
            <div className="text-xs text-gray-600 mt-1">{actions.length} total actions</div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {Object.entries(groupedActions).map(([date, dateActions], groupIndex) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <div className="border-b-2 border-gray-900 inline-block px-2 mb-2 text-sm">{date}</div>
            <div className="space-y-2">
              {dateActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="border-[3px] border-gray-900 p-3 bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-[3px] border-gray-900 bg-white flex items-center justify-center">
                      {action.category === 'Recycling' && <Leaf className="w-4 h-4" />}
                      {action.category === 'Transportation' && <Zap className="w-4 h-4" />}
                      {action.category === 'Reusables' && <Heart className="w-4 h-4" />}
                      {action.category === 'Energy Saving' && <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm">{action.action}</div>
                      <div className="text-xs text-gray-600">{action.category}</div>
                    </div>
                  </div>
                  <div className="border-[3px] border-gray-900 bg-white px-3 py-1 text-sm">
                    +{action.points}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Enhanced Statistics Screen
interface StatisticsScreenProps {
  totalPoints: number;
  weeklyPoints: number;
  dayStreak: number;
  actions: Action[];
  onBack: () => void;
}

export function StatisticsScreen({ totalPoints, weeklyPoints, dayStreak, actions, onBack }: StatisticsScreenProps) {
  const categoryPoints = actions.reduce((acc, action) => {
    const cat = action.category || 'Other';
    acc[cat] = (acc[cat] || 0) + action.points;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryPoints).sort((a, b) => b[1] - a[1]);
  const maxPoints = Math.max(...Object.values(categoryPoints));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b-[3px] border-gray-900 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">Statistics</div>
          </div>
        </div>
      </div>

      {/* Stats Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Points', value: totalPoints.toLocaleString(), icon: <Sparkles className="w-5 h-5" /> },
            { label: 'This Week', value: weeklyPoints.toLocaleString(), icon: <Calendar className="w-5 h-5" /> },
            { label: 'Day Streak', value: `${dayStreak} days`, icon: <Flame className="w-5 h-5" /> },
            { label: 'Total Actions', value: actions.length, icon: <Target className="w-5 h-5" /> }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="border-[3px] border-gray-900 p-3 bg-white shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-xs text-gray-600 text-center mb-1">{stat.label}</div>
              <div className="border-b-[3px] border-gray-900 inline-block px-2 py-0.5 text-center w-full">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-[3px] border-gray-900 p-4 bg-white shadow-md"
        >
          <div className="border-b-[3px] border-gray-900 inline-block px-2 mb-4 shadow-sm">Points by Category</div>
          <div className="space-y-3">
            {sortedCategories.map(([category, points], i) => {
              const percentage = (points / maxPoints) * 100;
              return (
                <motion.div
                  key={category}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category}</span>
                    <span className="border-b border-gray-900 px-1">{points} pts</span>
                  </div>
                  <div className="h-3 border-[3px] border-gray-900 bg-white overflow-hidden">
                    <motion.div
                      className="h-full bg-gray-900 relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.1, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Enhanced Challenge Screen
interface ChallengeScreenProps {
  progress: number;
  onComplete: () => void;
  onBack: () => void;
}

export function ChallengeScreen({ progress, onComplete, onBack }: ChallengeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b-[3px] border-gray-900 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">Daily Challenge</div>
          </div>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="flex-1 p-4 flex flex-col justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-[3px] border-gray-900 p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg mb-6 relative overflow-hidden"
        >
          {progress >= 3 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-2 right-2"
            >
              <Trophy className="w-16 h-16 text-gray-200" />
            </motion.div>
          )}
          <div className="relative z-10">
            <div className="text-center mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <Target className="w-16 h-16 mx-auto mb-3" />
              </motion.div>
              <div className="border-b-[4px] border-gray-900 inline-block px-3 py-1 text-xl mb-2">
                Use Recycling Bin
              </div>
              <div className="text-sm text-gray-600">Complete 3 times today</div>
            </div>

            <div className="flex justify-center gap-4 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i < progress ? 1 : 0.9,
                    backgroundColor: i < progress ? '#1a1a1a' : '#ffffff'
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 border-[4px] border-gray-900 flex items-center justify-center shadow-md"
                >
                  {i < progress && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                    >
                      <Check className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-4">
              <div className="border-2 border-gray-900 bg-gray-100 inline-block px-3 py-1 text-sm">
                Progress: {progress}/3
              </div>
            </div>

            {progress < 3 ? (
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="w-full border-[3px] border-gray-900 bg-gray-900 text-white p-3 shadow-lg"
              >
                Mark as Complete
              </motion.button>
            ) : (
              <div className="border-[3px] border-gray-900 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-3 text-center shadow-lg">
                ✓ Challenge Completed! +50 pts
              </div>
            )}
          </div>
        </motion.div>

        {/* Reward Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border-[3px] border-dashed border-gray-400 p-4 bg-gray-50"
        >
          <div className="text-xs text-gray-600">
            <div className="border-b border-gray-900 inline-block mb-2">Reward:</div>
            <ul className="space-y-1 mt-2 ml-4">
              <li>• Earn 50 bonus points</li>
              <li>• Contribute to your weekly goal</li>
              <li>• Build your day streak</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Redemption History Screen
interface RedemptionHistoryScreenProps {
  redeemedRewards: RedeemedReward[];
  onBack: () => void;
}

export function RedemptionHistoryScreen({ redeemedRewards, onBack }: RedemptionHistoryScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b-[3px] border-gray-900 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">Redemption History</div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-auto p-4">
        {redeemedRewards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-[3px] border-dashed border-gray-400 p-6 text-center bg-gray-50 mt-8"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <div className="text-sm text-gray-600">No rewards redeemed yet</div>
            <div className="text-xs text-gray-500 mt-1">Start redeeming rewards to see your history</div>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {redeemedRewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="border-[3px] border-gray-900 p-3 bg-white shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">{reward.reward}</div>
                  <div className="border-2 border-gray-900 bg-gray-100 px-2 py-0.5 text-xs">
                    {reward.points} pts
                  </div>
                </div>
                <div className="text-xs text-gray-600">Redeemed on {reward.redeemedAt}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Achievements Screen
interface AchievementsScreenProps {
  onBack: () => void;
}

export function AchievementsScreen({ onBack }: AchievementsScreenProps) {
  const achievements = [
    { name: 'First Steps', desc: 'Complete your first action', unlocked: true, icon: <Star /> },
    { name: 'Week Warrior', desc: 'Maintain a 7-day streak', unlocked: true, icon: <Flame /> },
    { name: 'Recycler Pro', desc: 'Recycle 50 items', unlocked: true, icon: <Leaf /> },
    { name: 'Green Commuter', desc: 'Use public transport 20 times', unlocked: true, icon: <Zap /> },
    { name: 'Point Master', desc: 'Reach 1000 points', unlocked: true, icon: <Sparkles /> },
    { name: 'Eco Champion', desc: 'Complete 10 challenges', unlocked: true, icon: <Trophy /> },
    { name: 'Water Saver', desc: 'Use refill station 30 times', unlocked: true, icon: <Heart /> },
    { name: 'Energy Guru', desc: 'Save energy 25 times', unlocked: true, icon: <Zap /> },
    { name: 'Top 50', desc: 'Reach top 50 leaderboard', unlocked: false, icon: <Crown /> },
    { name: 'Month Streak', desc: 'Maintain a 30-day streak', unlocked: false, icon: <Calendar /> },
    { name: 'Elite Green', desc: 'Reach 5000 points', unlocked: false, icon: <Trophy /> },
    { name: 'Legend', desc: 'Reach #1 on leaderboard', unlocked: false, icon: <Crown /> }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b-[3px] border-gray-900 bg-white shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">Achievements</div>
          </div>
          <div className="border-2 border-gray-900 bg-gray-100 px-2 py-0.5 text-xs">
            {unlockedCount}/{achievements.length}
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05, type: 'spring' }}
              whileHover={achievement.unlocked ? { scale: 1.05, y: -3 } : {}}
              className={`border-[3px] border-gray-900 p-3 shadow-md relative overflow-hidden ${
                achievement.unlocked ? 'bg-white' : 'bg-gray-100'
              }`}
            >
              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 border-2 border-gray-900 bg-gray-900 text-white flex items-center justify-center"
                >
                  <Check className="w-3 h-3" />
                </motion.div>
              )}
              <div className={`w-12 h-12 border-[3px] border-gray-900 mx-auto mb-2 flex items-center justify-center ${
                achievement.unlocked ? 'bg-white' : 'bg-gray-50'
              }`}>
                <div className={achievement.unlocked ? '' : 'text-gray-400'}>
                  {achievement.icon}
                </div>
              </div>
              <div className={`text-sm text-center mb-1 ${achievement.unlocked ? '' : 'text-gray-500'}`}>
                {achievement.name}
              </div>
              <div className="text-xs text-center text-gray-600">
                {achievement.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Leaderboard Screen
interface LeaderboardScreenProps {
  currentUserRank: number;
  currentUserPoints: number;
  onBack: () => void;
}

export function LeaderboardScreen({ currentUserRank, currentUserPoints, onBack }: LeaderboardScreenProps) {
  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 2450, badge: '🏆' },
    { rank: 2, name: 'Sarah Johnson', points: 2380, badge: '🥈' },
    { rank: 3, name: 'Mike Williams', points: 2150, badge: '🥉' },
    { rank: 4, name: 'Emma Brown', points: 1980 },
    { rank: 5, name: 'James Davis', points: 1850 },
    { rank: 24, name: 'You', points: currentUserPoints, highlight: true }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b-[3px] border-gray-900 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">Weekly Leaderboard</div>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.08, type: 'spring' }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`border-[3px] border-gray-900 p-3 flex items-center justify-between shadow-md hover:shadow-lg transition-all ${
              entry.highlight 
                ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white' 
                : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 border-[3px] flex items-center justify-center ${
                entry.highlight 
                  ? 'border-white bg-white text-gray-900' 
                  : 'border-gray-900 bg-gray-50'
              }`}>
                {entry.rank <= 3 ? (
                  <span className="text-lg">{entry.badge}</span>
                ) : (
                  <span className="text-sm">#{entry.rank}</span>
                )}
              </div>
              <div>
                <div className="text-sm">{entry.name}</div>
                <div className={`text-xs ${entry.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                  This week
                </div>
              </div>
            </div>
            <div className={`border-[3px] px-3 py-1 text-sm ${
              entry.highlight 
                ? 'border-white bg-white text-gray-900' 
                : 'border-gray-900 bg-white'
            }`}>
              {entry.points} pts
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Settings Screen
interface SettingsScreenProps {
  settingType: string;
  onBack: () => void;
}

export function SettingsScreen({ settingType, onBack }: SettingsScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b-[3px] border-gray-900 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">
              {settingType.charAt(0).toUpperCase() + settingType.slice(1)} Settings
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-4">
        <div className="border-[3px] border-dashed border-gray-400 p-6 text-center bg-gray-50">
          <Settings className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <div className="text-sm text-gray-600">Settings options coming soon</div>
        </div>
      </div>
    </motion.div>
  );
}
