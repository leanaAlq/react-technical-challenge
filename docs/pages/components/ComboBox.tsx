import React, { useState, useEffect, KeyboardEvent, ChangeEvent, useMemo } from 'react';
import countries from './countries';

export default function ComboBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [activeOption, setActiveOption] = useState(-1);
  const filteredCountries = useMemo(() => {
    return [...countries].filter((country: Country) =>
      country.label.toLowerCase().includes(inputValue),
    );
  }, [inputValue]);
  useEffect(() => {
    if (searchTerm && !showList) {
      setShowList(true);
    }
    if (!searchTerm && showList) setShowList(false);
  }, [searchTerm, showList]);

  useEffect(() => {
    if (activeOption >= 0 && filteredCountries.length - 1 >= activeOption) {
      setSearchTerm(filteredCountries[activeOption].label);
    }
  }, [activeOption, filteredCountries]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setInputValue(e.target.value);
  };
  const submit = (val: string) => {
    setValue(val);
    setShowList(false);
  };
  const isPrintableCharacter = (str: string) => {
    return str.length === 1 && str.match(/\S| /);
  };
  const activateOption = (direction: string) => {
    if (activeOption < 0) setShowList(false);
    if (direction === 'up' && activeOption > 0) {
      setActiveOption(activeOption - 1);
    } else {
      setActiveOption(activeOption + 1 < filteredCountries.length - 1 ? activeOption + 1 : 0);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault();
    // e.stopPropagation();
    const { key } = e;
    if (isPrintableCharacter(key)) {
      return;
    }
    switch (key) {
      case 'Esc':
      case 'Escape':
        if (showList) setShowList(false);
        break;
      case 'Enter':
        if (searchTerm) submit(searchTerm);
        break;
      case 'Down':
      case 'ArrowDown':
        activateOption('down');

        break;
      case 'Up':
      case 'ArrowUp':
        activateOption('up');
        break;
      default:
        break;
    }
  };

  const onOptionClick = (val: string) => {
    setSearchTerm(val);
    submit(val);
  };

  const Option = (props: Option) => {
    const { option, className, onClick } = props;
    return (
      <li
        className={`option ${className}`}
        onClick={() => onClick(option.label)}
        onKeyDown={() => handleKeyDown}
        role="option"
        aria-selected={className.includes('active')}
      >
        {option.label}
      </li>
    );
  };

  const Options = () =>
    filteredCountries.map((country: Country, i) => (
      <Option
        option={country}
        key={country.code + i}
        onClick={onOptionClick}
        className={`${activeOption === i ? 'active' : ''}`}
      />
    ));
  return (
    <div className="ComboBox">
      <input
        className={`search-input ${showList ? 'list-active' : ''}`}
        onChange={handleInputChange}
        value={searchTerm}
        onKeyDown={handleKeyDown}
        placeholder={'Search'}
      />
      {showList && (
        <div className="list">
          <ul className="option-list">{Options()}</ul>
        </div>
      )}
      {value && (
        <div className="result">
          SearchResult is : <strong>{value}</strong>
        </div>
      )}
    </div>
  );
}
interface Country {
  code: string;
  label: string;
  phone: string;
}
interface Option {
  option: Country;
  onClick: any;
  className: string;
}
