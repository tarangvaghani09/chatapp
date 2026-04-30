// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import '../App.css';

// const Register = () => {
//   const [user, setUser] = useState({
//     username: "",
//     phone: "",
//     profilePicture: null,
//     password: ""
//   });

//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     const { name, value, type } = e.target;

//     if (type === 'file') {
//       setUser({
//         ...user,
//         profilePicture: e.target.files[0]
//       });
//     } else {
//       setUser({
//         ...user,
//         [name]: value
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('username', user.username);
//       formData.append('phone', user.phone);
//       formData.append('profilePicture', user.profilePicture);
//       formData.append('password', user.password);

//       const response = await fetch("http://localhost:5000/api/register", {
//         method: "POST",
//         body: formData,
//       });

//       const responseData = await response.json();
//       console.log(responseData);

//       if (response.ok) {
//         // Clear error if registration is successful and navigate to login page
//         setError("");
//         navigate("/login");
//       } else {
//         // Display error message returned from server
//         setError(responseData.message);
//       }
//     } catch (error) {
//       // In case of network or unexpected errors, show a generic error message
//       setError("Registration failed. Please try again later.");
//       console.error("Registration failed:", error);
//     }
//   };

//   return (
//     <div className="bg-white flex justify-center items-center h-screen">
//       <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center">
//         {/* Left Side: Image */}
//         <div className="w-1/2 bg-gray-100 shadow-inner max-[500px]:hidden">
//           <img
//             src="register.png"  // Replace with the image URL if needed
//             alt="Registration Illustration"
//             className="object-contain w-full h-full p-6"
//           />
//         </div>

//         {/* Right Side: Registration Form */}
//         <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner max-[500px]:w-full">
//           <div className="w-full max-w-sm">
//             <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Register</h1>

//             {/* Display error message if exists */}
//             {error && (
//               <div className="mb-4 text-red-600 text-center">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">Enter your Username</label>
//                 <input
//                   type="text"
//                   name='username'
//                   id='username'
//                   autoFocus
//                   required
//                   value={user.username}
//                   onChange={handleInput}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Enter your Mobile</label>
//                 <input
//                   type="text"
//                   name='phone'
//                   id='phone'
//                   required
//                   value={user.phone}
//                   onChange={handleInput}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Upload your Picture</label>
//                 <input
//                   type="file"
//                   name="profilePicture"
//                   id='profilePicture'
//                   onChange={handleInput}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter your Password</label>
//                 <input
//                   type="password"
//                   name='password'
//                   id='password'
//                   required
//                   value={user.password}
//                   onChange={handleInput}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <button
//                   type='submit'
//                   className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer'>
//                   Register
//                 </button>
//               </div>
//             </form>
//             <p className="text-sm text-gray-600 mt-4 text-center">
//               Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


//27-6-25 -----------------------------------------------------------------------------------------------------

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
// import '../App.css';

// // Initialize intl-tel-input on window load
// const loadIntlTelInput = () => {
//   if (window.intlTelInput) {
//     return window.intlTelInput;
//   }
//   return null;
// };

// const Register = () => {
//   const [user, setUser] = useState({
//     username: "",
//     phone: "",
//     profilePicture: null,
//     password: ""
//   });

//   const [error, setError] = useState("");
//   const [phoneError, setPhoneError] = useState(""); // State for phone validation error
//   const phoneInputRef = useRef(null); // Ref for phone input
//   const itiRef = useRef(null); // Ref for intl-tel-input instance

//   const navigate = useNavigate();

//   // Initialize intl-tel-input when component mounts
//   useEffect(() => {
//     const phoneInput = phoneInputRef.current;
//     const iti = loadIntlTelInput();

//     if (phoneInput && iti) {
//       itiRef.current = iti(phoneInput, {
//         initialCountry: "in", // Default to India
//         preferredCountries: ["in", "us", "gb"], // Preferred countries at the top
//         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
//         separateDialCode: true, // Show country code separately
//       });

//       // Update validation when country changes
//       phoneInput.addEventListener("countrychange", () => {
//         const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
//         validatePhone(rawNumber);
//       });

//       return () => {
//         if (itiRef.current) {
//           itiRef.current.destroy();
//         }
//       };
//     }
//   }, []);

