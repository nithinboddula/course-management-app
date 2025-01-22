import { useState, useEffect, useCallback } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditCourseModal from "../EditCourseModal";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const CourseModal = ({ show, onHide, course }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{course.courseName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Instructor: {course.instructorName}</h5>
        <p>{course.description}</p>
        <p>Price: {course.price}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Home = () => {
  const [data, setData] = useState(null);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [createBtn, setCreateBtn] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  let url = "http://localhost:5000";

  const handleShowModal = (course) => {
    // console.log(course);
    setCourseToEdit(course);
    setShowModal(true);
  };

  const handleShowViewModal = (course) => {
    setSelectedCourse(course);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCourseToEdit(null);
    setCreateBtn(false);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedCourse(null);
    setCourseToEdit(null);
  };

  const fetchData = useCallback(async () => {
    try {
      const url = "http://localhost:5000";
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/routes/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onUpdate = async (updatedCourse) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${url}/api/routes/course/${updatedCourse.courseId}`,
        updatedCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        fetchData();
        alert("Course updated successfully!");

        setShowModal(false);
      } else {
        console.error("Error updating course:", response.status);
        alert(response.message);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert(error.message);
    }
  };

  // Function to delete course
  const handleDelete = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${url}/api/routes/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchData();
        alert("Course deleted successfully!");
      } else {
        alert("Error deleting course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  const handleCreate = () => {
    setCreateBtn(true);
    setShowModal(true);
  };

  //Function to create course
  const onCreate = async (newCourse) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        `${url}/api/routes/createCourse`,
        newCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        fetchData();
        alert("New course created successfully!");

        setShowModal(false);
        setCreateBtn(false);
      } else {
        console.error("Error updating course:", response.status);
        setCreateBtn(false);
        alert(response.message);
      }
    } catch (error) {
      setCreateBtn(false);
      console.error("Error updating course:", error);
      alert(error.response.data.message);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <h1 className="heading">Courses</h1>
      <Button onClick={handleCreate} className="create-btn">
        Create Course
      </Button>
      <table>
        <thead>
          <tr>
            <th className="course-id">Id</th>
            <th className="course-name">Course Name</th>
            <th className="description">Description</th>
            <th className="instructor-name">Instructor Name</th>
            <th className="price">Price</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course) => (
            <tr key={course._id}>
              <td>{course.courseId} </td>
              <td>{course.courseName}</td>
              <td>{course.description}</td>
              <td>{course.instructorName}</td>
              <td>{course.price}</td>
              <td>
                <span className="pen">
                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => handleShowModal(course)}
                  />
                </span>
                <span className="delete">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(course.courseId)}
                  />
                </span>
                <button
                  className="view"
                  onClick={() => handleShowViewModal(course)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditCourseModal
        show={showModal}
        onClose={handleCloseModal}
        data={courseToEdit}
        onUpdate={onUpdate}
        onCreate={onCreate}
        createBtn={createBtn}
      />
      {selectedCourse && (
        <CourseModal
          show={showViewModal}
          onHide={handleCloseViewModal}
          course={selectedCourse}
        />
      )}
    </div>
  );
};
export default Home;
