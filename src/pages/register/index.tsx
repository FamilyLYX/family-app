import { useParams } from "react-router-dom"
import base64url from 'base64url';

import { initiateHandover, updateHandover } from '../../utils/api';
import { useEffect, useState } from "react";

import { User, getAuth, inMemoryPersistence, onAuthStateChanged, setPersistence, signInAnonymously } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { Button } from "../../common/buttons";
import { useAssetRegistry } from "../../hooks/useAssetRegistry";
import { useQuery } from "@tanstack/react-query";
// import { CollectionCard, ShortAddress, TokenCard, TokenMetadata } from "../../common/components";
import { CollectionCard } from "../../common/components";


type HandoverObj = {
  status: string;
  code: string;
  hash: string;
  expiry: Date;
  target: string;
  signature: string;
}

type Item = {
  title:string;
  desc:string;
}

function ItemTrait(item:Item) {
  return (
      <p className="text-center font-normal tracking-tighter mx-auto">
      <span className="font-bold">{item.title}: </span>
      {item.desc}
      </p>
  );
}

function Handover ({ uid, secret, user, children }: { uid: string, secret: string, user: User, children: any }) {
  const [handover, setHandover] = useState<HandoverObj | null>(null);
  const [code, setCode] = useState<number|null>(null);
  
  async function initHandover () {
    const _handover = await initiateHandover(await user.getIdToken(), uid);

    setCode(_handover?.code);
    setHandover(_handover as HandoverObj);
  }

  async function acceptRegistration (codeHash: string) {
    return updateHandover(codeHash, secret);
  }

  useEffect(() => {
    if (!handover) { return; }

    const db = getFirestore();
    const docRef = doc(db, `handover/${handover.hash}`)
    
    onSnapshot(docRef, (snapshot) => {
      setHandover(snapshot.data() as HandoverObj);
    });
  }, [handover]);

  if (handover?.target) {
    return <div>
      <h3 className="long-title text-8xl mb-4 text-center">Register</h3>
      <p className="text-xs text-center text-gray-400 mb-4"><b>{handover.target}</b> is trying to regiter this token</p>
      {children}
      <Button onClick={() => acceptRegistration(handover.hash)}>Accept</Button>
    </div>
  }

  if (code) {
    return <div className="bg-white flex flex-col justify-center">
    <div className="flex flex-col xl:flex-row">
        <div className="xl:w-[50%] m-2 xl:m-0 rounded-3xl xl:rounded-none aspect-[1/1] xl:aspect-auto">
          <video
            className="xl:h-screen xl:rounded-none rounded-3xl "
            autoPlay
            playsInline
            loop
            muted
            src="/hoodie-1.mp4"
          ></video>
        </div>
        <div className="xl:w-[50%] w-[100] mx-auto flex flex-col justify-center xl:p-10">
            <h2 className="long-title text-center text-8xl mt-24 xl:mt-4">{code}</h2>
            <p className="text-sm text-center text-gray-400 py-2">Enter this code on the desktop browser to continue registration</p>
        </div>
    </div>
  </div>
  }

  return <div className="bg-white flex flex-col justify-center">
  <div className="flex flex-col xl:flex-row">
      <div className="xl:w-[50%] m-2 xl:m-0 rounded-3xl xl:rounded-none aspect-[1/1] xl:aspect-auto">
        <video
          className="xl:h-screen xl:rounded-none rounded-3xl"
          autoPlay
          playsInline
          loop
          muted
          src="/hoodie-1.mp4"
        ></video>
      </div>
      <div className="xl:w-[50%] w-[100] flex flex-col justify-center p-2">
          <h2 className="long-title text-center text-8xl xl:mt-36 mt-4">NFT Claim</h2>

          <div className="flex flex-col justify-center space-y-2 xl:mt-4 m-2 p-2 ">
            <p className="flex xl:ms-64 items-center space-x-2">
              <img src="/dots/one.ico" alt="Icon" className="w-7 h-7" />
              <span>Download the<span className="font-bold"> UP Extension</span> on your Laptop/PC</span>
            </p>
            <p className="flex xl:ms-64 items-center space-x-2">
              <img src="/dots/two.ico" alt="Icon" className="w-7 h-7" />
              <span>Login to your account on <span className="font-bold underline underline-offset-4 decoration-dashed decoration-1">Familylyx.com</span></span>
            </p>
            <p className="flex xl:ms-64 items-center space-x-2">
              <img src="/dots/three.ico" alt="Icon" className="w-7 h-7" />
              <span>Go to your <strong>Inventory</strong></span>
            </p>
            <p className="flex xl:ms-64 items-center space-x-2">
              <img src="/dots/four.ico" alt="Icon" className="w-7 h-7" />
              <span>Merge your <strong>Vault</strong> tp your <strong>UP Extension</strong></span>
            </p>
            <p className="flex xl:ms-64 items-center space-x-2">
              <img src="/dots/five.ico" alt="Icon" className="w-7 h-7" />
              <span>The <strong>Claim Button</strong> can now be activated</span>
            </p>
            <p className="flex xl:ms-64 items-center space-x-2">
              <img src="/dots/six.ico" alt="Icon" className="w-7 h-7" />
              <span>Input the <strong>OTP</strong> onto the NFT</span>
            </p>
            <p className="flex xl:ms-64 items-center space-x-2">
              <img src="/dots/seven.ico" alt="Icon" className="w-7 h-7" />
              <span>Click <strong>Claim</strong> below to receive your OTP</span>
            </p>
            
          </div>

          <button className="w-full max-w-md  mx-auto  py-3 rounded-full font-medium text-white bg-gray-800 bg-opacity-65 xl:mt-48 mt-4" onClick={initHandover}>Start Registration</button>
      </div>
  </div>
</div>
}

