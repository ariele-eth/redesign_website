'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
// Checkbox removed: we no longer collect accept_terms from the UI
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
    <div className="join-page min-h-screen">
      <div className="page-grid-bg" />
      <Navigation />

      <main>
        <section className="page-hero-shell application-hero application-hero-tight">
          <div className="hero-top-brand">
            <span className="hero-top-line" />
            <span className="hero-top-text">APPLICATIONS OPEN</span>
          </div>

          <h1 className="hero-title-main">
            <span>Member</span>
            <span className="outline">Application</span>
          </h1>

          <p className="hero-subtext">
            Join our community as a member and help build the ETH Blockchain
            Club ecosystem.
          </p>
        </section>

        <section className="application-section">
          <Card className="card application-card w-full max-w-5xl p-5 md:p-6">
            <div className="mb-6">
              <h2 className="h2">Membership Application</h2>
              <p className="lead">
                Tell us a bit about yourself so we can place you in the
                community track that fits best.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 application-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience *</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
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
                  className="min-h-24"
                  required
                />
              </div>

              {/* Terms acceptance removed from UI; stored as true by default */}

              <div className="application-submit-row flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="hero-cta-primary"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
