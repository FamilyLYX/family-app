import {useState} from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { Button } from "../../common/buttons";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({status:0, message:"Not Loading..."});
    
    const auth = getAuth();

    async function resetPasswordEmail(){
        setLoading({status:1, message:"Sending email..."});

        await sendPasswordResetEmail(auth, email)
            .then((res) => {
                setLoading({status:1, message:"Weve sent a link on your email. Check your inbox"});
                console.log(res);
            })
            .catch((err) => {
                setError(err.message);
                setLoading({status:1, message:"Try after sometime"});
                console.log(err.code, err.message);
            })
    }

    return (
        <div className="mt-24">
            <h2 className="long-title text-center text-8xl">Reset Password</h2>
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
                <p>
                    Back to <Link to="/login/password">Login</Link>
                </p>
            </div> }
            {loading.status === 0 && <div className="max-w-md mx-auto text-center space-y-4 mt-8">
                <input 
                    className="w-full border px-2 py-4 rounded-lg" 
                    placeholder="Email" 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}

                />
                <Button variant="dark" onClick={resetPasswordEmail}>
                    Send Password Reset Email
                </Button>
            <p>
                Back to <Link to="/login/password">Login</Link>
            </p>
            </div>}
        </div>
    )
}

export default ResetPassword