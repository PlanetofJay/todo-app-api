import Task from './Task';
import './styles.scss';
import { GrClearOption } from "react-icons/gr";

export default function Tasks({ tasks, onStatusChange, onTaskRemove, onClearTasks }) {
  return (
    <div className='tasks-component'>

      {/* Renders each task. */}
      {tasks.map(
        (task, index) => (
          <Task
            key={index}
            task={task}
            onStatusChange={onStatusChange}
            onTaskRemove={onTaskRemove}
          />
        )
      )}

      {/* Remove Button */}
      <button className='clear-tasks' onClick={onClearTasks}>
        <GrClearOption />Clear Tasks
        </button>
    </div>
  );
}
