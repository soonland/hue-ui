import React from 'react';
import { FormattedMessage } from 'react-intl';
import 'components/common/common.css';

const InputField = ({ labelId, labelText, disabled, value, onChange, error = {} }) => {
  let css = 'inputField input-icons';
  if (error[labelId]) css += ' error';
  if (labelText)
    return (
      <div className={css}>
        <label htmlFor={labelId}>
          <span>
            <FormattedMessage id={labelText} />
          </span>
          {/* <FontAwesomeIcon icon={faUser} /> */}
          <input type="text" name={labelId} id={labelId} value={value} onChange={onChange} disabled={disabled} />
        </label>
      </div>
    );
  return (
    <div className={css}>
      {/* <FontAwesomeIcon icon={faUser} /> */}
      <input type="text" name={labelId} id={labelId} value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
};

export default InputField;
