import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProductsAction, getProductBrands } from 'store/slices/productsSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { FormattedMessage } from 'react-intl';

const Filters = () => {
  const [resetFormik, setResetFormik] = useState(() => () => {});
  const dispatch = useDispatch();
  const brands = useSelector(getProductBrands);
  const location = useLocation();
  const sendDispatch = (search) => {
    dispatch(getProductsAction(search));
  };

  const onSearch = (values, { resetForm, setSubmitting }) => {
    setResetFormik(() => resetForm);
    setSubmitting(false);
    sendDispatch(values);
  };

  const initSearch = () => {
    useEffect(() => {
      resetFormik();
    }, [location]);
  };

  initSearch();

  return (
    <Formik
      initialValues={{ name: '' }}
      // validate={(values) => {
      //   const errors = {};
      // if (!values.email) {
      //   errors.email = 'Required';
      // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      //   errors.email = 'Invalid email address';
      // }
      //   return errors;
      // }}
      onSubmit={onSearch}
    >
      {({ isSubmitting /* , resetForm */, values }) => (
        <Form>
          <Field name="name" value={values.name} />
          <Field name="brand" as="select">
            <option value=" " label="Select a brand" />
            {brands &&
              brands.map((data, index) => {
                const k = `k${index}`;
                return (
                  <option key={k} value={data.brand}>
                    {data.brand}
                  </option>
                );
              })}
          </Field>
          <ErrorMessage name="name" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <button type="button" disabled={isSubmitting}>
            Clear
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
