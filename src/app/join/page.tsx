import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, MessageSquare, Mail } from "lucide-react";
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
                  <Button className="w-full gradient-primary shadow-elegant">
                    Apply as Member
                  </Button>
                </Link>
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
                  projects, and shaping the club's direction.
                </p>
                <Link href="/join/committee">
                  <Button className="w-full gradient-primary shadow-elegant">
                    Apply for Committee
                  </Button>
                </Link>
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
  );
}
