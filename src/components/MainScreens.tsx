import { useState } from 'react';
import { MapPin, Gift, User, X, ChevronRight, History, Sparkles, Trophy, Leaf, Settings, Bell, Lock, Eye, Heart, Star, Crown, Flame, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface Reward {
  id: string;
  reward: string;
  points: number;
  category: string;
}

interface RedeemedReward extends Reward {
  redeemedAt: string;
}

// Enhanced Map Screen
export function MapScreen() {
  const [filter, setFilter] = useState<'all' | 'recycling' | 'water'>('all');
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const locations = [
    { id: 1, name: 'Library Recycling Station', type: 'recycling', top: '20%', left: '30%' },
    { id: 2, name: 'Cafeteria Water Refill', type: 'water', top: '40%', right: '25%' },
    { id: 3, name: 'Student Center Recycling', type: 'recycling', bottom: '30%', left: '40%' },
    { id: 4, name: 'Gym Water Station', type: 'water', top: '60%', right: '40%' }
  ];

  const filteredLocations = filter === 'all' 
    ? locations 
    : locations.filter(loc => loc.type === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col"
    >
      <div className="p-4 border-b-[3px] border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="border-b-[3px] border-green-600 inline-block px-2 mb-3 shadow-sm text-green-900"
        >
          Campus Eco-Map
        </motion.div>
        {/* Enhanced Filter Buttons */}
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'All', color: 'gray', bg: 'bg-gray-100', border: 'border-gray-600', text: 'text-gray-900' },
            { value: 'recycling', label: 'Recycling', color: 'green', bg: 'bg-green-100', border: 'border-green-600', text: 'text-green-900' },
            { value: 'water', label: 'Water', color: 'blue', bg: 'bg-blue-100', border: 'border-blue-600', text: 'text-blue-900' }
          ].map((f, i) => (
            <motion.button
              key={f.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 border-[3px] ${f.border} rounded-lg p-2.5 text-sm transition-all shadow-md ${
                filter === f.value ? `${f.bg} ${f.text} shadow-lg` : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => setFilter(f.value as 'all' | 'recycling' | 'water')}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Enhanced Map Area */}
      <div className="flex-1 border-[4px] border-dashed border-green-400 m-4 relative bg-gradient-to-br from-green-50/30 via-emerald-50/30 to-teal-50/30 overflow-hidden shadow-inner rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center text-green-600/40">
          [INTERACTIVE CAMPUS MAP]
        </div>
        
        {/* Decorative grid */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-b border-green-200 border-dashed" />
          ))}
        </div>

        {/* Enhanced Map Pins */}
        <AnimatePresence>
          {filteredLocations.map((location, index) => {
            const isRecycling = location.type === 'recycling';
            const pinColor = isRecycling ? 'green' : 'blue';
            const bgColor = isRecycling ? 'bg-green-500' : 'bg-blue-500';
            const borderColor = isRecycling ? 'border-green-600' : 'border-blue-600';
            
            return (
              <motion.button
                key={location.id}
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ 
                  scale: selectedPin === location.id ? 1.3 : 1,
                  opacity: 1,
                  y: [0, -8, 0],
                  rotate: 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  scale: { duration: 0.3 },
                  opacity: { delay: index * 0.1, duration: 0.3 },
                  y: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                }}
                whileHover={{ scale: 1.4, zIndex: 10 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute border-[3px] ${borderColor} p-2 shadow-lg z-10 rounded-lg ${
                  selectedPin === location.id ? `${bgColor} text-white shadow-2xl` : 'bg-white'
                }`}
                style={{ 
                  top: location.top, 
                  left: location.left, 
                  right: location.right, 
                  bottom: location.bottom 
                }}
                onClick={() => setSelectedPin(selectedPin === location.id ? null : location.id)}
              >
                <MapPin className={`w-5 h-5 ${selectedPin === location.id ? 'text-white' : isRecycling ? 'text-green-600' : 'text-blue-600'}`} />
                {selectedPin !== location.id && (
                  <>
                    <motion.div
                      className={`absolute inset-0 border-[3px] ${borderColor} rounded-lg`}
                      animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className={`absolute inset-0 border-[3px] ${borderColor} rounded-lg`}
                      animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Enhanced Location Info Card */}
        <AnimatePresence>
          {selectedPin !== null && (
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`absolute top-3 left-3 right-3 border-[3px] ${
                locations.find(l => l.id === selectedPin)?.type === 'recycling' ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50' : 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50'
              } p-3 shadow-2xl z-20 rounded-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`border-b-[3px] ${
                  locations.find(l => l.id === selectedPin)?.type === 'recycling' ? 'border-green-600 text-green-900' : 'border-blue-600 text-blue-900'
                } inline-block px-2 text-sm shadow-sm`}>
                  {locations.find(l => l.id === selectedPin)?.name}
                </div>
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className={`border-2 ${
                    locations.find(l => l.id === selectedPin)?.type === 'recycling' ? 'border-green-600' : 'border-blue-600'
                  } p-1 rounded bg-white`}
                  onClick={() => setSelectedPin(null)}
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </div>
              <div className={`text-xs mb-2 ${
                locations.find(l => l.id === selectedPin)?.type === 'recycling' ? 'text-green-700' : 'text-blue-700'
              }`}>
                Type: {locations.find(l => l.id === selectedPin)?.type === 'recycling' ? 'Recycling Station' : 'Water Refill Station'}
              </div>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full border-[3px] ${
                  locations.find(l => l.id === selectedPin)?.type === 'recycling' ? 'border-green-600 bg-green-500 hover:bg-green-600' : 'border-blue-600 bg-blue-500 hover:bg-blue-600'
                } text-white p-2 text-xs rounded-lg transition-colors shadow-md`}
              >
                Get Directions →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Legend */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 border-t-[3px] border-green-500 space-y-2 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md"
      >
        <div className="text-xs border-b-2 border-green-600 inline-block px-1 mb-2 text-green-900">Map Legend</div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 border-[2px] border-green-600 rounded"></div>
            <span className="text-xs text-green-800">Recycling Stations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 border-[2px] border-blue-600 rounded"></div>
            <span className="text-xs text-blue-800">Water Refill Stations</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Enhanced Rewards Screen
interface RewardsScreenProps {
  totalPoints: number;
  onRedeem: (reward: Reward) => void;
  redeemedRewards: RedeemedReward[];
  onOpenHistory: () => void;
}

export function RewardsScreen({ totalPoints, onRedeem, redeemedRewards, onOpenHistory }: RewardsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const rewards: Reward[] = [
    { id: '1', reward: '10% Off Campus Café', points: 200, category: 'Café' },
    { id: '2', reward: 'Free Coffee or Tea', points: 500, category: 'Café' },
    { id: '3', reward: 'Bookstore Voucher (RM10)', points: 800, category: 'Bookstore' },
    { id: '4', reward: 'Free Reusable Bottle', points: 1000, category: 'Merchandise' },
    { id: '5', reward: 'Campus Event Entry Ticket', points: 300, category: 'Events' },
    { id: '6', reward: 'Meal Plan Discount (5%)', points: 600, category: 'Café' }
  ];

  const filteredRewards = selectedCategory === 'All' 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory);

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
    setShowRedeemDialog(true);
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      onRedeem(selectedReward);
      setShowRedeemDialog(false);
      setSelectedReward(null);
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Café': return { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', icon: 'text-amber-600', badge: 'bg-amber-500' };
      case 'Bookstore': return { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', icon: 'text-blue-600', badge: 'bg-blue-500' };
      case 'Merchandise': return { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700', icon: 'text-purple-600', badge: 'bg-purple-500' };
      case 'Events': return { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-700', icon: 'text-pink-600', badge: 'bg-pink-500' };
      default: return { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', icon: 'text-green-600', badge: 'bg-green-500' };
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
        className="flex items-center justify-between"
      >
        <div className="border-b-[3px] border-emerald-600 inline-block px-2 shadow-sm text-emerald-900">Rewards Shop</div>
        <div className="text-xs flex items-center gap-2">
          <span className="text-emerald-700">Balance:</span>
          <motion.span 
            key={totalPoints}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="border-b-[3px] border-emerald-600 px-2 py-0.5 bg-emerald-50 shadow-sm text-emerald-900 rounded"
          >
            {totalPoints}
          </motion.span>
        </div>
      </motion.div>

      {/* Enhanced History Button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
        className="border-[3px] border-teal-500 rounded-lg p-2.5 flex items-center justify-between bg-gradient-to-r from-teal-50 to-cyan-50 shadow-md hover:shadow-lg transition-all group"
        onClick={onOpenHistory}
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-teal-600" />
          <span className="text-sm text-teal-800">Redemption History</span>
        </div>
        <div className="flex items-center gap-2">
          {redeemedRewards.length > 0 && (
            <div className="border-2 border-teal-600 bg-teal-100 px-2 py-0.5 text-[10px] text-teal-800 rounded">
              {redeemedRewards.length} redeemed
            </div>
          )}
          <ChevronRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.button>

      {/* Enhanced Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { name: 'All', color: 'emerald' },
          { name: 'Café', color: 'amber' },
          { name: 'Bookstore', color: 'blue' },
          { name: 'Merchandise', color: 'purple' },
          { name: 'Events', color: 'pink' }
        ].map((cat, i) => (
          <motion.button 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`border-[3px] px-3 py-1.5 text-xs whitespace-nowrap transition-all shadow-md rounded-lg ${
              selectedCategory === cat.name 
                ? `border-${cat.color}-600 bg-${cat.color}-500 text-white shadow-lg` 
                : `border-${cat.color}-400 bg-white hover:bg-${cat.color}-50 text-${cat.color}-700`
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Enhanced Rewards List */}
      <div className="space-y-3 flex-1 overflow-auto">
        <AnimatePresence mode="popLayout">
          {filteredRewards.map((item, index) => {
            const canAfford = totalPoints >= item.points;
            const colors = getCategoryColor(item.category);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: index * 0.08, type: 'spring', damping: 20 }}
                className={`border-[3px] ${colors.border} rounded-xl p-3 relative overflow-hidden shadow-md ${
                  canAfford ? `${colors.bg}` : 'bg-gray-100 border-gray-400'
                }`}
              >
                {canAfford && (
                  <>
                    <motion.div
                      className={`absolute top-2 right-2 border-2 ${colors.border} ${colors.badge} text-white px-2 py-0.5 text-[10px] z-10 shadow-md rounded-full`}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      AVAILABLE
                    </motion.div>
                    <motion.div
                      className={`absolute -right-6 -bottom-6 opacity-10`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    >
                      <Gift className={`w-24 h-24 ${colors.icon}`} />
                    </motion.div>
                  </>
                )}
                <div className="flex gap-3 relative z-10">
                  <motion.div
                    whileHover={canAfford ? { scale: 1.15, rotate: 10 } : {}}
                    className={`border-[3px] border-dashed rounded-lg w-16 h-16 flex-shrink-0 flex items-center justify-center relative shadow-md ${
                      canAfford ? `${colors.border} bg-white` : 'border-gray-400 bg-gray-50'
                    }`}
                  >
                    {canAfford && (
                      <motion.div
                        className={`absolute inset-0 ${colors.bg} rounded-lg`}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <Gift className={`w-6 h-6 relative z-10 ${canAfford ? colors.icon : 'text-gray-400'}`} />
                  </motion.div>
                  <div className="flex-1">
                    <div className={`text-sm mb-2 ${canAfford ? colors.text : 'text-gray-600'}`}>{item.reward}</div>
                    <div className="flex items-center justify-between">
                      <div className={`border-2 px-2 py-0.5 text-xs rounded ${
                        canAfford ? `${colors.border} ${colors.text} bg-white/70` : 'border-gray-400 bg-gray-200 text-gray-600'
                      }`}>
                        {item.points} pts
                      </div>
                      <motion.button
                        whileHover={canAfford ? { scale: 1.08, y: -2 } : {}}
                        whileTap={canAfford ? { scale: 0.95 } : {}}
                        className={`border-[3px] px-3 py-1 text-xs transition-all shadow-md rounded-lg ${
                          canAfford 
                            ? `${colors.border} ${colors.badge} text-white hover:shadow-lg` 
                            : 'border-gray-400 bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={() => canAfford && handleRedeemClick(item)}
                        disabled={!canAfford}
                      >
                        {canAfford ? 'Redeem' : 'Locked'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Enhanced Redeem Confirmation Dialog */}
      <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
        <DialogContent className="border-[3px] border-emerald-500 rounded-xl shadow-2xl bg-gradient-to-br from-emerald-50 to-green-50">
          <DialogHeader>
            <DialogTitle className="border-b-[3px] border-emerald-600 inline-block px-2 text-emerald-900">Confirm Redemption</DialogTitle>
            <DialogDescription className="text-xs text-emerald-700 mt-2">
              Are you sure you want to redeem this reward?
            </DialogDescription>
          </DialogHeader>
          {selectedReward && (
            <div className="space-y-3">
              <div className="border-[3px] border-emerald-500 rounded-lg p-3 bg-white">
                <div className="text-sm mb-2 text-emerald-900">{selectedReward.reward}</div>
                <div className="border-2 border-emerald-600 px-2 py-0.5 text-xs inline-block bg-emerald-50 text-emerald-800 rounded">
                  {selectedReward.points} points
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border-[3px] border-gray-400 rounded-lg p-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-700"
                  onClick={() => setShowRedeemDialog(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border-[3px] border-emerald-600 bg-gradient-to-r from-emerald-600 to-green-600 text-white p-2.5 text-sm shadow-lg rounded-lg"
                  onClick={confirmRedeem}
                >
                  Confirm Redeem
                </motion.button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Enhanced Profile Screen
interface ProfileScreenProps {
  totalPoints: number;
  onLogout: () => void;
  onOpenAchievements: () => void;
  onOpenLeaderboard: () => void;
  onOpenSettings: (setting: string) => void;
}

export function ProfileScreen({ totalPoints, onLogout, onOpenAchievements, onOpenLeaderboard, onOpenSettings }: ProfileScreenProps) {
  const co2Saved = Math.floor(totalPoints * 0.012);
  const treesEquivalent = Math.floor(co2Saved / 20);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-4 space-y-4 h-full flex flex-col overflow-auto"
    >
      {/* Enhanced User Info Card */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="border-[3px] border-green-500 rounded-xl p-4 flex items-center gap-3 bg-gradient-to-br from-green-50 via-white to-emerald-50 shadow-lg relative overflow-hidden"
      >
        <motion.div
          className="absolute -right-10 -top-10 w-40 h-40 border-[3px] border-dashed border-green-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="border-[3px] border-green-400 w-16 h-16 rounded-full flex items-center justify-center relative z-10 bg-gradient-to-br from-white to-green-50 shadow-md"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <User className="w-7 h-7 text-green-600" />
        </motion.div>
        <div className="flex-1 relative z-10">
          <div className="border-b-[3px] border-green-600 inline-block px-2 mb-1 shadow-sm text-green-900">Student Name</div>
          <div className="text-xs text-green-700/70">Year 3 • Joined Dec 2024</div>
        </div>
      </motion.div>

      {/* Enhanced Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-2"
      >
        {[
          { label: 'Points', value: totalPoints.toLocaleString(), icon: <Sparkles className="w-4 h-4" />, color: 'green', gradient: 'from-green-50 to-emerald-50', border: 'border-green-400', text: 'text-green-600' },
          { label: 'Rank', value: '#24', icon: <Crown className="w-4 h-4" />, color: 'amber', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-400', text: 'text-amber-600' },
          { label: 'CO₂ Saved', value: `${co2Saved}kg`, icon: <Leaf className="w-4 h-4" />, color: 'emerald', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-400', text: 'text-emerald-600' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: 'spring', damping: 15 }}
            whileHover={{ scale: 1.05, y: -3 }}
            className={`border-[3px] ${stat.border} rounded-lg p-3 text-center bg-gradient-to-br ${stat.gradient} shadow-md hover:shadow-lg transition-all relative overflow-hidden group`}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100`}
              initial={{ y: '100%' }}
              whileHover={{ y: '0%' }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">
              <div className={`flex justify-center mb-2 ${stat.text}`}>
                {stat.icon}
              </div>
              <div className={`text-xs mb-1 ${stat.text}/70`}>{stat.label}</div>
              <div className={`border-b-[3px] ${stat.border} inline-block px-1.5 py-0.5 ${stat.text} bg-white/50 backdrop-blur-sm`}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        {[
          { icon: <Trophy className="w-4 h-4" />, label: 'My Achievements', action: onOpenAchievements, badge: '8/20', color: 'purple', gradient: 'from-purple-50 to-violet-50', border: 'border-purple-400', iconBg: 'bg-purple-500', text: 'text-purple-700' },
          { icon: <Crown className="w-4 h-4" />, label: 'Leaderboard', action: onOpenLeaderboard, badge: '#24', color: 'amber', gradient: 'from-amber-50 to-orange-50', border: 'border-amber-400', iconBg: 'bg-amber-500', text: 'text-amber-700' },
          { icon: <Settings className="w-4 h-4" />, label: 'Settings', action: () => onOpenSettings('Account'), badge: null, color: 'slate', gradient: 'from-slate-50 to-gray-50', border: 'border-slate-400', iconBg: 'bg-slate-500', text: 'text-slate-700' }
        ].map((item, i) => (
          <motion.button
            key={i}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring', damping: 20 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full border-[3px] ${item.border} rounded-lg p-3 flex items-center justify-between bg-gradient-to-r ${item.gradient} hover:shadow-lg transition-all shadow-md group relative overflow-hidden`}
            onClick={item.action}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${item.gradient}`}
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4 }}
            />
            <div className="flex items-center gap-3 relative z-10">
              <motion.div 
                className={`border-[3px] ${item.border} p-2 bg-white rounded-lg shadow-sm`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className={item.text}>
                  {item.icon}
                </div>
              </motion.div>
              <span className={`text-sm ${item.text}`}>{item.label}</span>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              {item.badge && (
                <div className={`border-2 ${item.border} bg-white/80 backdrop-blur-sm px-2 py-0.5 text-xs ${item.text} rounded`}>
                  {item.badge}
                </div>
              )}
              <ChevronRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${item.text}`} />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Environmental Impact Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="border-[3px] border-teal-400 rounded-xl p-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 shadow-lg relative overflow-hidden"
      >
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <Leaf className="w-full h-full text-teal-600" />
        </motion.div>
        <div className="border-b-[3px] border-teal-600 inline-block px-2 mb-3 shadow-sm text-teal-900 relative z-10">Your Impact</div>
        <div className="space-y-3 relative z-10">
          <motion.div 
            className="flex items-center justify-between bg-white/50 backdrop-blur-sm p-2 rounded-lg border-2 border-teal-300"
            whileHover={{ scale: 1.02, x: 3 }}
          >
            <div className="text-xs text-teal-700 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                <Leaf className="w-3 h-3 text-teal-600" />
              </div>
              CO₂ Reduced
            </div>
            <div className="border-b-2 border-teal-600 px-2 py-0.5 text-sm text-teal-900 bg-white/70 rounded">{co2Saved} kg</div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-between bg-white/50 backdrop-blur-sm p-2 rounded-lg border-2 border-emerald-300"
            whileHover={{ scale: 1.02, x: 3 }}
          >
            <div className="text-xs text-emerald-700 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-emerald-600" />
              </div>
              Trees Equivalent
            </div>
            <div className="border-b-2 border-emerald-600 px-2 py-0.5 text-sm text-emerald-900 bg-white/70 rounded">{treesEquivalent} trees</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full border-[3px] border-red-400 rounded-lg p-3 text-sm bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 transition-all shadow-md hover:shadow-lg text-red-700"
        onClick={onLogout}
      >
        Logout
      </motion.button>
    </motion.div>
  );
}