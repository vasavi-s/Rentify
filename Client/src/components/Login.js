// // // src/components/Login.js

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleLogin = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:3001/users/login', { email, password });
// //       localStorage.setItem('token', response.data.token);
// //       navigate('/properties');
// //     } catch (error) {
// //       console.error(error.response.data);
// //     }
// //   };

// //   return (
// //     <div>
// //       <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
// //       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
// //       <button onClick={handleLogin}>Login</button>
// //     </div>
// //   );
// // };

// // export default Login;

// // Login.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate} from 'react-router-dom';
// import Register from './Register'; // Import Register component
// import './Login.css'; // Import CSS file for styling

// const Login = () => {
//   const [showLogin, setShowLogin] = useState(false);

//   const handleToggleForm = (e) => {
//     e.preventdefault()
//     setShowLogin(!showLogin);
//   };

//   return (
//     <div className="form-container">
//       <h2 className="form-heading">{showLogin ? 'Login' : 'Register'}</h2>
//       {showLogin ? (
//         <LoginForm />
//       ) : (
//         <Register />
//       )}
//       <p className="form-link">
//         {showLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
//         <Link to="#" onClick={handleToggleForm}>{showLogin ? 'Register' : 'Login'}</Link>
//       </p>
//     </div>
//   );
// };

// // LoginForm component containing login form
// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/users/login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       navigate('/properties');
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <div>
//       <input type="email" className="form-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input type="password" className="form-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button className="form-button" onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      navigate('/properties');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Login</h2>
      <input type="email" className="form-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input type="password" className="form-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button className="form-button" onClick={handleLogin}>Login</button>
      <p className="form-link">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};
export default Login;
