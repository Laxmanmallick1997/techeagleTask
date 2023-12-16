import React, { useState, useEffect } from 'react';
import './App.css'; // Import global CSS for general styles
import Navbar from './components/Navbar';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerDashboard';

function App() {
  const [signedUpUsers, setSignedUpUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Load user data from localStorage on initial load
  useEffect(() => {
    const users = localStorage.getItem('signedUpUsers');
    if (users) {
      setSignedUpUsers(JSON.parse(users));
    }
  }, []);

  // Save user data to localStorage whenever signedUpUsers state changes
  useEffect(() => {
    localStorage.setItem('signedUpUsers', JSON.stringify(signedUpUsers));
  }, [signedUpUsers]);

  const handleSignUp = (userData) => {
    setSignedUpUsers([...signedUpUsers, userData]);
    setShowSignUp(false);
  };

  const handleLogin = (userData) => {
    const foundUser = signedUpUsers.find(
      (user) => user.email === userData.email && user.password === userData.password
    );

    if (foundUser) {
      setLoggedInUser(foundUser);
      setShowLogin(false);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const showSignUpForm = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const showLoginForm = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="App">
      <Navbar />
      {!loggedInUser ? (
        <div>
          <button onClick={showSignUpForm}>Sign Up</button>
          <button onClick={showLoginForm}>Login</button>
          {showSignUp && <SignUpForm onSignUp={handleSignUp} />}
          {showLogin && <Login onLogin={handleLogin} />}
        </div>
      ) : (
        <CustomerDashboard user={loggedInUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
