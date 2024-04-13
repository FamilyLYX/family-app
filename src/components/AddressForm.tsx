import { AddressElement, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState} from "react";

function AddressForm({ onChange }: { onChange: (address: any) => void }) {
    const [comment, setComment] = useState('');
    const [promo, setPromo] = useState('');

    useEffect(() => {
        onChange({ comment, promo });
    }, [comment, promo])
  return (
    <>
      <AddressElement
        className="stripe-address-element"
        options={{
          mode: "shipping",
          blockPoBox: true,
          autocomplete: {
            mode: "google_maps_api",
            apiKey: "AIzaSyBxyov5lb60HJOhkimWull9Bi23mBIj9L4",
          },
          fields: { name: "always", phone:"always" },
          validation: { name: { required: "always" }, phone: {
            required: 'always',
          }, },
          defaultValues: {
            address: { state: "CA", country: "US" },
          },
          appearance: {
            labels: 'floating'
          }
        }}
      />
      <input
        className="mt-4 py-3 px-2 rounded-xl border-2 border-gray-200"
        type="text"
        name="comment"
        placeholder="Add a comment"
        onChange={e => setComment(e.target.value)}
      />
      <input
        className="mt-4 py-3 px-2 rounded-xl border-2 border-gray-200"
        type="text"
        name="promo"
        placeholder="Promo Code"
        onChange={e => setPromo(e.target.value)}
      />
    </>
  );
}

export default AddressForm;
