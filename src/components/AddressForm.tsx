import { Elements, AddressElement, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function AddressInput(props: any) {
    const elements = useElements();

    async function validateAddress() {
    if (!elements) {
        return;
    }

    const addrEl = elements.getElement("address");

    if (!addrEl) {
        return;
    }

    const address = await addrEl.getValue();

    if (!address.complete) {
        return;
    }

    props.save(address.value);
    }

    return (
    <>
        <AddressElement
        className="stripe-address-element"
        options={{
            mode: "shipping",
            blockPoBox: true,
            autocomplete: {
                mode: "google_maps_api",
                apiKey: "{AIzaSyBxyov5lb60HJOhkimWull9Bi23mBIj9L4}"
            },
            fields: { name: "always" },
            validation: { name: { required: "always" } },
            defaultValues: {
            address: { state: "CA", country: "US" },
            },
        }}
        />
        <input className="mt-4 py-3 px-2 rounded-xl border-2 border-gray-200" type="text" placeholder="Add a comment" />
        <input className="mt-4 py-3 px-2 rounded-xl border-2 border-gray-200" type="text" placeholder="Promo Code" />
        {/* <Button variant="dark" onClick={validateAddress}>
        Add Address
        </Button> */}
    </>
    );
}

function AddressForm({ update }: { update: (address: any) => void }) {
    const options = {
    // Fully customizable with appearance API.
    appearance: {
        rules:{
            '.Label':{
                'color': 'transparent',
                'fontSize':'0px'
            },
            '.Input':{
                'borderColor':'#e5e7eb',
                'borderWidth':'2px',
                'paddingTop':'0.85rem',
                'paddingBottom':'0.85rem',
                'borderRadius':'0.75rem'
            }
        }
    },
    };

    return (
    <Elements stripe={stripe} options={options} >
        <AddressInput save={(address: any) => update(address)} />
    </Elements>
    );
}

export default AddressForm