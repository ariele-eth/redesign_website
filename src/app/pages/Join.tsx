'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { MessageSquare, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function Join() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    city: '',
    company: '',
    industry: '',
    motivation: '',
    university: '',
    experience: '',
    academic_department: '',
    accept_terms: false,
    accept_member: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: 'Application Submitted!',
          description: "We'll get back to you soon. Welcome to the community!",
        })
        // Reset form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          city: '',
          company: '',
          industry: '',
          motivation: '',
          university: '',
          experience: '',
          academic_department: '',
          accept_terms: false,
          accept_member: false,
        })
      } else {
        toast({
          title: 'Error',
          description:
            result.error || 'Failed to submit application. Please try again.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

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
                      handleCheckboxChange('accept_terms', checked as boolean)
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
                      handleCheckboxChange('accept_member', checked as boolean)
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
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Telegram Group</h3>
              <p className="text-muted-foreground mb-6">
                Join our active Telegram community for daily discussions,
                announcements, and quick questions.
              </p>
              <Button variant="outline" className="w-full">
                Join Telegram
              </Button>
            </Card>

            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mailing List</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for event updates, research
                highlights, and opportunities.
              </p>
              <Button variant="outline" className="w-full">
                Subscribe
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
