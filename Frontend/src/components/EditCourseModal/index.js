import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./index.css";

const EditCourseModal = ({
  show,
  onClose,
  data,
  onUpdate,
  onCreate,
  createBtn,
}) => {
  // console.log(data);

  const [newCourseId, setNewCourseId] = useState(data?.courseId || "");

  const [updatedCourseName, setUpdatedCourseName] = useState(
    data?.courseName || ""
  );
  const [updatedDescription, setUpdatedDescription] = useState(
    data?.description || ""
  );
  const [updatedInstructorName, setUpdatedInstructorName] = useState(
    data?.instructorName || ""
  );
  const [updatedPrice, setUpdatedPrice] = useState(data?.price || "");

  useEffect(() => {
    if (createBtn) {
      setNewCourseId("");
      setUpdatedCourseName("");
      setUpdatedDescription("");
      setUpdatedInstructorName("");
      setUpdatedPrice("");
    } else if (data) {
      setNewCourseId(data.courseId || "");
      setUpdatedCourseName(data.courseName || "");
      setUpdatedDescription(data.description || "");
      setUpdatedInstructorName(data.instructorName || "");
      setUpdatedPrice(data.price || "");
    }
  }, [data, createBtn]);

  const handleCourseId = (e) => {
    setNewCourseId(e.target.value);
  };

  // Handle course name input change
  const handleCourseName = (e) => {
    setUpdatedCourseName(e.target.value);
  };

  // Handle description input change
  const handleDescription = (e) => {
    setUpdatedDescription(e.target.value);
  };

  // Handle instructor name input change
  const handleInstructorName = (e) => {
    setUpdatedInstructorName(e.target.value);
  };

  // Handle price input change
  const handlePrice = (e) => {
    setUpdatedPrice(e.target.value);
  };

  // Handle update button click
  const handleUpdate = () => {
    const updatedCourse = {
      courseId: data.courseId,
      courseName: updatedCourseName,
      description: updatedDescription,
      instructorName: updatedInstructorName,
      price: updatedPrice,
    };

    onUpdate(updatedCourse);

    onClose();
  };

  //Handle Create
  const handleCreate = () => {
    const newCourse = {
      courseId: newCourseId,
      courseName: updatedCourseName,
      description: updatedDescription,
      instructorName: updatedInstructorName,
      price: updatedPrice,
    };

    onCreate(newCourse);

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {createBtn ? "Create New Course" : "Edit Course Data"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <label htmlFor="id">Course Id</label>
          <input
            id="id"
            type="number"
            placeholder="Course Id"
            className="input"
            value={newCourseId}
            onChange={handleCourseId}
            readOnly={!createBtn}
          />
        </div>
        <div className="container">
          <label htmlFor="course-name">Course Name</label>
          <input
            id="course-name"
            type="text"
            onChange={handleCourseName}
            placeholder="Course Name"
            className="input"
            value={updatedCourseName}
          />
        </div>
        <div className="container">
          <label htmlFor="message">Description</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            cols="50"
            placeholder="Enter the Description"
            className="text-area"
            value={updatedDescription}
            onChange={handleDescription}
          ></textarea>
        </div>
        <div className="container">
          <label htmlFor="instructor-name">Instructor Name</label>
          <input
            id="instructor-name"
            type="text"
            onChange={handleInstructorName}
            placeholder="Instructor Name"
            className="input"
            value={updatedInstructorName}
          />
        </div>
        <div className="container">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            onChange={handlePrice}
            placeholder="Price"
            className="input"
            value={updatedPrice}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={createBtn ? handleCreate : handleUpdate}
        >
          {createBtn ? "Create" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCourseModal;
