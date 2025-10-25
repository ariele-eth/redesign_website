import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PersonCard } from "@/components/PersonCard";
import Link from "next/link";
import { ArrowRight, GraduationCap, Calendar, Users } from "lucide-react";
import { AnimatedNetwork } from "@/components/AnimatedNetwork";
// Use public asset paths (public/assets/advisors/) instead of importing from src
// This avoids module-not-found errors in CI if images are tracked under `public/`
const bergmannImage = "/assets/advisors/bergmann.jpeg";
const gervaisImage = "/assets/advisors/gervais.png";

export default function Home() {
  // Add partner logos here (place logo files in public/assets/partners/)
  const partners = [
    { name: "ETH Zürich", logo: "/assets/partners/eth.png", href: "https://ethz.ch" },
    { name: "ETH Zürich FinsureTech Hub", logo: "/assets/partners/ETHZ_FinsureTech_Hub.jpg", href: "https://finsuretech.ethz.ch" },
    { name: "ETH Student Project House", logo: "/assets/partners/ETH_Student_Project_House.png", href: "https://sph.ethz.ch" },
  ];

  return (
    <div className="min-h-screen snap-y snap-mandatory">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white snap-start">
        {/* Animated Blockchain Network Background */}
        <div className="absolute inset-0 bg-white overflow-hidden">
          <AnimatedNetwork />
        </div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-0 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mt-16">
          <div className="animate-fade-in-up">
            <div className="mb-6 flex justify-center">
              {/* Mobile: small svg; Desktop: full png */}
              <img
                src="/ETHBCC_small.svg"
                alt="ETHBCC Logo"
                className="h-10 w-auto transition-smooth hover:scale-105 block md:hidden"
              />
              <img
                src="/ethbcc_logo.png"
                alt="ETHBCC Logo"
                className="h-20 w-auto transition-smooth hover:scale-105 hidden md:block"
              />
            </div>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto font-light">
              {/*Shaping the industry leaders of tomorrow through blockchain education, innovation and collaboration. at ETH Zurich*/}
              We connect strong industry partners to driven students, fostering
              education, innovation, and collaboration in Blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <Button
                  size="lg"
                  className="gradient-primary shadow-elegant group transform transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md hover:brightness-95"
                >
                  Join Us
                  <ArrowRight className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  className="group bg-white text-primary border border-primary/30
                             hover:bg-gray-50 hover:text-primary hover:border-primary/40
                             shadow-sm hover:shadow-md
                             transform transition-colors transition-transform duration-150 ease-out
                             hover:-translate-y-[2px] h-11 rounded-md px-8 inline-flex items-center justify-center gap-2"
                >
                  See Events
                  <Calendar className="ml-2 h-5 w-5 transition-transform duration-150 group-hover:translate-y-[-3px]" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
                Our Vision
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto"></div>
            </div>
            <p className="pace-y-6 text-muted-foreground leading-relaxed text-lg text-center md:text-left">
              {/* We aim to positively shape the industry of tomorrow by educating and empowering students. <br /> {/*the next generation of blockchain leaders.
              To reach our goal, we focus on three main pillars: Education, Events, and Industry Collaboration.<br />
              This allows us to deepen interest, broaden knowledge, and foster innovation in the blockchain space, ultimately contributing to the mainstream adoption of blockchain technology.*/}
              We aim to positively shape the future of blockchain technology by
              educating tomorrow&apos;s innovators.
              <br />
              Through Education, Events, and Industry Collaboration, we build
              technical expertise, expand practical knowledge, and foster
              responsible innovation to advance real-world adoption.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
              What We Do
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth group">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Educational Workshops
              </h3>
              <p className="text-muted-foreground">
                We host and develop workshops to educate students, providing
                valueable knowledge and hands-on learning experiences.
              </p>
            </Card>

            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth group">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Big Events & Hackathons
              </h3>
              <p className="text-muted-foreground">
                We organize regular events and hackathons with industry
                partners, creating opportunities for students to network, build,
                and showcase their projects.
              </p>
            </Card>

            <Card className="p-8 shadow-glass hover:shadow-elegant transition-smooth group">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Industry Connections
              </h3>
              <p className="text-muted-foreground">
                We foster direct connections between students and industry
                leaders through partnerships, mentorship programs, and career
                opportunities that transform learning into real-world impact.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Collaborations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
              Academic Collaborations
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PersonCard
              name="Dr. Bastian Bergmann"
              role={"Lecturer and Executive Director of the FinsureTech Hub\nETH Zürich"}
              description="As founding mentor, he has provided invaluable guidance, mentorship and support."
              image={bergmannImage}
            />

            <PersonCard
              name="Prof. Dr. Arthur Gervais"
              role={"Professor of Information Security\nUniversity College London"}
              description="As founding supporter, he has provided essential academic insights, mentorship and transformative opportunities."
              image={gervaisImage}
            />
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
              Advisors
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="md:col-span-2 flex justify-center">
              <div className="w-full md:w-1/2 lg:w-1/2 max-w-sm">
                <PersonCard
                  name="Adrian Kögl"
                  role={"Strategic Advisor\nSecurity Engineer, Quantstamp"}
                  description="As co-founder of the TUM Blockchain Club and Co-Chair of IEEE Blockchain Switzerland, he supports us with proven experience in building successful, student-led communities."
                  image="/assets/advisors/adrian.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
              Our Partners
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 max-w-5xl mx-auto">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.href ?? "#"}
                className="flex items-center justify-center p-8 bg-white rounded-lg hover:shadow-lg transition-all duration-200 ease-out hover:-translate-y-1 min-w-[200px] min-h-[140px]"
                aria-label={p.name}
                target={p.href && p.href !== "#" ? "_blank" : undefined}
                rel={p.href && p.href !== "#" ? "noopener noreferrer" : undefined}
              >
                <img src={p.logo} alt={p.name} className="max-h-24 max-w-[180px] object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
                Open For Collaboration
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r gradient-primary mx-auto"></div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              As an accredited student club at ETH Zurich, we bring together a
              community of driven and curious minds eager to collaborate. Led by
              dedicated students, we embody ETH Zurich&apos;s spirit of
              innovation and problem-solving. Ranked 7th globally and the top
              university in continental Europe (QS World University Rankings
              2025), ETH Zurich provides the perfect environment for
              partnerships that push boundaries and create real impact.
            </p>
            <Link href="/collaborate">
              <Button
                size="lg"
                className="gradient-primary shadow-elegant hover:shadow-medium transition-calm group"
              >
                Collaborate with Us
                <ArrowRight className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