//   const handleInput = (e) => {
//     const { name, value, type } = e.target;

//     if (type === 'file') {
//       setUser({
//         ...user,
//         profilePicture: e.target.files[0]
//       });
//     } else {
//       // For phone input, get the number without country code
//       if (name === 'phone' && itiRef.current) {
//         const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
//         setUser({
//           ...user,
//           phone: rawNumber
//         });
//         validatePhone(rawNumber);
//       } else {
//         setUser({
//           ...user,
//           [name]: value
//         });
//       }
//     }
//   };

//   // Phone number validation function
//   const validatePhone = (phone) => {
//     if (!phone) {
//       setPhoneError("Phone number is required");
//     } else if (!/^\d+$/.test(phone)) {
//       setPhoneError("Phone number must contain only digits");
//     } else if (itiRef.current && !itiRef.current.isValidNumber()) {
//       setPhoneError("Invalid phone number for the selected country");
//     } else {
//       setPhoneError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prevent submission if phone number is invalid
//     if (phoneError) {
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('username', user.username);
//       formData.append('phone', user.phone);
//       formData.append('profilePicture', user.profilePicture);
//       formData.append('password', user.password);

//       const response = await fetch("http://localhost:5000/api/register", {
//         method: "POST",
//         body: formData,
//       });

//       const responseData = await response.json();
//       console.log(responseData);

//       if (response.ok) {
//         // Clear error if registration is successful and navigate to login page
//         setError("");
//         navigate("/login");
//       } else {
//         // Display error message returned from server
//         setError(responseData.message);
//       }
//     } catch (error) {
//       // In case of network or unexpected errors, show a generic error message
//       setError("Registration failed. Please try again later.");
//       console.error("Registration failed:", error);
//     }
//   };

//   return (
//     <div className="flex w-screen h-screen overflow-hidden">
//       {/* Left Side: Image and Text */}
//       <div className="w-1/2 bg-blue-900 flex flex-col justify-center items-center p-6 max-[500px]:hidden">
//         <img
//           src="register.png"
//           alt="Registration Illustration"
//           className="object-contain w-3/4 h-auto mb-4"
//         />
//         <h1 className="text-3xl font-bold text-white text-center mb-2">Hello DeepChat! 👋</h1>
//         <p className="text-sm text-white text-center px-4">
//           Connect with friends and family instantly. Chat smarter, faster, and more securely with DeepChat!
//         </p>
//       </div>

//       {/* Right Side: Registration Form */}
//       <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white max-[500px]:w-full">
//         <div className="w-full max-w-sm">
//           <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome to DeepChat!</h1>
//           <p className="text-sm text-gray-600 text-center mb-6">
//             Create a new account now, it’s quick and easy!
//           </p>

