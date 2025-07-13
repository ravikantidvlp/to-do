import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;
function App() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    getalltask()
    console.log('test')
  }, [])

  const getalltask = () => {
    axios.get(`${apiUrl}` + 'tasks')
      .then(response => setTasks(response.data))
      .catch(err => setError(err.message))
  }
  const addtask = () => {
    const newTask = {
      title: newTitle,
      description: newDescription,
      status: 'pending'
    };

    axios.post(`${apiUrl}task`, newTask)
      .then(response => {
        if (response.status === 201) {
          getalltask();
          setNewTitle('');
          setNewDescription('');
        }
      })
      .catch(err => setError(err));
  };

  const deletetask = (task_id) => {
    axios.delete(`${apiUrl}task/${task_id}`)
      .then(response => getalltask())
      .catch(err => setError(err));
  }
  const startEditing = (task) => {
    console.log(task)
    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };
  const cancelEdit = () => {
    setEditTaskId(null);
    setTitle('');
    setDescription('');
    setStatus('pending');
  };
  const UpdateTask = (task_id) => {
    const updatedTask = {
      title,
      description,
      status,
    };

    axios.put(`${apiUrl}task/${task_id}`, updatedTask)
      .then(() => {
        getalltask();
        cancelEdit();
      })
      .catch(err => setError(err));
  };
  const formattedtime = (date) => {
    let formatteddate = new Date(date).toLocaleString();
    return formatteddate
  }
  return (
    <section className="vh-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <div className="card mask-custom">
              <div className="card-body p-4 text-white">

                <div className="text-center pt-3 pb-2">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                    alt="Check" width="60" />
                  <h2 className="my-4">Task List</h2>
                </div>

                <form className="d-flex justify-content-center align-items-center mb-4">
                  <div data-mdb-input-init className="form-outline me-2">
                    <input
                      type="text"
                      id="titleInput"
                      className="form-control"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <label className="form-label" htmlFor="titleInput">Title</label>
                  </div>

                  <div data-mdb-input-init className="form-outline me-2 desc">
                    <input
                      type="text"
                      id="descInput"
                      className="form-control"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <label className="form-label desc" htmlFor="descInput">Description</label>
                  </div>

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-info ms-2"
                    onClick={addtask}
                  >
                    Add
                  </button>
                </form>
                <table className="table text-white mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map(t => (
                      <tr className="fw-normal" key={t.id}>
                        <th>
                          {editTaskId === t.id ? (
                            <input
                              type="text"
                              className="form-control inline"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          ) : (
                            <span className="ms-2">{t.title}</span>
                          )}
                        </th>

                        <td className="align-middle">
                          {editTaskId === t.id ? (
                            <input
                              type="text"
                              className="form-control inline"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          ) : (
                            <span>{t.description}</span>
                          )}
                        </td>

                        <td className="align-middle">
                          {editTaskId === t.id ? (
                            <select
                              className="form-select"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                            </select>
                          ) : (
                            <h6 className="mb-0">
                              <span className={`badge ${t.status === 'completed' ? 'bg-success' : 'bg-danger'}`}>
                                {t.status}
                              </span>
                            </h6>
                          )}
                        </td>

                        <td className="align-middle">
                          <h6 className="mb-0">{formattedtime(t.created_at)}</h6>
                        </td>

                        <td className="align-middle">
                          {editTaskId === t.id ? (
                            <>
                              <a onClick={() => UpdateTask(t.id)} style={{ cursor: 'pointer' }} title="Save">
                                <i className="fas fa-check fa-lg text-success me-3"></i>
                              </a>
                              <a onClick={cancelEdit} style={{ cursor: 'pointer' }} title="Cancel">
                                <i className="fas fa-times fa-lg text-danger"></i>
                              </a>
                            </>
                          ) : (
                            <>
                              <a onClick={() => startEditing(t)} style={{ cursor: 'pointer' }} title="Edit">
                                <i className="fas fa-pencil fa-lg text-primary me-3"></i>
                              </a>
                              <a onClick={() => deletetask(t.id)} style={{ cursor: 'pointer' }} title="Delete">
                                <i className="fas fa-trash-alt fa-lg text-warning"></i>
                              </a>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
