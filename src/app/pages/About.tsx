import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PersonCard } from "@/components/PersonCard";

const executiveMembers = [
  {
    name: "Jennis Bešić",
    role: "President & Founder\nBSc Computer Science",
    description:
      "Passionate about blockchain technology and its potential to revolutionize industries.",
    image: "/assets/team/jennis.jpeg",
  },
  {
    name: "Anej Rozman",
    role: "Head of Events & Co-Founder\nMSc Quantitative Finance",
    description:
      "Strong believer in the longevity of blockchain technologies, crypto currencies and decentralization.",
    image: "/assets/team/anej.jpeg",
  },
  {
    name: "Gustave Charles",
    role: "Head of Recruiting and Member Organization\nMSc Cyber Security",
    description:
      "Working in privacy, decentralisation and governance real-world usecases.",
    image: "/assets/team/gustave.jpeg",
  },
  {
    name: "Ariele Marcellino",
    role: "Head of Innovation and Technology\nBSc Computer Science",
    description: "Leading innovation and technology initiatives.",
    image: "/assets/team/ariele.png",
  },
  {
    name: "Ilan Nissim",
    role: "Head of External Relations\nMSc Data Science",
    description: "Interested in decentralized finance and blockchain technology.",
    image: "/assets/team/ilan.png",
  },
];

const poles = [
    {
    name: "President",
    lead: { name: "Jennis Bešić", image: "/assets/team/jennis.jpeg" },
    description:
      "Responsible for the strategic and operational management in addition to representing the board internally and the club as a whole externally.",
    members: [],
  },

    {
    name: "Innovation and Technology",
    lead: { name: "Ariele Marcellino", image: "/assets/team/ariele.png" },
    description:
      "Leading the technical development of our website and additional projects.",
    members: [
      { name: "Cyrill", image: "/assets/team/cyrill.jpg" },
      { name: "Gamal", image: "/assets/team/gamal.jpeg" },
    ],
  },

  {
    name: "External Relations",
    lead: { name: "Ilan Nissim", image: "/assets/team/ilan.png" },
    description:
      "Managing partnerships and external communications with industry leaders.",
    members: [
      { name: "Noé Macé", image: "/assets/team/noe.jpeg" },
      { name: "Pedro Gouveia", image: undefined }
    ],
  },
  {
    name: "Events",
    lead: { name: "Anej Rozman", image: "/assets/team/anej.jpeg" },
    description:
      "Organizing meetups, hackathons, and social events for our community with delicious catering.",
    members: [
      { name: "Firas Dridi", image: "/assets/team/firas.png" },
      { name: "Gökhan", image: undefined },
    ],
  },

    {
    name: "Recruiting & Member Organization",
    lead: { name: "Gustave Charles", image: "/assets/team/gustave.jpeg" },
    description: "Coordinating leads in cooperation with the president, overseeing day to day and flagship events operations.",
    members: [],
  },

    {
    name: "Marketing",
    lead: { name: "This could be you!", image: undefined },
    description:
      "Leading our marketing initiatives and community outreach efforts.",
    members: [{ name: "Dominic", image: "/assets/team/dominic.jpg" }],
  },

  {
    name: "Finances & Legal",
    lead: { name: "This could be you!", image: undefined },
    description:
      "Building connections with universities, industries and the global blockchain community.",
    members: [],
  },

  {
    name: "Education",
    lead: { name: "This could be you!", image: undefined },
    description:
      "Fostering a culture of continuous learning and knowledge sharing.",
    members: [],
  }
  
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-light-title mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                About Us
              </h1>
              <div className="w-24 h-1 gradient-primary mx-auto mb-8"></div>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Pioneering blockchain innovation at Switzerland&apos;s leading
              technical university
            </p>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
                Our Mission
              </h2>
              <div className="w-16 h-1 gradient-primary mx-auto"></div>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-center md:text-left">
              <p>
                We&apos;re the first student blockchain club at ETH
                Zurich. Started as a student initiative in September 2025, with months of preparation, our goal is simple:
                plant seeds of knowledge and curiosity about blockchain
                technology in our peers.
              </p>
              <p>
                What drives us? We want to positively shape the industry and empower students to become educators
                themselves - sharing what they learn with classmates today and
                colleagues tomorrow. It&apos;s about raising awareness beyond the
                hype and speculation.

              </p>
              <p>
                This is our contribution to a better blockchain space. One with
                less black sheep, less noise, and more people who actually understand
                the fundamentals. We believe education is how we get there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
                Who We Are
              </h2>
              <div className="w-16 h-1 gradient-primary mx-auto"></div>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-center md:text-left">
              <p>
                The ETH Blockchain Club is a student-run initiative at ETH Zurich.
                Our interests lie in blockchain, cryptography, and everything
                decentralized.
              </p>
              <p>
                Academic research meets industry and real-world building here. Theory isn&apos;t
                stuck in papers, and projects aren&apos;t built in a vacuum.
                We believe going the full cycle from Introduction to Theory to Application is key. That&apos;s
                the space we create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
              Board
            </h2>
            <div className="w-16 h-1 gradient-primary mx-auto"></div>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              {executiveMembers.map((member, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/4 flex justify-center">
                  <PersonCard
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    image={member.image}
                    className="w-full max-w-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Poles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
              Our Poles
            </h2>
            <div className="w-16 h-1 gradient-primary mx-auto"></div>
          </div>
          <div className="max-w-6xl mx-auto space-y-12">
            {poles.map((pole, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold text-primary mb-8 text-center">
                  {pole.name}
                </h3>
                {/* Lead Card - Centered */}
                <div className="flex justify-center mb-8">
                  <PersonCard
                    name={pole.lead.name}
                    role="Head"
                    description={pole.description}
                    image={pole.lead.image}
                    className="max-w-sm"
                  />
                </div>

                {/* Member Cards */}
                <div className="flex flex-wrap justify-center gap-6">
                  {pole.members.map((member, memberIndex) => (
                    <PersonCard
                      key={memberIndex}
                      name={member.name}
                      role="Member"
                      image={member.image}
                      className="w-64"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Context */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light-title mb-6 text-gray-800">
                Location & Context
              </h2>
              <div className="w-16 h-1 gradient-primary mx-auto"></div>
            </div>
            <div className="mb-8 rounded-lg overflow-hidden shadow-elegant">
              <img
                src="/eth-zurich-campus.jpg"
                alt="ETH Zurich Campus - Aerial view of the main building"
                className="w-full h-auto"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed text-center">
              Based at ETH Zurich, one of the world&apos;s leading universities
              for science and technology, we benefit from a rich ecosystem of
              innovation and research excellence. Our home in Zurich, a global
              hub for blockchain and cryptocurrency innovation, provides unique
              opportunities to engage with industry leaders, researchers, and
              the broader Ethereum community.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