//           {/* Display error message if exists */}
//           {error && (
//             <div className="mb-4 text-red-600 text-center">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <input
//                 type="text"
//                 name='username'
//                 id='username'
//                 placeholder="Username"
//                 autoFocus
//                 required
//                 value={user.username}
//                 onChange={handleInput}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
//               />
//             </div>
//             <div>
//               <div className="w-full">
//                 <input
//                   type="tel"
//                   name='phone'
//                   id='phone'
//                   placeholder="Phone Number"
//                   required
//                   ref={phoneInputRef}
//                   onChange={handleInput}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
//                 />
//               </div>
//               {/* Display phone validation error */}
//               {phoneError && (
//                 <div className="mt-1 text-red-600 text-sm">
//                   {phoneError}
//                 </div>
//               )}
//             </div>
//             <div>
//               <input
//                 type="file"
//                 name="profilePicture"
//                 id='profilePicture'
//                 onChange={handleInput}
//                 accept='image/*'
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
//               />
//             </div>
//             <div>
//               <input
//                 type="password"
//                 name='password'
//                 id='password'
//                 placeholder="Password"
//                 required
//                 value={user.password}
//                 onChange={handleInput}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
//               />
//             </div>
//             <div>
//               <button
//                 type='submit'
//                 className='w-full py-2 px-4 bg-black text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer'>
//                 Register Now
//               </button>
//             </div>
//           </form>
//           <p className="text-sm text-gray-600 mt-4 text-center">
//             Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



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

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    profilePicture: null,
    password: ""
  });

  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-100 scale
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  const navigate = useNavigate();

  // Initialize intl-tel-input when component mounts
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
    const { name, value, type } = e.target;

    if (type === 'file') {
      setUser({
        ...user,
        profilePicture: e.target.files[0]
      });
    } else {
      if (name === 'phone' && itiRef.current) {
        const rawNumber = itiRef.current.getNumber().replace(`+${itiRef.current.getSelectedCountryData().dialCode}`, '');
        setUser({
          ...user,
          phone: rawNumber
        });
        validatePhone(rawNumber);
      } else if (name === 'password') {
        setUser({
          ...user,
          password: value
        });
        validatePassword(value);
      } else {
        setUser({
          ...user,
          [name]: value
        });
      }
    }
  };

  // Phone number validation function
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

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const maxLength = password.length <= 12;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasAlphabet = /[a-zA-Z]/.test(password);

    if (!password) {
      setPasswordError("Password is required");
      setPasswordStrength(0);
    } else if (!minLength) {
      setPasswordError("Password must be at least 8 characters long");
      setPasswordStrength(20);
    } else if (!maxLength) {
      setPasswordError("Password cannot exceed 12 characters");
      setPasswordStrength(20);
    } else if (!hasAlphabet) {
      setPasswordError("Password must contain at least one alphabet");
      setPasswordStrength(40);
    } else if (!hasNumber) {
      setPasswordError("Password must contain at least one number");
      setPasswordStrength(60);
    } else if (!hasSpecial) {
      setPasswordError("Password must contain at least one special character");
      setPasswordStrength(80);
    } else {
      setPasswordError("");
      setPasswordStrength(100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError || passwordError) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('phone', user.phone);
      formData.append('profilePicture', user.profilePicture);
      formData.append('password', user.password);

      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        setError("");
        navigate("/login");
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      setError("Registration failed. Please try again later.");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-1/2 bg-blue-900 flex flex-col justify-center items-center p-6 max-[500px]:hidden">
        <img
          src="register.png"
          alt="Registration Illustration"
          className="object-contain w-3/4 h-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-white text-center mb-2">Hello DeepChat! 👋</h1>
        <p className="text-sm text-white text-center px-4">
          Connect with friends and family instantly. Chat smarter, faster, and more securely with DeepChat!
        </p>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white max-[500px]:w-full">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome to DeepChat!</h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Create a new account now, it’s quick and easy!
          </p>

          {error && (
            <div className="mb-4 text-red-600 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name='username'
                id='username'
                placeholder="Username"
                autoFocus
                required
                value={user.username}
                onChange={handleInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
              />
            </div>
            <div>
              <div className="w-full">
                <input
                  type="tel"
                  name='phone'
                  id='phone'
                  placeholder="Phone Number"
                  required
                  ref={phoneInputRef}
                  onChange={handleInput}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
                />
              </div>
              {phoneError && (
                <div className="mt-1 text-red-600 text-sm">
                  {phoneError}
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                name="profilePicture"
                id='profilePicture'
                onChange={handleInput}
                accept='image/*'
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
              />
            </div>
            <div>
              <input
                type="password"
                name='password'
                id='password'
                placeholder="Password"
                required
                value={user.password}
                onChange={handleInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-10"
              />
              {passwordError && (
                <div className="mt-1 text-red-600 text-sm">
                  {passwordError}
                </div>
              )}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${passwordStrength}%`,
                      background: `linear-gradient(to right, #ff0000, #ffff00, #00ff00)`,
                      backgroundSize: '100% 100%',
                      backgroundPosition: `-${100 - passwordStrength}% 0`
                    }}
                  ></div>
                </div>
                <div className={`mt-1 text-sm ${
                  passwordStrength <= 40 ? 'text-red-600' :
                  passwordStrength <= 80 ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {passwordStrength <= 20 ? 'Weak' :
                   passwordStrength <= 40 ? 'Weak' :
                   passwordStrength <= 60 ? 'Good' :
                   passwordStrength <= 80 ? 'Good' : 'Strong'}
                </div>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='w-full py-2 px-4 bg-black text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer'>
                Register Now
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;