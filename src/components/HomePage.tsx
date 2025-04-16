
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const stats = [
    { label: "Higher Interview Rate", value: "80%" },
    { label: "FAANG Experts", value: "15+" },
    { label: "Success Stories", value: "2,500+" },
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

  const companies = ["Google", "Amazon", "Apple", "Meta", "Netflix"];

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Get Your Resume Reviewed by <span className="text-google-blue">FAANG Product Managers</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Our experts with 15+ years of experience will analyze your resume and provide personalized feedback to increase your interview chances.
        </p>
        <div className="pt-4">
          <Button 
            onClick={onGetStarted} 
            className="px-8 py-6 text-lg bg-google-blue hover:bg-blue-600"
          >
            Upload Your Resume Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-12 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-google-blue">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Expert Companies */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Experts Come From Top Tech Companies</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {companies.map((company) => (
            <div key={company} className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white shadow-lg rounded-full flex items-center justify-center">
                <p className="text-xl font-bold text-google-blue">{company}</p>
              </div>
              <p className="mt-2 font-medium">15+ Years</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Choose ResumeExpertise?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-google-blue" />
              </div>
              <h3 className="text-xl font-bold">Real Humans, Not AI</h3>
              <p className="text-gray-600">Get personalized feedback from actual FAANG Product Managers, not automated systems.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-google-blue" />
              </div>
              <h3 className="text-xl font-bold">FAANG Experience</h3>
              <p className="text-gray-600">Our experts have 15+ years of experience at top tech companies like Google and Amazon.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-google-blue" />
              </div>
              <h3 className="text-xl font-bold">ATS Optimization</h3>
              <p className="text-gray-600">Get targeted advice to pass Applicant Tracking Systems and land more interviews.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
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
      <section className="bg-google-blue text-white py-12 rounded-xl text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to Land Your Dream Job?</h2>
        <p className="text-xl max-w-2xl mx-auto">Upload your resume now and get expert feedback that will help you stand out from the crowd.</p>
        <Button 
          onClick={onGetStarted} 
          className="px-8 py-6 text-lg bg-white text-google-blue hover:bg-gray-100"
        >
          Get Started Now
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </section>
    </div>
  );
};
