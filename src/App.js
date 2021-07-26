import {useState, useEffect} from "react";
import Table from "./components/Table";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      .then(a => setData(a));
  }, []);
  return (

    <div className="App">
      <Table data={data}></Table>
    </div>
  );
}

export default App;
