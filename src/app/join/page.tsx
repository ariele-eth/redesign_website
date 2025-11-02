import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  MessageSquare,
  CalendarCheck,
  BookOpen,
  Gavel,
  Flag,
  Plane,
  Award,
  Handshake,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export default function JoinLanding() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-light-title mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Join Us
            </h1>
            <div className="w-24 h-1 gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Become part of the next generation of blockchain innovators at ETH
              Zurich
            </p>
            <div className="mt-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you&apos;re a complete beginner or an experienced
                blockchain developer, ETH Blockchain Club welcomes all students
                passionate about decentralized technology. Join our community to
                learn, build, and shape the future of blockchain innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light-title mb-12 text-center">
              Choose Your Path
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Member Application */}
              <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Become a Member</h3>
                <p className="text-muted-foreground mb-6">
                  Join our community as a regular member. Participate in events,
                  workshops, and connect with fellow blockchain enthusiasts.
                </p>
                <Link href="/join/member">
                  <Button className="w-full gradient-primary shadow-elegant transform transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md hover:brightness-95">
                    Apply as a Member
                  </Button>
                </Link>
                {/* Member benefits list (same card as the button/image) */}
                <ul className="mt-10 space-y-4 text-left">
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      <CalendarCheck className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Priority Access to Events:</strong> Secure your spot at popular workshops, talks, and networking events with prioritized registration.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      <BookOpen className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Exclusive Content & Opportunities:</strong> Access a members-only channel with educational resources, event recordings, and curated job or internship postings from our partners.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      <Gavel className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Shape the Club&apos;s Future:</strong> Exercise your voting rights on important club decisions and initiatives.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                      <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      <Users className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Join a Vibrant Community:</strong> Connect with a passionate community of blockchain developers, researchers, and enthusiasts at exclusive social events.
                    </span>
                  </li>
                </ul>
              </Card>

              {/* Committee Application */}
              <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <UserCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Join the Committee
                </h3>
                <p className="text-muted-foreground mb-6">
                  Take on a leadership role in organizing events, managing
                  projects, and shaping the club&apos;s direction.
                </p>
                <Link href="/join/committee">
                  <Button className="w-full gradient-primary shadow-elegant transform transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md hover:brightness-95">
                    Apply as a Committee Member
                  </Button>
                </Link>
                {/* Committee benefits list (same card as the button/image) */}
                <ul className="mt-10 space-y-4 tcreatext-left">
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      <Flag className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Lead the Mission:</strong> Directly influence the club&apos;s strategic direction, projects, and impact on the blockchain ecosystem.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      <Plane className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Exclusive Networking & Sponsored Travel:</strong> Benefit from fully-paid trips to industry partner events and attend exclusive, committee-only gatherings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      <Award className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Develop Leadership Skills:</strong> Gain valuable experience in management, strategic planning, and event organization.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      <Handshake className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Build Industry Connections:</strong> Establish personal relationships with speakers, sponsors, and leaders in the blockchain space.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/70 text-primary ring-1 ring-primary/30 shadow-md backdrop-blur-sm">
                      {/* Small version of the UserPlus icon used to indicate membership perk */}
                      <UserPlus className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong>Full Membership Perks:</strong> By joining the committee you also become a member — enjoy all the benefits granted to general members.
                    </span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light-title mb-12 text-center">
            Join Our Community
          </h2>
          <div className="flex justify-center max-w-4xl mx-auto">
            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Telegram Group</h3>
              <p className="text-muted-foreground mb-6">
                Join our active Telegram community for daily discussions,
                announcements, and quick questions.
              </p>
              <a
                href="https://t.me/+CV7HLFRdFUFkNTBk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full transform transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md hover:border-primary/60 active:translate-y-0 active:shadow-sm"
                >
                  Join Telegram
                </Button>
              </a>
            </Card>

            {/* Mailing List - Will be reactivated in the future */}
            {/* <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth text-center group">
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
            </Card> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
