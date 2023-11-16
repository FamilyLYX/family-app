import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { usePhygitalCollection } from "../../hooks/usePhygitalCollection";
import { hooks } from "../../connectors/default";
import { TokenCard } from "../../common/components";

import 'swiper/css/navigation';
import EmptyState from "./emptyState";
// import 'swiper/css/pagination';

export default function Phygitals() {
  const account = hooks.useAccount();
  const { getTokens } = usePhygitalCollection();
  const { data, isLoading } = useQuery({
    queryKey: ["phygitals", account],
    queryFn: () => getTokens(account as string),
  });

  if (isLoading) {
    return <p>Loading Phygital Tokens</p>
  }

  if (!data || data.length == 0) {
    return <EmptyState />
  }

  return (
    <div className="w-full flex flex-row space-x-2">
      <div className="w-12 mt-24 cursor-pointer">
        <a id="prev-page"><ArrowLeftIcon className="rounded-full border p-1" height={24} width={24}/></a>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation={{
          enabled: true,
          nextEl: '#next-page',
          prevEl: '#prev-page'
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
          data?.map((tokenId, idx) => (
            <SwiperSlide key={`token:${tokenId.toString()}`} virtualIndex={idx}>
              <TokenCard tokenId={tokenId} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="w-12 mt-24 cursor-pointer">
        <a id="next-page"><ArrowRightIcon className="rounded-full border p-1" height={24} width={24}/></a>
      </div>
    </div>
  );
}
