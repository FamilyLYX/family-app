import { ReactElement, useState } from "react";
import AuthModal from "../../components/Claim/AuthModal";
import { Button } from "../../common/buttons";
import { Accordion } from "../../components/common";
import HeroVideo from "../../assets/claim/hero-intro.mp4";
import logo from "../../logo.svg";
import Footer from "./Footer";

interface FAQItem {
  question: string;
  answer: ReactElement;
}

const ClaimIntro: React.FC = () => {
  const [authModal, setAuthModal] = useState<boolean>(false);

  const faqData: FAQItem[] = [
    {
      question: "What is the Genesis Products Airdrop?",
      answer: (
        <p>
          Holders of our Genesis Phygital will be airdropped their Genesis
          Products for the <strong>LUKSO Mainnet</strong>.
        </p>
      ),
    },
    {
      question: "How can I participate in the Genesis Phygitals Airdrop?",
      answer: (
        <>
          <ul className="list-disc list-inside">
            <li>
              Make sure you have a <strong>Universal Profile</strong> and the{" "}
              <strong>Extension</strong> installed.
            </li>
            <li>
              Verify your identity by using the email or phone number you used
              when you ordered your Genesis Phygitals.
            </li>
            <li>
              Check your email for your <strong>Claim Link</strong>.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "What are the dates and timelines for the airdrop?",
      answer: (
        <p>
          The closing date for the airdrop will be{" "}
          <strong>January 20 2024</strong>.
        </p>
      ),
    },
    {
      question: "What 'Genesis Products' will be airdropped?",
      answer: (
        <>
          <p>
            <strong>Genesis Perk:</strong> 1 Free Order on all Family releases.
          </p>
          <p>
            <strong>Genesis Phygital:</strong> Digital Certificate of the
            Physical.
          </p>
        </>
      ),
    },
    {
      question: "Are there any risks involved in participating?",
      answer: (
        <p>
          We've mitigated all the possible risks and have ensured utmost safety
          for our Genesis Holders, make sure you only use the right links and
          contact us on{" "}
          <a
            href="mailto:support@familyyx.com"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            support@familyyx.com
          </a>{" "}
          for any concerns or questions.
        </p>
      ),
    },
    {
      question: "Can the airdrop rewards be traded, and if so, how?",
      answer: (
        <>
          <p>
            The Genesis Perk can be traded on any marketplace in the LUKSO
            ecosystem but the Genesis Phygital can only be traded on the{" "}
            <strong>Family Marketplace</strong>.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <div>
        <section className="min-h-screen flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center md:items-start">
            <img
              src={logo}
              className="w-32 md:w-40 lg:w-48"
              alt="Family Logo"
            />
            <h1 className="long-title text-center md:text-start leading-[4.5rem] md:leading-tight text-6xl md:text-8xl mt-10">
              Lorem ipsum dolor sit amet consectetur.
            </h1>

            <div className="w-full max-w-[10rem] scale-150 mt-16 md:mt-20 ml-0 md:ml-10 flex justify-center">
              <Button variant="dark" onClick={() => setAuthModal(true)}>
                Verify
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <video
              src={HeroVideo}
              loop
              autoPlay
              playsInline
              muted
              className="max-full block h-full object-cover w-full"
            ></video>
          </div>
        </section>

        <section className="bg-gray-50 py-16 px-4 ">
          <Accordion title="FAQ's" data={faqData} />
        </section>

        <div className="p-6 bg-gray-50">
          <Footer />
        </div>
      </div>

      <AuthModal isOpen={authModal} handleClose={() => setAuthModal(false)} />
    </>
  );
};

export default ClaimIntro;
