import { isAddress } from "ethers";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getProfileAddress } from "../utils/api";

export const UserContext = createContext<any>(null);

export default function UserProvider({ children }: { children: any }) {
  const [loading, setLoading] = useState(false);
  const [vault, setVault] = useState<any>(null);
  const [user, setUser] = useState<User|null>(null);
  const [profile, setProfile] = useState<string|null>(null);

  async function getUserProfile() {
    if (!user) { return null; }

    if (isAddress(user.uid)) {
      return user.uid;
    }

    const address = (user as User).getIdToken().then((token) => {
      return getProfileAddress(token);
    })

    return address;
  }

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

    getUserProfile().then((address) => {
      if (!address) { return; }

      setProfile(address)
    });
  }, [user]);

  return <UserContext.Provider value={{ vault, user, loading, profile }}>
    {children}
  </UserContext.Provider>
}