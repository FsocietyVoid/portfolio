import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';


function App() {
  return (
    <Router basename='/portfolio'>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;