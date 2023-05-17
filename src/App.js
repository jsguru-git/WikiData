import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
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

  const data = [
    {id: 1, "item":"http://www.wikidata.org/entity/Q16734412","itemLabel":"A Girl at My Door"},
    {id: 2, "item":"http://www.wikidata.org/entity/Q17028317","itemLabel":"Rules Don't Apply"},
    {id: 3, "item":"http://www.wikidata.org/entity/Q17040489","itemLabel":"O Ornitólogo"}
  ]
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
        <p>The current time is {currentTime}.</p>
      </div>
    </div>
  );
}

export default App;
