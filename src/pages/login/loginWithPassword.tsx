import { useState } from "react";
import { Button } from "../../common/buttons";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

function LoginWithPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({status:0,message:"Not Loading..."})

    const auth = getAuth();
    const navigate = useNavigate();

    async function authenticate() {
        
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading({status:1, message:"Login..."});
                const user = userCredential.user
                console.log(user);
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
                setLoading({status:1,message:"Try after sometime !"});
                console.log(err.code, err.message);
            })
    }

    return (
        <div className="mt-24">
            <h2 className="long-title text-center text-8xl">Login With Password</h2>
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
            {loading.status === 0 && <div className="max-w-md mx-auto text-center space-y-4 mt-8">
                <input 
                    className="w-full border px-2 py-4 rounded-lg" 
                    placeholder="Email" 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="w-full border px-2 py-4 rounded-lg" 
                    placeholder="Password" 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="dark" onClick={authenticate}>
                    Sign In
                </Button>
                <p>
                    <Link to="/sign-up">Sign Up</Link>
                </p>
                <p>
                    <Link to="/reset-password">Forgot Password</Link>
                </p>
            </div>}
        </div>
    )
}
export default LoginWithPassword