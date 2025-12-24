import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

import { Button } from "@/components/ui/button";
import ContactFormModal from "@/components/ContactFormModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles, Target, Lightbulb, Users, BookOpen, Heart, Star } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import HamburgerMenu from "@/components/HamburgerMenu";
import WhatsappFloat from "@/components/WhatsappFloat";
import Footer from "@/components/Footer";
import logoImage from "@/assets/logo.jpeg";

interface QuizAnswer {
  question: string;
  answer: string;
  points: number;
}

interface QuizResult {
  totalScore: number;
  level: string;
  description: string;
  recommendation: string;
}

const FAQ = () => {
  const [searchParams] = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const { toast } = useToast();

  const questions = [
    {
      id: 1,
      question: "What is your current level of education?",
      options: [
        { value: "class10", label: "Class 10", points: 1 },
        { value: "class11-12", label: "Class 11/12", points: 2 },
        { value: "undergraduate", label: "Undergraduate", points: 3 },
        { value: "postgraduate", label: "Postgraduate", points: 4 },
        { value: "working", label: "Working Professional", points: 5 }
      ]
    },
    {
      id: 2,
      question: "Do you already have a career goal in mind?",
      options: [
        { value: "very-clear", label: "Yes, very clear ✅", points: 3 },
        { value: "somewhat", label: "Somewhat, but not sure 🤔", points: 2 },
        { value: "need-guidance", label: "No, I need guidance 🙋", points: 1 }
      ]
    },
    {
      id: 3,
      question: "Which career fields are you most interested in? (Choose any 2–3)",
      options: [
        { value: "engineering", label: "Engineering & Technology", points: 2 },
        { value: "medicine", label: "Medicine & Healthcare", points: 2 },
        { value: "management", label: "Management & Business", points: 2 },
        { value: "arts", label: "Arts & Humanities", points: 2 },
        { value: "law", label: "Law & Social Sciences", points: 2 },
        { value: "others", label: "Others", points: 1 }
      ],
      multiple: true
    },
    {
      id: 4,
      question: "Are you interested in studying abroad?",
      options: [
        { value: "yes-abroad", label: "Yes 🌍", points: 2 },
        { value: "maybe-abroad", label: "Maybe, still exploring ✨", points: 1 },
        { value: "no-abroad", label: "No 🚫", points: 0 }
      ]
    },
    {
      id: 5,
      question: "What kind of help do you need the most?",
      options: [
        { value: "course-career", label: "Choosing the right course & career 🎯", points: 3 },
        { value: "admission", label: "Admission guidance 🏫", points: 2 },
        { value: "scholarship", label: "Scholarship/financial guidance 💰", points: 2 },
        { value: "visa", label: "Visa & application process ✈️", points: 2 },
        { value: "accommodation", label: "Accommodation & support abroad 🏠", points: 1 }
      ]
    },
    {
      id: 6,
      question: "How confident are you about your career path right now?",
      options: [
        { value: "very-confident", label: "Very confident 💪", points: 3 },
        { value: "somewhat-confident", label: "Somewhat confident 🙂", points: 2 },
        { value: "confused", label: "Confused, need help 😕", points: 1 }
      ]
    },
    {
      id: 7,
      question: "Would you like to take a Psychometric / DMIT test to understand your strengths better?",
      options: [
        { value: "yes-test", label: "Yes 🙌", points: 2 },
        { value: "maybe-test", label: "Maybe later 🤔", points: 1 },
        { value: "no-test", label: "No 🚫", points: 0 }
      ]
    },
    {
      id: 8,
      question: "What motivates you most in your career journey?",
      options: [
        { value: "financial-growth", label: "Financial Growth & Security", points: 2 },
        { value: "personal-growth", label: "Personal Growth & Learning", points: 3 },
        { value: "social-impact", label: "Social Impact & Helping Others", points: 3 },
        { value: "recognition", label: "Recognition & Achievement", points: 2 },
        { value: "work-life-balance", label: "Work-Life Balance", points: 2 }
      ]
    }
  ];

  const faqs = [
    {
      question: "What services does Wise Wave offer?",
      answer: "Wise Wave offers comprehensive career counseling, admission guidance for Indian and overseas universities, test preparation coaching, educational loan assistance, and personalized career planning services."
    },
    {
      question: "How can Wise Wave help me choose the right career?",
      answer: "We use scientific psychometric assessments, one-on-one counseling sessions, and data-driven insights to help you discover your strengths, interests, and the best career paths suited for your profile."
    },
    {
      question: "Do you provide admission guidance for international universities?",
      answer: "Yes, we provide complete overseas admission guidance including university selection, application assistance, visa guidance, and pre-departure support for students planning to study abroad."
    },
    {
      question: "What is the process for career counseling?",
      answer: "Our process includes initial assessment, psychometric profiling, expert consultation, career pathway visualization, and detailed action plans with specific steps and timelines."
    },
    {
      question: "Do you offer scholarship assistance?",
      answer: "Yes, we provide comprehensive scholarship support including identifying relevant scholarships, application guidance, and financial planning assistance for education funding."
    }
  ];

  useEffect(() => {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    setAnimateProgress(progress);
  }, [currentQuestion]);

  useEffect(() => {
    // Check if showQuiz parameter is present in URL
    const showQuizParam = searchParams.get('showQuiz');
    if (showQuizParam === 'true') {
      setShowUserInfoForm(true);
      setShowQuiz(false);
      setIsUserInfoSubmitted(false);
    }
  }, [searchParams]);

  const handleAnswerSelect = (value: string) => {
    const currentQ = questions[currentQuestion];
    if (currentQ.multiple) {
      setSelectedAnswers(prev =>
        prev.includes(value)
          ? prev.filter(ans => ans !== value)
          : [...prev, value]
      );
    } else {
      setSelectedAnswer(value);
    }
  };

  const handleNext = () => {
    const currentQ = questions[currentQuestion];
    let answerValue = "";
    let points = 0;

    if (currentQ.multiple) {
      if (selectedAnswers.length === 0) return;
      answerValue = selectedAnswers.join(',');
      const selectedOptions = selectedAnswers.map(val => {
        const option = currentQ.options.find(opt => opt.value === val);
        return option ? option.points : 0;
      });
      points = selectedOptions.reduce((sum, p) => sum + p, 0);
    } else {
      if (!selectedAnswer) return;
      answerValue = selectedAnswer;
      const option = currentQ.options.find(opt => opt.value === selectedAnswer);
      points = option ? option.points : 0;
    }

    const answer: QuizAnswer = {
      question: currentQ.question,
      answer: answerValue,
      points: points
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion === questions.length - 1) {
      calculateResult(newAnswers);
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setSelectedAnswers([]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const previousAnswer = answers[currentQuestion - 1];
      const previousQuestion = questions[currentQuestion - 1];

      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));

      if (previousQuestion.multiple) {
        setSelectedAnswers(previousAnswer ? previousAnswer.answer.split(',') : []);
      } else {
        setSelectedAnswer(previousAnswer ? previousAnswer.answer : "");
      }
    }
  };

  const calculateResult = (quizAnswers: QuizAnswer[]) => {
    const totalScore = quizAnswers.reduce((sum, answer) => sum + answer.points, 0);

    let result: QuizResult;
    if (totalScore >= 15) {
      result = {
        totalScore,
        level: "Excellent 🌟",
        description: "Outstanding! You have excellent career clarity and direction. Let's optimize your strategy for maximum success.",
        recommendation: "Book a premium consultation to accelerate your career growth"
      };
    } else if (totalScore >= 8) {
      result = {
        totalScore,
        level: "Good 👍",
        description: "Great! You have good career awareness with some areas needing fine-tuning. Professional guidance will help you excel.",
        recommendation: "Take our psychometric assessment and schedule a counseling session"
      };
    } else {
      result = {
        totalScore,
        level: "Bad 📚",
        description: "Don't worry! Every expert was once a beginner. You need comprehensive career guidance to discover your path.",
        recommendation: "Start with our complete career assessment and expert consultation"
      };
    }

    setTimeout(() => {
      setIsCompleted(true);
    }, 1000);
  };

  const validateUserInfo = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name to proceed with the quiz.",
        variant: "destructive",
      });
      return false;
    }
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to proceed with the quiz.",
        variant: "destructive",
      });
      return false;
    }
    if (!phone.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number to proceed with the quiz.",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedService) {
      toast({
        title: "Service Selection Required",
        description: "Please select a service you're interested in.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleUserInfoSubmit = async () => {
    if (validateUserInfo()) {
      try {
        // Format message for WhatsApp
        const whatsappMessage = `🎯 New Quiz Inquiry

📝 Name: ${name.trim()}
📧 Email: ${email.trim()}
📱 WhatsApp: ${phone.trim()}
🎯 Service Interest: ${selectedService}

I'm interested in learning more about your services.

---
  Sent from Wise Wave Career Guidance Website`;

        // Format phone number for WhatsApp (remove all non-digits and add country code if needed)
        const cleanPhone = '919443690870'; // Target WhatsApp number

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

        console.log('WhatsApp URL:', whatsappUrl);

        // Open WhatsApp
        const whatsappWindow = window.open(whatsappUrl, '_blank');

        if (!whatsappWindow) {
          // Fallback: Try to open in same window if popup blocked
          window.location.href = whatsappUrl;
        }

        toast({
          title: "Opening WhatsApp",
          description: "WhatsApp opened with your details. The quiz will start now!",
        });

        // Start the quiz after WhatsApp opens
        setTimeout(() => {
          setIsUserInfoSubmitted(true);
          setShowUserInfoForm(false);
          setShowQuiz(true);
        }, 2000);

      } catch (error) {
        console.error('Error opening WhatsApp:', error);
        toast({
          title: "Error",
          description: "Failed to open WhatsApp. Starting quiz anyway...",
          variant: "destructive",
        });

        // Start quiz even if WhatsApp fails
        setIsUserInfoSubmitted(true);
        setShowUserInfoForm(false);
        setShowQuiz(true);
      }
    }
  };

  // Helper function to get client IP (for analytics)
  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer("");
    setSelectedAnswers([]);
    setShowResult(false);
    setIsCompleted(false);
    setAnimateProgress(0);
    setName("");
    setEmail("");
    setPhone("");
    setSelectedService("");
    setShowUserInfoForm(false);
    setIsUserInfoSubmitted(false);
  };

  if (showResult && isCompleted) {
    const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    const result = totalScore >= 15 ? "Excellent" :
      totalScore >= 8 ? "Good" : "Bad";

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt="Wise Wave Edu Solutions Logo"
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-blue-600">Wise Wave Edu Solutions</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
                <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
                <Link to="/faq" className="text-blue-600 font-semibold">FAQ</Link>
                <a href="https://calendly.com/leadssuresha/30min" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Get Started
                  </Button>
                </a>
              </div>

              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={isMobileMenuOpen}
                  onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Result Section */}
        <section className="py-8 sm:py-12 lg:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="max-w-4xl mx-auto">
              {/* Animated Result Card */}
              <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50 to-purple-50">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <CardHeader className="relative z-10 text-center pb-4 sm:pb-6 lg:pb-8 p-4 sm:p-6">
                  <div className="mx-auto mb-4 sm:mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
                    <div className="relative bg-white rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center">
                      <Sparkles className="h-7 w-7 sm:h-10 sm:w-10 text-yellow-500 animate-bounce" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                    Your Career Clarity Result
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg lg:text-xl text-gray-600 px-2">
                    Based on your responses, here's your personalized analysis
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6 sm:space-y-8 p-4 sm:p-6">
                  {/* Score Display */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mb-4 sm:mb-6 animate-pulse">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-white">{totalScore}</div>
                        <div className="text-xs sm:text-sm text-blue-100">Points</div>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{result}</h3>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 leading-relaxed">
                      {totalScore >= 15
                        ? "Outstanding! You have excellent career clarity and direction. Let's optimize your strategy for maximum success."
                        : totalScore >= 8
                          ? "Great! You have good career awareness with some areas needing fine-tuning. Professional guidance will help you excel."
                          : "Don't worry! Every expert was once a beginner. You need comprehensive career guidance to discover your path."
                      }
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-100">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                      <Target className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      Recommended Next Steps
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {totalScore >= 15 && (
                        <>
                          <li className="flex items-start text-gray-700 text-sm sm:text-base">
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Book a premium consultation to accelerate your career growth</span>
                          </li>
                          <li className="flex items-start text-gray-700 text-sm sm:text-base">
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Get advanced career optimization strategies</span>
                          </li>
                        </>
                      )}
                      {totalScore >= 8 && totalScore < 15 && (
                        <>
                          <li className="flex items-start text-gray-700 text-sm sm:text-base">
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Take our psychometric assessment for better insights</span>
                          </li>
                          <li className="flex items-start text-gray-700 text-sm sm:text-base">
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Schedule a professional counseling session</span>
                          </li>
                        </>
                      )}
                      {totalScore < 8 && (
                        <>
                          <li className="flex items-start text-gray-700 text-sm sm:text-base">
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Start with our complete career assessment</span>
                          </li>
                          <li className="flex items-start text-gray-700 text-sm sm:text-base">
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Get comprehensive expert consultation</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>


                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base w-full sm:w-auto"
                    >
                      Take Quiz Again
                    </Button>
                    <Link to="/services" className="w-full sm:w-auto">
                      <Button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base w-full">
                        Explore Our Services
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show user info form if showUserInfoForm is true
  if (showUserInfoForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt="Wise Wave Edu Solutions Logo"
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-blue-600">Wise Wave Edu Solutions</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                <Link to="/" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/about" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">About</Link>
                <Link to="/services" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/blog" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
                <Link to="/faq" className="text-sm xl:text-base text-blue-600 font-semibold">FAQ</Link>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-4 xl:px-6 py-2 xl:py-3 text-sm xl:text-base">Get Started</Button>
              </div>

              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={isMobileMenuOpen}
                  onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* User Info Form Section */}
        <section className="py-8 sm:py-12 lg:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mb-4 sm:mb-6 animate-bounce">
                  <Users className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                  Let's Get Started!
                </h1>
                <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto px-2">
                  Please fill in your information to connect with our career guidance expert
                </p>
              </div>

              {/* User Info Form Card */}
              <Card className="relative overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-100/50 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 sm:w-12 sm:h-12 bg-purple-100/50 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <CardHeader className="relative z-10 pb-4 sm:pb-6 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl text-gray-800 leading-relaxed text-center">
                    Personal Information Required
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600 mt-2">
                    This information is mandatory to proceed with your career assessment
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <Label htmlFor="name-input" className="text-sm sm:text-base font-medium">Full Name *</Label>
                      <Input
                        id="name-input"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <Label htmlFor="email-input" className="text-sm sm:text-base font-medium">Email Address *</Label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <Label htmlFor="phone-input" className="text-sm sm:text-base font-medium">Phone Number *</Label>
                      <Input
                        id="phone-input"
                        type="tel"
                        placeholder="9443690870"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* Service Selection Field */}
                    <div>
                      <Label htmlFor="service-select" className="text-sm sm:text-base font-medium">Service Interest *</Label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger id="service-select" className="mt-1 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base">
                          <SelectValue placeholder="Select a service you're interested in" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career-guidance">Career Guidance</SelectItem>
                          <SelectItem value="indian-admission">Indian Admission</SelectItem>
                          <SelectItem value="overseas-admission">Overseas Admission</SelectItem>
                          <SelectItem value="online-admission">Online Admission</SelectItem>
                          <SelectItem value="test-preparation">Test Preparation</SelectItem>
                          <SelectItem value="educational-loans">Educational Loans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => {
                          setShowUserInfoForm(false);
                          setShowQuiz(false);
                        }}
                        variant="outline"
                        className="flex-1 px-6 py-3 sm:py-4 border-2 border-gray-200 hover:border-gray-300 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to FAQ
                      </Button>

                      <Button
                        onClick={handleUserInfoSubmit}
                        disabled={!name.trim() || !email.trim() || !phone.trim() || !selectedService}
                        className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                      >
                        Connect via WhatsApp
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Quiz can only start after user info is submitted
  if (showQuiz && isUserInfoSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt="Wise Wave Edu Solutions Logo"
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-blue-600">Wise Wave Edu Solutions</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                <Link to="/" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/about" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">About</Link>
                <Link to="/services" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/blog" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
                <Link to="/faq" className="text-sm xl:text-base text-blue-600 font-semibold">FAQ</Link>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-4 xl:px-6 py-2 xl:py-3 text-sm xl:text-base">Get Started</Button>
              </div>

              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={isMobileMenuOpen}
                  onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Quiz Section */}
        <section className="py-8 sm:py-12 lg:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mb-4 sm:mb-6 animate-bounce">
                  <Lightbulb className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                  Career Clarity Quiz
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
                  Welcome {name}! Let's discover your career path with our personalized assessment
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base font-medium text-gray-600 text-center sm:text-left">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-gray-600">
                    {Math.round(animateProgress)}% Complete
                  </span>
                </div>
                <div className="relative">
                  <Progress value={animateProgress} className="h-2 sm:h-3 bg-gray-200" />
                  <div
                    className="absolute top-0 left-0 h-2 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${animateProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <Card className="relative overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-100/50 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 sm:w-12 sm:h-12 bg-purple-100/50 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <CardHeader className="relative z-10 pb-4 sm:pb-6 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl text-gray-800 leading-relaxed">
                    {questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4 sm:space-y-6 p-4 sm:p-6">
                  {questions[currentQuestion].multiple ? (
                    <div className="grid gap-3 sm:gap-4">
                      {questions[currentQuestion].options.map((option, index) => (
                        <div
                          key={option.value}
                          className="relative"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:bg-blue-50/50 animate-fade-in min-h-[48px] sm:min-h-[56px] flex items-center ${selectedAnswers.includes(option.value)
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 bg-white'
                            }`}>
                            <div className="flex items-center space-x-3 w-full">
                              <Checkbox
                                id={option.value}
                                checked={selectedAnswers.includes(option.value)}
                                onCheckedChange={() => handleAnswerSelect(option.value)}
                                className="w-5 h-5 sm:w-6 sm:h-6"
                              />
                              <Label
                                htmlFor={option.value}
                                className="text-base sm:text-lg font-medium text-gray-700 cursor-pointer flex-1 leading-relaxed"
                              >
                                {option.label}
                              </Label>
                              {option.points > 0 && showResult && (
                                <div className="flex items-center space-x-1 ml-auto">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span className="text-sm text-gray-600">({option.points} pts)</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                      <div className="grid gap-3 sm:gap-4">
                        {questions[currentQuestion].options.map((option, index) => (
                          <div
                            key={option.value}
                            className="relative"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:bg-blue-50/50 animate-fade-in min-h-[48px] sm:min-h-[56px] flex items-center ${selectedAnswer === option.value
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 bg-white'
                              }`}>
                              <div className="flex items-center space-x-3 w-full">
                                <RadioGroupItem
                                  value={option.value}
                                  id={option.value}
                                  className="w-5 h-5 sm:w-6 sm:h-6"
                                />
                                <Label
                                  htmlFor={option.value}
                                  className="text-base sm:text-lg font-medium text-gray-700 cursor-pointer flex-1 leading-relaxed"
                                >
                                  {option.label}
                                </Label>
                                {option.points > 0 && showResult && (
                                  <div className="flex items-center space-x-1 ml-auto">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm text-gray-600">({option.points} pts)</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {/* Navigation Buttons */}
                  <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-0">
                    {/* Mobile: Stack buttons vertically */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <div className="flex gap-3">
                        <Button
                          onClick={handlePrevious}
                          disabled={currentQuestion === 0}
                          variant="outline"
                          className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 hover:border-gray-300 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>

                        <Button
                          onClick={() => {
                            // Reset all quiz states and go back to user info
                            setCurrentQuestion(0);
                            setAnswers([]);
                            setSelectedAnswer("");
                            setSelectedAnswers([]);
                            setShowResult(false);
                            setIsCompleted(false);
                            setAnimateProgress(0);
                            setShowQuiz(false);
                            setIsUserInfoSubmitted(false);
                            setShowUserInfoForm(true);
                          }}
                          variant="outline"
                          className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                        >
                          Edit Info
                        </Button>
                      </div>

                      <Button
                        onClick={handleNext}
                        disabled={questions[currentQuestion].multiple ? selectedAnswers.length === 0 : !selectedAnswer}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                      >
                        {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // If quiz is requested but user info is not submitted, show user info form
  if (showQuiz && !isUserInfoSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={logoImage}
                  alt="Wise Wave Edu Solutions Logo"
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-blue-600">Wise Wave Edu Solutions</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                <Link to="/" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/about" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">About</Link>
                <Link to="/services" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/blog" className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
                <Link to="/faq" className="text-sm xl:text-base text-blue-600 font-semibold">FAQ</Link>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-4 xl:px-6 py-2 xl:py-3 text-sm xl:text-base">Get Started</Button>
              </div>

              {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={isMobileMenuOpen}
                  onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* User Info Form Section */}
        <section className="py-8 sm:py-12 lg:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mb-4 sm:mb-6 animate-bounce">
                  <Users className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                  Let's Get Started!
                </h1>
                <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto px-2">
                  Please fill in your information to connect with our career guidance expert
                </p>
              </div>

              {/* User Info Form Card */}
              <Card className="relative overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-100/50 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 sm:w-12 sm:h-12 bg-purple-100/50 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <CardHeader className="relative z-10 pb-4 sm:pb-6 p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl text-gray-800 leading-relaxed text-center">
                    Personal Information Required
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600 mt-2">
                    This information is mandatory to proceed with your career assessment
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <Label htmlFor="name-input" className="text-sm sm:text-base font-medium">Full Name *</Label>
                      <Input
                        id="name-input"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <Label htmlFor="email-input" className="text-sm sm:text-base font-medium">Email Address *</Label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <Label htmlFor="phone-input" className="text-sm sm:text-base font-medium">Phone Number *</Label>
                      <Input
                        id="phone-input"
                        type="tel"
                        placeholder="9443690870"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                        required
                      />
                    </div>

                    {/* Service Selection Field */}
                    <div>
                      <Label htmlFor="service-select-2" className="text-sm sm:text-base font-medium">Service Interest *</Label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger id="service-select-2" className="mt-1 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base">
                          <SelectValue placeholder="Select a service you're interested in" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career-guidance">Career Guidance</SelectItem>
                          <SelectItem value="indian-admission">Indian Admission</SelectItem>
                          <SelectItem value="overseas-admission">Overseas Admission</SelectItem>
                          <SelectItem value="online-admission">Online Admission</SelectItem>
                          <SelectItem value="test-preparation">Test Preparation</SelectItem>
                          <SelectItem value="educational-loans">Educational Loans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => {
                          setShowUserInfoForm(false);
                          setShowQuiz(false);
                        }}
                        variant="outline"
                        className="flex-1 px-6 py-3 sm:py-4 border-2 border-gray-200 hover:border-gray-300 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to FAQ
                      </Button>

                      <Button
                        onClick={handleUserInfoSubmit}
                        disabled={!name.trim() || !email.trim() || !phone.trim() || !selectedService}
                        className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base"
                      >
                        Connect via WhatsApp
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Wise Wave Edu Solutions Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-red-600">Wise Wave Edu Solutions</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
              <Link to="/faq" className="text-blue-600 font-semibold">FAQ</Link>
              <Button variant="outline" onClick={() => setIsContactModalOpen(true)}>Get Started</Button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <HamburgerMenu
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white/50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-2">
                Get answers to common questions about our career guidance services
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <CardDescription className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Take Assessment Button */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Ready to Discover Your Career Path?
                </h3>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Take our personalized career assessment to get tailored recommendations based on your interests, strengths, and goals.
                </p>
                <Button
                  onClick={() => {
                    setShowUserInfoForm(true);
                    setShowQuiz(false);
                    setIsUserInfoSubmitted(false);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Take Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Heart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-pink-300 animate-pulse" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Ready to Start Your Career Journey?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100 max-w-2xl mx-auto px-2">
              Take our career clarity quiz or book a free consultation to get personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button
                onClick={() => {
                  setShowUserInfoForm(true);
                  setShowQuiz(false);
                  setIsUserInfoSubmitted(false);
                }}
                variant="outline"
                className="border-white  hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px] sm:min-h-[56px] w-full sm:w-auto"
              >
                Take Career Quiz
              </Button>
              <Button
                onClick={() => {
                  window.location.href = 'https://calendly.com/leadssuresha/30min';
                }}
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold min-h-[48px] sm:min-h-[56px] w-full"
              >
                Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* WhatsApp Floating Button */}
      <WhatsappFloat />
    </div>
  );
};

export default FAQ;