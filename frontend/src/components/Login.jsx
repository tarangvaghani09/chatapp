// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //     const [phone, setPhone] = useState("");
// //     const [otp, setOtp] = useState("");
// //     const [otpSent, setOtpSent] = useState(false);
// //     const navigate = useNavigate();

// //     const sendOtp = async () => {
// //         try {
// //             const response = await fetch("http://localhost:5000/api/send-otp", {
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify({ phone }),
// //             });
// //             const data = await response.json();
// //             alert(data.message);
// //             setOtpSent(true);
// //         } catch (error) {
// //             console.error("Error sending OTP:", error);
// //         }
// //     };

// //     const verifyOtp = async () => {
// //         try {
// //             const response = await fetch("http://localhost:5000/api/verify-otp", {
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify({ phone, otp }),
// //             });
// //             const data = await response.json();
// //             if (response.ok) {
// //                 console.log(data);
// //                 localStorage.setItem("token", data.token);
// //                 localStorage.setItem("username", data.user.phone.replace("+91", ""));
// //                 localStorage.setItem("name", data.user.username);
// //                 navigate("/chat");
// //             } else {
// //                 alert(data.message);
// //             }
// //         } catch (error) {
// //             console.error("Error verifying OTP:", error);
// //         }
// //     };

// //     return (
// //         <div className="bg-white flex justify-center items-center h-screen">
// //             <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center">
// //                 {/* Left Side: Image */}
// //                 <div className="w-1/2 bg-gray-100 shadow-inner max-[500px]:hidden">
// //                     <img
// //                         src="login.png"
// //                         alt="Login Illustration"
// //                         className="object-contain w-full h-full p-6"
// //                     />
// //                 </div>

// //                 {/* Right Side: Login Form */}
// //                 <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner max-[500px]:w-full">
// //                     <div className="w-full max-w-sm">
// //                         <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h1>

// //                         <div className="mb-4">
// //                             <label htmlFor="loginPhone" className="block text-sm font-medium text-gray-700">Enter phone number</label>
// //                             <input
// //                                 type="text"
// //                                 name="loginPhone"
// //                                 id="loginPhone"
// //                                 value={phone}
// //                                 onChange={(e) => setPhone(e.target.value)}
// //                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //                                 autoFocus
// //                                 required
// //                             />
// //                         </div>

// //                         {!otpSent ? (
// //                             <div>
// //                                 <button
// //                                     onClick={sendOtp}
// //                                     className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
// //                                 >
// //                                     Send OTP
// //                                 </button>
// //                             </div>
// //                         ) : (
// //                             <>
// //                                 <div className="mt-4">
// //                                     <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Enter OTP</label>
// //                                     <input
// //                                         type="text"
// //                                         name="loginPassword"
// //                                         id="loginPassword"
// //                                         value={otp}
// //                                         onChange={(e) => setOtp(e.target.value)}
// //                                         className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mt-6">
// //                                     <button
// //                                         onClick={verifyOtp}
// //                                         className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
// //                                     >
// //                                         Verify OTP
// //                                     </button>
// //                                 </div>
// //                             </>
// //                         )}
// //                         <p className="text-sm text-gray-600 mt-4 text-center">
// //                             If you don't have an account{" "}
// //                             <a href="/register" className="text-blue-500 hover:underline">click here</a>
// //                         </p>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );

// // };

// // export default Login;


// // ------------------------------ without otp



// // import React, { useState } from 'react';
// // import { useNavigate } from "react-router-dom";
// // import '../App.css';

// // const Login = () => {

// //     const [user, setUser] = useState({
// //         username: "",
// //         phone: "",
// //         password: ""
// //     });

// //     const navigate = useNavigate();

// //     const handleInput = (e) => {
// //         let name = e.target.name;
// //         let value = e.target.value;

