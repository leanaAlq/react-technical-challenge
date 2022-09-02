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
    if (activeOption >= 0 && filteredCountries.length - 1 >= activeOption) {
      setSearchTerm(filteredCountries[activeOption].label);
    }
  }, [activeOption]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    setInputValue(value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault();
    // e.stopPropagation();
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
        searchTerm && submit(searchTerm);
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
        return;
    }
  };
  const isPrintableCharacter = (str: string) => {
    return str.length === 1 && str.match(/\S| /);
  };
  const activateOption = (direction: string) => {
    activeOption < 0 && setShowList(false);
    if (direction == 'up' && activeOption > 0) {
      setActiveOption(activeOption - 1);
    } else {
      setActiveOption(activeOption + 1 < filteredCountries.length - 1 ? activeOption + 1 : 0);
    }
  };
  const submit = (val: string) => {};
  const onOptionClick = (val: string) => {
    setSearchTerm(val);
    submit(val);
  };

  const Option = (props: Option) => {
    const { option, className, onClick } = props;
    return (
      <li className={`option ${className}`} onClick={() => onClick(option.label)}>
        {option.label}
      </li>
    );
  };
  const filteredCountries = useMemo(() => {
    return [...countries].filter((country: Country) =>
      country.label.toLowerCase().includes(inputValue),
    );
  }, [inputValue]);
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
        className={`search-input ${showList ? 'result' : ''}`}
        onChange={handleInputChange}
        value={searchTerm}
        onKeyDown={handleKeyUp}
        placeholder={'Search'}
      ></input>
      {showList && (
        <div className="list">
          <ul>{Options()}</ul>
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