// function MarketplaceHandover ({ uid, secret, user }: { uid: string, secret: string, user: User, owner: string }) {
//   const [handover, setHandover] = useState<HandoverObj | null>(null);
//   const [code, setCode] = useState<number|null>(null);
  
//   async function initHandover () {
//     const _handover = await initiateHandover(await user.getIdToken(), uid);

//     setCode(_handover?.code);
//     setHandover(_handover as HandoverObj);
//   }

//   async function acceptRegistration (codeHash: string) {
//     return updateHandover(codeHash, secret);
//   }

//   useEffect(() => {
//     if (!handover) { return; }

//     const db = getFirestore();
//     const docRef = doc(db, `handover/${handover.hash}`)
    
//     onSnapshot(docRef, (snapshot) => {
//       setHandover(snapshot.data() as HandoverObj);
//     });
//   }, [handover]);

//   // if (handover?.target && handover.target !== owner) {
//   //   return <div className="mt-4">
//   //     <h3 className="long-title text-8xl mb-4 text-center">You can't do that</h3>
//   //     <p className="text-xs text-center text-gray-400 mb-4">Only the present owner of the token can list on marketplace</p>
//   //   </div>
//   // }

//   if (handover?.target) {
//     return <div className="mt-4">
//       <p className="text-xs text-center text-gray-400 mb-4"><b><ShortAddress address={handover.target}/></b> is trying to list this token on marketplace</p>
//       <Button onClick={() => acceptRegistration(handover.hash)}>Accept</Button>
//     </div>
//   }

//   if (code) {
//     return <div className="mt-4">
//       <h3 className="long-title text-8xl mb-4 text-center">{code}</h3>
//       <p className="text-xs text-center text-gray-400 py-2">Enter this code on the desktop browser to continue registration</p>
//     </div>
//   }

//   return <div className="mt-4">
//     <Button variant="dark" onClick={initHandover}>List on marketplace</Button>
//   </div>
// }

