'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
// Checkbox removed: we no longer collect accept_terms from the UI
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function MemberApplication() {
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
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

  // The terms checkbox was removed from the UI; do NOT send accept_terms so it remains empty by default

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          application_type: 'member', // Add this to distinguish
          registration: 'external', // Always set to "external" for member applications
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: 'Application Submitted',
          description: 'Thank you for your application. We will get back to you soon!',
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
              Member Application
            </h1>
            <div className="w-24 h-1 gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Join our community as a member and participate in our blockchain
              journey
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  placeholder="Please tell us about your blockchain/crypto experience."
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
                  placeholder="Why do you want to join the ETH Blockchain Club?"
                  className="min-h-24"
                  required
                />
              </div>

              {/* Terms acceptance removed from UI; stored as true by default */}

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

      <Footer />
    </div>
  )
}
