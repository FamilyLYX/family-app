import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any>(null);

export default function UserProvider({ children }: { children: any }) {
  const [loading, setLoading] = useState(false);
  const [vault, setVault] = useState<any>(null);
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) { return; }

    (user as User).getIdTokenResult(true).then((idToken) => {
      setVault(idToken.claims?.target);
    });
  }, [user]);

  return <UserContext.Provider value={{ vault, user, loading }}>
    {children}
  </UserContext.Provider>
}