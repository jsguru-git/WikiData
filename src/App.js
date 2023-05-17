import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/movies').then(res => res.json()).then(data => {
      setData(data.movieList);
    });
  }, []);
  const columns = [
    {
      name: 'item',
      selector: row => row.item,
    },
    {
      name: 'itemLabel',
      selector: row => row.itemLabel,
    },
  ];
  return (
    <div className="App">
      <div className='container'>
        <div className='title'>
          <h2>Movies released after 2013</h2>
        </div>
        <DataTable
          className='container'
          columns={columns}
          data={data}
          striped='true'
        />
      </div>
    </div>
  );
}

export default App;
