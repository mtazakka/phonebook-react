import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactBox from './components/ContactBox';
import GraphContactBox from './components/GraphContactBox';
import MyClass from './components/MapBox';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GraphContactBox />} />
        <Route path="/sequelize" element={<ContactBox />} />
        <Route path="/map" element={<MyClass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
