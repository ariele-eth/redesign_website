"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Join() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    company: "",
    industry: "",
    motivation: "",
    university: "",
    experience: "",
    academic_department: "",
    accept_terms: false,
    accept_member: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Application Submitted",
          description: "Thank you for your application. We will get back to you soon!",
        });
        // Reset form
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          city: "",
          company: "",
          industry: "",
          motivation: "",
          university: "",
          experience: "",
          academic_department: "",
          accept_terms: false,
          accept_member: false,
        });
      } else {
        toast({
          title: "Error",
          description:
            result.error || "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-light-title mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Join Us
              </h1>
              <div className="w-24 h-1 gradient-primary mx-auto mb-8"></div>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Become part of the next generation of blockchain innovators at ETH
              Zurich
            </p>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you&apos;re a complete beginner or an experienced
              blockchain developer, ETHBLOCKCHAIN CLUB welcomes all students
              passionate about decentralized technology. Join our community to
              learn, build, and shape the future of blockchain innovation.
            </p>
          </div>

          {/* Membership Form */}
          <Card className="max-w-2xl mx-auto p-8 shadow-elegant">
            <h2 className="text-2xl font-light-title mb-6">
              Membership Application
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@ethz.ch"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Zurich"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="university">University *</Label>
                  <Input
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="ETH Zurich"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="academic_department">
                  Academic Department *
                </Label>
                <Input
                  id="academic_department"
                  name="academic_department"
                  value={formData.academic_department}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science, Mathematics"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company (if applicable)</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g., Technology, Finance"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience *</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Tell us about your blockchain/crypto experience..."
                  className="min-h-24"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Motivation *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Why do you want to join ETHBLOCKCHAIN CLUB?"
                  className="min-h-24"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accept_terms"
                    checked={formData.accept_terms}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("accept_terms", checked as boolean)
                    }
                  />
                  <Label htmlFor="accept_terms" className="text-sm">
                    I accept the terms and conditions *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accept_member"
                    checked={formData.accept_member}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("accept_member", checked as boolean)
                    }
                  />
                  <Label htmlFor="accept_member" className="text-sm">
                    I want to become a member *
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-primary shadow-elegant group"
              >
                <Send className="mr-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light-title mb-12 text-center">
            Join Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">X</h3>
              <p className="text-muted-foreground mb-6">
                Follow us on X for the latest updates, news, and blockchain
                insights.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open("https://x.com/ethbclub", "_blank")}
              >
                Follow Us
              </Button>
            </Card>

            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instagram</h3>
              <p className="text-muted-foreground mb-6">
                Follow our journey on Instagram for behind-the-scenes content
                and events.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  window.open("https://www.instagram.com/ethbclub", "_blank")
                }
              >
                Follow Us
              </Button>
            </Card>

            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">LinkedIn</h3>
              <p className="text-muted-foreground mb-6">
                Connect with us on LinkedIn for professional networking and
                opportunities.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/ethbclub",
                    "_blank"
                  )
                }
              >
                Connect
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
