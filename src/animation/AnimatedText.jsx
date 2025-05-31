/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export const AnimatedText = ({ text, className = "" }) => {
  return (
    <div className={`${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{
            x: 80,
            y: -26,
            opacity: 0,
            filter: "blur(30px)",
            scale: 1.2,
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.05 * index,
            ease: [0.12, 0, 0.17, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export const CountuniousText = ({text, className = ""}) => {
  return (
    <div className={`${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block relative"
          initial={{
            opacity: 0,
            y: Math.random() * 80 - 40,
            x: Math.random() * 40 - 20,
            rotateZ: Math.random() * 30 - 15,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
            rotateZ: 0,
            scale: 1,
            textShadow: [
              "0px 0px 0px rgba(153,228,4,0)",
              "0px 0px 3px rgba(153,228,4,0.8)",
              "0px 0px 0px rgba(153,228,4,0)",
            ],
          }}
          transition={{
            duration: 0.7,
            delay: 0.6 + index * 0.06,
            ease: [0.19, 1, 0.22, 1],
            textShadow: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              delay: 1.5,
            },
          }}
        >
          <motion.span
            animate={{
              color: [
                "var(--lr-animate-green-1)",
                "var(--lr-animate-green-2)",
                "var(--lr-animate-green-3)",
                "var(--lr-animate-green-1)",
              ],
            }}
            transition={{
              duration: 5,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            {char}
          </motion.span>
        </motion.span>
      ))}
    </div>
  )
}

export const LeftToRightText = ({ text, className = "" }) => {
  return (
    <div className={`${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block ${char === " " ? "mr-2" : ""}`}
          initial={{
            opacity: 0,
            y: 40,
            rotateX: -90,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.7 + index * 0.08,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}