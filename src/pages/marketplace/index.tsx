/* eslint-disable @typescript-eslint/no-empty-function */
import { Tab } from '@headlessui/react';

import { CiFilter } from 'react-icons/ci';
import {
  Button,
  CardCarousel,
  ChipSelect,
  Popover,
  ProductCardListing,
} from '../../components';
import { ColorSelectInput, Select } from '../../components';
import marketplaceBg from '../../assets/marketplace/marketplace-bg.png';
import marketplaceBgSmall from '../../assets/marketplace/marketplace-bg-mobile.png';
// import React from "react";
import { CgShoppingBag } from 'react-icons/cg';
import { IoPlayOutline } from 'react-icons/io5';
import EscrowSystem from '../../components/Escrow/EscrowSystem';

import { INDEX_LISTINGS } from '../../queries/listing';
import { useQuery } from '@apollo/client';
import { Skeleton } from '@mui/material';
import { useState } from 'react';
import LoadingLine from '../../components/Escrow/Loadingline';

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const colors = [
  { hexCode: '#FF0000', title: 'Red' },
  { hexCode: '#00FF00', title: 'Green' },
  { hexCode: '#0000FF', title: 'Blue' },
  // Add more colors as needed
];

interface ContentMap {
  [key: string]: {
    title: string;
    description: string;
  };
}

const contentMap: ContentMap = {
  Marketplace: {
    title: 'Marketplace',
    description:
      'Our revolutionary Decentralised Marketplace is a peer-to-peer platform designed to empower our vibrant community to trade both phygital and digital assets seamlessly. Embracing the power of blockchain technology, our marketplace ensures a safe and secure environment for all transactions, fostering trust and transparency among our valued users.',
  },
  Escrow: {
    title: 'Escrow System',
    description:
      'Here you can see in more detail everything that happens with your nft and the order. Statistics metrics, positions and statuses are all displayed here.',
  },
};

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('Marketplace');
  const [info, setInfo] = useState(false);
  const { data, loading, error } = useQuery(INDEX_LISTINGS);
  console.log('response', data, loading, error);
  console.log(data, loading, error);
  // const [anchorEl] = React.useState<HTMLButtonElement | null>(
  //   null
  // );

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popper" : undefined;

  return (
    <div className="mt-24 container mx-auto flex flex-col gap-4 mb-8">
      {activeCategory === 'Escrow' && info === true ? (
        <LoadingLine text="Executing Command..." />
      ) : (
        ''
      )}

      <h2
        style={{
          color:
            activeCategory === 'Escrow' && info === true ? 'gray' : 'black',
        }}
        className="long-title text-center text-8xl"
      >
        {contentMap[activeCategory].title}
      </h2>

      <p className="text-center text-gray-400 py-2 max-w-2xl mx-auto">
        {contentMap[activeCategory].description}
      </p>

      <div>
        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-xl  p-1 max-w-xl mx-auto">
            {Object.keys(contentMap).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-full py-2.5 text-sm font-medium leading-5 transition-colors duration-300 ease-in-out',
                    selected
                      ? 'bg-gray-900 text-white shadow'
                      : 'text-black hover:bg-gray-100'
                  )
                }
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className={'rounded-xl bg-white p-3'}>
              <h4 className="long-title text-4xl">Popular</h4>
              <div className="mt-8">
                <section>
                  <CardCarousel />
                </section>

                <hr className="my-16  max-w-xl mx-auto border-black/5" />

                <section>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <ChipSelect
                        onChange={console.log}
                        options={['1H', '1D', '7D', '30D']}
                        selectedOption="1D"
                      />
                    </div>
                    <div className="flex xl:hidden  gap-6 z-50">
                      {/* filter */}
                      <Popover
                        ButtonText={
                          (
                            <div className="flex gap-1 items-center justify-center">
                              <p>Filter</p>
                              <CiFilter size="20" />
                            </div>
                          ) as any
                        }
                        PopoverContent={
                          <div className="grid grid-cols-2 gap-3">
                            <Select
                              placeholder="Condition"
                              data={[]}
                              onChange={console.log}
                              value={''}
                            />
                            <Select
                              placeholder="Status"
                              data={[]}
                              onChange={console.log}
                              value={''}
                            />
                            <Select
                              data={[]}
                              placeholder="Size"
                              onChange={console.log}
                              value={''}
                            />
                            <ColorSelectInput
                              onChange={console.log}
                              value={''}
                              data={colors}
                            />
                          </div>
                        }
                      />
                    </div>
                    <div className="hidden xl:flex  gap-6">
                      <div className=" gap-5 flex flex-1 ">
                        <Select
                          placeholder="Condition"
                          data={[]}
                          value={''}
                          onChange={console.log}
                        />
                        <Select
                          placeholder="Status"
                          data={[]}
                          value={''}
                          onChange={console.log}
                        />
                        <Select
                          placeholder="Size"
                          data={[]}
                          value={''}
                          onChange={console.log}
                        />
                        <ColorSelectInput
                          onChange={console.log}
                          value={''}
                          data={colors}
                        />
                      </div>
                      <Button onClick={console.log}>Clear all</Button>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                    {!loading
                      ? data.Listing.map((card: any) => (
                          <ProductCardListing data={card} key={card.id} />
                        ))
                      : [1, 2, 3, 4].map(() => (
                          <Skeleton height={'35rem'} className="h-[28rem]" />
                        ))}
                  </div>

                  {data?.Listing?.length != 0 ? (
                    <div className="mt-8 flex flex-col gap-4">
                      <p className="text-center mx-auto text-black/50">
                        60/206
                      </p>
                      <Button onClick={console.log}>Load More</Button>
                    </div>
                  ) : (
                    <div className="text-center mx-auto text-black/50">
                      No Listed Item
                    </div>
                  )}
                </section>

                <section className="mt-20">
                  <h2 className="text-8xl long-title text-center">
                    Our Latest Release
                  </h2>
                  <p className="text-center mx-auto text-black/50 mt-4">
                    11 Aug 2023
                  </p>
                  {/* <div
                    style={{
                      backgroundImage: `url(${marketplace}`,
                    }}
                    className={classes.notch}
                  >
                    <div>Content here</div>
                    <div className="notch-overlay"></div>
                  </div> */}
                  <div className="relative max-w-[90vw] mx-auto">
                    <img
                      src={marketplaceBg}
                      alt=""
                      className="w-full mt-4 hidden md:block "
                    />
                    <img
                      src={marketplaceBgSmall}
                      alt=""
                      className="w-full mt-4 block md:hidden"
                    />

                    <div className="flex w-full max-w-none md:max-w-lg gap-4 relative md:absolute bottom-0 md:bottom-5 right-0 md:right-8 mt-5">
                      <Button onClick={console.log}>
                        <div className="flex items-center gap-2 justify-center">
                          <span>Go to the store</span>
                          <CgShoppingBag size="18" className="mt-1" />
                        </div>
                      </Button>
                      <Button onClick={console.log} variant="dark">
                        <div className="flex items-center gap-2 justify-center">
                          <span>Start watching</span>
                          <IoPlayOutline size="18" className="mt-0.5" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </Tab.Panel>
            <Tab.Panel className={'rounded-xl bg-white p-3'}>
              {/* Content for Escrow */}
              <EscrowSystem setInfo={setInfo} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
