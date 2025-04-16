
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Filter, Loader2, Briefcase, Star, CheckCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  const experts: Expert[] = [
    {
      id: "alex-rivera",
      name: "Alex Rivera",
      title: "Senior Product Manager",
      company: "Google",
      experience: 16,
      specialties: ["AI/ML", "Data Products", "Enterprise"],
      rating: 4.9,
      bio: "Former Senior PM at Google with over 16 years of experience leading product teams. Expertise in AI and machine learning products, having led teams that developed key Google Cloud ML services.",
      imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "raj-patel",
      name: "Raj Patel",
      title: "Director of Product",
      company: "Amazon",
      experience: 18,
      specialties: ["E-commerce", "Consumer", "Mobile"],
      rating: 4.8,
      bio: "Former Director of Product at Amazon who led the development of several key features for Amazon's mobile shopping experience, focusing on conversion optimization and user engagement.",
      imgUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "emma-chen",
      name: "Emma Chen",
      title: "Product Lead",
      company: "Meta",
      experience: 15,
      specialties: ["Social Media", "Growth", "B2C"],
      rating: 4.9,
      bio: "Former Product Lead at Meta where she scaled growth initiatives for Facebook Marketplace. Specializes in social products and user acquisition strategies that drove millions of new users.",
      imgUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "marcus-johnson",
      name: "Marcus Johnson",
      title: "Principal PM",
      company: "Apple",
      experience: 17,
      specialties: ["Hardware/Software", "UX", "Luxury"],
      rating: 4.7,
      bio: "Former Principal PM at Apple who worked on integrating hardware and software experiences. Marcus brings deep expertise in creating premium product experiences with exceptional attention to detail.",
      imgUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "sophia-rodriguez",
      name: "Sophia Rodriguez",
      title: "Senior PM",
      company: "Netflix",
      experience: 15,
      specialties: ["Entertainment", "Subscription", "Analytics"],
      rating: 4.8,
      bio: "Former Senior PM at Netflix who led the development of content recommendation algorithms. Sophia specializes in data-driven product development and personalization strategies.",
      imgUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=250&auto=format&fit=crop"
    },
    {
      id: "noah-kim",
      name: "Noah Kim",
      title: "Group Product Manager",
      company: "Google",
      experience: 20,
      specialties: ["Search", "Ads", "B2B"],
      rating: 4.9,
      bio: "Former Group Product Manager at Google with 20 years of experience leading search and advertising products. Noah specializes in helping candidates position themselves for technical PM roles.",
      imgUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=250&auto=format&fit=crop"
    }
  ];

  const filteredExperts = activeFilter === 'all' 
    ? experts 
    : experts.filter(expert => expert.company.toLowerCase() === activeFilter);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-3">Select Your Expert Reviewer</h1>
        <p className="text-gray-600">
          Choose a FAANG Product Manager with 15+ years of experience to review your resume and provide personalized feedback.
        </p>
      </div>
      
      <div className="flex justify-center mb-8 overflow-x-auto">
        <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} w-full max-w-2xl ${isMobile ? 'mb-2' : ''}`}>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="amazon">Amazon</TabsTrigger>
            {isMobile ? (
              <TabsTrigger value="apple" className="mt-2">Apple</TabsTrigger>
            ) : (
              <TabsTrigger value="apple">Apple</TabsTrigger>
            )}
            {isMobile ? (
              <TabsTrigger value="meta" className="mt-2">Meta</TabsTrigger>
            ) : (
              <TabsTrigger value="meta">Meta</TabsTrigger>
            )}
            {isMobile ? (
              <TabsTrigger value="netflix" className="mt-2">Netflix</TabsTrigger>
            ) : (
              <TabsTrigger value="netflix">Netflix</TabsTrigger>
            )}
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
