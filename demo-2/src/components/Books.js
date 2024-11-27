import axios from "axios";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik } from "formik";
import * as Yup from 'yup';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

// const id = uuidv4();
// console.log(id, "id")

function Books() {
  const [booksList, setBooksList] = useState([]);
  const initBooksList = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books");
      setBooksList(res.data);
    } catch (error) {
      console.log(error, "get books api error");
    }
  };

  useEffect(() => {
    initBooksList();
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [show, setShow] = useState(false);
  const [book, setBook] = useState({
    title: "",
    quantity: "",
  });
  const [deleteBId, setDeleteId] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleClose1 = () => setShowDeleteModal(false);
  const handleOpen1 = () => setShowDeleteModal(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onChangeValue(e) {
    const { id, value } = e.target;
    setBook((prevState) => ({ ...prevState, [id]: value }));
  }

  function onCreateBook() {
    handleShow();
    setIsUpdateMode(false);
  }

  function upDateBook(editBook) {
    console.log(editBook, "editBook");
    setIsUpdateMode(true);
    handleShow();
    setBook(editBook);
  }

  async function onSubmit() {
    if (!isUpdateMode) {
      //create new book
      try {
        const data = {...book, id: uuidv4()}
        const res = await axios.post("http://localhost:3000/books", data)
        console.log(res, "res create book api")
        initBooksList();
        setBook({
          title: "",
          quantity: "",
        })
      } catch (error) {
        console.log(error, "create book api error")        
      }
      
    } else {
      try {
        console.log(book)
        const data = book
        const res = await axios.put(`http://localhost:3000/books/${book.id}`, data)
        console.log(res, "edit book api");
        initBooksList();
        setBook({
          title: "",
          quantity: "",
        })
      } catch (error) {
        console.log(error, "edit book api error")
      }
    }
    handleClose();
  }

  async function deleteS() {
    try {
      const res = await axios.delete(`http://localhost:3000/books/${deleteBId}`);
      console.log(res, "delete book api res");
      initBooksList();
      handleClose1();
    } catch (error) {
      console.log(error, "delete book api error")
    }
    
  }

  function deleteBook(id) {
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
                <h2 className="page-title">Books List</h2>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <Button variant="primary" onClick={onCreateBook}>
                  Add Book
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booksList.map((book, index) => (
                      <tr key={index}>
                        <td></td>
                        <td>{book.title}</td>
                        <td>{book.quantity}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => upDateBook(book)}
                          >
                            Update Books
                          </Button>
                          <span>
                            <Button
                              variant="danger"
                              onClick={() => deleteBook(book.id)}
                            >
                              Delete book
                            </Button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isUpdateMode ? "Update Book" : "Add Book"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={book.title}
                  onChange={onChangeValue}
                  type="text"
                  placeholder="enter title"
                  autoFocus
                  id="title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  value={book.quantity}
                  onChange={onChangeValue}
                  type="text"
                  placeholder="enter quantity"
                  id="quantity"
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

export default Books;
