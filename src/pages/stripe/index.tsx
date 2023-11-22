import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function StripePage() {
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const db = getFirestore();
			const auth = getAuth();
			const stripeAccountsRef = collection(db, 'stripe');

			if (!auth.currentUser) return;

			const q = query(stripeAccountsRef, where('userId', '==', auth.currentUser.uid));

			const querySnapshot = await getDocs(q);

			if (querySnapshot.size > 0) return;

			const idToken = await auth.currentUser.getIdToken();

			await axios.post('http://localhost:8080/stripe/account', {
				token: idToken,
			});

			const { data } = await axios.post('http://localhost:8080/stripe/onboarding', {
				token: idToken,
			});

			const { url } = data;

			setUrl(url);
		})();
	}, []);

	return <div>{url && <a href={url}>Connect withdrawal account</a>}</div>;
}
