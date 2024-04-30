import { useNavigate } from "react-router-dom";
import { Button } from "../../common/buttons";
import { useEffect, useState } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import ConnectWallet from "../../common/ConnectWallet";

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({ status: 0, message: "Not Loading" });
  const [email, setEmail] = useState("");
  const [error, setError] = useState<null | string>();

  async function authenticate() {
    localStorage.setItem("auth-email", email);

    if(!email){
      setError("Please enter your email address.")
      return;
    }

    setLoading({
      status: 1,
      message: "Validating email address and sending link",
    });
    try {
      await sendSignInLinkToEmail(getAuth(), email, {
        url: window.location.href,
        handleCodeInApp: true,
      });
      setLoading({
        status: 1,
        message: "We've sent a link on your email. Check your inbox",
      });
    } catch (err: any) {
      setError(err.message);

      setLoading({ status: 0, message: 'Not Loading' });
    }
  }

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        return navigate("/buy/honft");
      }
    });
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("auth-email");

    if (email && isSignInWithEmailLink(getAuth(), window.location.href)) {
      signInWithEmailLink(getAuth(), email as string, window.location.href)
        .then(() => {
          localStorage.removeItem("auth-email");
        })
        .catch(console.log);
    }
  }, []);

  if (isSignInWithEmailLink(getAuth(), window.location.href)) {
    return <p>Loading</p>;
  }

  return (
    <div className="mt-24">
      <h2 className="long-title text-center text-8xl">Login</h2>
      {error && (
        <div className="max-w-md mx-auto text-center space-y-4 mt-8">
          <p className="p-4 bg-red-100 text-red-900 w-full rounded-md text-center">
            {error}
          </p>
        </div>
      )}
      { loading.status !== 0 && <div className="max-w-md mx-auto text-center space-y-4 mt-8">
        <p className="p-4 bg-gray-100 text-gray-900 w-full rounded-md text-center">
          {loading.message}
        </p>
      </div> }
      { loading.status === 0 && <div>
        <div className="max-w-md mx-auto text-center space-y-4 mt-8">
          <input
            className="w-full border px-2 py-4 rounded-lg"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="dark" onClick={authenticate}>
            Login
          </Button>
        </div>
        <div className="max-w-md mx-auto text-center space-y-4 mt-4 pb-4 pt-4 border-t-2">
          <ConnectWallet />
        </div>
      </div> }
    </div>
  );
}
