import { AddressElement } from "@stripe/react-stripe-js";
import { StripeAddressElement } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

function AddressForm({ onChange, onReady }: { onChange: (address: any) => void, onReady: (el: StripeAddressElement) => void }) {
  const [isReady, setReady] = useState(false);
  const [comment, setComment] = useState("");
  // const [promo, setPromo] = useState("");

  useEffect(() => {
    onChange({ comment });
  }, [comment, onChange]);

  function onFormReady(el: StripeAddressElement) {
    el.focus();
    setReady(true);
    onReady(el);
  }

  return (
    <>
      <AddressElement
        className="stripe-address-element"
        onReady={onFormReady}
        options={{
          mode: "shipping",
          blockPoBox: true,
          autocomplete: {
            mode: "google_maps_api",
            apiKey: "AIzaSyBxyov5lb60HJOhkimWull9Bi23mBIj9L4",
          },
          // @ts-expect-error
          fields: { name: "always", phone: "always" },
          validation: {
            // @ts-expect-error
            name: { required: "always" },
            phone: {
              required: "always",
            },
          },
          defaultValues: {
            address: { state: "CA", country: "US" },
          },
          appearance: {
            labels: "floating",
          },
        }}
      />
      { isReady && <input
        className="mt-4 py-3 px-2 rounded-xl border-2 border-gray-200"
        type="text"
        name="comment"
        placeholder="Add a comment"
        onChange={(e) => setComment(e.target.value)}
      />}
    </>
  );
}

export default AddressForm;
