"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Handshake,
  Mail,
  Send,
  Building,
  Users,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const collaborationTypes = [
  {
    title: "Industry Partnerships",
    icon: Building,
    description:
      "Partner with us for research projects, internships, and industry insights.",
  },
  {
    title: "Academic Collaboration",
    icon: Lightbulb,
    description:
      "Collaborate on research papers, joint studies, and academic initiatives.",
  },
  {
    title: "Event Sponsorship",
    icon: Users,
    description: "Sponsor our workshops, hackathons, and networking events.",
  },
];

export default function Collaborate() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    collaborationType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Collaboration Request Submitted!",
      description:
        "We&apos;ll review your proposal and get back to you within 48 hours.",
    });
    setFormData({
      name: "",
      email: "",
      organization: "",
      role: "",
      collaborationType: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                Collaborate with Us
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r gradient-primary mx-auto mb-8"></div>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Partner with ETH Zurich&apos;s premier blockchain student
              organization
            </p>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      {/* Collaboration Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
              Ways to Collaborate
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {collaborationTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card
                  key={index}
                  className="p-8 shadow-glass hover:shadow-elegant transition-smooth group text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                  <p className="text-muted-foreground">{type.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Collaborate */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
                Why Partner with ETHBCC?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Access to Top Talent
                </h3>
                <p className="text-muted-foreground">
                  Connect with ETH Zurich&apos;s brightest students in computer
                  science, mathematics, and engineering who are passionate about
                  blockchain technology.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Research Excellence
                </h3>
                <p className="text-muted-foreground">
                  Collaborate on cutting-edge research projects and benefit from
                  ETH Zurich&apos;s world-class academic environment and
                  research facilities.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Innovation Hub</h3>
                <p className="text-muted-foreground">
                  Tap into Switzerland&apos;s blockchain ecosystem and ETH
                  Zurich&apos;s position as a global leader in technology and
                  innovation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Future Leaders</h3>
                <p className="text-muted-foreground">
                  Build relationships with the next generation of blockchain
                  leaders who will shape the future of decentralized technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light-title mb-4">
                Start a Collaboration
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell us about your organization and how you&apos;d like to work
                together
              </p>
            </div>

            <Card className="p-8 shadow-elegant">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization *</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Company or institution name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g., CEO, Research Director"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collaborationType">
                    Type of Collaboration *
                  </Label>
                  <Select
                    value={formData.collaborationType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, collaborationType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select collaboration type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industry">
                        Industry Partnership
                      </SelectItem>
                      <SelectItem value="academic">
                        Academic Collaboration
                      </SelectItem>
                      <SelectItem value="sponsorship">
                        Event Sponsorship
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Collaboration Proposal *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your collaboration idea, goals, and how we can work together..."
                    className="min-h-32"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary shadow-elegant group"
                >
                  <Send className="mr-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
                  Submit Collaboration Request
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light-title mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions about collaboration opportunities? We&apos;d love
              to hear from you.
            </p>
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/5 transition-calm"
              >
                <Mail className="mr-2 h-5 w-5" />
                contact@eth-blockchain.org
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
