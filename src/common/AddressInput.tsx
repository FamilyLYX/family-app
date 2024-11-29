import {Elements, AddressElement } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function AddressInput ({ onChange }: { onChange: (event: any) => void}) {
  return <AddressElement
        options={{
          mode: 'shipping',
          blockPoBox: true,
          autocomplete: { mode: 'disabled' },
          defaultValues: {
            address: { state: 'CA', country: 'US' } 
          }
        }}
        onChange={(e: any) => onChange(e.value)}
        // onChange={handleAddressChange}
      />
}

export default function AddressInputWrapper({ onChange }: { onChange: (event: any) => void}) {
  const options = {
    // Fully customizable with appearance API.
    autocomplete: 'disabled',
    appearance: {/*...*/},
  };

  
  return (
    <Elements stripe={stripe} options={options}>
      <AddressInput onChange={onChange} />
    </Elements>
  );
}
