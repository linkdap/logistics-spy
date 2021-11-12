//import logo from './logo.svg';
import './Home.scss';
/*
function Home() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/app/areas/home/Home.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
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

const listOfCountries = (edges, startingCountry, destination) => {
  //convert edges to adjacency list
  const graph = buildGraph(edges);
  //console.log(graph);
  const visited = new Set([startingCountry]);
  let trackCountries = {};

  //store node in queue and distance from startingCountry
  let queue = [[startingCountry, 0]]; //start is 0 edges from itself
  //convert value entered to uppercase
  destination = destination.toUpperCase();
  //while queue is not empty, remove from front
  while(queue.length > 0) {
    //get current node and distance 
    const [node, distance] = queue.shift();
    //if node is destination, route found
    if(node === destination) return trackCountries;

    for(let neighbor of graph[node]) {
      //check if neighbor has been visited
      //add to queue if not visited and mark as visited
      if(!visited.has(neighbor)) {
        console.log(visited)
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
        //copy neighbor and distance + 1 into tracker object
        trackCountries[distance] = neighbor;
      }      
    }
  }
  
  return false;
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
  return graph;
}

//tests
console.log(listOfCountries(edges,startingCountry,'can'));

function Home() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Logistics Spy
        </p>
      </header>
    </div>
  );
}

export default Home;
