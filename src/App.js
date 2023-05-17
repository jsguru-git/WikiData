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

  useEffect(() => {
    // fetch('/movies').then(res => res.json()).then(data => {
    //   setData(data.movieList);
    //   console.log('movies ~~~~~~~~~~~~~~', data.movieList);
    // });
    const endpointUrl = 'https://query.wikidata.org/sparql';
    const sparqlQuery = `#Movies released in 2017
      SELECT DISTINCT ?item ?itemLabel WHERE {
        ?item wdt:P31 wd:Q11424.
        ?item wdt:P577 ?pubdate.
        FILTER((?pubdate >= "2017-01-01T00:00:00Z"^^xsd:dateTime) && (?pubdate <= "2017-12-31T00:00:00Z"^^xsd:dateTime))
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }`;

    const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
    queryDispatcher.query(sparqlQuery).then(res => {
      setData(res.results.bindings)
    });
  }, []);
  const columns = [
    {
      name: 'item',
      selector: row => row.item.value,
    },
    {
      name: 'itemLabel',
      selector: row => row.itemLabel.value,
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
