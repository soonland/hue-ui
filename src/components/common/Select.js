import React from 'react';
import { FormattedMessage } from 'react-intl';

const Select = ({ value, onChange, name, options, disabled, labelId = '', labelText = '', field = 'name', error = {} }) => {
  let css = 'inputField';
  if (error[labelId]) css += ' error';
  if (labelText)
    return (
      <div className={css}>
        <label htmlFor={labelId}>
          <span>
            <FormattedMessage id={labelText} />
          </span>
          <select value={value} onChange={onChange} name={name} id={name} disabled={disabled}>
            <option value="">[Select a value]</option>
            {options.length > 0 &&
              options.map((d, i) => {
                const l = i;
                return (
                  <option key={l} value={d.id}>
                    {d[field]}
                  </option>
                );
              })}
          </select>
        </label>
      </div>
    );
  return (
    <div className={css}>
      <select value={value} onChange={onChange} name={name} id={name} disabled={disabled}>
        <option value="">[Select a value]</option>
        {options.length > 0 &&
          options.map((d, i) => {
            const l = i;
            return (
              <option key={l} value={d.id}>
                {d[field]}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
