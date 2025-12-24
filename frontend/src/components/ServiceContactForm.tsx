import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, User, Mail, Phone, Globe, GraduationCap, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceContactFormProps {
  serviceName?: string;
  className?: string;
}

const ServiceContactForm: React.FC<ServiceContactFormProps> = ({
  serviceName = "our services",
  className = ""
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    course: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Singapore', 'UAE', 'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name, email, and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create WhatsApp message with form data
      const message = `*New Service Inquiry - ${serviceName}*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
💬 *WhatsApp:* ${formData.whatsapp || 'Not provided'}
🌍 *Country:* ${formData.country || 'Not specified'}
📚 *Course:* ${formData.course || 'Not specified'}
💰 *Budget:* ${formData.budget || 'Not specified'}

Please contact this lead for ${serviceName} consultation.`;

      // Send to WhatsApp
      const whatsappUrl = `https://wa.me/919443690870?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Show success message
      toast({
        title: "Form Submitted Successfully!",
        description: "Your details have been sent to our team. We'll contact you soon!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        country: '',
        course: '',
        budget: ''
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-lg sm:text-xl text-gray-800">
          Apply Now
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Fill in your details and we'll contact you shortly
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" />
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="min-h-[44px]"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center">
              <Mail className="mr-2 h-4 w-4 text-gray-500" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="min-h-[44px]"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium flex items-center">
              <Phone className="mr-2 h-4 w-4 text-gray-500" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="9443690870"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="min-h-[44px]"
              required
            />
          </div>

          {/* WhatsApp Field */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-sm font-medium flex items-center">
              <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
              WhatsApp Number
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="9443690870 (if different from phone)"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              className="min-h-[44px]"
            />
          </div>

          {/* Country Field */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium flex items-center">
              <Globe className="mr-2 h-4 w-4 text-gray-500" />
              Country
            </Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger className="min-h-[44px]">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Course Field */}
          <div className="space-y-2">
            <Label htmlFor="course" className="text-sm font-medium flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-gray-500" />
              Preferred Course / Field
            </Label>
            <Textarea
              id="course"
              placeholder="e.g., Computer Science, MBA, MBBS, Engineering, etc."
              value={formData.course}
              onChange={(e) => handleInputChange('course', e.target.value)}
              className="min-h-[80px] resize-none"
              rows={3}
            />
          </div>

          {/* Budget Field */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center">
              <IndianRupee className="mr-2 h-4 w-4 text-gray-500" />
              Budget Range (in Lakhs)
            </Label>
            <RadioGroup
              value={formData.budget}
              onValueChange={(value) => handleInputChange('budget', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="10-20" id="budget1" />
                <Label htmlFor="budget1" className="text-sm cursor-pointer flex-1">
                  ₹10 to 20 Lakhs
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="20-30" id="budget2" />
                <Label htmlFor="budget2" className="text-sm cursor-pointer flex-1">
                  ₹20 to 30 Lakhs
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="30+" id="budget3" />
                <Label htmlFor="budget3" className="text-sm cursor-pointer flex-1">
                  More than ₹30 Lakhs
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 min-h-[48px] text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send to WhatsApp
              </>
            )}
          </Button>
        </form>

        <div className="text-center pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Your details will be sent directly to our team via WhatsApp
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceContactForm;