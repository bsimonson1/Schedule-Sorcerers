import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";

function VerifyPage() {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const correctToken = "123456";  

    const handleVerifyToken = () => {
        if (token === correctToken) {
            navigate("/home"); 
        } else {
            setError('Invalid verification code. Please try again.');
            setToken(''); 
        }
    };

    return (
        <div className="App">
            <h2>Scan QR Code and Enter the Code from Your Authenticator App</h2>
            <QRCode
                size={256}
                bgColor="white"
                fgColor="black"
                value="123456"  
            />
            <div>
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter your verification code here"
                />
                <button onClick={handleVerifyToken}>Verify</button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default VerifyPage;

// const VerifyPage = () => {
//   const [token, setToken] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { secret } = location.state;  

//   const handleVerifyToken = async () => {
//     try {
//       const response = await fetch('/verify', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ secret, token })
//       });
//       const data = await response.json();
//       if (data.verified) {
//         navigate("/home");
//       } else {
//         setError('Invalid verification code. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('Failed to verify the code. Please try again.');
//     }
//   };

//   return (
//     <div className="verify-container">
//       <h2>Scan QR Code and Enter Verification Code</h2>
//       <QRCode value={`otpauth://totp/YourAppName?secret=${secret}&issuer=YourAppName`} size={256} level={"H"} />
//       <input
//         type="text"
//         value={token}
//         onChange={(e) => setToken(e.target.value)}
//         placeholder="Verification Code"
//       />
//       <button onClick={handleVerifyToken}>Verify</button>
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default VerifyPage;