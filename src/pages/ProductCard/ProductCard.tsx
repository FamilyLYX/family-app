import { useState } from "react";
import product1 from "../../assets/product/product-01.png";
import product2 from "../../assets/product/product-02.png";
import product3 from "../../assets/product/product-03.png";
import { Breadcrumbs, Button, ViewMore } from "../../components";
import ProductModal from "./Modals/ProductModal";
import ProductHistory from "./Modals/ProductHistory";
import Transparency from "./Modals/Transparency";

type BreadcrumbItem = {
  title: string;
  link?: string;
};

const ProductCard = () => {
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [transparencyModalOpen, setTransparencyModalOpen] = useState(false);

  const breadcrumbTitles: BreadcrumbItem[] = [
    { title: "Main", link: "/main" },
    { title: "Marketplace", link: "/marketplace" },
    { title: "Honft" },
  ];

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-15 lg:gap-10   container mx-auto mt-10 mb-10">
          {/* left container */}
          <div className="order-2 lg:order-1 flex flex-col-reverse lg:flex-col justify-between gap-6 h-min lg:h-full p-4">
            <div>
              <div className="hidden lg:block">
                <Breadcrumbs titles={breadcrumbTitles} />
              </div>
              <ViewMore maxHeight="100px">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
                eaque officiis, accusamus nobis commodi quod quae molestiae
                cupiditate repudiandae unde, dolorem incidunt! Quo odio qui
                quisquam laboriosam quidem eveniet saepe, animi necessitatibus
                nam veritatis vero blanditiis dolorem accusamus consequuntur
                velit amet facilis, voluptas temporibus maiores, repellendus
                ipsum unde ducimus sit? Accusantium, distinctio exercitationem.
                Numquam omnis, in illum, similique ad a enim error perspiciatis
                nulla, dolorum fugiat officia perferendis quam? Eaque libero
                dolorum quisquam, quasi explicabo reiciendis omnis, facilis
                voluptas consequuntur, architecto iusto. Neque, eligendi iusto
                cupiditate sequi temporibus minima. Error nostrum ullam
                reiciendis, adipisci quisquam rem corporis in accusantium
                molestias.
              </ViewMore>
            </div>

            <div className="flex flex-col gap-3 mb-5">
              <div className="flex flex-col gap-1 border-b p-2">
                <p className="text-black/30 text-sm">Color</p>
                <div className="flex gap-1 items-center">
                  <p className="long-title text-xl text-blue-700">Blue Rocks</p>
                  <div className="bg-blue-700 w-5 h-5 rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col gap-1  border-b p-2">
                <p className="text-black/30 text-sm">Size</p>
                <p className="long-title text-xl text-black">XXL</p>
              </div>

              <div className="flex flex-col gap-1 p-2">
                <p className="text-black/30 text-sm">Location</p>
                <p className="long-title text-xl text-black">
                  Toronto, Ontario, M3J 3H9
                </p>
              </div>
            </div>
          </div>

          {/* middle container */}
          <div className="order-1 lg:order-2 flex flex-col  pb-5">
            <div className="lg:hidden flex items-center justify-center mb-8">
              <Breadcrumbs titles={breadcrumbTitles} />
            </div>

            <div className=" flex-col items-center justify-center text-center gap-2 flex lg:hidden mb-8">
              <h2 className="long-title text-8xl">Honft</h2>
              <p className="text-sm text-black/80">001 — Black Forest»</p>
            </div>
            {/* images */}
            <div className="order-1 lg:order-2 flex flex-row lg:flex-col gap-5 max-w-[90vw] overflow-auto app-scrollbar pb-5  mx-auto">
              <img
                src={product1}
                alt=""
                className="h-full w-full max-w-[30rem] lg:max-w-[35rem]"
              />
              <img
                src={product2}
                alt=""
                className="h-full w-full max-w-[30rem] lg:max-w-[35rem]"
              />
              <img
                src={product3}
                alt=""
                className="h-full w-full max-w-[30rem] lg:max-w-[35rem]"
              />
            </div>
          </div>

          {/* right container */}
          <div className="order-3 lg:order-3 flex flex-col gap-5 lg:gap-10 justify-between">
            <div className=" flex-col items-center justify-center text-center gap-2 hidden lg:flex">
              <h2 className="long-title text-8xl">Honft</h2>
              <p className="text-sm text-black/80">001 — Black Forest»</p>
            </div>

            {/* actions */}
            <div className="lg:hidden flex flex-col gap-2">
              <Button onClick={() => setHistoryModalOpen((o) => !o)}>
                History
              </Button>
              <Button onClick={() => setTransparencyModalOpen((o) => !o)}>
                Transparency
              </Button>
            </div>
            <div className="flex flex-col text-center gap-4">
              <p className="long-title text-5xl">
                <span className="long-title text-5xl">1,4525403543647</span>
                <span className="long-title text-5xl text-black/30 ml-3">
                  ETH
                </span>
              </p>

              <div className="flex flex-col gap-2">
                <Button
                  variant="dark"
                  onClick={() => setProductModalOpen((o) => !o)}
                >
                  Buy
                </Button>
                <div className="lg:flex hidden flex-col gap-2">
                  <Button onClick={() => setHistoryModalOpen((o) => !o)}>
                    History
                  </Button>
                  <Button onClick={() => setTransparencyModalOpen((o) => !o)}>
                    Transparency
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductModal
        isOpen={productModalOpen}
        handleClose={() => setProductModalOpen((o) => !o)}
      />
      <ProductHistory
        isOpen={historyModalOpen}
        handleClose={() => setHistoryModalOpen((o) => !o)}
      />

      <Transparency
        isOpen={transparencyModalOpen}
        handleClose={() => setTransparencyModalOpen((o) => !o)}
      />
    </>
  );
};

export default ProductCard;