export default function RegisterToken () {
  const [param, value] = window.location.hash.slice(1).split(':');
  const { uid } = useParams();
  const { getCollection } = useAssetRegistry();
  const [tempUser, setTempUser] = useState<User|null>(null);
  const { data, isLoading: loading } = useQuery({ queryKey: ['registryAsset', uid], queryFn: () => getCollection(uid as string) })

  function signature () {
    return param === 's' ?  '0x' + base64url.decode(value, 'hex') : null;
  }

  useEffect(() => {
    const auth = getAuth();

    setPersistence(auth, inMemoryPersistence)
      .then(() => signInAnonymously(auth));

    onAuthStateChanged(auth, setTempUser);
  }, []);

  if (!tempUser) {
    return <p>Loading</p>
  }

  if (loading || !data) {
    return <p>Loading</p>
  }

  if (data.registered) {
    return <div className="bg-white flex flex-col justify-center">
      <div className="flex flex-col xl:flex-row">
          <div className="xl:w-[50%] xl:left-0 xl:top-0 xl:bottom-0 m-2 xl:m-0 rounded-3xl xl:rounded-none aspect-[1/1] xl:aspect-auto">
              <video
              className="xl:h-screen xl:rounded-none rounded-3xl "
              autoPlay
              playsInline
              loop
              muted
              src="/hoodie-1.mp4"
              ></video>
          </div>
          <div className="xl:w-[50%] w-[100] mx-auto flex flex-col justify-center xl:p-10 p-2">
              <h2 className="long-title text-center text-8xl xl:mt-24 mt-4">Honft</h2>
              <p className="text-center font-normal py-3 mx-auto m-2 p-2">
              The next evolution of hoodies that blurs the line between the
              physical and digital world. Seamlessly synergising the power of
              technology and the comfort of luxury
              </p>
              <div className="border-b-2 border-t-2 px-2 py-3 m-2 p-2">
              <ItemTrait title="Product Code" desc="Honft 001 - Black Forest" />
              <ItemTrait title="Size" desc="X-Small to X-Large" />
              <ItemTrait
                  title="Material"
                  desc="100% French Terry Cotton (500GSM)"
              />
              <ItemTrait
                  title="Extra Details"
                  desc="Garment Dyed, Brushed Back, Peach Finish, Relaxed Fit"
              />
              <ItemTrait title="Manufacturing Cost" desc="$36" />
              <ItemTrait title="Development Cost" desc="$23" />
              <ItemTrait title="Total Sale Cost" desc="$127" />
              <p className=" text-center italic py-2 mx-auto">
                  Made in China (NTG Textile)
              </p>
              </div>
              <br />
              <div className="flex flex-col justify-center space-x-8 text-center ">
              <p className="tracking-tighter">Cold Gentle Machine Wash</p>
              <p className="tracking-tighter">With Similar Colours</p>
              <p className="tracking-tighter">Do not Bleach, Soak or Wring</p>
              <p className="tracking-tighter">Air Dry Only (Avoid Direct Sunlight)</p>
              <p className="tracking-tighter">Warm Iron</p>
              </div>
              <button className="w-full max-w-md mx-auto py-3 rounded-full font-medium text-white bg-gray-500 bg-opacity-65 xl:mt-36 mt-4 mb-2" >Sell</button>
          </div>
      </div>
  </div>
  }
  // if (data.registered) {
  //   return <div className="p-8 max-w-sm mx-auto">
  //     <TokenCard tokenId={data.tokenId} address={data.collection} showActions={false} />
  //     <TokenMetadata tokenId={data.tokenId} address={data.collection}>
  //       {(owner) => <MarketplaceHandover uid={uid as string} owner={owner} user={tempUser} secret={signature() as string} />}
  //     </TokenMetadata>
  //   </div>
  // }

  return <>
    <Handover uid={uid as string} user={tempUser} secret={signature() as string}>
      <CollectionCard address={data.collection} />
    </Handover>
    </>
}
