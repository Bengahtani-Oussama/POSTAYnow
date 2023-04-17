import './style.css';
import { ErrorMessage, useField } from 'formik';
export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className='inputWrapper'>
      {meta.touched && meta.error && !bottom && (
        <div className='errorWrapper'>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && <div className='topArrow'></div>}
        </div>
      )}

      <dir className='errorInput-Icon'>
        <input
          className={meta.touched && meta.error ? 'inputErrorBorder' : ''}
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && <i className='error_icon'></i>}
      </dir>
      {meta.touched && meta.error && bottom && (
        <div className='errorWrapper'>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && <div className='bottomArrow'></div>}
        </div>
      )}
    </div>
  );
}
