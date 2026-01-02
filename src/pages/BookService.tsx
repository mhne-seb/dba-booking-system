import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import autocareLogo from '@/assets/autocare_logo.png';

import bgHero from '@/assets/hero-bg.jpg'; 

import { Header } from '@/components/layout/Header';

const serviceTypes = [
  'Tire Vulcanizing',
  'Tire Replacement',
  'Wheel Alignment',
  'Wheel Balancing',
  'Flat Tire Repair',
  'Tire Rotation',
  'Other',
];

const vehicleTypes = [
  'Sedan',
  'SUV',
  'Pickup Truck',
  'Van',
  'Motorcycle',
  'Other',
];

export default function BookService() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    vehicleType: '',
    vehicleBrand: '',
    vehicleModel: '',
    plateNumber: '',
    preferredDate: '',
    preferredTime: '',
    serviceType: '',
    concern: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Booking submitted!",
      description: "We'll contact you shortly to confirm your appointment.",
    });

    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div 
        className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        {

        }
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-0"></div>
        
        <Header /> 
        
        <Card className="w-full max-w-md text-center bg-slate-900/90 border-slate-800 animate-fade-in-up shadow-2xl shadow-primary/10 relative z-10 backdrop-blur-md">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Booking Submitted!</h2>
            <p className="text-slate-400 mb-8">
              Thank you for choosing AutoCare. We'll review your booking and contact you shortly.
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full text-lg h-12 hover:scale-105 transition-transform duration-300">
                <Link to="/">Back to Home</Link>
              </Button>
              <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full h-12 border-slate-700 text-slate-300 hover:bg-slate-800">
                Book Another Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative py-8 px-4 pt-24 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      {
        
      }
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-0"></div>

      <Header />

      <div className="container mx-auto max-w-2xl animate-fade-in-up relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors duration-300 hover:-translate-x-1 font-medium bg-slate-900/50 px-3 py-1 rounded-full backdrop-blur-md">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="bg-slate-900/90 border-slate-800 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/20">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-6">
              <img 
                src={autocareLogo} 
                alt="AutoCare Logo" 
                className="h-24 w-auto object-contain transition-transform duration-500 hover:scale-110 drop-shadow-lg" 
              />
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">Book a Service</CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Fill out the form below and we'll get back to you shortly
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Personal Information
                </h3>
                <div className="grid gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-slate-200">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      required
                      className="bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary h-11"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber" className="text-slate-200">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        placeholder="e.g., 09123456789"
                        value={formData.contactNumber}
                        onChange={(e) => handleChange('contactNumber', e.target.value)}
                        required
                        className="bg-slate-800/80 border-slate-700 text-white h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="bg-slate-800/80 border-slate-700 text-white h-11"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Vehicle Information
                </h3>
                <div className="grid gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType" className="text-slate-200">Vehicle Type *</Label>
                      <Select value={formData.vehicleType} onValueChange={(v) => handleChange('vehicleType', v)}>
                        <SelectTrigger className="bg-slate-800/80 border-slate-700 text-white h-11">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          {vehicleTypes.map((type) => (
                            <SelectItem key={type} value={type} className="cursor-pointer">{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleBrand" className="text-slate-200">Brand *</Label>
                      <Input
                        id="vehicleBrand"
                        placeholder="e.g., Toyota"
                        value={formData.vehicleBrand}
                        onChange={(e) => handleChange('vehicleBrand', e.target.value)}
                        required
                        className="bg-slate-800/80 border-slate-700 text-white h-11"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleModel" className="text-slate-200">Model *</Label>
                      <Input
                        id="vehicleModel"
                        placeholder="e.g., Vios"
                        value={formData.vehicleModel}
                        onChange={(e) => handleChange('vehicleModel', e.target.value)}
                        required
                        className="bg-slate-800/80 border-slate-700 text-white h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plateNumber" className="text-slate-200">Plate Number *</Label>
                      <Input
                        id="plateNumber"
                        placeholder="e.g., ABC 1234"
                        value={formData.plateNumber}
                        onChange={(e) => handleChange('plateNumber', e.target.value)}
                        required
                        className="bg-slate-800/80 border-slate-700 text-white h-11"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Service Details
                </h3>
                <div className="grid gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate" className="text-slate-200">Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleChange('preferredDate', e.target.value)}
                        required
                        className="bg-slate-800/80 border-slate-700 text-white h-11 [color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime" className="text-slate-200">Preferred Time *</Label>
                      <Input
                        id="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => handleChange('preferredTime', e.target.value)}
                        required
                        className="bg-slate-800/80 border-slate-700 text-white h-11 [color-scheme:dark]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType" className="text-slate-200">Service Type *</Label>
                    <Select value={formData.serviceType} onValueChange={(v) => handleChange('serviceType', v)}>
                      <SelectTrigger className="bg-slate-800/80 border-slate-700 text-white h-11">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type} className="cursor-pointer">{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="concern" className="text-slate-200">Describe Your Concern</Label>
                    <Textarea
                      id="concern"
                      placeholder="Please describe the issue or service needed..."
                      value={formData.concern}
                      onChange={(e) => handleChange('concern', e.target.value)}
                      rows={4}
                      className="bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full text-lg h-12 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/20" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}