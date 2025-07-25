import { useState, useEffect } from 'react';
import { getTasks } from '../lib/firebase';
import TaskItem from './TaskItem';

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getTasks((tasks) => {
      setTasks(tasks);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onEdit={onEdit} />
        ))
      ) : (
        <p>No tasks yet. Add one!</p>
      )}
    </div>
  );
};

export default TaskList;