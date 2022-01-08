import './App.css';
import Authors from './components/Authors';
import Books from './components/Books';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/authors' element={<Authors />} />
            <Route path='/books' element={<Books />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
