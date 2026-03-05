// src/components/SearchBar.tsx

import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center bg-white border p-2 rounded-md h-10">
      <label htmlFor="search"></label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className='mr-2'
      /> 
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.50326 7.50326H7.97659L7.78992 7.32326C8.44326 6.56326 8.83659 5.57659 8.83659 4.50326C8.83659 2.10992 6.89659 0.169922 4.50326 0.169922C2.10992 0.169922 0.169922 2.10992 0.169922 4.50326C0.169922 6.89659 2.10992 8.83659 4.50326 8.83659C5.57659 8.83659 6.56326 8.44326 7.32326 7.78992L7.50326 7.97659V8.50326L10.8366 11.8299L11.8299 10.8366L8.50326 7.50326ZM4.50326 7.50326C2.84326 7.50326 1.50326 6.16326 1.50326 4.50326C1.50326 2.84326 2.84326 1.50326 4.50326 1.50326C6.16326 1.50326 7.50326 2.84326 7.50326 4.50326C7.50326 6.16326 6.16326 7.50326 4.50326 7.50326Z" fill="#ADADAD"/>
</svg>

    </div>
  );
};

export default SearchBar;
