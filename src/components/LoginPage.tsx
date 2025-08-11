import  { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
// import whiteLogo from 'figma:asset/a2e6c195f7ae1449346b5ed6bac19070fc5c4fca.png';
import whiteLogo from '../assets/images/white_logo.png'; // Adjust the path as necessary

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export function LoginPage({ onLogin, onSwitchToSignup }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      heading: "Let's Start Your Journey with ProjectSmiles",
      paragraph: "ProjectSmiles helps you turn every piece of feedback into action. Track survey responses, manage tickets, and resolve issues faster all from one powerful, unified platform."
    },
    {
      heading: "Transform Feedback into Actionable Insights",
      paragraph: "Seamlessly collect, analyze, and act on customer feedback with our comprehensive suite of tools designed to enhance your customer experience and operational efficiency."
    },
    {
      heading: "Streamline Your Support Operations",
      paragraph: "Manage tickets, track SLA compliance, and ensure every customer concern is addressed promptly with our advanced escalation and notification systems."
    },
    {
      heading: "Data-Driven Decision Making",
      paragraph: "Leverage powerful analytics and reporting features to gain deep insights into customer satisfaction trends and identify areas for continuous improvement."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      {/* Left Side - Blue Background */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col justify-between px-12 py-8 relative overflow-hidden">
        {/* Logo at top left */}
        <div className="flex justify-start">
          <img src={whiteLogo} alt="SRM Group" className="h-16 w-auto" />
        </div>
        
        {/* Main content centered */}
        <div className="flex-1 flex items-center">
          <div className="max-w-lg text-white z-10">
            <h1 className="text-4xl font-bold leading-tight mb-6">
              {slides[currentSlide].heading}
            </h1>
            <p className="text-xl leading-relaxed text-blue-100 mb-8">
              {slides[currentSlide].paragraph}
            </p>
          </div>
        </div>
        
        {/* Pagination dots at bottom left */}
        <div className="flex justify-start">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-blue-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-20 rounded-full transform -translate-x-32 translate-y-32"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 text-lg">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  style={{ accentColor: '#2563EB' }}
                  className="w-4 h-4"
                />
                <Label htmlFor="remember" className="text-base text-gray-700">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-base text-blue-600 hover:text-blue-800 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-white text-base font-medium rounded-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: '#2563EB', height: '48px' }}
            >
              Sign In
            </Button>

            <div className="text-center">
              <span className="text-gray-600 text-base">Don't have an account? </span>
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-blue-600 hover:text-blue-800 font-medium text-base"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}