import React, { useState } from 'react';

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Sesión cerrada');
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}
    >
      {isLoggedIn ? 'Cerrar sesión' : 'Sesión cerrada'}
    </button>
  );
};

export default LogoutButton;