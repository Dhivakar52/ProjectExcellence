import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import whiteLogo from 'figma:asset/a2e6c195f7ae1449346b5ed6bac19070fc5c4fca.png';
import whiteLogo from '../assets/images/srm.png'; // Adjust the path as necessary

interface SignupPageProps {
  onSwitchToLogin: () => void;
  onSignup: () => void;
}

export function SignupPage({ onSwitchToLogin, onSignup }: SignupPageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      {/* Left Side - Blue Background */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-12 relative overflow-hidden">
        <div className="absolute top-8 left-8">
          <img src={whiteLogo} alt="SRM Group" className="h-16 w-auto" />
        </div>
        
        <div className="max-w-lg text-white z-10">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Join ProjectSmiles Today
          </h1>
          <p className="text-xl leading-relaxed text-blue-100 mb-8">
            Create your account and start transforming feedback into actionable insights. 
            Manage surveys, track responses, and resolve issues efficiently with our 
            comprehensive platform.
          </p>
          
          {/* Pagination dots */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <div className="w-8 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-20 rounded-full transform -translate-x-32 translate-y-32"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 bg-white flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600 text-lg">Sign up for a new account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="block text-base font-medium text-gray-700 mb-3">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pl-12 pr-4 py-3 w-full border-gray-300 rounded-lg text-base bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  style={{ height: '48px' }}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="block text-base font-medium text-gray-700 mb-3">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-12 pr-4 py-3 w-full border-gray-300 rounded-lg text-base bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  style={{ height: '48px' }}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-base font-medium text-gray-700 mb-3">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 py-3 w-full border-gray-300 rounded-lg text-base bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  style={{ height: '48px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-3">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="pl-12 pr-12 py-3 w-full border-gray-300 rounded-lg text-base bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  style={{ height: '48px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                style={{ accentColor: '#2563EB' }}
                className="w-4 h-4"
              />
              <Label htmlFor="terms" className="text-base text-gray-700">
                I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-white text-base font-medium rounded-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: '#2563EB', height: '48px' }}
              disabled={!agreeToTerms}
            >
              Create Account
            </Button>

            <div className="text-center">
              <span className="text-gray-600 text-base">Already have an account? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-800 font-medium text-base"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}