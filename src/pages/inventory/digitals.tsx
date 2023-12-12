import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { usePhygitalRepo } from "../../hooks/usePhygitalCollection";
import { hooks } from "../../connectors/default";
import { TokenCard } from "../../common/components";

import "swiper/css/navigation";
import EmptyState from "./emptyState";

const collections = [import.meta.env.VITE_DIGITAL_ASSET];

export default function Digitals() {
  const account = hooks.useAccount();
  // const { getTokens } = usePhygitalCollection();
  const { fetchTokens } = usePhygitalRepo(collections);
  const { data, isLoading } = useQuery({
    queryKey: ["digitals", account],
    enabled: !!account,
    queryFn: () => fetchTokens(account as string),
  });

  if (isLoading) {
    return <EmptyState message="Loading Digital Tokens" isLoading={true} />;
  }

  if (!data || data.length == 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full flex flex-row space-x-2">
      <div className="w-12 mt-24 cursor-pointer">
        <a id="prev-page">
          <ArrowLeftIcon
            className="rounded-full border p-1"
            height={24}
            width={24}
          />
        </a>
      </div>
      <Swiper
        className="w-full"
        spaceBetween={50}
        slidesPerView={3}
        navigation={{
          enabled: true,
          nextEl: "#next-page",
          prevEl: "#prev-page",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
      >
        {!isLoading &&
          data?.map((token, idx) => (
            <SwiperSlide
              key={`token:${token.id.toString()}`}
              virtualIndex={idx}
            >
              <TokenCard tokenId={token.id} address={token.address} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="w-12 mt-24 cursor-pointer">
        <a id="next-page">
          <ArrowRightIcon
            className="rounded-full border p-1"
            height={24}
            width={24}
          />
        </a>
      </div>
    </div>
  );
}
