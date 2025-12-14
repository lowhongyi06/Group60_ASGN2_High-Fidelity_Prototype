import { useState } from 'react';
import { ChevronRight, Bell, Leaf, Trophy, TrendingUp, Sparkles, Check, Circle, X, Plus, Square, MapPin, Gift, User, History, ArrowLeft, BarChart3, Clock, Target, Crown, Star, Flame, Settings, Calendar, Zap, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface Action {
  id: string;
  action: string;
  points: number;
  time: string;
  date?: string;
  category?: string;
}

interface Reward {
  id: string;
  reward: string;
  points: number;
  category: string;
}

interface RedeemedReward extends Reward {
  redeemedAt: string;
}

interface Notification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  type: 'achievement' | 'challenge' | 'reward' | 'general';
}

// Enhanced Nav Button Component
export function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={`flex flex-col items-center gap-1 py-1 px-2 relative ${active ? 'opacity-100' : 'opacity-50'}`}
    >
      <motion.div
        animate={{
          scale: active ? [1, 1.15, 1] : 1,
          backgroundColor: active ? '#16a34a' : '#ffffff',
          borderWidth: active ? '3px' : '2px'
        }}
        transition={{ duration: 0.3 }}
        className={`border-green-600 p-1.5 rounded-lg ${active ? 'text-white shadow-lg' : 'text-green-600'}`}
      >
        {icon}
      </motion.div>
      <motion.span 
        className={`text-[9px] ${active ? 'text-green-700' : 'text-gray-600'}`}
        animate={{ fontWeight: active ? 600 : 400 }}
      >
        {label}
      </motion.span>
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-green-500 rounded-full"
          style={{ x: '-50%' }}
        />
      )}
    </motion.button>
  );
}

// Enhanced Home Screen
interface HomeScreenProps {
  totalPoints: number;
  weeklyPoints: number;
  dayStreak: number;
  recentActions: Action[];
  dailyChallengeProgress: number;
  onCompleteChallengeStep: () => void;
  notifications: number;
  onOpenNotifications: () => void;
  onOpenHistory: () => void;
  onOpenStats: () => void;
  onOpenChallenge: () => void;
  showWelcomeHint: boolean;
  onDismissHint: () => void;
}

