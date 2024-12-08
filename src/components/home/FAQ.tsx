import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import  { useState } from "react";
import Wrapper from "../common/Wrapper";

const faqData = [
  {
    question: "What is Chill Gamer?",
    answer:
      "Chill Gamer is a user-friendly game review application that allows users to explore and share reviews on various games. The platform is designed to offer a relaxed and simple experience for gamers to discover and discuss their favorite games.",
  },
  {
    question: "How do I create an account on Chill Gamer?",
    answer:
      'To create an account, simply click on the "Sign Up" button on the homepage, fill in your details such as your name, email, and a secure password, and follow the on-screen instructions to complete the registration.',
  },
  {
    question: "How can I leave a review for a game?",
    answer:
      "Once you log in, navigate to the game page you'd like to review. You'll find an option to submit a rating and write a review. After submitting, your review will be posted for other users to read.",
  },
  {
    question: "Can I edit or delete my review?",
    answer:
      " Yes, you can edit or delete your review at any time. Just go to the review page, and you will find options to update or remove your review under your profile.",
  },
  {
    question: "Is Chill Gamer mobile-friendly?",
    answer:
      "Yes, Chill Gamer is designed to be fully responsive and optimized for mobile devices, ensuring a smooth experience whether you're using a desktop, tablet, or smartphone.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState();

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
      <Wrapper>
        <h2 className='text-3xl font-extrabold  text-center mb-8'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-6'>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </Wrapper>
  );
};

export default FAQ;

const FAQItem = ({ item, isOpen, toggleOpen }:any) => {
  return (
    <div className='border-b border-gray-200 py-4'>
      <button
        className='flex justify-between items-center w-full text-left'
        onClick={toggleOpen}
      >
        <span className='text-lg font-medium '>
          {item.question}
        </span>
        {isOpen ? (
          <ChevronUpIcon className='h-6 w-6 text-gray-700' />
        ) : (
          <ChevronDownIcon className='h-6 w-6 text-gray-400' />
        )}
      </button>
      {isOpen && <p className='mt-2 text-gray-400'>{item.answer}</p>}
    </div>
  );
};
