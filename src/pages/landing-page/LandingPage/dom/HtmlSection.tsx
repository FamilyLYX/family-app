import storeHeroImg from "../../assets/store-01.png";

const HtmlSection = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <section className="min-h-screen flex flex-col ">
        {/* Change to Wouter to make the Header works */}
        {/* <Header  /> */}
        <div
          className=" flex-grow flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${storeHeroImg})` }}
        ></div>
      </section>

      <section className="min-h-screen flex items-center justify-center mb-16 md:mb-0">
        <div className="flex flex-col-reverse md:flex-row  mx-auto container ">
          <div className="w-full md:w-1/2 flex items-center justify-end ">
            <div className="text-gray-400  flex flex-col items-center justify-center text-center gap-6 max-w-2xl ">
              <p>Who are we?</p>
              <h2 className="long-title text-5xl md:text-8xl text-white">
                Lorem ipsum dolor sit amet consectetur.
              </h2>
              <p className="px-4">
                Lorem ipsum dolor sit amet consectetur. Commodo sit neque libero
                arcu eget. Augue proin ac sit sit tellus diam pretium. Nunc
                consectetur eleifend risus dolor maecenas pharetra lectus.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center"></div>
        </div>
      </section>

      <section className="min-h-[20rem] md:min-h-screen flex flex-col">
        <div className=" flex-grow flex  justify-center bg-cover bg-center">
          <p className="text-white text-5xl md:text-8xl long-title mt-10 text-center">
            Going towards the future
          </p>
        </div>
      </section>
    </div>
  );
};

export default HtmlSection;
