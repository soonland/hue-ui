import React, { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import langFr from '../../constants/fr.json';
import langEn from '../../constants/en.json';
import { getLang } from '../../store/slices/headerSlice';

const messages = {
  fr: langFr,
  en: langEn,
};

const LanguageProvider = (props) => {
  const activeLanguage = useSelector(getLang);
  return useMemo(
    () => (
      <IntlProvider locale={activeLanguage} messages={messages[activeLanguage]}>
        {props.children}
      </IntlProvider>
    ),
    [activeLanguage]
  );
};

export default LanguageProvider;
