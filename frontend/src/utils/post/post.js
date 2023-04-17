import axios from 'axios';
import { getError } from '../error/error';

export const createPost = async (
  type,
  postBackground,
  text,
  images,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      {
        type,
        postBackground,
        text,
        images,
        user,
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
