'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function CommitteeApplication() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    city: '',
    university: '',
    academic_department: '',
    experience: '',
    leadership_experience: '', // New field for committee
    motivation: '',
    committee_role: '', // New field for preferred role
    time_commitment: '', // New field
    accept_terms: false,
    accept_committee: false, // Different checkbox
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
        body: JSON.stringify({
          ...formData,
          application_type: 'committee', // Add this to distinguish
          registration: 'committee', // Always set to "committee" for committee applications
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: 'Thank you',
          description: 'Thank you for your application. We will get back to you soon!.',
        })
        // Reset form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          city: '',
          university: '',
          academic_department: '',
          experience: '',
          leadership_experience: '',
          motivation: '',
          committee_role: '',
          time_commitment: '',
          accept_terms: false,
          accept_committee: false,
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
            <h1 className="text-5xl md:text-7xl font-light-title mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Committee Application
            </h1>
            <div className="w-24 h-1 gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Take on a leadership role and help shape the future of our
              blockchain community
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto p-8 shadow-elegant">
            <h2 className="text-2xl font-light-title mb-6">
              Committee Application
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
                <Label htmlFor="committee_role">
                  Preferred Committee Role *
                </Label>
                <Input
                  id="committee_role"
                  name="committee_role"
                  value={formData.committee_role}
                  onChange={handleChange}
                  placeholder="e.g., President, Vice President, Treasurer, Event Coordinator"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time_commitment">Time Commitment *</Label>
                <Input
                  id="time_commitment"
                  name="time_commitment"
                  value={formData.time_commitment}
                  onChange={handleChange}
                  placeholder="e.g., 5-10 hours per week"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">
                  Blockchain/Crypto Experience *
                </Label>
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
                <Label htmlFor="leadership_experience">
                  Leadership Experience *
                </Label>
                <Textarea
                  id="leadership_experience"
                  name="leadership_experience"
                  value={formData.leadership_experience}
                  onChange={handleChange}
                  placeholder="Describe your leadership experience, previous roles, and achievements..."
                  className="min-h-24"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Motivation & Vision *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Why do you want to join the committee? What's your vision for the club?"
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
                    id="accept_committee"
                    checked={formData.accept_committee}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        'accept_committee',
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="accept_committee" className="text-sm">
                    I want to join the committee and take on leadership
                    responsibilities *
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-primary shadow-elegant group"
              >
                <Send className="mr-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit Committee Application'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
