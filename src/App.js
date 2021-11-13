import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './areas/home/Home';

function App() {
  return (
    <Router>
          <Routes>
            {/* put your other app routes here */}
            <Route path='/' element={<Home/>} />
          </Routes>
      </Router>
  );
}

export default App;
