import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa6";

const ReturnTop = () => {

    const [visible, setVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {
                visible && (
                    <button
                        onClick={scrollToTop}
                        className="cursor-pointer fixed bottom-4 right-4 bg-[#a0906e] text-white p-1 rounded-full shadow-lg"
                    >
                        <FaAngleUp size={20} />
                    </button>
                )
            }
        </div>
    );
};

export default ReturnTop;