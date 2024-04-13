import Header from "./common/Header";

function Manifesto() {
  return (
    // I add placeholder div for bg color
    <>
    <Header />
    <div className="w-screen xl:h-screen  bg-white pointer-events-none">
      <div className="xl:h-screen flex flex-col justify-center items-center  mt-14 xl:mt-0 2xl:mt-14 p-2">
        <p className="flex justify-center long-title text-center text-8xl p-4 xl:p-0 space-x-2">
          The Manifesto
        </p>

          <p className="text-center xl:text-base py-3 max-w-5xl mx-auto">
            At <span className="font-bold">Family</span>, we don't just run a
            business; we nurture a legacy. Born from the seeds of familial bonds
            and cultivated through generations, we stand as a testament to the
            enduring power of kinship and community. But don't be mistaken;
            while our roots run deep, our gaze is firmly fixed on the horizon of
            tomorrow.
          </p>

          <p className="text-center xl:text-base py-3 max-w-5xl mx-auto">
            In a world where corporate giants cast long shadows,{" "}
            <span className="font-bold">Family</span> emerges as a beacon of
            change, fueled by a commitment to harnessing technology for the
            greater good. We embrace the revolutionary potential of emerging
            technologies, not merely as tools for profit, but as catalysts for
            positive transformation. Through decentralised networks and
            transparent transactions, we empower individuals and communities to
            reclaim control over their destinies.
          </p>

          <p className="text-center xl:text-base py-3 max-w-5xl mx-auto">
            Unlike the faceless corporations that dominate today's market, we
            reject the notion that profit should come at the expense of
            principles. Too often, traditional business models prey on consumer
            vulnerabilities, fostering a culture of FOMO, envy, and
            environmental apathy. But at{" "}
            <span className="font-bold">Family</span>, we stand resolute in our
            opposition to such practices. We believe in fostering connections,
            not dependencies. We believe in inspiring aspirations, not
            instilling insecurities. And above all, we believe in preserving our
            planet for future generations.
          </p>

          <p className="text-center xl:text-base py-3 max-w-5xl mx-auto">
            So join us on this journey, where innovation is fueled by tradition,
            and where every transaction is a testament to our commitment to a
            better world. Together, we are not just redefining business; we are
            reimagining humanity's relationship with commerce, one ethical
            decision at a time.
          </p>


        <p className="long-title text-center py-3 text-5xl space-x-8 text-[#E40000]">
          Welcome To Family
        </p>
      </div>
    </div>
    </>
  );
}

export default Manifesto;
