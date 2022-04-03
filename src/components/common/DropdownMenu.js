import React from 'react';

function DropdownMenu({ options, ...rest }) {
  return (
    <select {...rest}>
      {options.map((el, i) => {
        const k = `${i}k`;
        const { text, ...opt } = el;
        return (
          <option key={k} {...opt}>
            {text}
          </option>
        );
      })}
    </select>
  );
}

export default DropdownMenu;
