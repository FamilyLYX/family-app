import { useParams } from "react-router-dom"
import base64url from 'base64url';

import { initiateHandover, updateHandover } from '../../utils/api';
import { useEffect, useState } from "react";

import { User, getAuth, inMemoryPersistence, onAuthStateChanged, setPersistence, signInAnonymously } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { Button } from "../../common/buttons";
import { useAssetRegistry } from "../../hooks/useAssetRegistry";
import { TokenId } from "../../common/objects";
import { useQuery } from "@tanstack/react-query";
import { CollectionCard, TokenCard, TokenMetadata } from "../../common/components";

type HandoverObj = {
  status: string;
  code: string;
  hash: string;
  expiry: Date;
  target: string;
  signature: string;
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
    return <div>
      <h3 className="long-title text-8xl mb-4 text-center">{code}</h3>
      <p className="text-xs text-center text-gray-400 py-2">Enter this code on the desktop browser to continue registration</p>
      {children}
    </div>
  }

  return <div>
    <h3 className="long-title text-8xl mb-4 text-center">Register</h3>
    <p className="text-xs text-center mb-4">To register, open the app on a desktop, and connect to UP extension.<br/>Once connected, navigate to <em>Inventory</em> section and continue registration.</p>
    {children}
    <Button onClick={initHandover}>Start Registration</Button>
  </div>
}

type RegistryAssetType = {
  collection: string;
  registered: boolean;
  tokenId: TokenId;
}

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
    return <div className="p-8 max-w-sm mx-auto">
      <TokenCard tokenId={data.tokenId} showActions={false} />
      <TokenMetadata tokenId={data.tokenId} />
    </div>
  }

  return <div className="p-8 max-w-sm mx-auto">    
    <Handover uid={uid as string} user={tempUser} secret={signature() as string}>
      <CollectionCard address={import.meta.env.VITE_ASSET_ADDRESS} />
    </Handover>
  </div>
}
