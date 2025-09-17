import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const questionVariants = {
    closed: { backgroundColor: "#081746" },
    open: { backgroundColor: "#3B5BBF" }
  };

  const answerVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const faqData = [
    {
      question: "What types of printing services do you offer?",
      answer:
        "Fast Print Guys provide a wide range of printing services including business cards, flyers, posters, banners, books, brochures, calendars, and more. We also offer custom printing solutions tailored to your needs.",
    },
    {
      question: "How quickly can you complete a print job?",
      answer:
        "We specialize in fast turnaround times. Many standard print jobs can be completed within 24–48 hours, and we offer same-day printing for urgent orders.",
    },
    {
      question: "Do you offer design assistance?",
      answer:
        "Yes! Our in-house design team can help you create professional and eye-catching designs for your print materials, whether you're starting from scratch or refining existing artwork.",
    },
    {
      question: "Can you handle bulk printing orders?",
      answer:
        "Absolutely. We have the capacity and equipment to handle large-volume printing while maintaining high quality and competitive pricing.",
    },
  ];

  return (
    <>
      <motion.section 
        className="w-full py-16 px-6 bg-[#E6EEFA]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-[900px] mx-auto">
          {/* Heading */}
          <motion.h2 
            className="text-center text-3xl md:text-4xl font-bold text-black mb-4"
            variants={itemVariants}
          >
            Frequently Asked <span className="text-blue-600">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-center text-gray-700 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Got questions about our printing services? Here are the answers to
            some of the most common inquiries from our customers.
          </motion.p>

          {/* FAQ List */}
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden shadow"
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center text-white"
                  variants={questionVariants}
                  animate={openIndex === index ? "open" : "closed"}
                  whileHover={{ backgroundColor: "#356BB3" }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{faq.question}</span>
                  <motion.span 
                    className="text-xl font-bold"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="overflow-hidden bg-white text-black px-6"
                      variants={answerVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <div className="py-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Faq;