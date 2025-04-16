
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Shield, Loader2, Mail } from 'lucide-react';
import { saveResumeAnalysis, sendEmailFeedback } from '@/services/googleSheets';
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  currentRole: z.string().min(2, { message: "Please specify your current role." }),
  targetCompanies: z.string().min(2, { message: "Please specify at least one target company." }),
  linkedIn: z.string().optional(),
  jobSearchTimeline: z.enum(["active", "1month", "3months", "6months", "exploring"]),
  budget: z.enum(["under500", "500to1000", "1000to2000", "over2000", "unsure"]),
  additionalInfo: z.string().optional(),
  sendEmailFeedback: z.boolean().default(false),
});

interface LeadFormProps {
  onSubmit: (data: any) => void;
  resumeFileName?: string;
  jobDescription: string;
  selectedExpert: string;
  atsScore?: number;
  keywordScore?: number;
  contentScore?: number;
  overallScore?: number;
}

export const LeadForm: React.FC<LeadFormProps> = ({ 
  onSubmit,
  resumeFileName,
  jobDescription,
  selectedExpert,
  atsScore = 0,
  keywordScore = 0,
  contentScore = 0,
  overallScore = 0
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      currentRole: "",
      targetCompanies: "",
      linkedIn: "",
      jobSearchTimeline: "exploring",
      budget: "unsure",
      additionalInfo: "",
      sendEmailFeedback: false,
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        timestamp: new Date().toISOString(),
        fileName: resumeFileName || "resume.pdf",
        atsScore: atsScore, 
        keywordScore: keywordScore,
        contentScore: contentScore,
        overallScore: overallScore,
        jobTitle: values.currentRole,
        name: values.name,
        email: values.email,
        phone: values.phone,
        currentRole: values.currentRole,
        targetCompanies: values.targetCompanies,
        linkedIn: values.linkedIn || "Not provided",
        jobSearchTimeline: values.jobSearchTimeline,
        budget: values.budget,
        additionalInfo: values.additionalInfo || "Not provided",
        expert: selectedExpert,
        sendEmailFeedback: values.sendEmailFeedback
      };
      
      toast({
        title: "Submitting your information...",
        description: "Please wait while we save your profile.",
      });
      
      const result = await saveResumeAnalysis(submissionData);
      
      // If requested, also send email feedback
      if (values.sendEmailFeedback) {
        toast({
          title: "Preparing Email Feedback",
          description: "We're also sending your ATS feedback to your email.",
        });
        
        await sendEmailFeedback({
          email: values.email,
          name: values.name,
          atsScore: atsScore,
          keywordScore: keywordScore,
          contentScore: contentScore,
          overallScore: overallScore,
          resumeFileName: resumeFileName || "resume.pdf",
          jobTitle: values.currentRole,
          expert: selectedExpert
        });
      }
      
      if (result.success) {
        toast({
          title: "Profile Submitted Successfully",
          description: values.sendEmailFeedback 
            ? "Your information has been saved and the report will be emailed to you. Unlocking your full analysis..."
            : "Your information has been saved. Unlocking your full analysis...",
        });
        
        onSubmit(values);
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        title: "Submission In Progress",
        description: "We're processing your submission. Please continue to your analysis.",
      });
      
      onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl font-bold mb-3">Complete Your Profile</h1>
        <p className="text-gray-600">
          Your information helps our experts provide personalized feedback tailored to your career goals.
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-xl">
          <div className="relative">
            <Progress value={50} className="h-2" />
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Resume Upload</span>
              <span>Profile Completion</span>
              <span className="text-gray-300">Expert Feedback</span>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Help us understand your background and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address*</FormLabel>
                      <FormControl>
                        <Input placeholder="johnsmith@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="linkedin.com/in/johnsmith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="currentRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Role*</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="targetCompanies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Companies*</FormLabel>
                      <FormControl>
                        <Input placeholder="Google, Amazon, Netflix" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="jobSearchTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Search Timeline*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Actively searching</SelectItem>
                          <SelectItem value="1month">Within 1 month</SelectItem>
                          <SelectItem value="3months">Within 3 months</SelectItem>
                          <SelectItem value="6months">Within 6 months</SelectItem>
                          <SelectItem value="exploring">Just exploring</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget for Career Services*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under500">Under $500</SelectItem>
                          <SelectItem value="500to1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000to2000">$1,000 - $2,000</SelectItem>
                          <SelectItem value="over2000">Over $2,000</SelectItem>
                          <SelectItem value="unsure">Not sure yet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific career challenges or goals you'd like the expert to know about"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sendEmailFeedback"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-google-blue" />
                        Email me my ATS feedback results
                      </FormLabel>
                      <FormDescription>
                        We'll send a detailed report of your resume analysis to your email address.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-md">
                <Shield className="h-5 w-5 text-google-blue" />
                <p className="text-sm text-gray-600">
                  We respect your privacy. Your information will only be used to provide personalized feedback. See our <a href="#" className="text-google-blue hover:underline">Privacy Policy</a>.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="px-8 py-6 text-lg bg-google-blue hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Unlock Full Expert Analysis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
