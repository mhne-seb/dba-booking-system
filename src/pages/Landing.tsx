import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { 
  Car, 
  Wrench, 
  Clock, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const services = [
  { icon: Car, title: 'Tire Services', description: 'Complete tire repair, replacement, and vulcanizing services' },
  { icon: Wrench, title: 'Wheel Alignment', description: 'Precision wheel alignment and balancing' },
  { icon: Shield, title: 'Quality Parts', description: 'We use only high-quality materials and parts' },
  { icon: Clock, title: 'Quick Service', description: 'Fast turnaround times to get you back on the road' },
];

const features = [
  'Online booking system',
  'Real-time service tracking',
  'Expert technicians',
  'Competitive pricing',
  'Customer satisfaction guaranteed',
  'Modern equipment',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {

      }
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {

          }
          <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Professional Auto Care &<br />
            {

            }
            <span className="text-sky-400">Vulcanizing Services</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Book your service appointment online and experience hassle-free auto care. 
            Quality service, trusted by thousands of vehicle owners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Button size="lg" asChild className="text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-black/20">
              <Link to="/book">Book a Service</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <a href="#services">Our Services</a>
            </Button>
          </div>
        </div>
      </section>

      {

      }
      <section id="about" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About AutoCare
            </h2>
            <p className="text-lg text-slate-300">
              AutoCare Vulcanizing Shop is your trusted partner for all tire and wheel services. 
              With years of experience and a commitment to excellence, we provide top-notch 
              automotive care using modern equipment and skilled technicians.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Why Choose Us?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-slate-300 transition-colors group-hover:text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-slate-800 border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">1000+</div>
                  <p className="text-slate-400 mb-4">Happy Customers</p>
                  <div className="text-5xl font-bold text-primary mb-2">5+</div>
                  <p className="text-slate-400 mb-4">Years of Experience</p>
                  <div className="text-5xl font-bold text-primary mb-2">100%</div>
                  <p className="text-slate-400">Satisfaction Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {

      }
      <section id="services" className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We offer a comprehensive range of tire and wheel services to keep you safe on the road.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-slate-900 border-slate-800 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="p-6 text-center relative z-10">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                    <service.icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {

      }
      <section id="contact" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of these channels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/50 cursor-default">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:rotate-12">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">Phone</h3>
                <p className="text-slate-300 hover:text-primary transition-colors cursor-pointer">+63 912 345 6789</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/50 cursor-default">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:rotate-12">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <p className="text-slate-300 hover:text-primary transition-colors cursor-pointer">info@autocare.com</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/50 cursor-default">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:rotate-12">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">Location</h3>
                <p className="text-slate-300 hover:text-primary transition-colors cursor-pointer">123 Main Street, City</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="text-lg px-8 py-6 h-auto transition-transform duration-300 hover:scale-105 shadow-xl shadow-primary/20">
              <Link to="/book">Book Your Service Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {
        
      }
      <footer className="py-8 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500">
            © 2024 AutoCare Vulcanizing Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}