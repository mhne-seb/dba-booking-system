import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import autocareLogo from '@/assets/autocare_logo.png';

export function Header() {
  return (

    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <img 
            src={autocareLogo} 
            alt="AutoCare Logo" 
            className="h-16 w-auto object-contain" 
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-white/90 font-medium hover:text-primary transition-all duration-300 hover:-translate-y-0.5 text-shadow-sm"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">

          <Button 
            variant="ghost" 
            asChild 
            className="text-white hover:text-primary hover:bg-white/10 transition-transform duration-300 hover:scale-105"
          >
            <Link to="/book">Book Now</Link>
          </Button>
          
          <Button 
            asChild
            className="bg-primary hover:bg-primary/90 transition-transform duration-300 hover:scale-105 shadow-md border-none"
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}