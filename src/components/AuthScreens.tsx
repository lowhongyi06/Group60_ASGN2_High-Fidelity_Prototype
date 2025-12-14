import { useState } from 'react';
import { User, Eye, EyeOff, Mail, Lock, ArrowLeft, Square, Circle, Leaf } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { motion } from 'motion/react';

interface SignUpScreenProps {
  onNavigate: (screen: 'login' | 'signup' | 'forgot' | 'reset') => void;
  onSignUp: () => void;
}

export function SignUpScreen({ onNavigate, onSignUp }: SignUpScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 h-full flex flex-col justify-between overflow-auto"
    >
      <div className="flex-1 flex flex-col justify-center space-y-4 min-h-min">
        {/* Header */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="border-[3px] border-dashed border-gray-400 w-20 h-20 rounded-full flex items-center justify-center mb-3">
            <Leaf className="w-10 h-10 text-gray-400" />
          </div>
          <div className="border-b-[5px] border-gray-900 inline-block px-3 py-1 text-2xl mb-1">
            CREATE ACCOUNT
          </div>
          <div className="text-sm text-gray-600">Join the Green Movement</div>
        </motion.div>

        {/* Enhanced Sign Up Form */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <div>
            <label className="block mb-2 border-b-2 border-gray-900 inline-block px-1 text-sm">
              Full Name
            </label>
            <div className="border-[3px] border-gray-900 flex items-center focus-within:shadow-lg transition-shadow">
              <div className="p-2.5 border-r-[3px] border-gray-900 bg-gray-50">
                <User className="w-4 h-4" />
              </div>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 border-b-2 border-gray-900 inline-block px-1 text-sm">
              Student Email
            </label>
            <div className="border-[3px] border-gray-900 flex items-center focus-within:shadow-lg transition-shadow">
              <div className="p-2.5 border-r-[3px] border-gray-900 bg-gray-50">
                <Mail className="w-4 h-4" />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm"
                placeholder="student@university.edu"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 border-b-2 border-gray-900 inline-block px-1 text-sm">
              Password
            </label>
            <div className="border-[3px] border-gray-900 flex items-center focus-within:shadow-lg transition-shadow">
              <div className="p-2.5 border-r-[3px] border-gray-900 bg-gray-50">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm"
                placeholder="Min. 8 characters"
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 border-l-[3px] border-gray-900 bg-gray-50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>

          <div>
            <label className="block mb-2 border-b-2 border-gray-900 inline-block px-1 text-sm">
              Confirm Password
            </label>
            <div className="border-[3px] border-gray-900 flex items-center focus-within:shadow-lg transition-shadow">
              <div className="p-2.5 border-r-[3px] border-gray-900 bg-gray-50">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm"
                placeholder="Re-enter password"
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 border-l-[3px] border-gray-900 bg-gray-50"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <Checkbox className="border-[3px] border-gray-900 rounded-none mt-0.5" />
            <span className="text-xs text-gray-600">
              I agree to the Terms of Service and Privacy Policy
            </span>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-[3px] border-gray-900 bg-gray-900 text-white p-3 mt-4 shadow-lg relative overflow-hidden group"
            onClick={onSignUp}
          >
            <motion.div
              className="absolute inset-0 bg-gray-800"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">CREATE ACCOUNT</span>
          </motion.button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-600">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Sign Up */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full border-[3px] border-gray-900 p-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Square className="w-4 h-4" />
          <span className="text-sm">Sign Up with University SSO</span>
        </motion.button>
      </div>

      {/* Login Link */}
      <div className="text-center pt-4 border-t-[3px] border-gray-900 mt-4">
        <span className="text-sm">Already have an account? </span>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="text-sm border-b-[3px] border-gray-900 px-1" 
          onClick={() => onNavigate('login')}
        >
          LOG IN
        </motion.button>
      </div>
    </motion.div>
  );
}

interface ForgotPasswordScreenProps {
  onNavigate: (screen: 'login' | 'signup' | 'forgot' | 'reset') => void;
}

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 h-full flex flex-col justify-between"
    >
      <div className="flex-1 flex flex-col justify-center space-y-4">
        {/* Header */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="border-[3px] border-dashed border-gray-400 w-20 h-20 rounded-full flex items-center justify-center mb-3">
            <Lock className="w-10 h-10 text-gray-400" />
          </div>
          <div className="border-b-[5px] border-gray-900 inline-block px-3 py-1 text-2xl mb-1">
            FORGOT PASSWORD
          </div>
          <div className="text-sm text-gray-600 text-center px-4">
            Enter your email and we'll send instructions to reset your password
          </div>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <div>
            <label className="block mb-2 border-b-2 border-gray-900 inline-block px-1 text-sm">
              Student Email
            </label>
            <div className="border-[3px] border-gray-900 flex items-center focus-within:shadow-lg transition-shadow">
              <div className="p-2.5 border-r-[3px] border-gray-900 bg-gray-50">
                <Mail className="w-4 h-4" />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm"
                placeholder="student@university.edu"
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-[3px] border-gray-900 bg-gray-900 text-white p-3 mt-4 shadow-lg"
            onClick={() => onNavigate('reset')}
          >
            SEND RESET LINK
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-[3px] border-gray-900 p-2.5 text-sm hover:bg-gray-50 transition-colors"
            onClick={() => onNavigate('login')}
          >
            BACK TO LOGIN
          </motion.button>
        </motion.div>

        {/* Info Box */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-[3px] border-dashed border-gray-400 p-3 bg-gray-50 mt-4"
        >
          <div className="text-xs text-gray-600">
            <span className="border-b-2 border-gray-900 inline-block mb-2">Note:</span>
            <ul className="space-y-1 mt-2 ml-4">
              <li>• Check spam folder if you don't see the email</li>
              <li>• Reset link expires in 1 hour</li>
              <li>• Contact IT support if issues persist</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface ResetPasswordScreenProps {
  onNavigate: (screen: 'login' | 'signup' | 'forgot' | 'reset') => void;
}

export function ResetPasswordScreen({ onNavigate }: ResetPasswordScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 h-full flex flex-col justify-between"
    >
      <div className="flex-1 flex flex-col justify-center space-y-4">
        {/* Header */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="border-[3px] border-dashed border-gray-400 w-20 h-20 rounded-full flex items-center justify-center mb-3">
            <Lock className="w-10 h-10 text-gray-400" />
          </div>
          <div className="border-b-[5px] border-gray-900 inline-block px-3 py-1 text-2xl mb-1">
            RESET PASSWORD
          </div>
          <div className="text-sm text-gray-600 text-center">
            Create a new password for your account
          </div>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <div>
            <label className="block mb-2 border-b-2 border-gray-900 inline-block px-1 text-sm">
              New Password
            </label>
            <div className="border-[3px] border-gray-900 flex items-center focus-within:shadow-lg transition-shadow">
              <div className="p-2.5 border-r-[3px] border-gray-900 bg-gray-50">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm"
                placeholder="Min. 8 characters"
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 border-l-[3px] border-gray-900 bg-gray-50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>

          <div>
            <label className="block mb-2 border-b-2 border-gray-900 inline-block px-1 text-sm">
              Confirm New Password
            </label>
            <div className="border-[3px] border-gray-900 flex items-center focus-within:shadow-lg transition-shadow">
              <div className="p-2.5 border-r-[3px] border-gray-900 bg-gray-50">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 p-2.5 outline-none text-sm"
                placeholder="Re-enter password"
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 border-l-[3px] border-gray-900 bg-gray-50"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>

          {/* Password Requirements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-[3px] border-gray-900 p-3 bg-gray-50"
          >
            <div className="text-xs border-b-2 border-gray-900 inline-block mb-2">
              Password Requirements:
            </div>
            <div className="space-y-1 mt-2">
              {[
                'At least 8 characters',
                'One uppercase letter',
                'One lowercase letter',
                'One number'
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <Circle className="w-2 h-2 fill-current" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-[3px] border-gray-900 bg-gray-900 text-white p-3 mt-4 shadow-lg"
            onClick={() => onNavigate('login')}
          >
            RESET PASSWORD
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-[3px] border-gray-900 p-2.5 text-sm hover:bg-gray-50 transition-colors"
            onClick={() => onNavigate('login')}
          >
            BACK TO LOGIN
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
