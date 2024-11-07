import React from 'react';
import styles from './EscrowSystem.module.css';
import { usePhygitalCollection } from '../../hooks/usePhygitalCollection';
import { TokenId } from '../../common/objects';
import { useQuery } from '@tanstack/react-query';

export default function Gallery({
  collection,
  tokenId,
}: {
  collection: string;
  tokenId: string;
}) {
  const { getTokenMetadata } = usePhygitalCollection(collection!);
  const { data } = useQuery({
    queryKey: ['meta', tokenId],
    queryFn: () => getTokenMetadata(TokenId.parseTokenId(tokenId)),
  });
  return (
    <div className="flex flex-col gap-1 h-screen items-center wsmallss relative">
      <div>
        <img
          src={` ${data?.image}`}
          className={` ${styles.wsmalls}`}
          alt="product"
        />
      </div>
    </div>
  );
}
