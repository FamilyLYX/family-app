import axios from "axios";
import { getAuth } from "firebase/auth";

export async function checkout (collection: string, variantId: string, address: any) {
  try {
    const user = getAuth().currentUser;
    
    if (!user) {
      throw new Error('unauthenticated');
    }

    const idToken = await user.getIdToken();

    const response = await axios.post(`${import.meta.env.VITE_API_HOST}/checkout`, {
      collection,
      variantId,
      address
    }, {
      headers: {
        'Authorization': idToken
      }
    });

    const { url } = response.data;

    return url;
  } catch (error) {
    console.log(error);
  }
}