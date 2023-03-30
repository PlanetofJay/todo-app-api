import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import uuid from 'react-uuid/uuid';
import './styles.scss';
import * as restAPI from '../../restapi';
import Spinner from "../Spinner";

export default function Form({ onAddTask }) {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Validate the user input.
    if (description === '') {
      setErrorMessage('Enter a description.');
    }
    else {
      setIsSaving(true);

      // New task.
      const newTask = {
        id: uuid(),
        description: description,
        done: status === 'completed'
      }
      
      const result = await restAPI.add(newTask);
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

      setIsSaving(false);
    }
  }

  return (
    <>
      <Spinner show={isSaving} text='Saving...' />
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
    </>
  );
}
