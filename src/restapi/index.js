import axios from "axios";

export async function read() {
  try {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';
    const config = {
      headers: {
        authorization: 'basic '
      }
    };
    const response = await axios.get(endpoint, config);
    console.log('Response:', response);
    return {
      success: true,
      data: response.data
    };
  }
  catch (error) {
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
}

export function add(data) {
  console.log('Add', data);
}