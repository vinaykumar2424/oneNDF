import './App.css';
import LandingPage from './components/jsFiles/LandingPage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/jsFiles/Home';
import RegistrationForm from './components/jsFiles/RegistrationForm/RegistrationForm';
import LoginForm from './components/jsFiles/RegistrationForm/LoginForm';
import { AuthContext } from './components/jsFiles/firebase/AuthContext';
import { useContext } from 'react';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <div className="App">
      <BrowserRouter>
        {/* <LandingPage /> */}
        <Routes>
          <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="register" element={<RegistrationForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