export function HomeScreen({ 
  totalPoints, 
  weeklyPoints, 
  dayStreak, 
  recentActions,
  dailyChallengeProgress,
  onCompleteChallengeStep,
  notifications,
  onOpenNotifications,
  onOpenHistory,
  onOpenStats,
  onOpenChallenge,
  showWelcomeHint,
  onDismissHint
}: HomeScreenProps) {
  const weeklyPercentage = Math.min((weeklyPoints / 250) * 100, 100);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-4 h-full flex flex-col overflow-auto"
    >
      {/* Enhanced Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-4"
      >
        <div>
          <div className="border-b-[3px] border-gray-900 inline-block px-2 mb-1 shadow-sm">MY TRACK</div>
          <div className="text-xs text-gray-600">Welcome back, Student</div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="border-[3px] border-gray-900 p-2 relative shadow-md hover:shadow-lg transition-shadow"
          onClick={onOpenNotifications}
        >
          <motion.div
            animate={notifications > 0 ? { rotate: [0, -15, 15, -15, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Bell className="w-5 h-5" />
          </motion.div>
          {notifications > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-gray-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] border-2 border-white"
            >
              {notifications}
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Enhanced Points Card */}
      <motion.button
        onClick={onOpenStats}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="border-[3px] border-green-500 rounded-xl p-4 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden text-left shadow-lg hover:shadow-xl transition-shadow mb-4"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-green-700">Total Green Points</div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Leaf className="w-6 h-6 text-green-600" />
              </motion.div>
              <ChevronRight className="w-4 h-4 text-green-400" />
            </div>
          </div>
          <motion.div
            key={totalPoints}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="border-b-[5px] border-green-600 inline-block px-3 py-1 text-2xl mb-3 bg-white shadow-sm text-green-900"
          >
            {totalPoints.toLocaleString()}
          </motion.div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-green-700">
              <span>Weekly Goal: 250 pts</span>
              <span className="border-b border-green-600 px-1 bg-white/50">{weeklyPoints}/250</span>
            </div>
            <div className="h-3 border-[3px] border-green-500 bg-white overflow-hidden relative rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 relative"
                initial={{ width: 0 }}
                animate={{ width: `${weeklyPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Enhanced Quick Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3 mb-4"
      >
        <motion.div 
          whileHover={{ scale: 1.05, y: -3 }}
          className="border-[3px] border-orange-400 rounded-lg p-3 bg-gradient-to-br from-orange-50 to-amber-50 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <div className="text-xs text-orange-700">Day Streak</div>
            </div>
            <div className="border-b-[3px] border-orange-600 inline-block px-2 py-0.5 bg-white/70 text-orange-900">{dayStreak} days</div>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05, y: -3 }}
          className="border-[3px] border-amber-400 rounded-lg p-3 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-100 to-yellow-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              <div className="text-xs text-amber-700">Achievements</div>
            </div>
            <div className="border-b-[3px] border-amber-600 inline-block px-2 py-0.5 bg-white/70 text-amber-900">8/20</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Recent Activities */}
      <div className="mb-4">
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onOpenHistory}
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 mb-3 group"
        >
          <div className="border-b-[3px] border-teal-600 inline-block px-2 shadow-sm text-teal-900">Recent Activities</div>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-teal-600" />
          {recentActions.length > 0 && recentActions[0].time === 'Just now' && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="border-2 border-emerald-600 bg-emerald-100 px-2 py-0.5 text-[10px] shadow-sm text-emerald-800 rounded"
            >
              NEW
            </motion.div>
          )}
        </motion.button>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {recentActions.slice(0, 3).map((item, index) => {
              const getCategoryColor = (category: string | undefined) => {
                if (!category) return { bg: 'bg-teal-50', border: 'border-teal-400', text: 'text-teal-700', icon: 'bg-teal-500', iconBorder: 'border-teal-600' };
                if (category.toLowerCase().includes('recycl')) return { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700', icon: 'bg-green-500', iconBorder: 'border-green-600' };
                if (category.toLowerCase().includes('transport')) return { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700', icon: 'bg-blue-500', iconBorder: 'border-blue-600' };
                if (category.toLowerCase().includes('reus')) return { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-700', icon: 'bg-purple-500', iconBorder: 'border-purple-600' };
                if (category.toLowerCase().includes('energy') || category.toLowerCase().includes('water')) return { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-700', icon: 'bg-amber-500', iconBorder: 'border-amber-600' };
                return { bg: 'bg-teal-50', border: 'border-teal-400', text: 'text-teal-700', icon: 'bg-teal-500', iconBorder: 'border-teal-600' };
              };
              
              const colors = getCategoryColor(item.category);
              const isNew = item.time === 'Just now';
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring', damping: 20 }}
                  className={`border-[3px] ${isNew ? colors.iconBorder : colors.border} rounded-lg p-3 flex items-center justify-between shadow-md relative overflow-hidden ${
                    isNew ? `bg-gradient-to-r from-${colors.bg} to-white` : colors.bg
                  }`}
                >
                  {isNew && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent`}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    {isNew ? (
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 1, repeat: 2 }}
                        className={`w-8 h-8 border-[3px] ${colors.iconBorder} ${colors.icon} rounded-lg flex items-center justify-center shadow-md`}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : (
                      <div className={`w-8 h-8 border-[3px] ${colors.border} rounded-lg flex items-center justify-center bg-white shadow-sm`}>
                        <Circle className={`w-3 h-3 fill-current ${colors.text}`} />
                      </div>
                    )}
                    <div>
                      <div className={`text-sm ${colors.text}`}>{item.action}</div>
                      <div className="text-xs text-gray-600">{item.time}</div>
                    </div>
                  </div>
                  <motion.div
                    initial={isNew ? { scale: 1.5, rotate: -10 } : { scale: 1 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className={`border-[3px] ${colors.iconBorder} px-3 py-1 text-sm relative z-10 rounded ${
                      isNew ? `${colors.icon} text-white shadow-lg` : `bg-white ${colors.text}`
                    }`}
                  >
                    +{item.points}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Daily Challenge */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: dailyChallengeProgress < 3 ? 1.02 : 1, y: dailyChallengeProgress < 3 ? -3 : 0 }}
        whileTap={{ scale: dailyChallengeProgress < 3 ? 0.98 : 1 }}
        className={`border-[3px] rounded-xl p-4 text-left relative overflow-hidden shadow-lg hover:shadow-xl transition-all ${
          dailyChallengeProgress >= 3 
            ? 'border-amber-500 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 text-white' 
            : 'border-purple-400 bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50 hover:from-purple-100 hover:via-violet-100 hover:to-purple-100'
        }`}
        onClick={dailyChallengeProgress < 3 ? onCompleteChallengeStep : onOpenChallenge}
      >
        {dailyChallengeProgress >= 3 && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.15, scale: 1 }}
              className="absolute top-2 right-2"
            >
              <Trophy className="w-32 h-32" />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              animate={{ 
                background: [
                  'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  'linear-gradient(225deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </>
        )}
        {dailyChallengeProgress < 3 && (
          <motion.div
            className="absolute -right-8 -bottom-8 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Target className="w-32 h-32 text-purple-600" />
          </motion.div>
        )}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`border-b-[3px] inline-block px-2 text-sm shadow-sm rounded ${
                dailyChallengeProgress >= 3 ? 'border-white bg-white/20' : 'border-purple-600 text-purple-900'
              }`}>
                Today's Challenge
              </div>
              {dailyChallengeProgress < 3 && (
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="border-2 border-purple-600 bg-purple-100 px-2 py-0.5 text-[10px] text-purple-800 rounded"
                >
                  TAP
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-xs px-2 py-1 rounded ${
                dailyChallengeProgress >= 3 ? 'bg-white/20' : 'bg-purple-100 text-purple-800 border-2 border-purple-400'
              }`}>
                {dailyChallengeProgress >= 3 ? '✓ COMPLETE' : '+50 pts'}
              </div>
              {dailyChallengeProgress >= 3 && <ChevronRight className="w-4 h-4" />}
            </div>
          </div>
          <div className={`text-sm mb-3 ${dailyChallengeProgress >= 3 ? 'text-white' : 'text-purple-800'}`}>
            Use recycling bin 3 times today
          </div>
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: i === dailyChallengeProgress - 1 ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.5, type: 'spring', damping: 10 }}
                className={`flex-1 h-2 rounded-full relative overflow-hidden ${
                  dailyChallengeProgress >= 3
                    ? 'bg-white/30'
                    : i < dailyChallengeProgress 
                    ? 'bg-purple-500 border-2 border-purple-600' 
                    : 'bg-purple-200 border-2 border-purple-300'
                }`}
              >
                {i < dailyChallengeProgress && (
                  <motion.div
                    className={`absolute inset-0 ${
                      dailyChallengeProgress >= 3 
                        ? 'bg-gradient-to-r from-transparent via-white to-transparent' 
                        : 'bg-gradient-to-r from-transparent via-purple-300 to-transparent'
                    }`}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

// Track Screen Component
interface TrackScreenProps {
  onAddAction: (action: string, points: number, category: string) => void;
}

export function TrackScreen({ onAddAction }: TrackScreenProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customAction, setCustomAction] = useState('');

  const categories = [
    { 
      category: 'Recycling', 
      icon: <Circle className="w-4 h-4" />,
      actions: [
        { name: 'Recycled paper', points: 10 },
        { name: 'Recycled plastic bottle', points: 15 },
        { name: 'Recycled aluminum can', points: 12 },
        { name: 'Recycled e-waste', points: 20 }
      ], 
      pointRange: '10-20',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-700'
    },
    { 
      category: 'Transportation', 
      icon: <MapPin className="w-4 h-4" />,
      actions: [
        { name: 'Took public transport', points: 15 },
        { name: 'Walked to class', points: 20 },
        { name: 'Cycled to campus', points: 25 },
        { name: 'Carpooled with friends', points: 18 }
      ], 
      pointRange: '15-25',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700'
    },
    { 
      category: 'Reusables', 
      icon: <Heart className="w-4 h-4" />,
      actions: [
        { name: 'Used reusable bottle', points: 5 },
        { name: 'Brought own utensils', points: 8 },
        { name: 'Brought cloth bag', points: 7 },
        { name: 'Used food container', points: 10 }
      ], 
      pointRange: '5-10',
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-700'
    },
    { 
      category: 'Energy Saving', 
      icon: <Zap className="w-4 h-4" />,
      actions: [
        { name: 'Turned off lights', points: 5 },
        { name: 'Unplugged devices', points: 8 },
        { name: 'Took stairs', points: 10 },
        { name: 'Conserved water', points: 15 }
      ], 
      pointRange: '5-15',
      color: 'amber',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-500',
      textColor: 'text-amber-700'
    }
  ];

  const handleAddCustomAction = () => {
    if (customAction.trim()) {
      onAddAction(customAction, 10, 'Custom');
      setCustomAction('');
      setShowCustomDialog(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-4 space-y-4 h-full flex flex-col"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2"
      >
        <div className="border-b-[3px] border-gray-900 inline-block px-2 shadow-sm">Track Eco-Actions</div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="border-2 border-gray-900 bg-gray-100 px-2 py-0.5 text-[10px]"
        >
          SELECT ACTION
        </motion.div>
      </motion.div>
      
      {/* Enhanced Action Categories */}
      <div className="space-y-3 flex-1 overflow-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border-[3px] ${cat.borderColor} rounded-lg shadow-md overflow-hidden`}
          >
            <motion.button
              whileHover={{ backgroundColor: cat.color === 'green' ? '#f0fdf4' : cat.color === 'blue' ? '#eff6ff' : cat.color === 'purple' ? '#faf5ff' : '#fffbeb' }}
              whileTap={{ scale: 0.99 }}
              className={`w-full p-3 border-b-[3px] ${cat.borderColor} flex items-center justify-between ${cat.bgColor}`}
              onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
            >
              <div className="flex items-center gap-3">
                <div className={`border-[3px] ${cat.borderColor} p-1.5 bg-white rounded-lg ${cat.textColor}`}>
                  {cat.icon}
                </div>
                <span className={`text-sm ${cat.textColor}`}>{cat.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs border-b px-1 ${cat.borderColor.replace('border-', 'border-b-')} ${cat.textColor}`}>{cat.pointRange} pts</span>
                <motion.div
                  animate={{ rotate: expandedCategory === i ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={cat.textColor}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.button>
            <AnimatePresence>
              {expandedCategory === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`p-2 space-y-2 ${cat.bgColor}`}>
                    {cat.actions.map((action, j) => (
                      <motion.button
                        key={j}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: j * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full border-[3px] ${cat.borderColor} p-3 text-left text-sm flex items-center justify-between bg-white rounded-lg relative overflow-hidden shadow-sm hover:shadow-md transition-all group`}
                        onClick={() => onAddAction(action.name, action.points, cat.category)}
                      >
                        <motion.div
                          className={`absolute inset-0 ${cat.bgColor}`}
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10">{action.name}</span>
                        <div className="flex items-center gap-2 relative z-10">
                          <span className={`text-xs border-b px-1 ${cat.borderColor.replace('border-', 'border-b-')} ${cat.textColor}`}>+{action.points}</span>
                          <motion.div
                            className={`border-2 ${cat.borderColor} p-1 bg-white rounded`}
                            whileHover={{ scale: 1.2, rotate: 90 }}
                          >
                            <Plus className={`w-3 h-3 ${cat.textColor}`} />
                          </motion.div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Custom Action Button */}
      <motion.button 
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full border-[3px] border-dashed border-gray-900 p-3 text-sm hover:bg-gray-50 transition-colors shadow-md"
        onClick={() => setShowCustomDialog(true)}
      >
        + Add Custom Action
      </motion.button>

      {/* Custom Action Dialog */}
      <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
        <DialogContent className="border-[3px] border-gray-900 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="border-b-[3px] border-gray-900 inline-block px-2">Add Custom Action</DialogTitle>
            <DialogDescription className="text-xs text-gray-600 mt-2">
              Describe your eco-friendly action
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block mb-2 border-b-2 border-gray-900 inline-block px-1 text-sm">
                Action Description
              </label>
              <input
                type="text"
                className="w-full border-[3px] border-gray-900 p-2.5 outline-none text-sm focus:shadow-lg transition-shadow"
                placeholder="e.g., Planted a tree"
                value={customAction}
                onChange={(e) => setCustomAction(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 border-[3px] border-gray-900 p-2.5 text-sm hover:bg-gray-50 transition-colors"
                onClick={() => setShowCustomDialog(false)}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 border-[3px] border-gray-900 bg-gray-900 text-white p-2.5 text-sm shadow-lg"
                onClick={handleAddCustomAction}
              >
                Add (+10 pts)
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Continue with MapScreen, RewardsScreen, and ProfileScreen in the next file...