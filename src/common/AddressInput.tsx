import {Elements, AddressElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function AddressInput({ onChange }: { onChange: (event: any) => void}) {
  const options = {
    // Fully customizable with appearance API.
    autocomplete: 'disabled',
    appearance: {/*...*/},
  };

  return (
    <Elements stripe={stripe} options={options}>
      <AddressElement
        options={{
          mode: 'shipping',
          blockPoBox: true,
          autocomplete: { mode: 'disabled' },
          defaultValues: {
            address: { state: 'CA', country: 'US' } 
          }
        }}
        onChange={(e) => onChange(e.value)}
      />
    </Elements>
  );
}
