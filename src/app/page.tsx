"use client";
import Link from "next/link";
import Image from "next/image";
import { PiHandshakeFill, PiProjectorScreenChartLight } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent, useEffect, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { motion } from "framer-motion";
import * as SETTINGS from "@/lib/settings";
import { getAllSiteSettings } from "@/lib/siteSettings";
import { TEXTS } from "@/lib/texts";
import {
  Hero,
  Card,
  Section,
  AnimatedSection,
  FeatureCard,
  Button,
} from "@/components/ui";

export default function Index() {
  const callToActionRef = useRef<null | HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    if (window.location.hash === "#join-us" && callToActionRef.current) {
      callToActionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    getAllSiteSettings().then((data) => {
      setSiteSettings(data);
      setSettingsLoading(false);
    });
  }, []);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subscribeToast = toast.loading("Subscribing...");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.", { id: subscribeToast });
      return;
    }

    try {
      await setDoc(
        doc(db, "subscribers", email),
        {
          email: email,
          timestamp: new Date(),
        },
        { merge: true }
      );
      toast.success("Thank you for subscribing!", { id: subscribeToast });
      setEmail("");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to subscribe. Please try again.", {
        id: subscribeToast,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Hero Section */}
      <Hero
        title={TEXTS.hero.title}
        subtitle={TEXTS.hero.subtitle}
        typedStrings={TEXTS.hero.typed}
        backgroundImage="/assets/images/hub3photo.jpg"
        primaryButton={{
          text: `${TEXTS.mission.heading} ${SETTINGS.HUB_CONFIG.CITY_NAME}`,
          href: "#mission",
        }}
        secondaryButton={{
          text: "Join Us",
          href: "#join-us",
        }}
      />

      {/* Mission Section */}
      <Section
        id="mission"
        variant="dark"
        title={`${TEXTS.mission.heading} ${SETTINGS.HUB_CONFIG.CITY_NAME}`}
        description={TEXTS.mission.description(
          SETTINGS.HUB_CONFIG.CITY_NAME,
          SETTINGS.HUB_CONFIG.HUB_NAME
        )}
        pattern
      >
        <AnimatedSection animation="slideUp" className="mt-12">
          <Link href="/our-impact">
            <Button
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 mx-auto block"
            >
              Learn More About Our Projects
            </Button>
          </Link>
        </AnimatedSection>
      </Section>

      {/* Stats Section */}
      <Section
        variant="gradient"
        title={`${TEXTS.impact.heading} ${SETTINGS.HUB_CONFIG.CITY_NAME}`}
        description={TEXTS.impact.description(SETTINGS.HUB_CONFIG.CITY_NAME)}
        pattern
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <AnimatedSection animation="scale" delay={0}>
            <Card
              variant="gradient"
              icon={<RiTeamFill className="w-16 h-16 text-blue-400" />}
              title={TEXTS.stats.shapers.title}
              stat={TEXTS.stats.shapers.value}
              description={TEXTS.stats.shapers.description}
            />
          </AnimatedSection>

          <AnimatedSection animation="scale" delay={0.1}>
            <Card
              variant="gradient"
              icon={
                <PiProjectorScreenChartLight className="w-16 h-16 text-green-400" />
              }
              title={TEXTS.stats.projects.title}
              stat={TEXTS.stats.projects.value}
              description={TEXTS.stats.projects.description(
                SETTINGS.HUB_CONFIG.CITY_NAME
              )}
            />
          </AnimatedSection>

          <AnimatedSection animation="scale" delay={0.2}>
            <Card
              variant="gradient"
              icon={<PiHandshakeFill className="w-16 h-16 text-purple-400" />}
              title={TEXTS.stats.partnerships.title}
              stat={TEXTS.stats.partnerships.value}
              description={TEXTS.stats.partnerships.description}
            />
          </AnimatedSection>
        </div>
      </Section>

      {/* Impact Areas */}
      <Section
        variant="light"
        title={TEXTS.impact.heading}
        description={TEXTS.impact.globalDescription}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {TEXTS.impact.areas.map((area, index) => (
            <AnimatedSection
              key={index}
              animation="slideUp"
              delay={index * 0.1}
            >
              <Card
                variant="default"
                title={area.title}
                description={area.description}
                className="h-full hover:border-blue-500 transition-colors"
              />
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Change Makers Section */}
      <Section variant="default" className="bg-gradient-to-b from-white to-blue-50">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <AnimatedSection animation="slideRight" className="lg:w-1/2">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-8">
              {TEXTS.changeMakers.heading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {TEXTS.changeMakers.headingHighlight}
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              {TEXTS.changeMakers.description(
                SETTINGS.HUB_CONFIG.CITY_NAME,
                SETTINGS.HUB_CONFIG.HUB_NAME
              )}
            </p>
            <Link href="/shapers">
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {TEXTS.changeMakers.buttonText}
              </Button>
            </Link>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft" className="lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
              <Image
                src="/assets/images/christmas.jpg"
                alt="Our Change Makers"
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Newsletter Section */}
      <Section
        variant="light"
        title={TEXTS.newsletter.heading}
        description={TEXTS.newsletter.description(SETTINGS.HUB_CONFIG.CITY_NAME)}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
          <AnimatedSection animation="slideRight">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300">
                <Image
                  src="/assets/images/newsletter.png"
                  alt="Newsletter Preview"
                  width={600}
                  height={800}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {TEXTS.features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}

            <AnimatedSection animation="fadeIn" delay={0.4}>
              <Link
                href={
                  siteSettings.newsletter_url ||
                  "https://www.canva.com/design/DAGLfOjusxQ/5upjRZAU6-L_vDVfJV686A/view"
                }
                target="_blank"
              >
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="bg-gradient-to-r from-blue-600 to-purple-600 mt-8"
                >
                  {TEXTS.newsletter.readButton}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </Section>

      {/* Newsletter Subscribe */}
      <Section
        variant="gradient"
        title={TEXTS.newsletter.subscribeHeading}
        description={TEXTS.newsletter.subscribeDescription}
      >
        <div className="max-w-xl mx-auto mt-12">
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={TEXTS.newsletter.emailPlaceholder}
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                required
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="bg-white text-blue-900 hover:bg-gray-100"
            >
              {TEXTS.newsletter.subscribeButton}
            </Button>
          </form>
        </div>
      </Section>

      {/* Call to Action */}
      <Section
        id="join-us"
        ref={callToActionRef}
        variant="dark"
        title={TEXTS.join.readyHeading}
        description={TEXTS.join.readyDesc}
        className="bg-gradient-to-b from-blue-800 to-blue-900"
      >
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <Button
            onClick={() =>
              toast.error(siteSettings.error_404_text || TEXTS.join.closed, {
                duration: 5000,
                style: {
                  background: "#333",
                  color: "#fff",
                },
              })
            }
            variant="success"
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600"
          >
            {TEXTS.join.becomeShaper}
          </Button>
          
          <Link
            href={
              siteSettings.join_form_url ||
              "https://docs.google.com/forms/d/e/1FAIpQLScdWAWxr--Z4_c9piHxW8wZSitKUcRquNp4VKVtb3HUFcbSGw/viewform"
            }
            target="_blank"
          >
            <Button
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-purple-600"
            >
              {TEXTS.join.transfer(SETTINGS.HUB_CONFIG.CITY_NAME)}
            </Button>
          </Link>
        </div>
      </Section>
    </main>
  );
}