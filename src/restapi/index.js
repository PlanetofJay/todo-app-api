import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    authorization: 'basic ' // Set yours
  }
});

export async function read() {
  try {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts'; // Set yours
    const response = await axios.get(endpoint);
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
    const endpoint = 'https://jsonplaceholder.typicode.com/posts'; // Set yours
    const response = await axiosInstance.post(endpoint, data);
    return {
      success: true
    };
  }
  catch (error) {
    return writeError(error);
  }
}

function writeError(error) {
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