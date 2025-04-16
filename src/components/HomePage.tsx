
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star, Briefcase, ArrowRight, FileCheck, Award, Zap, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const stats = [
    { label: "Higher Interview Rate", value: "80%", icon: Target },
    { label: "FAANG Experts", value: "15+", icon: Award },
    { label: "Success Stories", value: "2,500+", icon: Users },
  ];

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Product Manager",
      company: "Hired at Google",
      content: "The expert feedback I received was incredibly detailed. My resume went from generic to targeted, highlighting exactly what Google was looking for.",
    },
    {
      name: "Michael T.",
      role: "Senior PM",
      company: "Hired at Amazon",
      content: "After three failed application attempts, I got the interview within a week of updating my resume based on the expert feedback. Worth every penny!",
    },
    {
      name: "Jessica L.",
      role: "Associate PM",
      company: "Hired at Meta",
      content: "As someone transitioning into product management, I had no idea how to structure my resume. My expert guide me through the entire process.",
    },
  ];

  const companies = [
    { name: "Google", color: "bg-google-blue", textColor: "text-white" },
    { name: "Amazon", color: "bg-orange-500", textColor: "text-white" },
    { name: "Apple", color: "bg-gray-800", textColor: "text-white" },
    { name: "Meta", color: "bg-blue-600", textColor: "text-white" },
    { name: "Netflix", color: "bg-red-600", textColor: "text-white" },
    { name: "Microsoft", color: "bg-blue-500", textColor: "text-white" },
    { name: "Uber", color: "bg-black", textColor: "text-white" },
    { name: "Airbnb", color: "bg-pink-500", textColor: "text-white" },
  ];
  
  const features = [
    {
      title: "Real ATS Optimization",
      description: "Our system uses the same algorithms as company ATS systems to ensure your resume passes automated filters.",
      icon: FileCheck,
    },
    {
      title: "FAANG Expert Insights",
      description: "Get personalized feedback from Product Managers with 15+ years of experience at top tech companies.",
      icon: Briefcase,
    },
    {
      title: "Keyword Analysis",
      description: "We identify missing keywords and skills from the job description that should be in your resume.",
      icon: Target,
    },
    {
      title: "Instant Feedback",
      description: "Receive comprehensive analysis of your resume within minutes, sent directly to your email.",
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl overflow-hidden text-center space-y-6 py-16 px-4 shadow-md border border-blue-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Beat the <span className="text-google-blue">Resume Black Hole</span> with
            <span className="block text-google-green mt-2">FAANG Product Manager Reviews</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mt-6">
            Our AI-driven ATS analyzer and expert PM feedback help you get <span className="font-bold">3x more interviews</span> at top tech companies.
          </p>
          <div className="pt-8">
            <Button 
              onClick={onGetStarted} 
              className="px-8 py-6 text-lg bg-google-blue hover:bg-blue-600 transition-all duration-300 shadow-lg group"
            >
              Analyze Your Resume Now
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-sm text-gray-500 mt-4">Get your analysis in less than 5 minutes</p>
          </div>
        </motion.div>
      </section>

      {/* Brand Logos Banner */}
      <section className="py-8 bg-white rounded-xl shadow-sm">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Trusted by Product Managers at Top Companies</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center max-w-5xl mx-auto px-4">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className={`${company.color} ${company.textColor} px-4 py-2 rounded-full font-medium text-sm md:text-base transition-transform hover:scale-105 shadow-sm`}
            >
              {company.name}
            </div>
          ))}
        </div>
      </section>

      {/* USP Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Resume PM Whisperer Works</h2>
          <p className="text-xl text-gray-600 mt-3 max-w-2xl mx-auto">
            Our unique dual-analysis approach combines AI technology with human expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-google-blue/10 hover:shadow-md transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-google-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-12 rounded-xl shadow-inner">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Results</h2>
          <p className="text-xl text-gray-600 mt-2">Numbers that speak for themselves</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-google-blue" />
                </div>
                <p className="text-4xl font-bold text-google-blue">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Expert Companies */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Experts Come From Top Tech Companies</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {companies.slice(0, 6).map((company, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className={`w-20 h-20 md:w-24 md:h-24 ${company.color} ${company.textColor} shadow-lg rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-xl`}>
                <p className="text-lg md:text-xl font-bold">{company.name.substring(0, 1)}</p>
              </div>
              <p className="mt-3 font-medium text-sm md:text-base">{company.name}</p>
              <p className="text-xs text-gray-500">15+ Years</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-google-blue/10">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-google-yellow text-google-yellow" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-sm font-medium text-google-green">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-google-blue to-blue-600 text-white py-16 rounded-xl text-center space-y-6 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to Land Your Dream Product Manager Role?</h2>
        <p className="text-xl max-w-2xl mx-auto">Upload your resume now and get expert feedback that will help you stand out from thousands of applicants.</p>
        <Button 
          onClick={onGetStarted} 
          className="px-8 py-6 text-lg bg-white text-google-blue hover:bg-gray-100 transition-all duration-300 shadow-md group"
        >
          Get Started Now
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-sm text-blue-100">No credit card required</p>
      </section>

      {/* Brands Trust Banner */}
      <section className="py-8 bg-gray-50 rounded-lg">
        <div className="text-center mb-6">
          <p className="text-sm uppercase tracking-wider text-gray-500 font-medium">Top Tech Companies Who Trust Our Experts</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto px-4">
          {companies.map((company, index) => (
            <div key={index} className="text-center">
              <div className={`inline-block ${company.color} ${company.textColor} w-16 h-16 rounded-lg flex items-center justify-center shadow-sm font-bold text-xl`}>
                {company.name.substring(0, 1)}
              </div>
              <p className="mt-2 text-xs font-medium text-gray-600">{company.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
