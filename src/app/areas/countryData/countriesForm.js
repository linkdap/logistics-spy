import { useState } from "react";

const edges = [
  ['CAN','USA'],
  ['USA','MEX'],
  ['MEX','BLZ'],
  ['MEX','GTM'],
  ['BLZ','GTM'],
  ['GTM','SLV'],
  ['GTM','HND'],
  ['SLV','HND'],
  ['HND','NIC'],
  ['NIC','CRI'],
  ['CRI','PAN']
];


let startingCountry = 'USA';

const BreadthFirstSearch = (edges, startingCountry, destination) => {
  //conversions: value entered to uppercase and edges to adjacency list
  destination = destination.toUpperCase();
  //handle nothing submits 
  
  const graph = buildGraph(edges);

  //declare object to count number of countries it takes to reach destination 
  const numberOfCountries = {};

  //startingCountry is 0 edges away from itself
  numberOfCountries[startingCountry] = 0;

  const queue = [];
  //Map to keep track of visited countries
  const visited = new Set();
  const finalRoute = new Map();
  
  //immediately push startingCountry into queue and visited set
  queue.push(startingCountry);
  visited.add(startingCountry);

  //while queue is not empty
  while(queue.length > 0) {
    //get current country
    const currentCountry = queue.shift();
    const borderingCountries = graph[currentCountry] || [];
    
    //if reach destination return count of countries it takes to get there
    if(currentCountry === destination) {
      //add destination to finalRoute and return all countries in final route
      return finalRoute.set(currentCountry,destination).keys();
    }
    
    //loop through all possible adjacent countries to construct a route leading to the destination and account for already visited countries
    for(let nextCountry of borderingCountries) {
      if(!visited.has(nextCountry)) {
        numberOfCountries[nextCountry] = numberOfCountries[currentCountry] + 1;
        queue.push(nextCountry);
        finalRoute.set(currentCountry, nextCountry);
        //add nextCountry to visited
        visited.add(nextCountry);
      }
    }
  }
  return (<div>{'route to '.concat('\'', destination,'\'', ' not found').toUpperCase()}</div>);
};

const buildGraph = (edges) => {
  const graph = {};

  for(let edge of edges) {
    const[a, b] = edge; 
    if(!(a in graph)) graph[a] = [];
    if(!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return (<div>{graph}</div>);
};

const DisplayCountryForm = (props) => {
  const[userCountryCodeInput, setUserCountryCodeInput] = useState('')
  //const[displayRoute, setDisplayRoute] = useState('');
  //let driverDestination = userCountryCodeInput;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //props.breadthFirstSearch(edges,startingCountry,userCountryCodeInput);
    setUserCountryCodeInput('');
  }

    return(
        <>
        <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Enter a 3-Letter Country Code Below:</legend>
                    <input 
                      type="text" 
                      required
                      value={userCountryCodeInput}
                      onChange={(e) => setUserCountryCodeInput(e.target.value)}
                    />
                    <button>Find Route</button>
                </fieldset>
            </form>
        </>
    )
}

export default DisplayCountryForm;