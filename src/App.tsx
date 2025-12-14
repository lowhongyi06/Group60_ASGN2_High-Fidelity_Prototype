import { useState, useEffect } from 'react';
import { Home, MapPin, Award, User, Plus, ChevronRight, Circle, Square, TrendingUp, Leaf, Trophy, Gift, Bell, Settings, Eye, EyeOff, Mail, Lock, Recycle, ArrowRight, ArrowLeft, X, Check, History, Sparkles, Zap, Calendar, Target, BarChart3, Clock, Star, Crown, Flame, Heart, Droplet, Wind, Sun } from 'lucide-react';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { Checkbox } from './components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { motion, AnimatePresence } from 'motion/react';
import { SignUpScreen, ForgotPasswordScreen, ResetPasswordScreen } from './components/AuthScreens';
import { NavButton, HomeScreen, TrackScreen } from './components/AppScreens';
import { MapScreen, RewardsScreen, ProfileScreen } from './components/MainScreens';
import { NotificationsScreen, HistoryScreen, StatisticsScreen, ChallengeScreen, RedemptionHistoryScreen, AchievementsScreen, LeaderboardScreen, SettingsScreen } from './components/DetailScreens';

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

interface InAppToast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [detailScreen, setDetailScreen] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [authScreen, setAuthScreen] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // User data state
  const [totalPoints, setTotalPoints] = useState(1240);
  const [weeklyPoints, setWeeklyPoints] = useState(180);
  const [dayStreak, setDayStreak] = useState(12);
  const [recentActions, setRecentActions] = useState<Action[]>([
    { id: '1', action: 'Recycled plastic bottle', points: 10, time: '2h', date: '2025-12-08', category: 'Recycling' },
    { id: '2', action: 'Took public transport', points: 15, time: '5h', date: '2025-12-08', category: 'Transportation' }
  ]);
  const [allActions, setAllActions] = useState<Action[]>([
    { id: '1', action: 'Recycled plastic bottle', points: 10, time: '2h', date: '2025-12-08', category: 'Recycling' },
    { id: '2', action: 'Took public transport', points: 15, time: '5h', date: '2025-12-08', category: 'Transportation' },
    { id: '3', action: 'Used reusable bottle', points: 5, time: '1d', date: '2025-12-07', category: 'Reusables' },
    { id: '4', action: 'Recycled paper', points: 10, time: '1d', date: '2025-12-07', category: 'Recycling' },
    { id: '5', action: 'Walked to class', points: 20, time: '2d', date: '2025-12-06', category: 'Transportation' },
    { id: '6', action: 'Conserved water', points: 15, time: '2d', date: '2025-12-06', category: 'Energy Saving' },
    { id: '7', action: 'Recycled aluminum can', points: 12, time: '3d', date: '2025-12-05', category: 'Recycling' },
    { id: '8', action: 'Brought cloth bag', points: 7, time: '3d', date: '2025-12-05', category: 'Reusables' }
  ]);
  const [dailyChallengeProgress, setDailyChallengeProgress] = useState(2);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);
  const [notificationsList, setNotificationsList] = useState<Notification[]>([
    { id: '1', text: 'New achievement unlocked: Week Warrior!', time: '2h ago', read: false, type: 'achievement' },
    { id: '2', text: 'Weekly challenge starts tomorrow', time: '5h ago', read: false, type: 'challenge' },
    { id: '3', text: 'Campus Café 10% discount available!', time: '1d ago', read: false, type: 'reward' },
    { id: '4', text: 'Milestone reached: 1000 points!', time: '2d ago', read: true, type: 'achievement' },
    { id: '5', text: 'Daily challenge completed successfully', time: '3d ago', read: true, type: 'challenge' }
  ]);
  const [showWelcomeHint, setShowWelcomeHint] = useState(true);
  const [toasts, setToasts] = useState<InAppToast[]>([]);

  // In-app toast system with enhanced visuals
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowWelcomeHint(true);
      setIsLoading(false);
      showToast('Welcome back to My Track! 🌱', 'success');
      setTimeout(() => setShowWelcomeHint(false), 5000);
    }, 1200);
  };

  const handleAddAction = (action: string, points: number, category: string) => {
    const newAction: Action = {
      id: Date.now().toString(),
      action,
      points,
      time: 'Just now',
      date: new Date().toISOString().split('T')[0],
      category
    };
    setRecentActions(prev => [newAction, ...prev.slice(0, 4)]);
    setAllActions(prev => [newAction, ...prev]);
    setTotalPoints(prev => prev + points);
    setWeeklyPoints(prev => prev + points);
    showToast(`+${points} points! ${action}`, 'success');
  };

  const handleRedeemReward = (reward: Reward) => {
    if (totalPoints >= reward.points) {
      setTotalPoints(prev => prev - reward.points);
      const redeemedReward: RedeemedReward = {
        ...reward,
        redeemedAt: new Date().toLocaleDateString()
      };
      setRedeemedRewards(prev => [redeemedReward, ...prev]);
      showToast(`Success! Redeemed: ${reward.reward}`, 'success');
    } else {
      showToast('Not enough points to redeem this reward', 'error');
    }
  };

  const handleCompleteChallengeStep = () => {
    if (dailyChallengeProgress < 3) {
      setDailyChallengeProgress(prev => prev + 1);
      if (dailyChallengeProgress === 2) {
        setTotalPoints(prev => prev + 50);
        setWeeklyPoints(prev => prev + 50);
        showToast('Daily challenge completed! +50 points 🎉', 'success');
      } else {
        showToast(`Progress updated: ${dailyChallengeProgress + 1}/3 steps`, 'info');
      }
    }
  };

  const unreadNotifications = notificationsList.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Login/Auth Phone Frame */}
      {!isAuthenticated && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[375px] h-[812px] border-[10px] border-green-600 rounded-[44px] bg-white overflow-hidden shadow-2xl flex flex-col relative"
        >
          {/* Enhanced Status Bar */}
          <div className="h-11 bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-between px-6 text-white text-xs">
            <span>9:41</span>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-1.5"
            >
              <div className="w-4 h-3 border-[1.5px] border-white rounded-sm relative">
                <motion.div 
                  className="absolute inset-0.5 bg-white"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="w-4 h-3 border-[1.5px] border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-white opacity-70" />
              </div>
              <div className="w-4 h-3 border-[1.5px] border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-white opacity-40" />
              </div>
            </motion.div>
          </div>

          {/* Auth Content with loading state */}
          <div className="flex-1 overflow-auto relative bg-gradient-to-b from-white to-green-50/30">
            {isLoading && <LoadingOverlay />}
            {showWelcome ? (
              <WelcomeScreen onContinue={() => setShowWelcome(false)} />
            ) : (
              <>
                {authScreen === 'login' && <LoginScreen onNavigate={setAuthScreen} onBack={() => setShowWelcome(true)} onLogin={handleLogin} />}
                {authScreen === 'signup' && <SignUpScreen onNavigate={setAuthScreen} onSignUp={handleLogin} />}
                {authScreen === 'forgot' && <ForgotPasswordScreen onNavigate={setAuthScreen} />}
                {authScreen === 'reset' && <ResetPasswordScreen onNavigate={setAuthScreen} />}
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Main App Phone Frame */}
      {isAuthenticated && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[375px] h-[812px] border-[10px] border-green-600 rounded-[44px] bg-white overflow-hidden shadow-2xl flex flex-col relative"
        >
          {/* Enhanced Status Bar */}
          <div className="h-11 bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-between px-6 text-white text-xs relative overflow-hidden">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              9:41
            </motion.span>
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-1.5"
            >
              <div className="w-4 h-3 border-[1.5px] border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-white" />
              </div>
              <div className="w-4 h-3 border-[1.5px] border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-white opacity-70" />
              </div>
              <div className="w-4 h-3 border-[1.5px] border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-white opacity-40" />
              </div>
            </motion.div>
          </div>

          {/* Enhanced In-App Toast Notifications */}
          <AnimatePresence mode="popLayout">
            {toasts.map((toast, index) => (
              <motion.div
                key={toast.id}
                initial={{ y: -120, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -120, opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: 'spring', 
                  damping: 25,
                  stiffness: 500,
                  delay: index * 0.05
                }}
                className="absolute top-14 left-3 right-3 z-50"
                style={{ top: `${56 + index * 60}px` }}
              >
                <motion.div 
                  className={`border-[3px] p-3 shadow-2xl relative overflow-hidden rounded-lg ${
                    toast.type === 'success' ? 'border-green-500 bg-green-50' :
                    toast.type === 'error' ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className={`absolute inset-0 ${
                      toast.type === 'success' ? 'bg-gradient-to-r from-transparent via-green-100 to-transparent' :
                      toast.type === 'error' ? 'bg-gradient-to-r from-transparent via-red-100 to-transparent' :
                      'bg-gradient-to-r from-transparent via-blue-100 to-transparent'
                    }`}
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, ease: 'linear' }}
                  />
                  <div className="flex items-center gap-3 relative z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        toast.type === 'success' ? 'bg-green-500' :
                        toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                    >
                      {toast.type === 'success' && <Check className="w-4 h-4 text-white" />}
                      {toast.type === 'error' && <X className="w-4 h-4 text-white" />}
                      {toast.type === 'info' && <Sparkles className="w-4 h-4 text-white" />}
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className={`text-sm flex-1 ${
                        toast.type === 'success' ? 'text-green-900' :
                        toast.type === 'error' ? 'text-red-900' : 'text-blue-900'
                      }`}
                    >
                      {toast.message}
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* App Content */}
          <div className="flex-1 overflow-auto bg-gradient-to-b from-white via-green-50/20 to-emerald-50/30">
            {!detailScreen && (
              <>
                {activeScreen === 'home' && (
                  <HomeScreen 
                    totalPoints={totalPoints}
                    weeklyPoints={weeklyPoints}
                    dayStreak={dayStreak}
                    recentActions={recentActions}
                    dailyChallengeProgress={dailyChallengeProgress}
                    onCompleteChallengeStep={handleCompleteChallengeStep}
                    notifications={unreadNotifications}
                    onOpenNotifications={() => setDetailScreen('notifications')}
                    onOpenHistory={() => setDetailScreen('history')}
                    onOpenStats={() => setDetailScreen('statistics')}
                    onOpenChallenge={() => setDetailScreen('challenge')}
                    showWelcomeHint={showWelcomeHint}
                    onDismissHint={() => setShowWelcomeHint(false)}
                  />
                )}
                {activeScreen === 'track' && <TrackScreen onAddAction={handleAddAction} />}
                {activeScreen === 'map' && <MapScreen />}
                {activeScreen === 'rewards' && (
                  <RewardsScreen 
                    totalPoints={totalPoints} 
                    onRedeem={handleRedeemReward}
                    redeemedRewards={redeemedRewards}
                    onOpenHistory={() => setDetailScreen('redemption-history')}
                  />
                )}
                {activeScreen === 'profile' && (
                  <ProfileScreen 
                    totalPoints={totalPoints}
                    onLogout={() => {
                      setIsAuthenticated(false);
                      setShowWelcome(true);
                    }}
                    onOpenAchievements={() => setDetailScreen('achievements')}
                    onOpenLeaderboard={() => setDetailScreen('leaderboard')}
                    onOpenSettings={(setting) => setDetailScreen(`settings-${setting.toLowerCase()}`)}
                  />
                )}
              </>
            )}

            {/* Detail Screens with enhanced transitions */}
            <AnimatePresence mode="wait">
              {detailScreen === 'notifications' && (
                <NotificationsScreen 
                  notifications={notificationsList}
                  onBack={() => setDetailScreen(null)}
                  onMarkAsRead={(id) => {
                    setNotificationsList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
                  }}
                />
              )}
              {detailScreen === 'history' && (
                <HistoryScreen 
                  actions={allActions}
                  onBack={() => setDetailScreen(null)}
                />
              )}
              {detailScreen === 'statistics' && (
                <StatisticsScreen 
                  totalPoints={totalPoints}
                  weeklyPoints={weeklyPoints}
                  dayStreak={dayStreak}
                  actions={allActions}
                  onBack={() => setDetailScreen(null)}
                />
              )}
              {detailScreen === 'challenge' && (
                <ChallengeScreen 
                  progress={dailyChallengeProgress}
                  onComplete={handleCompleteChallengeStep}
                  onBack={() => setDetailScreen(null)}
                />
              )}
              {detailScreen === 'redemption-history' && (
                <RedemptionHistoryScreen 
                  redeemedRewards={redeemedRewards}
                  onBack={() => setDetailScreen(null)}
                />
              )}
              {detailScreen === 'achievements' && (
                <AchievementsScreen 
                  onBack={() => setDetailScreen(null)}
                />
              )}
              {detailScreen === 'leaderboard' && (
                <LeaderboardScreen 
                  currentUserRank={24}
                  currentUserPoints={weeklyPoints}
                  onBack={() => setDetailScreen(null)}
                />
              )}
              {detailScreen?.startsWith('settings-') && (
                <SettingsScreen 
                  settingType={detailScreen.replace('settings-', '')}
                  onBack={() => setDetailScreen(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Bottom Navigation */}
          {!detailScreen && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="h-16 border-t-[3px] border-green-500 bg-white flex items-center justify-around px-2 relative"
            >
              <motion.div
                className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <NavButton 
                icon={<Home className="w-5 h-5" />} 
                label="Home" 
                active={activeScreen === 'home'}
                onClick={() => setActiveScreen('home')}
              />
              <NavButton 
                icon={<Plus className="w-5 h-5" />} 
                label="Track" 
                active={activeScreen === 'track'}
                onClick={() => setActiveScreen('track')}
              />
              <NavButton 
                icon={<MapPin className="w-5 h-5" />} 
                label="Map" 
                active={activeScreen === 'map'}
                onClick={() => setActiveScreen('map')}
              />
              <NavButton 
                icon={<Gift className="w-5 h-5" />} 
                label="Rewards" 
                active={activeScreen === 'rewards'}
                onClick={() => setActiveScreen('rewards')}
              />
              <NavButton 
                icon={<User className="w-5 h-5" />} 
                label="Profile" 
                active={activeScreen === 'profile'}
                onClick={() => setActiveScreen('profile')}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Loading Overlay Component
function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="border-4 border-gray-200 border-t-gray-900 rounded-full w-12 h-12 mb-4"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-gray-600"
      >
        Loading...
      </motion.div>
    </motion.div>
  );
}

// Enhanced Welcome Screen
function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 h-full flex flex-col justify-between"
    >
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* Logo with enhanced animation */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-6"
        >
          <motion.div 
            className="border-[3px] border-dashed w-28 h-28 rounded-full flex items-center justify-center mb-4 relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50"
            animate={{ 
              borderColor: ['#22c55e', '#10b981', '#22c55e'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            >
              <Leaf className="w-14 h-14 text-green-500" />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-b-[5px] border-green-600 inline-block px-4 py-2 text-3xl mb-2 relative text-green-700"
          >
            MY TRACK
            <motion.div
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-green-700 text-center"
          >
            Your Campus Sustainability Companion
          </motion.div>
        </motion.div>

        {/* Feature Highlights with staggered animation */}
        <div className="space-y-3">
          {[
            { icon: <TrendingUp className="w-5 h-5" />, title: 'Track Green Actions', desc: 'Earn points for eco-friendly habits', delay: 0.7, color: 'green' },
            { icon: <MapPin className="w-5 h-5" />, title: 'Campus Eco-Map', desc: 'Find recycling bins & water refill stations', delay: 0.8, color: 'blue' },
            { icon: <Gift className="w-5 h-5" />, title: 'Real Rewards', desc: 'Redeem exclusive café discounts & prizes', delay: 0.9, color: 'amber' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: feature.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`border-[3px] p-3 flex items-start gap-3 shadow-sm relative overflow-hidden group rounded-lg ${
                feature.color === 'green' ? 'border-green-500 bg-green-50/50' :
                feature.color === 'blue' ? 'border-blue-500 bg-blue-50/50' :
                'border-amber-500 bg-amber-50/50'
              }`}
            >
              <motion.div
                className={`absolute inset-0 ${
                  feature.color === 'green' ? 'bg-green-100/50' :
                  feature.color === 'blue' ? 'bg-blue-100/50' :
                  'bg-amber-100/50'
                }`}
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <div className={`border-[3px] p-2 flex-shrink-0 bg-white relative z-10 rounded-lg ${
                feature.color === 'green' ? 'border-green-500 text-green-600' :
                feature.color === 'blue' ? 'border-blue-500 text-blue-600' :
                'border-amber-500 text-amber-600'
              }`}>
                {feature.icon}
              </div>
              <div className="relative z-10">
                <div className={`border-b-2 inline-block px-1 text-sm mb-1 ${
                  feature.color === 'green' ? 'border-green-600 text-green-800' :
                  feature.color === 'blue' ? 'border-blue-600 text-blue-800' :
                  'border-amber-600 text-amber-800'
                }`}>
                  {feature.title}
                </div>
                <div className="text-xs text-gray-700">
                  {feature.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box with pulse animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="border-[3px] border-dashed border-green-400 p-3 bg-green-50 text-center relative overflow-hidden rounded-lg"
        >
          <motion.div
            className="absolute inset-0 bg-green-100/50"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="text-xs text-green-700 relative z-10">
            Make a real difference while earning rewards on campus
          </div>
        </motion.div>
      </div>

      {/* Enhanced Get Started Button */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="space-y-3"
      >
        <motion.button 
          onClick={onContinue}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full border-[3px] border-green-600 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 flex items-center justify-center gap-2 relative overflow-hidden group shadow-lg rounded-lg"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          <span className="relative z-10">GET STARTED</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative z-10"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.button>
        <div className="text-center text-xs text-green-700">
          For university students only
        </div>
      </motion.div>
    </motion.div>
  );
}

// Enhanced Login Screen
function LoginScreen({ onNavigate, onBack, onLogin }: { onNavigate: (screen: 'login' | 'signup' | 'forgot' | 'reset') => void; onBack: () => void; onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 h-full flex flex-col justify-between relative"
    >
      {/* Enhanced Back Button */}
      <motion.button 
        onClick={onBack}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 left-6 p-2 text-green-600 hover:text-green-700 border-2 border-green-400 hover:border-green-600 rounded-lg transition-colors bg-white shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
      </motion.button>

      <div className="flex-1 flex flex-col justify-center space-y-5 pt-12">
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="border-[3px] border-dashed border-green-400 w-20 h-20 rounded-full flex items-center justify-center mb-3 bg-green-50">
            <Leaf className="w-10 h-10 text-green-600" />
          </div>
          <div className="border-b-[5px] border-green-600 inline-block px-3 py-1 text-2xl mb-1 text-green-900">
            MY TRACK
          </div>
          <div className="text-sm text-green-700">Track Your Green Journey</div>
        </motion.div>

        {/* Enhanced Login Form */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2 border-b-2 border-green-600 inline-block px-1 text-sm text-green-800">
              Student Email
            </label>
            <div className="border-[3px] border-green-500 rounded-lg flex items-center group focus-within:shadow-lg transition-shadow overflow-hidden">
              <div className="p-2.5 border-r-[3px] border-green-500 bg-green-50">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm bg-white"
                placeholder="student@university.edu"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 border-b-2 border-green-600 inline-block px-1 text-sm text-green-800">
              Password
            </label>
            <div className="border-[3px] border-green-500 rounded-lg flex items-center group focus-within:shadow-lg transition-shadow overflow-hidden">
              <div className="p-2.5 border-r-[3px] border-green-500 bg-green-50">
                <Lock className="w-4 h-4 text-green-600" />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm bg-white"
                placeholder="••••••••"
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 border-l-[3px] border-green-500 bg-green-50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-green-600" /> : <Eye className="w-4 h-4 text-green-600" />}
              </motion.button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox className="border-[3px] border-green-600 rounded-none" />
              <span className="text-sm text-gray-700">Remember me</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="text-sm underline text-green-700 hover:text-green-800" 
              onClick={() => onNavigate('forgot')}
            >
              Forgot?
            </motion.button>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-[3px] border-green-600 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 mt-4 shadow-lg relative overflow-hidden group rounded-lg"
            onClick={onLogin}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">LOG IN</span>
          </motion.button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-600">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full border-[3px] border-gray-900 p-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Square className="w-4 h-4" />
          <span className="text-sm">Continue with University SSO</span>
        </motion.button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center pt-4 border-t-[3px] border-gray-900">
        <span className="text-sm">Don't have an account? </span>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="text-sm border-b-[3px] border-gray-900 px-1" 
          onClick={() => onNavigate('signup')}
        >
          SIGN UP
        </motion.button>
      </div>
    </motion.div>
  );
}

// Continue with remaining components in next message...