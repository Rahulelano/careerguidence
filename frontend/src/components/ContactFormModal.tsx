import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    country: '',
    budget: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create WhatsApp message with form data
      const message = `New Contact Form Submission:

Name: ${formData.name}
Contact: ${formData.contact}
Email: ${formData.email}
Country: ${formData.country}
Budget: ${formData.budget}
Address: ${formData.address}

Please contact this person for consultation.`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);

      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/919443690870?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank');

      // Close modal after successful submission
      onClose();

      // Reset form
      setFormData({
        name: '',
        contact: '',
        email: '',
        country: '',
        budget: '',
        address: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Get Started</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="mt-1"
              placeholder="Enter your full name"
            />
          </div>

          {/* Contact */}
          <div>
            <Label htmlFor="contact">Contact Number *</Label>
            <Input
              id="contact"
              type="tel"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              required
              className="mt-1"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="mt-1"
              placeholder="Enter your email address"
            />
          </div>

          {/* Country */}
          <div>
            <Label htmlFor="country">Country *</Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div>
            <Label htmlFor="budget">Budget Range *</Label>
            <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-5-lakhs">Under ₹5 Lakhs</SelectItem>
                <SelectItem value="5-10-lakhs">₹5 - ₹10 Lakhs</SelectItem>
                <SelectItem value="10-20-lakhs">₹10 - ₹20 Lakhs</SelectItem>
                <SelectItem value="20-50-lakhs">₹20 - ₹50 Lakhs</SelectItem>
                <SelectItem value="above-50-lakhs">Above ₹50 Lakhs</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="mt-1"
              placeholder="Enter your complete address"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit & Contact via WhatsApp'}
          </Button>

          <p className="text-sm text-gray-600 text-center">
            By submitting this form, you'll be connected with our team via WhatsApp for immediate assistance.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;