// import logo from './logo.svg';
import DataTable from 'react-data-table-component';
import './App.css';

function App() {
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Year',
      selector: row => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <DataTable
        className='container'
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default App;
