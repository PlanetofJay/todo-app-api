import axios from "axios";

export async function read() {
  try {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';
    const response = await axios.get(endpoint);
    console.log('Response:', response);
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
    }
  }
}