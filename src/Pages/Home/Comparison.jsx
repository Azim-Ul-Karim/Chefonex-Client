import React from "react";
import { motion } from "motion/react";
import { FaHome, FaStore } from "react-icons/fa";

const pointVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.12, duration: 0.35 }
    }),
};

const Comparison = () => {
    return (
        <section className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Why Home-Cooked Food Matters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

                {/* Home Cooked */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-[#e7ebc6] shadow-xl"
                >
                    <FaHome size={42} className="text-secondary mx-auto mb-5" />
                    <h3 className="text-xl font-bold text-center text-[#4c2d02] mb-6">
                        Home-Cooked Meals
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            "Freshly prepared daily",
                            "Balanced oil & spices",
                            "Personal care in cooking",
                            "Real home kitchens",
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={pointVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white/70 backdrop-blur p-4 rounded-xl shadow-sm text-sm text-gray-700 text-center"
                            >
                                {text}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Restaurant */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-[#ece9c7] shadow-xl"
                >
                    <FaStore size={40} className="text-secondary mx-auto mb-5" />
                    <h3 className="text-xl font-bold text-center text-[#4c2d02] mb-6">
                        Restaurant Food
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            "Prepared in bulk",
                            "Excess oil & seasoning",
                            "Mass production",
                            "Minimal personal care",
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={pointVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white/60 backdrop-blur p-4 rounded-xl shadow-sm text-sm text-gray-700 text-center"
                            >
                                {text}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Comparison;