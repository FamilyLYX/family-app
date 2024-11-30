import { useQueries } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { usePhygitalRepo } from "../../hooks/usePhygitalCollection";
import { TokenCard } from "../../common/components";

import "swiper/css/navigation";
import EmptyState from "./emptyState";
import { useOutletContext } from "react-router-dom";

const collections = [import.meta.env.VITE_DIGITAL_ASSET];

function TargetDigitals({ targets }: { targets: string[] }) {
  const { fetchTokens } = usePhygitalRepo(collections);
  const queries = useQueries({
    queries: targets.map((target) => ({
      queryKey: ["digitals", target],
      queryFn: () => fetchTokens(target),
    })),
  });
  const isLoading = !!queries.find((q) => q.isLoading);
  const tokens = !isLoading
    ? queries.reduce((acc: any[], query, idx) => {
        if (query.isLoading || query.isError) {
          console.log(query.isLoading ? 'loading' : 'error');

          return acc;
        }

        return acc.concat(
          query.data ? query.data.map((token) => Object.assign({ owner: targets[idx] }, token)) : []
        );
      }, [])
    : [];

  if (isLoading) {
    return <EmptyState message="Loading Digital Tokens" isLoading={true} />;
  }

  if (!tokens || tokens.length == 0) {
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
          tokens?.map((token: any, idx: any) => (
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

export default function Digitals() {
  const targets = useOutletContext<string[]>();
  
  return <div className="space-y-4">
    <TargetDigitals targets={targets} />
  </div>
}