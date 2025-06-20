
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Target, Users } from "lucide-react";
import Logo from "@/components/common/Logo";
import EnhancedSEO from "@/components/common/EnhancedSEO";

const LandingPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <EnhancedSEO
        title="Top AI Tools - Discover the Best AI Tools for Productivity"
        description="Explore the most comprehensive collection of AI tools for creators, developers, and entrepreneurs. Boost your productivity with curated AI solutions."
        canonicalUrl="/landing"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        
        {/* Animated Header */}
        <motion.header 
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <Logo size="small" />
                <span className="text-primary font-bold text-xl dark:text-white">Top AI Tools</span>
              </div>
              
              <Link to="/">
                <Button 
                  className="group relative overflow-hidden"
                  size="sm"
                >
                  <span className="relative z-10">Explore Tools</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.header>

        {/* Hero Section with Scroll Animation */}
        <section className="pt-16">
          <ContainerScroll
            titleComponent={
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center justify-center gap-2 mb-6"
                >
                  <motion.div {...floatingAnimation}>
                    <Sparkles className="h-8 w-8 text-primary" />
                  </motion.div>
                  <span className="text-primary font-semibold text-lg">Discover AI Excellence</span>
                </motion.div>

                <motion.h1 
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  The Ultimate{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                    AI Tools
                  </span>{" "}
                  Collection
                </motion.h1>

                <motion.p 
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
                >
                  Discover, compare, and choose from the world's most powerful AI tools. 
                  Boost your productivity and creativity with our curated collection.
                </motion.p>

                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <Link to="/tools">
                    <Button size="lg" className="group relative overflow-hidden px-8 py-4 text-lg">
                      <span className="relative z-10">Start Exploring</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <Link to="/trending-tools">
                    <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
                      View Trending Tools
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            }
          >
            <img
              src="/lovable-uploads/92767d84-2f91-49a0-a5c0-85e309218221.png"
              alt="AI Tools Dashboard Preview"
              className="mx-auto rounded-2xl object-cover h-full object-top w-full"
              draggable={false}
            />
          </ContainerScroll>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Why Choose Our Platform?
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                We make finding the perfect AI tool simple, fast, and reliable
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Target,
                  title: "Curated Selection",
                  description: "Hand-picked AI tools tested and verified by experts for quality and performance."
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Find the perfect tool in seconds with our advanced search and filtering system."
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description: "Real reviews and ratings from a community of creators and professionals."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }
                    }}
                    className="mb-6"
                  >
                    <feature.icon className="h-12 w-12 text-primary mx-auto" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            >
              {[
                { number: "500+", label: "AI Tools" },
                { number: "50K+", label: "Happy Users" },
                { number: "25+", label: "Categories" },
                { number: "99%", label: "Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Ready to Transform Your Workflow?
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of creators, developers, and entrepreneurs who have already discovered their perfect AI tools.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link to="/tools">
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden px-8 py-4 text-lg"
                  >
                    <span className="relative z-10">Get Started Now</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <Logo size="small" />
                <span className="text-gray-600 dark:text-gray-300">© 2024 Top AI Tools. All rights reserved.</span>
              </div>
              <div className="flex gap-4">
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
