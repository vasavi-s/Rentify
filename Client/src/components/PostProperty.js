// import React, { useState } from 'react';
// import axios from 'axios';
// // import './PostProperty.css';

// function PostProperty() {
//   const [form, setForm] = useState({
//     place: '',
//     area: '',
//     bedrooms: '',
//     bathrooms: '',
//     nearbyHospitals: '',
//     nearbyColleges: ''
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/properties', form, { headers: { Authorization: `Bearer ${token}` } });
//       alert('Property posted successfully');
//       // Clear form fields after successful submission
//       setForm({
//         place: '',
//         area: '',
//         bedrooms: '',
//         bathrooms: '',
//         nearbyHospitals: '',
//         nearbyColleges: ''
//       });
//     } catch (error) {
//       alert('Failed to post property');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="place" placeholder="Place" value={form.place} onChange={handleChange} />
//       <input type="number" name="area" placeholder="Area" value={form.area} onChange={handleChange} />
//       <input type="number" name="bedrooms" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} />
//       <input type="number" name="bathrooms" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} />
//       <input type="number" name="nearbyHospitals" placeholder="Nearby Hospitals" value={form.nearbyHospitals} onChange={handleChange} />
//       <input type="number" name="nearbyColleges" placeholder="Nearby Colleges" value={form.nearbyColleges} onChange={handleChange} />
//       <button type="submit">Post Property</button>
//     </form>
//   );
// }

// export default PostProperty;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostProperty() {
  const navigate= useNavigate();
  const [form, setForm] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearbyHospitals: '',
    nearbyColleges: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect to login page after logout
    navigate('/login');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }
      await axios.post('https://rentify-server-z0rv.onrender.com/properties', form
      ,  { headers: { Authorization: `Bearer ${token}` } }
    );
      alert('Property posted successfully');
      setForm({
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearbyHospitals: '',
        nearbyColleges: ''
      });
    } catch (error) {
      console.error('Error posting property:', error.response ? error.response.data : error.message);
      const errorMessage = error.response ? error.response.data.error : error.message;
      alert(errorMessage || 'Failed to post property. Please try again.');
    }
  };
  
  

  return (

    <form onSubmit={handleSubmit}>
      <button onClick={handleLogout}>Logout</button>
      <input type="text" name="place" placeholder="Place" value={form.place} onChange={handleChange} required />
      <input type="number" name="area" placeholder="Area" value={form.area} onChange={handleChange} required />
      <input type="number" name="bedrooms" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} required />
      <input type="number" name="bathrooms" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} required />
      <input type="number" name="nearbyHospitals" placeholder="Nearby Hospitals" value={form.nearbyHospitals} onChange={handleChange} required />
      <input type="number" name="nearbyColleges" placeholder="Nearby Colleges" value={form.nearbyColleges} onChange={handleChange} required />
      <button type="submit">Post Property</button>

    </form>
  );
}

export default PostProperty;
