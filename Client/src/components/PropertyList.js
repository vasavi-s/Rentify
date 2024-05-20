// // src/components/PropertyList.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './PropertyList.css'
// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/properties', {
//           headers: {
//             Authorization: localStorage.getItem('token')
//           }
//         });
//         setProperties(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const handleInterest = async (id) => {
//     try {
//       await axios.post(`http://localhost:3001/properties/${id}/interest`, {}, {
//         headers: {
//           Authorization: localStorage.getItem('token')
//         }
//       });
//       // Optionally, update the local state to reflect the new interest count
//       setProperties(prevProperties =>
//         prevProperties.map(property =>
//           property._id === id ? { ...property, interestCount: property.interestCount + 1 } : property
//         )
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Properties</h2>
//       {properties.map(property => (
//         <div key={property._id}>
//           <h3>{property.place}</h3>
//           <p>Bedrooms: {property.bedrooms}</p>
//           <p>Interest: {property.interestCount}</p>
//           <button onClick={() => handleInterest(property._id)}>I'm Interested</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PropertyList;

// src/components/PropertyList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate= useNavigate();

 
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect to login page after logout
    navigate('/login');
  };
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/properties', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  const handleInterest = async (id) => {
    try {
      await axios.post(`http://localhost:3001/properties/${id}/interest`, {}, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      // Optionally, update the local state to reflect the new interest count
      setProperties(prevProperties =>
        prevProperties.map(property =>
          property._id === id ? { ...property, interestCount: property.interestCount + 1 } : property
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
            <button onClick={handleLogout}>Logout</button>

      <h2>Properties</h2>
      {properties.map(property => (
        <div key={property._id}>
          <h3>{property.place}</h3>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Interest: {property.interestCount}</p>
          <button onClick={() => handleInterest(property._id)}>I'm Interested</button>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
