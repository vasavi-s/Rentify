

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PropertyList from './components/PropertyList';
import Register from './components/Register';
import PostProperty from './components/PostProperty'; // Import PostProperty component


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/post-property" element={<PostProperty />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;


