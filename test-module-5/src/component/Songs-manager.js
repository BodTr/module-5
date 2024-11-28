import axios from "axios";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

// const id = uuidv4();
// console.log(id, "id")

function SongsManager() {
  const [playSong, setPlaySong] = useState({
    name: "Playing Song",
    singer: "Singer"
  })
  const [songsList, setSongsList] = useState([]);
  const initSongsList = async () => {
    try {
      const res = await axios.get("http://localhost:3000/songs");
      setSongsList(res.data);
    } catch (error) {
      console.log(error, "get songs api error");
    }
  };

  useEffect(() => {
    initSongsList();
  }, []);

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [show, setShow] = useState(false);
  const [song, setSong] = useState({
    name: "",
    singer: "",
    composer: "",
    duration: "",
    like: "",
  });
  //   const [publishId, setPublishId] = useState("");

  const handleClose1 = () => setShowPublishModal(false);
  const handleOpen1 = () => setShowPublishModal(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onChangeValue(e) {
    const { id, value } = e.target;
    setSong((prevState) => ({ ...prevState, [id]: value }));
  }

  function onCreateSong() {
    handleShow();
  }

  async function onSubmit() {
    //create new song
    try {
      const data = { ...song, id: uuidv4(), status: "Lưu trữ" };
      const res = await axios.post("http://localhost:3000/songs", data);
      console.log(res, "res create song api");
    } catch (error) {
      console.log(error, "create song api error");
    } finally {
      initSongsList();
      setSong({
        name: "",
        singer: "",
        composer: "",
        duration: "",
        like: "",
      });
      handleClose();
    }
  }



  function publishSong(songSet) {
    setSong(songSet);
    console.log("publish song: " + songSet);
    handleOpen1();
  }

  async function publishSongNow() {
    try {
      const res = await axios.patch(`http://localhost:3000/songs/${song.id}`, {
        status: "Công khai",
      });
      console.log(res, "res");
    } catch (error) {
      console.log(error, "patch api error");
    } finally {
      initSongsList();
      handleClose1();
    }
  }

  function playingSong(clickSong) {
    setPlaySong({
        name: clickSong.name,
        singer: clickSong.singer
    })
  }

  return (
    <div>
      <div className="page-wrapper">
        <div className="page-header d-print-none mb-3">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">
                    <p>{playSong.name}</p>
                    <p style={{ fontSize: "15px" }}>{playSong.singer}</p>
                </h2>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <Button variant="primary" onClick={onCreateSong}>
                  Đăng ký bài hát
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="page-header d-print-none mb-3">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title"><Button variant="success">Phát nhạc</Button></h2>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Nhập tên bài hát"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    Tìm kiếm
                  </Button>
                </InputGroup>
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
                      <th>STT</th>
                      <th>Tên bài hát</th>
                      <th>Ca Sĩ</th>
                      <th>Thời gian phát nhạc</th>
                      <th>Số lượt yêu thích</th>
                      <th>Trạng thái</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {songsList.map((song, index) => (
                      <tr key={index} onClick={() => {playingSong(song)}} style={{cursor: "pointer"}}>
                        <td>{index + 1}</td>
                        <td>{song.name}</td>
                        <td>{song.singer}</td>
                        <td>{song.duration}</td>
                        <td>{song.like}</td>
                        <td>{song.status}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => publishSong(song)}
                          >
                            Công khai
                          </Button>
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
            <Modal.Title>Đăng ký bài hát</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên bài hát</Form.Label>
                <Form.Control
                  value={song.name}
                  onChange={onChangeValue}
                  type="text"
                  placeholder="nhập tên bài hát"
                  autoFocus
                  id="name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ca sĩ</Form.Label>
                <Form.Control
                  value={song.singer}
                  onChange={onChangeValue}
                  type="text"
                  placeholder="Nhập tên ca sĩ"
                  id="singer"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nhạc sĩ</Form.Label>
                <Form.Control
                  value={song.composer}
                  onChange={onChangeValue}
                  type="text"
                  placeholder="Nhập tên nhạc sĩ"
                  id="composer"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Thời gian phát</Form.Label>
                <Form.Control
                  value={song.duration}
                  onChange={onChangeValue}
                  type="text"
                  placeholder="hh:mm"
                  id="duration"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số lượt yêu thích</Form.Label>
                <Form.Control
                  value={song.like}
                  onChange={onChangeValue}
                  type="number"
                  placeholder="Nhập số lượt yêu thích"
                  id="like"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Đăng ký
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showPublishModal} onHide={handleClose1}>
          <Modal.Body>Bạn có muốn công khai bài hát "{song.name}"?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Không
            </Button>
            <Button variant="danger" onClick={publishSongNow}>
              Có
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default SongsManager;
