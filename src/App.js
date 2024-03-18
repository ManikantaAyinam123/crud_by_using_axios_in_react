import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [studentsData, setStudentsData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    ListOfStudents();
  }, []);

  const ListOfStudents = () => {
    axios
      .get("http://localhost:3001/studenData")
      .then((response) => {
        // console.log("data", response.data);
        setStudentsData(response.data);
      })
      .catch((error) => {
        alert("url Error");
      });
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/studenData", formData)
      .then((response) => {
        // console.log("Student added successfully:", response.data);
        setShowAddForm(false);
        setFormData({ name: "" });
        ListOfStudents();
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        alert("Error adding student. Please try again.");
      });
  };

  const handleDelete = (studentId) => {
    axios
      .delete(`http://localhost:3001/studenData/${studentId}`)
      .then((response) => {
        // console.log("Student deleted successfully:", response.data);
        ListOfStudents();
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        alert("Error deleting student. Please try again.");
      });
  };

  const handleUpdate = (studentId, studentName) => {
    setShowUpdate(true);
    setFormData({ id: studentId, name: studentName });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/studenData/${formData.id}`, formData)
      .then((response) => {
        // console.log("Student updated successfully:", response.data);
        setShowUpdate(false);
        setFormData({ name: "" });
        ListOfStudents();
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        alert("Error updating student. Please try again.");
      });
  };

  return (
    <div className="container  justify-content-center mt-5 ">
      <div className="row row-cols-md-2  mt-5 mx-auto justify-content-center">
        <div className="col">
          <h2 className="justify-content-center d-flex">
            <b>Student's Data</b>
          </h2>
          <button
            type="button"
            className="btn btn-primary ms-auto d-flex "
            onClick={toggleAddForm}
          >
            ADD +
          </button>
          {showAddForm && (
            <div className="overlay">
              <div className="form-container">
                <form onSubmit={handleAdd}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          {showUpdate && (
            <div className="overlay">
              <div className="form-container">
                <form onSubmit={submitUpdate}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}

          <table className="table table-striped shadow mt-2">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleUpdate(student.id, student.name)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
