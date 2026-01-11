import React, { useState } from "react";

const faqs = [
    {
        question: "Are the meals really home-cooked?",
        answer:
            "Yes. All meals are prepared by verified home chefs from their own kitchens, following hygiene and quality guidelines.",
    },
    {
        question: "How do I know the food is safe?",
        answer:
            "Chefonex verifies chefs, enforces hygiene rules, and ensures meals are freshly cooked before delivery.",
    },
    {
        question: "Can I become a home chef on Chefonex?",
        answer:
            "Yes. Any eligible home cook can request to become a chef. Admin approval is required before selling meals.",
    },
    {
        question: "What payment methods are supported?",
        answer:
            "We support secure online payments through Stripe, ensuring fast and safe transactions.",
    },
    {
        question: "Can I track my order status?",
        answer:
            "Yes. Customers can track order status in real time from their dashboard after placing an order.",
    },
];

const FAQ = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
                {
                    faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border rounded-lg bg-[#f6f4df] shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left px-5 py-4 font-semibold text-[#4c2d02] flex justify-between items-center"
                            >
                                {faq.question}
                                <span className="text-xl">
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {
                                activeIndex === index && (
                                    <div className="px-5 pb-4 text-gray-700 text-sm">
                                        {faq.answer}
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default FAQ;