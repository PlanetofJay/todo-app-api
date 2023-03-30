import axios from "axios";

/**
 * Set your authorization, baseURL and endpoint.
 */

const axiosInstance = axios.create({
  headers: {
    authorization: ''
  },
  timeout: 5000,
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export async function read() {
  try {
    const endpoint = '/posts';
    const response = await axiosInstance.get(endpoint);
    return {
      success: true,
      data: response.data
    };
  }
  catch (error) {
    return writeError(error);
  }
}

export async function add(data) {
  try {
    const endpoint = '/posts';
    await axiosInstance.post(endpoint, data);
    return {
      success: true
    };
  }
  catch (error) {
    return writeError(error);
  }
}

function writeError(error) {
  console.log('Error:', error);

  let message;
  const status = error.response?.status;
  switch (status) {
    case 401:
      message = 'It failed to authenticate your user. Please, check your credentials.';
      break;

    case 404:
      message = 'It was not possible to connect with the server. Please, contact the system administrator.';
      break;

    default: 
      message = 'There was an unexpected error. Please, try again later.';
  }

  return {
    success: false,
    error: message
  };
}