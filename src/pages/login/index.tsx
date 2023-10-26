import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../common/buttons";
import { useEffect, useState } from "react";
import { getAuth, isSignInWithEmailLink, onAuthStateChanged, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  function authenticate() {
    localStorage.setItem('auth-email', email);

    sendSignInLinkToEmail(getAuth(), email, {
      url: 'http://localhost:5173/login',
      handleCodeInApp: true
    }).then(console.log);
  }

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) { return navigate('/'); }
    });
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('auth-email');

    if (email && isSignInWithEmailLink(getAuth(), window.location.href)) {
      signInWithEmailLink(getAuth(), email as string, window.location.href)
        .then(() => {
          localStorage.removeItem('auth-email');
        })
        .catch(console.log);
    }
  }, []);

  if (isSignInWithEmailLink(getAuth(), window.location.href)) {
    return <p>Loading</p>
  }

  return <div className="mt-24">
    <h2 className="long-title text-center text-8xl">Login</h2>
    <div className="max-w-md mx-auto text-center space-y-4 mt-4">
      <input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
      <Button variant="dark" onClick={authenticate}>Login</Button>
    </div>
  </div>
}