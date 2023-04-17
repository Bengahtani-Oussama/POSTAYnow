import axios from 'axios';
import { getError } from '../error/error';

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'multipart/form-data',
        },
      }
    );
    return data;
  } catch (err) {
    return getError(err);
  }
};
