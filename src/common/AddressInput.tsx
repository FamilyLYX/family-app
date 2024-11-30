import {Elements, AddressElement, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function AddressInput ({ onChange }: { onChange: (event: any) => void}) {
  const elements = useElements();

  if (elements) {
    // @ts-expect-error
    console.log(elements.getElement('address').getValue());
  }

  return <AddressElement
        options={{
          mode: 'shipping',
          blockPoBox: true,
          autocomplete: { mode: 'disabled' },
          // @ts-expect-error
          fields: {name: 'always'},
          // @ts-expect-error
          validation: {name: {required: 'always'}},
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
