import axios from "axios";

export async function read() {
  try {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';
    const response = await axios.get(endpoint);
    console.log('Response:', response);
  }
  catch (error) {
    console.log('Read Error:', error);
  }
}