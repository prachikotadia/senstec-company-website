
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, AlertTriangle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { validateEmail, validatePassword, sanitizeInput, rateLimiter } from '@/utils/security';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginType, setLoginType] = useState<'admin' | 'general' | 'guest'>('general');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (loginType !== 'guest') {
      // Validate email
      if (!formData.email) {
        newErrors.push('Email is required');
      } else if (!validateEmail(formData.email)) {
        newErrors.push('Please enter a valid email address');
      }

      // Validate password
      if (!formData.password) {
        newErrors.push('Password is required');
      } else if (isRegistering) {
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
          newErrors.push(...passwordValidation.errors);
        }
      }

      // Validate name for registration
      if (isRegistering && !formData.name.trim()) {
        newErrors.push('Full name is required');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Rate limiting check
    const identifier = formData.email || 'guest';
    if (!rateLimiter(identifier)) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait 5 minutes before trying again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes - in production, this would be handled by backend
      const sanitizedEmail = sanitizeInput(formData.email);
      const sanitizedName = sanitizeInput(formData.name);

      // Demo authentication - replace with real authentication
      if (loginType === 'admin') {
        // Demo admin check - in production, verify against secure backend
        if (sanitizedEmail === 'admin@senstec.com' && formData.password === 'admin123') {
          const user = {
            id: 'admin-' + Date.now(),
            name: 'Admin User',
            email: sanitizedEmail,
            role: 'admin' as const
          };
          setUser(user);
          toast({
            title: "Login Successful",
            description: "Welcome back, Admin!",
          });
          navigate('/admin');
        } else {
          throw new Error('Invalid admin credentials');
        }
      } else {
        // General user authentication
        const user = {
          id: Date.now().toString(),
          name: isRegistering ? sanitizedName : sanitizedEmail.split('@')[0],
          email: sanitizedEmail,
          role: 'general' as const
        };
        setUser(user);
        toast({
          title: isRegistering ? "Registration Successful" : "Login Successful",
          description: `Welcome${isRegistering ? ' to Senstec' : ' back'}!`,
        });
        navigate('/dashboard');
      }

      onClose();
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: 'guest-' + Date.now(),
      name: 'Guest User',
      email: 'guest@senstec.com',
      role: 'guest' as const
    };
    
    setUser(guestUser);
    toast({
      title: "Guest Access Granted",
      description: "You have limited access to explore our platform.",
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center blur-bg">
      <div className="glass-morphism rounded-3xl p-8 max-w-md w-full mx-4 fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-sf-pro font-bold text-foreground">
            {isRegistering ? 'Register' : 'Login'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Security Notice */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-yellow-800">
              <strong>Demo Environment:</strong> This is a demonstration. In production, all authentication would be handled securely on the backend.
            </p>
          </div>
        </div>

        {/* Login Type Tabs */}
        <div className="flex gap-2 mb-6">
          {['general', 'admin', 'guest'].map((type) => (
            <Button
              key={type}
              variant={loginType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLoginType(type as never)}
              className="capitalize flex-1"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Error Display */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <ul className="text-sm text-red-600">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {loginType === 'guest' ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Access limited content without registration
            </p>
            <Button onClick={handleGuestLogin} className="w-full gradient-purple">
              Continue as Guest
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                  required
                  disabled={isLoading}
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={loginType === 'admin' ? 'admin@senstec.com' : 'Enter your email'}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {loginType === 'admin' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                 
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full gradient-purple"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsRegistering(!isRegistering)}
                disabled={isLoading}
              >
                {isRegistering ? 'Already have an account? Sign in' : 'Need an account? Register'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
