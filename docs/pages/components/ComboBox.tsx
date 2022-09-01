import { filter } from 'lodash';
import React, { useState, useEffect, KeyboardEvent, ChangeEvent, useMemo } from 'react';
import countries from './countries';

export default function ComboBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [activeOption, setActiveOption] = useState(-1);

  useEffect(() => {
    if (searchTerm && !showList) {
      setShowList(true);
    }
    if (!searchTerm && showList) setShowList(false);
  }, [searchTerm]);
  useEffect(() => {
    filterCountries();
  }, [inputValue]);

  useEffect(() => {
    console.log('option', activeOption);
    activeOption >= 0 && setSearchTerm(countries[activeOption].label);
  }, [activeOption]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onchnage');
    const { value } = e.target;
    setSearchTerm(value);
    setInputValue(value);
  };
  const filterCountries = () => {
    // todo: filterCountries by searchTerm
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log('keyup', e.key);
    const { key } = e;
    if (isPrintableCharacter(key)) {
      return;
    }
    switch (key) {
      case 'Esc':
      case 'Escape':
        showList && setShowList(false);
        break;
      case 'Enter':
        searchTerm && submit();
        break;
      case 'Down':
      case 'ArrowDown':
        activateOption('down');
        break;
      case 'Up':
      case 'ArrowUp':
        activateOption('up');
        break;
    }
    // todo
  };
  const isPrintableCharacter = (str: string) => {
    return str.length === 1 && str.match(/\S| /);
  };
  // todo: type
  const activateOption = (direction: string) => {
    console.log('direction', direction);
    console.log('activeOption', activeOption);
    activeOption < 0 && setShowList(false);
    if (direction == 'up' && activeOption > 0) {
      setActiveOption(activeOption - 1);
    } else {
      setActiveOption(activeOption + 1);
    }
  };
  const submit = () => {
    console.log('do some action with ', searchTerm);
  };

  // todo: decalre option type
  const Option = (props: any) => {
    const { option, className, onClick } = props;
    return (
      <li className={`option ${className}`} onClick={onClick}>
        {option.label}
      </li>
    );
  };
  const Options = useMemo(() => {
    // countries.reduce((filteredCountries: any, country: any, i: number) => {
    //   filteredCountries.push(<Option key={country.code + i} />);
    //   return filterCountries;
    // },[]);

    const filteredCountries = countries.reduce((filtered: any, country, i) => {
      if (country.label.toLowerCase().includes(searchTerm)) {
        filtered.push(<Option option={country} key={country.code + i} />);
      }
      return filtered;
    }, []);
    console.log(filteredCountries);
    return filteredCountries;
  }, [inputValue]);
  return (
    <div className="ComboBox">
      <input
        className="search-input"
        onChange={handleInputChange}
        value={searchTerm}
        onKeyUp={handleKeyUp}
      ></input>
      {showList && (
        <div className="list">
          <ul>
            {Options}
            {/* todo : type
            {countries.map((country: any, i) => (
              <Option
                option={country}
                key={country.code + i}
                className={`${activeOption === i ? 'active' : ''}`}
                onClick={() => {
                  setSearchTerm(country.label);
                  submit();
                }}
              />
            ))} */}
          </ul>
        </div>
      )}
    </div>
  );
}
