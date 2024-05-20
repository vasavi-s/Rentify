import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import Login from './Login'; // Import Login component
import './Register.css'; // Import CSS file for styling


const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    isSeller: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3001/users/register', form);
      navigate('/login');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <input type="text" name="firstName" className="form-input" placeholder="First Name" value={form.firstName} onChange={handleChange} /><br/>
      <input type="text" name="lastName" className="form-input" placeholder="Last Name" value={form.lastName} onChange={handleChange} /><br/>
      <input type="email" name="email" className="form-input" placeholder="Email" value={form.email} onChange={handleChange} /><br/>
      <input type="text" name="phoneNumber" className="form-input" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} /><br/>
      <input type="password" name="password" className="form-input" placeholder="Password" value={form.password} onChange={handleChange} />
      <label><br/>
        <input type="checkbox" name="isSeller" checked={form.isSeller} onChange={e => setForm(prevState => ({ ...prevState, isSeller: e.target.checked }))} />
            Are you a seller?
      </label><br/>
      <button className="form-button" onClick={handleRegister}>Register</button>
      <p className="form-link">Don't have an account? <Link to="/login">Login</Link></p>

    </div>
  );
};

export default Register;
