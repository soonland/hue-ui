import React from 'react';
import { Field } from 'formik';

function RadioGroupButton({ options, name, ...rest }) {
  return (
    <div role="group">
      {options.map((el, i) => {
        const k = `${i}k`;
        const { text, value } = el;
        return (
          <label key={k}>
            <Field type="checkbox" name={name} value={value} />{text}
          </label>
        );
      })}
    </div>
  );
}

export default RadioGroupButton;