// //         setUser({
// //             ...user,
// //             [name]: value,
// //         })
// //     }

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const response = await fetch("http://localhost:5000/api/login", {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify(user),
// //             })
// //             const res_data = await response.json();
// //             console.log(res_data);
// //             localStorage.setItem('username', res_data.user.phone);
// //             localStorage.setItem('token', res_data.token);
// //             if (response.ok) {
// //                 navigate("/chat");
// //             }
// //         } catch (error) {
// //             console.log("Login", error);
// //         }
// //     }

// //     return (
// //         <div className="bg-white flex justify-center items-center h-screen">
// //             <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center">
// //                 {/* Left Side: Image */}
// //                 <div className="w-1/2 bg-gray-100 shadow-inner max-[500px]:hidden">
// //                     <img
// //                         src="login.png"
// //                         alt="Login Illustration"
// //                         className="object-contain w-full h-full p-6"
// //                     />
// //                 </div>

// //                 {/* Right Side: Login Form */}
// //                 <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner max-[500px]:w-full">
// //                     <div className="w-full max-w-sm">
// //                         <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h1>

// //                         {/* <div className="mb-4">
// //                             <label htmlFor="username" className="block text-sm font-medium text-gray-700">Enter your Username</label>
// //                             <input
// //                                 type="text"
// //                                 name="username"
// //                                 id="username"
// //                                 value={user.username}
// //                                 onChange={handleInput}
// //                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //                                 autoFocus
// //                                 required
// //                             />
// //                         </div> */}

// //                         <div className="mb-4">
// //                             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Enter your Phone</label>
// //                             <input
// //                                 type="text"
// //                                 name="phone"
// //                                 id="phone"
// //                                 value={user.phone}
// //                                 onChange={handleInput}
// //                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //                                 required
// //                             />
// //                         </div>

// //                         <div className="mb-4">
// //                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter your Password</label>
// //                             <input
// //                                 type="password"
// //                                 name="password"
// //                                 id="password"
// //                                 value={user.password}
// //                                 onChange={handleInput}
// //                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //                                 required
// //                             />
// //                         </div>

// //                         <div>
// //                             <button
// //                                 type="submit"
// //                                 className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
// //                                 onClick={handleSubmit}
// //                             >
// //                                 Login
// //                             </button>
// //                         </div>

// //                         <p className="text-sm text-gray-600 mt-4 text-center">
// //                             If you don't have an account{" "}
// //                             <a href="/register" className="text-blue-500 hover:underline">click here</a>
// //                         </p>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;



// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from "react-router-dom";
// // import '../App.css';

// // // Initialize intl-tel-input on window load
// // const loadIntlTelInput = () => {
// //   if (window.intlTelInput) {
// //     return window.intlTelInput;
// //   }
// //   return null;
// // };

// // const Login = () => {
// //   const [user, setUser] = useState({
// //     username: "",
// //     phone: "",
// //     password: ""
// //   });

// //   const [phoneError, setPhoneError] = useState(""); // State for phone validation error
// //   const phoneInputRef = useRef(null); // Ref for phone input
// //   const itiRef = useRef(null); // Ref for intl-tel-input instance

// //   const navigate = useNavigate();

// //   // Initialize intl-tel-input when component mounts
// //   useEffect(() => {
// //     const phoneInput = phoneInputRef.current;
// //     const iti = loadIntlTelInput();

// //     if (phoneInput && iti) {
// //       itiRef.current = iti(phoneInput, {
// //         initialCountry: "in", // Default to India
// //         preferredCountries: ["in", "us", "gb"], // Preferred countries at the top
// //         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
// //         separateDialCode: true, // Show country code separately
// //       });

// //       // Update validation when country changes
// //       phoneInput.addEventListener("countrychange", () => {
// //         const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
// //         validatePhone(rawNumber);
// //       });

// //       return () => {
// //         if (itiRef.current) {
// //           itiRef.current.destroy();
// //         }
// //       };
// //     }
// //   }, []);

// //   const handleInput = (e) => {
// //     let name = e.target.name;
// //     let value = e.target.value;

// //     // For phone input, get the number without country code
// //     if (name === 'phone' && itiRef.current) {
// //       const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
// //       setUser({
// //         ...user,
// //         phone: rawNumber
// //       });
// //       validatePhone(rawNumber);
// //     } else {
// //       setUser({
// //         ...user,
// //         [name]: value,
// //       });
// //     }
// //   };

// //   // Phone number validation function
// //   const validatePhone = (phone) => {
// //     if (!phone) {
// //       setPhoneError("Phone number is required");
// //     } else if (!/^\d+$/.test(phone)) {
// //       setPhoneError("Phone number must contain only digits");
// //     } else if (itiRef.current && !itiRef.current.isValidNumber()) {
// //       setPhoneError("Invalid phone number for the selected country");
// //     } else {
// //       setPhoneError("");
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Prevent submission if phone number is invalid
// //     if (phoneError) {
// //       return;
// //     }

// //     try {
// //       const response = await fetch("http://localhost:5000/api/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(user),
// //       });
// //       const res_data = await response.json();
// //       console.log(res_data);
// //       localStorage.setItem('username', res_data.user.phone);
// //       localStorage.setItem('token', res_data.token);
// //       if (response.ok) {
// //         navigate("/chat");
// //       }
// //     } catch (error) {
// //       console.log("Login", error);
// //     }
// //   };

// //   return (
// //     <div className="flex w-screen h-screen overflow-hidden">
// //       {/* Left Side: Image and Text */}
// //       <div className="w-1/2 bg-blue-900 flex flex-col justify-center items-center p-6 max-[500px]:hidden">
// //         <img
// //           src="login.png"
// //           alt="Login Illustration"
// //           className="object-contain w-3/4 h-auto mb-4"
// //         />
// //         <h1 className="text-3xl font-bold text-white text-center mb-2">Hello DeepChat! 👋</h1>
// //         <p className="text-sm text-white text-center px-4">
// //           Connect with friends and family instantly. Chat smarter, faster, and more securely with DeepChat!
// //         </p>
// //       </div>

// //       {/* Right Side: Login Form */}
// //       <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white max-[500px]:w-full">
// //         <div className="w-full max-w-sm">
// //           <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome to DeepChat!</h1>
// //           <p className="text-sm text-gray-600 text-center mb-6">
// //             Sign in to your account now, it’s quick and easy!
// //           </p>

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <div className="w-full">
// //                 <input
// //                   type="tel"
// //                   name="phone"
// //                   id="phone"
// //                   placeholder="Phone Number"
// //                   ref={phoneInputRef}
// //                   onChange={handleInput}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
// //                   required
// //                 />
// //               </div>
// //               {/* Display phone validation error */}
// //               {phoneError && (
// //                 <div className="mt-1 text-red-600 text-sm">
// //                   {phoneError}
// //                 </div>
// //               )}
// //             </div>

// //             <div>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 id="password"
// //                 placeholder="Password"
// //                 value={user.password}
// //                 onChange={handleInput}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <button
// //                 type="submit"
// //                 className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
// //               >
// //                 Login Now
// //               </button>
// //             </div>
// //           </form>
// //           <p className="text-sm text-gray-600 mt-4 text-center">
// //             If you don't have an account{" "}
// //             <a href="/register" className="text-blue-500 hover:underline">click here</a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

// Initialize intl-tel-input on window load
const loadIntlTelInput = () => {
  if (window.intlTelInput) {
    return window.intlTelInput;
  }
  return null;
};

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    password: ""
  });

  const [phoneError, setPhoneError] = useState(""); // Phone number validation error
  const [serverError, setServerError] = useState(""); // Server-side login error
  const [loading, setLoading] = useState(false); // Optional: For spinner/button loading
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const phoneInput = phoneInputRef.current;
    const iti = loadIntlTelInput();

    if (phoneInput && iti) {
      itiRef.current = iti(phoneInput, {
        initialCountry: "in",
        preferredCountries: ["in", "us", "gb"],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        separateDialCode: true,
      });

      phoneInput.addEventListener("countrychange", () => {
        const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
        validatePhone(rawNumber);
      });

      return () => {
        if (itiRef.current) {
          itiRef.current.destroy();
        }
      };
    }
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setServerError(""); // Clear server error on input change

    if (name === 'phone' && itiRef.current) {
      const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
      setUser({
        ...user,
        phone: rawNumber
      });
      validatePhone(rawNumber);
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const validatePhone = (phone) => {
    if (!phone) {
      setPhoneError("Phone number is required");
    } else if (!/^\d+$/.test(phone)) {
      setPhoneError("Phone number must contain only digits");
    } else if (itiRef.current && !itiRef.current.isValidNumber()) {
      setPhoneError("Invalid phone number for the selected country");
    } else {
      setPhoneError("");
    }
  };

  //   const continueWithoutAccount = (e) => {
  //   e.preventDefault();
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("username");
  //   localStorage.setItem("anonymous", "true");
  //   localStorage.removeItem("anonymousToastShown");
  //   window.dispatchEvent(new Event("authchange"));
  //   navigate("/chat", { replace: true });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
    validatePhone(rawNumber);

    if (phoneError) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (!response.ok) {
        setServerError(res_data.message || "Invalid login credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem('username', res_data.user.phone);
      localStorage.setItem('token', res_data.token);
      localStorage.setItem('role', res_data.role);
      navigate("/chat");

    } catch (error) {
      console.log("Login error:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-900 flex flex-col justify-center items-center p-6 max-[500px]:hidden">
        <img
          src="login.png"
          alt="Login Illustration"
          className="object-contain w-3/4 h-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-white text-center mb-2">Hello DeepChat! 👋</h1>
        <p className="text-sm text-white text-center px-4">
          Connect with friends and family instantly. Chat smarter, faster, and more securely with DeepChat!
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white max-[500px]:w-full">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome to DeepChat!</h1>
          <p className="text-sm text-gray-600 text-center mb-4">Sign in to your account now, it’s quick and easy!</p>

          {serverError && (
            <div className="text-red-600 text-sm text-center mb-2">{serverError}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                ref={phoneInputRef}
                onChange={handleInput}
                onBlur={() => {
                  const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
                  validatePhone(rawNumber);
                }}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10 ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {phoneError && (
                <div className="mt-1 text-red-600 text-sm">{phoneError}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={user.password}
                onChange={handleInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login Now"}
              </button>
            </div>
          </form>

         <div className="text-center mt-4">
             <div className="mb-4">
               <p className="text-sm text-gray-600 mt-4 text-center">
                 If you don't have an account{" "}
                 <a href="/register" className="text-blue-500 hover:underline">click here</a>
               </p>
             </div>
             {/* <button
               onClick={continueWithoutAccount}
               className="text-blue-500 hover:underline bg-transparent border-0 p-0 cursor-pointer"
             >
               Continue without an account
             </button> */}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;







// Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// const Login = () => {
//   const [user, setUser] = useState({ phone: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setUser((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         return;
//       }
//       // SUCCESS: store auth, clear anonymous, go /chat
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.user?.phone || data.user?.username || "");
//       localStorage.removeItem("anonymous");
//       localStorage.removeItem("anonymousToastShown");
//       window.dispatchEvent(new Event("authchange"));
//       navigate("/chat", { replace: true });
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while logging in. Try again later.");
//     }
//   };

//   const continueWithoutAccount = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.setItem("anonymous", "true");
//     localStorage.removeItem("anonymousToastShown");
//     window.dispatchEvent(new Event("authchange"));
//     navigate("/chat", { replace: true });
//   };

//   return (
//     <div className="bg-white flex justify-center items-center h-screen">
//       <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
//         <div className="w-1/2 bg-gray-100 hidden md:block">
//           <img src="/login.png" alt="Login" className="object-contain w-full h-full p-6" />
//         </div>

//         <div className="w-full md:w-1/2 p-10">
//           <h1 className="text-3xl font-extrabold mb-6">Login</h1>

//           {error && <div className="mb-4 text-red-600">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Enter your Phone</label>
//               <input
//                 name="phone"
//                 value={user.phone}
//                 onChange={handleInput}
//                 className="w-full px-4 py-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium">Enter your Password</label>
//               <input
//                 name="password"
//                 type="password"
//                 value={user.password}
//                 onChange={handleInput}
//                 className="w-full px-4 py-2 border rounded"
//                 required
//               />
//             </div>

//             <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded mb-3">
//               Login
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <div className="mb-4">
//               <p className="text-sm text-gray-600 mt-4 text-center">
//                 If you don't have an account{" "}
//                 <a href="/register" className="text-blue-500 hover:underline">click here</a>
//               </p>
//             </div>
//             <button
//               onClick={continueWithoutAccount}
//               className="text-blue-500 hover:underline bg-transparent border-0 p-0 cursor-pointer"
//             >
//               Continue without an account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


