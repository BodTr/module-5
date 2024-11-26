import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const initStudents = [
  {
    id: "b27997d6-94c9-4a89-b40e-0f82f736a295",
    name: "Tran Van A",
    email: "tranvana@gmail.com",
    phoneNumber: 913456789,
  },
  {
    id: "7ab27c7a-50d0-46de-83e6-e8976d8532ee",
    name: "Nguyen Van B",
    email: "b@gmail.com",
    phoneNumber: 913453289,
  },
  {
    id: "989fd339-c4d3-471a-b270-105b4f8257f7",
    name: "Vu Thi C",
    email: "c@gmail.com",
    phoneNumber: 913456789,
  },
  {
    id: "97dff032-69be-44ce-b226-d2a549e02368",
    name: "Pham Manh D",
    email: "d@gmail.com",
    phoneNumber: 933456789,
  },
  {
    id: "b810a35a-5ebe-4ddf-ac3f-e8ef0d311316",
    name: "Nguyen Minh E",
    email: "e@gmail.com",
    phoneNumber: 913452289,
  },
];

// const id = uuidv4();
// console.log(id, "id")

function StudentsList() {


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [deleteSId, setDeleteId] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  useEffect(() => {
    console.log(student, "student");
  }, [student])
  const handleClose1 = () => setShowDeleteModal(false);
  const handleOpen1 = () => setShowDeleteModal(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [studentsList, setStudentsList] = useState(initStudents);

  function onChangeValue(e) {
    const { id, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [id]: value }));
  }

  function onCreateStudent() {
    handleShow();
    setIsUpdateMode(false);
  }

  function upDateStudent(editStudent) {
    console.log(editStudent, "editStudent");
    setIsUpdateMode(true);
    handleShow();
    setStudent(editStudent);

  }

  function onSubmit() {
    if (!isUpdateMode) {
      //create new student
      setStudentsList([...studentsList, {...student, id: uuidv4()}]);
    } else {
      setStudentsList((prevState) => prevState.map((s) => 
        s.id === student.id ? student : s
      ))
    }
    handleClose();
  }

  function deleteS() {
    setStudentsList((prevState) => prevState.filter((s) => s.id !== deleteSId))
    handleClose1();
  }

  function deleteStudent(id) {
    handleOpen1();
    setDeleteId(id);
  }

  return (
    <div>
      <div className="page-wrapper">
        <div className="page-header d-print-none mb-3">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">Danh sách sinh viên</h2>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <Button variant="primary" onClick={onCreateStudent}>
                  Add Student
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsList.map((student, index) => (
                        <tr key={index}>
                          <td></td>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                          <td>{student.phoneNumber}</td>
                          <td>
                          <Button variant="info" onClick={() => upDateStudent(student)}>
                            Update Student
                          </Button>
                          <span><Button variant="danger" onClick={() => deleteStudent(student.id)}>Delete student</Button></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{isUpdateMode ? "Update Student" : "Add Student"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={student.name}
                  onChange={onChangeValue}
                  type="text"
                  placeholder="enter name"
                  autoFocus
                  id="name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={student.email}
                  onChange={onChangeValue}
                  type="email"
                  placeholder="name@example.com"
                  id="email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  value={student.phoneNumber}
                  onChange={onChangeValue}
                  type="number"
                  placeholder="enter phone number"
                  id="phoneNumber"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              {isUpdateMode ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={handleClose1}>

          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteS}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default StudentsList;
