import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/testimonials";


const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];



export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="gradient-title pt-10">Simplify your scheduling</h1>
          <p className="text-2xl pb-6 mb-10 text-gray-600">Book meetings without the back-and-forth. Create a booking link and share it with your clients.</p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started<ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/poster.png"
              alt="Hero Image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-600">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {features.map((feature, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-blue-500 mb-4 mx-auto" />
                  <CardTitle className="text-center text-blue-500">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>


      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-600">What Our Users Say</h2>
        <Testimonials />
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-600">How it works</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {howItWorks.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-xl font-bold text-blue-600">{index + 1}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.step}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 text-white rounded-lg p-8 mt-18 text-center">
        <h2 className="text-3xl font-bold mb-4">
          How to Simplify your scheduling?
        </h2>
        <p className="text-lg mb-6">
         Join thousands of users who trust Schedulrr for efficient time management.
        </p>
        <Link href="/dashboard">
          <Button size="lg" variant="secondary" className="text-lg text-blue-600 px-8 py-6 mt-4">
            Start for Free<ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>


    </main>
  );
}
