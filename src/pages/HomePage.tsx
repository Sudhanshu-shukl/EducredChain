import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  FileUp,
  Award,
  Brain,
  Users,
  LockKeyhole,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useWallet } from "../contexts/WalletContext";

const features = [
  {
    icon: FileUp,
    title: "Upload Credentials",
    desc: "Simply upload your PDF learning credentials to our secure platform for processing.",
    bg: "bg-primary-100",
    color: "text-primary-600",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    desc: "Our AI engine analyzes your credentials, extracts key information, and generates summaries.",
    bg: "bg-secondary-100",
    color: "text-secondary-600",
  },
  {
    icon: Shield,
    title: "Blockchain Verification",
    desc: "Your credentials are securely stored on IPFS and verified with Polygon blockchain NFTs.",
    bg: "bg-accent-100",
    color: "text-accent-600",
  },
];

const benefits = [
  {
    icon: LockKeyhole,
    title: "Tamper-Proof Security",
    desc: "Blockchain technology ensures your credentials cannot be altered or falsified.",
    bg: "bg-primary-100",
    color: "text-primary-600",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    desc: "Intelligent summaries and question-answering enhance your credential value.",
    bg: "bg-secondary-100",
    color: "text-secondary-600",
  },
  {
    icon: Users,
    title: "Easy Sharing",
    desc: "Share verified credentials with employers or institutions with just a link.",
    bg: "bg-accent-100",
    color: "text-accent-600",
  },
  {
    icon: Award,
    title: "Credential Ownership",
    desc: "Own your credentials as NFTs for true digital ownership.",
    bg: "bg-success-100",
    color: "text-success-600",
  },
];

const SectionTitle = ({ title, desc }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
    <p className="text-gray-600 max-w-2xl mx-auto">{desc}</p>
  </div>
);

const Card = ({ icon: Icon, title, desc, bg, color }) => (
  <div className="card flex flex-col items-center text-center p-8">
    <div className={`w-16 h-16 rounded-full ${bg} flex items-center justify-center mb-6`}>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const BenefitItem = ({ icon: Icon, title, desc, bg, color }) => (
  <div className="flex space-x-4">
    <div className="flex-shrink-0">
      <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  </div>
);

const HomePage = () => {
  const { address } = useWallet();
  const buttonText = address ? "Go to Dashboard" : "Get Started";

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Verify Your Credentials with Blockchain & AI
            </h1>

            <p className="text-lg text-primary-100 max-w-lg">
              EduCred securely stores and verifies your learning credentials
              using blockchain and enhances them with AI-powered insights.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/dashboard" className="btn-accent">
                {buttonText}
              </Link>

              <a
                href="#how-it-works"
                className="btn btn-outline border-white text-white hover:bg-white/10"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg"
                alt="Credential Verification"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-400 rounded-full opacity-30 blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-400 rounded-full opacity-30 blur-2xl" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="container-custom">
          <SectionTitle
            title="How It Works"
            desc="Our platform combines blockchain and AI to create a secure and intelligent credential verification system."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <Card key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Key Benefits"
            desc="EduCred offers several advantages for learners, educators, and employers."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((b, i) => (
              <BenefitItem key={i} {...b} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-secondary-300" />

          <h2 className="text-3xl font-bold mb-6">
            Ready to Verify Your Credentials?
          </h2>

          <p className="text-xl text-secondary-100 mb-8">
            Join our platform today and experience the future of verification.
          </p>

          <Link
            to="/dashboard"
            className="btn bg-white text-secondary-700 hover:bg-gray-100"
          >
            {buttonText}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
