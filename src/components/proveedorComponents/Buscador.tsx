'use client'

import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="field has-addons">
      <div className="control ">
        <input 
          type="text" 
          className="input " 
          placeholder="Buscar insumo" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="control">
        <button type="submit" className="button is-info">
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;