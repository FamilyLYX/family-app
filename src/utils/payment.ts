import axios from "axios";
import { getAuth } from "firebase/auth";

export async function checkout(
  collection: string,
  variantId: string,
  address: any,
  productId: string,
  pass: {
    address: string,
    id: string
  } | null
) {
  try {
    const user = getAuth().currentUser;

    if (!user) {
      throw new Error('unauthenticated');
    }

    const idToken = await user.getIdToken();

    const response = await axios.post(
      `${import.meta.env.VITE_API_HOST}/checkout`,
      {
        collection,
        variantId,
        address,
        productId,
        pass
      },
      {
        headers: {
        'Authorization': idToken,
        },
      }
    );
    // console.log(response.data)
    // const { url, message } = response.data;

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
