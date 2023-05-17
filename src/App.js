import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './App.css';

class SPARQLQueryDispatcher {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  query(sparqlQuery) {
    const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
    const headers = { 'Accept': 'application/sparql-results+json' };

    return fetch(fullUrl, { headers }).then(body => body.json());
  }
}

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/movies').then(res => res.json()).then(data => {
      if (data.movieList.length !== 0) {
        setData(data.movieList.map(row => ({item: row[0], itemLabel: row[1]})));
        setIsLoading(false);
      } else {
        onRefresh();
      }      
    });    
  }, []);

  const onClear = () => {
    fetch('/clear').then(res => res.json()).then(data => {
      if (data.status === 'success') {
        setData([]);
      }
    })
  }

  const onRefresh = () => {
    const endpointUrl = 'https://query.wikidata.org/sparql';
    const sparqlQuery = `#Movies released in 2013
      SELECT DISTINCT ?item ?itemLabel WHERE {
        ?item wdt:P31 wd:Q11424.
        ?item wdt:P577 ?pubdate.
        FILTER(?pubdate >= "2013-01-01T00:00:00Z"^^xsd:dateTime)
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }`;

    const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
    setIsLoading(true);
    queryDispatcher.query(sparqlQuery).then(res => {
      setData(res.results.bindings.map(row => ({item: row.item.value, itemLabel: row.itemLabel.value})))
      setIsLoading(false);
      const records = res.results.bindings.map(row => ([row.item.value, row.itemLabel.value]));
      fetch('/save', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          movies: records
        })
      })
    });
  }

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
        <div className='right-align'>
          <button onClick={onRefresh} style={{marginRight: '20px'}}>Refresh</button>
          <button onClick={onClear}>Delete</button>
        </div>        
        <DataTable
          className='container'
          columns={columns}
          data={data}
          striped='true'
          persistTableHead='true'
          progressPending={isLoading}
          pagination='true'
        />
      </div>
    </div>
  );
}

export default App;
