import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import autocareLogo from '@/assets/autocare_logo.png';
import { Header } from '@/components/layout/Header';
import bgHero from '@/assets/hero-bg.jpg'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome back to AutoCare Dashboard",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try: admin@autocare.com / admin123",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center p-4 pt-24 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      {

      }
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-0"></div>

      <Header />

      <Card className="w-full max-w-md bg-slate-900/90 border-slate-800 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/20 animate-fade-in-up relative z-10">
        <CardHeader className="text-center pb-2">
          <Link to="/" className="flex items-center justify-center mb-6">
            <img 
              src={autocareLogo} 
              alt="AutoCare Logo" 
              className="h-24 w-auto object-contain transition-transform duration-500 hover:scale-110 drop-shadow-lg" 
            />
          </Link>
          <CardTitle className="text-3xl font-bold text-white tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Sign in to access the AutoCare Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"className="text-slate-200">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full text-lg h-12 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/20" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {
            
          }
          <div className="mt-8 p-4 bg-slate-800/60 rounded-lg border border-slate-700/50 backdrop-blur-sm">
            <p className="text-sm text-slate-300 text-center">
              <strong className="text-primary">Demo Credentials:</strong><br />
              Email: <span className="text-white font-mono">admin@autocare.com</span><br />
              Password: <span className="text-white font-mono">admin123</span>
            </p>
          </div>

          <p className="mt-6 text-center text-sm">
            <Link to="/" className="text-slate-300 hover:text-primary transition-colors duration-300 inline-flex items-center gap-2">
              ← Back to Home
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}