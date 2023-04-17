import './style.css';
import { ErrorMessage, useField } from 'formik';
import { useMediaQuery } from 'react-responsive';
export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);

  const view1 = useMediaQuery({
    query: '(min-width: 320px)',
  });
  const view2 = useMediaQuery({
    query: '(min-width: 481px)',
  });
  const view3 = useMediaQuery({
    query: '(min-width: 641px)',
  });

  const test1 = view3 && field.name === 'firstName';
  const test2 = view2 && field.name === 'firstName';
  const test3 = view1 && field.name === 'firstName';
  const test4 = view3 && field.name === 'lastName';
  const test5 = view2 && field.name === 'lastName';
  const test6 = view1 && field.name === 'lastName';
  return (
    <div className='inputWrapper inputRegisterWrapper'>
      <div className='inputRegisterIcon'>
        <input
          className={meta.touched && meta.error ? 'inputErrorBorder' : ''}
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && <i className='error_icon'></i>}
      </div>
      {meta.touched && meta.error && (
        <div
          className={
            field.name === 'firstName'
              ? `firstNameError`
              : field.name === 'lastName'
              ? 'lastNameError'
              : 'errorWrapper'
          }
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                test1 || test2 || test3
                  ? 'error_arrow_left'
                  : test4 || test5 || test6
                  ? 'error_arrow_right'
                  : 'bottomArrow'
              }
            ></div>
          )}
        </div>
      )}
    </div>
  );
}
