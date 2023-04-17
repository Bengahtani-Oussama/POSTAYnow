import axios from 'axios';
import { getError } from '../error/error';

export const updateProfilePictureFunc = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return 'ok';
  } catch (err) {
    return getError(err);
  }
};

export const updateCoverPictureFunc = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateCoverPicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return 'ok';
  } catch (err) {
    return getError(err);
  }
};
//createPost process.env.REACT_APP_BACKEND_URL
