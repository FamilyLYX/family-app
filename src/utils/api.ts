import axios from "axios";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export async function getAllProducts () {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/products`, {});

    const { products } = response.data;

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function initiateHandover (idToken: string, uid: string) {
  try {
    const response = await axios({
      baseURL: `${import.meta.env.VITE_API_HOST}/handover`,
      method: 'post',
      headers: {
        'Authorization': `${idToken}`
      },
      data: {
        uid
      }
    });

    const { code, hash, expiry } = response.data;

    return { code, hash, expiry };
  } catch (error) {
    console.log(error);
  }
}

export async function requestToClaimHandover (idToken: string, code: string) {
  try {
    const response = await axios({
      baseURL: `${import.meta.env.VITE_API_HOST}/handover/request-claim`,
      method: 'post',
      headers: {
        'Authorization': `${idToken}`
      },
      data: {
        code
      }
    });

    return response.data.handover;
  } catch (error) {
    console.log(error);
  }
}

export async function updateHandover (codeHash: string, signature: string) {
  const db = getFirestore();

  return setDoc(
    doc(db, `handover/${codeHash}`),
    {
      status: 'completed',
      signature
    },
    { merge: true }
  );
}

export async function getCryptoOrderQuote (profile: string, collection: string, variant: string, address: any) {
  try {
    const response = await axios({
      baseURL: `${import.meta.env.VITE_API_HOST}/order-quote`,
      method: 'post',
      data: {
        profile,
        variant,
        collection,
        address
      }
    });

    const { order, params: data } = response.data;

    data[1] = BigInt(data[1]);

    return { params: data, order };
  } catch (error) {
    console.log(error);
  }
}
