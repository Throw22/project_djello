import React from 'react';

const Select = ({ options, onChangeBoard }) => {
  const optionElements = options.map(option => (
    <option key={option.title} value={option.title}>
      {option.title}
    </option>
  ));

  return (
    <select onChange={onChangeBoard} className="form-control">
      {optionElements}
    </select>
  );
};

export default Select;
