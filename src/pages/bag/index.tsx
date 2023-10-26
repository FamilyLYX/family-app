import {Elements, AddressElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { checkout } from "../../utils/payment";
import { Button } from '../../common/buttons';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function Bag() {
  const options = {
    // Fully customizable with appearance API.
    autocomplete: 'disabled',
    appearance: {/*...*/},
  };

  async function handleCheckout () {
    const url = await checkout();

    window.location = url;
  }

  return (
    <div className="mt-24">
      <h2 className="long-title text-center text-8xl">Bag</h2>
      <div className="max-w-xl mx-auto flex flex-col mt-4">
        <Button onClick={handleCheckout} variant="dark">Checkout</Button>
      </div>
      <div className="max-w-xl mx-auto my-4">
        <Elements stripe={stripe} options={options}>
          <AddressElement options={{mode: 'shipping', blockPoBox: true, autocomplete: { mode: 'disabled' }, defaultValues: {
            address: {
              state: 'CA',
              country: 'US'
            } 
          } }} />
        </Elements>
      </div>
    </div>
  );
}
