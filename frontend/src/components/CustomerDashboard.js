import React from 'react';

const CustomerDashboard = ({ user }) => {
  return (
    <div>
      <h1>Welcome to Customer Dashboard, {user.name}!</h1>
      {/* Add other components for the dashboard */}
    </div>
  );
};

export default CustomerDashboard;
