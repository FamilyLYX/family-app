import FaqAccordian from "./common/FaqAccordian";

function Faq() {
  return (
    <div className="xl:relative h-screen bg-white">
      <div className="xl:absolute xl:right-[23%] xl:left-[23%] xl:top-[6%] mt-2 px-4 flex flex-col justify-center max-w-7xl">
        <p className="long-title text-center text-8xl mb-4 pb-2 ">FAQ</p>
        <FaqAccordian title="What is Honft?">
          Its our latest creation which is a combination of a Hoodie + NFT. Its a physical hoodie which is digitally verified via a NFT
        </FaqAccordian>
        <FaqAccordian title="Whats the recommended sizing?">
          True to size for men and Down a size for women.
        </FaqAccordian>
        <FaqAccordian title="How many can I buy?">
          You can buy as many as you want but you must create a new order each time.
        </FaqAccordian>
        <FaqAccordian title="How long till I receive my product?">
          It will take roughly 30 business days for you to receive your Phygital Product.
        </FaqAccordian>
        <FaqAccordian title="Do you offer international shipping?">
          Yes, we offer international shipping. Please note that shipping times may vary depending on your location.
        </FaqAccordian>
        <FaqAccordian title="What payment methods do you accept?">
          We accept all major credit cards, GPay, Apple Pay and $LYX.
        </FaqAccordian>
        <FaqAccordian title="Can I cancel or modify my order after it's been placed?">
          Yes, please reach out to <a className="text-blue-600 hover:text-blue-800" href="mailto:support@familylyx.com">support@familylyx.com</a> for any issues.
        </FaqAccordian>
        <FaqAccordian title="What is your return policy?">
          We accept returns within 12 days of receiving the product for a full refund, provided the product is in its original condition with tags attached. Reach out to <a className="text-blue-600 hover:text-blue-800" href="mailto:support@familylyx.com">support@familylyx.com</a> for any issues. (If the NFT has been claimed, this option is voided)
        </FaqAccordian>
      </div>
    </div>
  );
}

export default Faq;
