"use client";

import { motion } from "framer-motion";
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useRouter } from "next/navigation";
import Link from "next/link";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 120 
    }
  }
};

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:w-1/2 mb-12 md:mb-0 relative z-10"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transparent Food Safety Through {' '}
              <motion.span 
                className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%'],
                  textShadow: [
                    '0 0 10px rgba(16,185,129,0)',
                    '0 0 20px rgba(16,185,129,0.3)',
                    '0 0 10px rgba(16,185,129,0)'
                  ]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity
                }}
              >
                Blockchain
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
            Immutable tracking from factory to table. Verify food authenticity, safety certifications, 
            and supply chain integrity with decentralized transparency.
          </motion.p>
          
            <Link href={"/user"}>
          <motion.div variants={itemVariants} className="relative inline-block">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                filter: 'brightness(1.1)'
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-5 rounded-2xl text-lg font-semibold relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🔍
                </motion.span>
                Scan to Verify Food
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
                />
            </motion.button>
          </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60 }}
          className="md:w-1/2 flex justify-center relative z-10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative max-w-xl w-full">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-[40px] transform -rotate-3"
              animate={{
                rotate: [-3, 3, -3],
                y: [0, 30, -30, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-[40px] transform rotate-2"
              animate={{
                rotate: [2, -2, 2],
                y: [0, -30, 30, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative bg-white/90 backdrop-blur-xl p-10 rounded-[32px] shadow-2xl border-2 border-white/20 overflow-hidden">
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div 
                  className="mb-6 w-28 h-28 bg-emerald-100/50 rounded-3xl flex items-center justify-center backdrop-blur-sm border-2 border-white/20"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                    y: [0, -10, 10, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [0.9, 1.1, 0.9],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity
                    }}
                  >
                    <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </motion.div>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Fresh Baked Bread
                </h3>
                
                <div className="space-y-4 text-base text-gray-700 w-full">
                  {[
                    { icon: '🏭', text: 'Origin: Fresh From Bakery' },
                    { icon: '📅', text: 'Packed: 2025-03-09' },
                    { icon: '✅', text: 'Safety Certified: Grade AA' },
                    { icon: '🔗', text: 'Blockchain Verified' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-8 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-white/30 to-transparent"
                    animate={{ x: [-200, 200] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="bg-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 gap-8 relative z-10"
            >
              {/* Subtle background elements */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl -top-20 -left-20" />
                <div className="absolute w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-3xl bottom-0 -right-20" />
              </div>

              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Immutable Records",
                  text: "Tamper-proof blockchain storage prevents data manipulation"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Dietary Safety",
                  text: "Critical for allergies, diabetes, and medical conditions"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: "Real-time Audits",
                  text: "Instant updates from authorized inspectors"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    y: -8,
                    borderColor: '#059669',
                    backgroundColor: 'rgba(209, 250, 229, 0.5)'
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300,
                    hover: { duration: 0.2 }
                  }}
                  className="p-8 rounded-xl border-2 border-transparent bg-white/80 backdrop-blur-sm
                    shadow-[0_8px_24px_rgba(5,150,105,0.08)] hover:shadow-[0_12px_32px_rgba(5,150,105,0.12)]
                    transition-all duration-300 cursor-default relative overflow-hidden"
                >
                  {/* Hover effect element */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-emerald-50/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.div 
                    className="w-14 h-14 text-emerald-600 rounded-lg bg-emerald-50 flex items-center justify-center mb-6 relative"
                    whileHover={{
                      scale: 1.05,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.6 }
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 relative">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative">
                    {item.text}
                  </p>
                  
                  {/* Animated border bottom */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      {/* Process Visualization */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Animated Floating Elements */}
            <div className="absolute -top-20 left-0 w-full h-full">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 bg-emerald-100/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ y: 0 }}
                  animate={{ y: [0, -40, 0] }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50 }}
            >
              Food Transparency
            </motion.h2>
            
            <div className="relative max-w-6xl mx-auto cursor-pointer">
              <motion.div 
                className="absolute h-2.5 bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 rounded-full w-full top-1/2 -translate-y-1/2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 2.5, ease: "circOut" }}
              >
                <motion.div 
                  className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />
              </motion.div>

              <div className="grid grid-cols-4 gap-8 md:gap-16 relative cursor-pointer">
                {['Farm', 'Processing', 'Distribution', 'Retail'].map((stage, index) => (
                  <motion.div 
                    key={index}
                    className="text-center group relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ delay: index * 0.3, type: 'spring' }}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-white shadow-xl hover:shadow-2xl mx-auto mb-6
                        flex items-center justify-center relative rounded-2xl
                        border-4 border-emerald-100 hover:border-emerald-200
                        transition-all duration-300 cursor-default"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white/50 rounded-xl" />
                      <div className="relative z-10">
                        <svg className="w-8 h-8 text-emerald-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {index === 0 && <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                          {index === 1 && <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
                          {index === 2 && <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />}
                          {index === 3 && <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />}
                        </svg>
                      </div>
                      <motion.div 
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.3 + 0.5 }}
                      >
                        {index + 1}
                      </motion.div>
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">{stage}</h3>
                    <motion.p 
                      className="text-gray-600 text-sm px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {[
                        "Organic farming & sustainable sourcing",
                        "Quality control & processing",
                        "Eco-friendly transportation",
                        "Consumer retail & feedback"
                      ][index]}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-900 text-white py-20 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute w-[400px] h-[400px] bg-emerald-500 rounded-full blur-3xl -top-20 -left-20" />
          <div className="absolute w-[400px] h-[400px] bg-green-500 rounded-full blur-3xl -bottom-20 -right-20" />
        </motion.div>
        
        <div className="container mx-auto px-4 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Empowering Conscious Consumption</h2>
            <p className="text-lg mb-8 opacity-90">
              Scan any product to access verified information about its origins, 
              safety certifications, and complete supply chain history.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
                onClick={()=> {
                  
                  const offToken = localStorage.getItem("offToken") || "";
                  if(offToken.length) {
                    router.push("/home");
                  } else {
                    router.push("/signin");
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold"
              >
                Authority Login
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}