import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [worksArr, setWorksArr] = useState([]);
  const [work, setWork] = useState("");

  function changeWork(e) {
    setWork(e.target.value);
  }

  useEffect(() => {
    console.log(worksArr, "worksArr");
  }, [worksArr])

  function addWork() {
    console.log(work, "work");
    setWorksArr((prevState) => [...prevState, work]);
    setWork("");
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div>
        <input id="todo-input" value={work} type="text" onChange={changeWork} />
        <span>
          <button id="add-btn" onClick={addWork}>
            Add
          </button>
        </span>
      </div>
      <div>
        <table id="todo-list">
          <tbody>
            {worksArr.map((work, index) => (
              <tr key={index}>
                <td>{work}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
