import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import countries from './countries';

export default function ComboBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      !showList && setShowList(true);
      filterCountries();
    }
  }, [searchTerm]);
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    console.log("onchnage", )
    const { value } = e.target;
    setSearchTerm(value);
  };
  const filterCountries = () => {
    // todo: filterCountries by searchTerm
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log("keydown",e.key)
    // todo
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log("keyup", e.key)
    // todo
  };
  // todo: decalre option type
  const Option = (option: any) => (
    <li className="option" >
      {option.label}
    </li>
  );
  return (
    <div className="ComboBox">
      <input
        className="search-input"
        onChange={handleInputChange}
        value={searchTerm}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      ></input>
      <div className="list">
        <ul>
          {countries.map((country) => (
            <Option option={country} />
          ))}
        </ul>
      </div>
    </div>
  );
}
