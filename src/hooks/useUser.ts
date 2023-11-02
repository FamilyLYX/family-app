import { isAddress } from "ethers";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useUser () {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [target, setTarget] = useState<null|string>();

  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        isAddress(user.uid) ? setTarget(user.uid) : user.getIdTokenResult(true).then((idTokenRes) => {
          setTarget(idTokenRes.claims?.target);
        })
      }
    });
  }, []);

  return { user, target, loading };
}