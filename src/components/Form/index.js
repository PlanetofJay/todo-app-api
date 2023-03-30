import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import uuid from 'react-uuid/uuid';
import './styles.scss';
import * as restAPI from '../../restapi';

export default function Form({ onAddTask }) {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmission = (event) => {
    event.preventDefault();

    // Validate the user input.
    if (description === '') {
      setErrorMessage('Enter a description.');
    }
    else {

      // New task.
      const newTask = {
        id: uuid(),
        description: description,
        done: status === 'completed'
      }

      const result = restAPI.add(newTask);
      console.log('Result:', result);
      if (result.success) {
        // Add the task.
        onAddTask(newTask);

        // Reset the form state.
        setDescription('')
        setStatus(false);
        setErrorMessage('');
      }
      else {
        setErrorMessage(result.error);
      }
    }
  }

  return (
    <form className='form-component' onSubmit={handleFormSubmission}>
      <h1>New Task</h1>

      <div className='content'>
        {/* Conditional render of the error message */}
        {errorMessage !== '' && (
          <div className='error-message'>{errorMessage}</div>
        )}

        {/* Description Field */}
        <label>
          <span>Description:</span>
          <input
            type='text'
            maxLength={150}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        {/* Status Field */}
        <label>
          <span>Status:</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value='open'>Open</option>
            <option value='completed'>Completed</option>
          </select>
        </label>

        {/* Submission Button */}
        <button>
          <IoMdAddCircle /> Add
        </button>
      </div>
    </form>
  );
}
