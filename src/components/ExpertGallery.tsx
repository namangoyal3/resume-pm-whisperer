
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Filter, Loader2, Briefcase, Star } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: number;
  specialties: string[];
  rating: number;
  bio: string;
  imgUrl: string;
}

interface ExpertGalleryProps {
  selectedExpert: string | null;
  onExpertSelect: (expert: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const ExpertGallery: React.FC<ExpertGalleryProps> = ({ 
  selectedExpert, 
  onExpertSelect, 
  onAnalyze, 
  isAnalyzing 
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const experts: Expert[] = [
    {
      id: "jennifer-kim",
      name: "Jennifer Kim",
      title: "Senior Product Manager",
      company: "Google",
      experience: 16,
      specialties: ["AI/ML", "Data Products", "Enterprise"],
      rating: 4.9,
      bio: "Former Senior PM at Google with over 16 years of experience leading product teams. Expertise in AI and machine learning products, having led teams that developed key Google Cloud ML services.",
      imgUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "michael-patel",
      name: "Michael Patel",
      title: "Director of Product",
      company: "Amazon",
      experience: 18,
      specialties: ["E-commerce", "Consumer", "Mobile"],
      rating: 4.8,
      bio: "Former Director of Product at Amazon who led the development of several key features for Amazon's mobile shopping experience, focusing on conversion optimization and user engagement.",
      imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      title: "Product Lead",
      company: "Meta",
      experience: 15,
      specialties: ["Social Media", "Growth", "B2C"],
      rating: 4.9,
      bio: "Former Product Lead at Meta where she scaled growth initiatives for Facebook Marketplace. Specializes in social products and user acquisition strategies that drove millions of new users.",
      imgUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "david-chen",
      name: "David Chen",
      title: "Principal PM",
      company: "Apple",
      experience: 17,
      specialties: ["Hardware/Software", "UX", "Luxury"],
      rating: 4.7,
      bio: "Former Principal PM at Apple who worked on integrating hardware and software experiences. David brings deep expertise in creating premium product experiences with exceptional attention to detail.",
      imgUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "lauren-taylor",
      name: "Lauren Taylor",
      title: "Senior PM",
      company: "Netflix",
      experience: 15,
      specialties: ["Entertainment", "Subscription", "Analytics"],
      rating: 4.8,
      bio: "Former Senior PM at Netflix who led the development of content recommendation algorithms. Lauren specializes in data-driven product development and personalization strategies.",
      imgUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      title: "Group Product Manager",
      company: "Google",
      experience: 20,
      specialties: ["Search", "Ads", "B2B"],
      rating: 4.9,
      bio: "Former Group Product Manager at Google with 20 years of experience leading search and advertising products. James specializes in helping candidates position themselves for technical PM roles.",
      imgUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop"
    }
  ];

  const filteredExperts = activeFilter === 'all' 
    ? experts 
    : experts.filter(expert => expert.company.toLowerCase() === activeFilter);

  return (
    <div className="space-y-10">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-3">Select Your Expert Reviewer</h1>
        <p className="text-gray-600">
          Choose a FAANG Product Manager with 15+ years of experience to review your resume and provide personalized feedback.
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="grid grid-cols-6 w-full max-w-2xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="amazon">Amazon</TabsTrigger>
            <TabsTrigger value="apple">Apple</TabsTrigger>
            <TabsTrigger value="meta">Meta</TabsTrigger>
            <TabsTrigger value="netflix">Netflix</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => (
          <Card 
            key={expert.id}
            className={`cursor-pointer transition-all ${selectedExpert === expert.name ? 'ring-2 ring-google-blue' : 'hover:shadow-md'}`}
            onClick={() => onExpertSelect(expert.name)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  <img 
                    src={expert.imgUrl} 
                    alt={expert.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {expert.title} 
                      <span className="font-medium text-google-blue"> @ {expert.company}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-google-yellow text-google-yellow" />
                  <span className="font-medium">{expert.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center mb-3">
                <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{expert.experience} years experience</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{expert.bio}</p>
              <div className="flex flex-wrap gap-2">
                {expert.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-google-blue">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              {selectedExpert === expert.name ? (
                <Badge className="bg-green-100 text-green-800 border-green-200 w-full flex justify-center py-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Selected
                </Badge>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => onExpertSelect(expert.name)}>
                  Select Expert
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Button 
          onClick={onAnalyze} 
          disabled={isAnalyzing || !selectedExpert}
          className="px-8 py-6 text-lg bg-google-blue hover:bg-blue-600"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze My Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
