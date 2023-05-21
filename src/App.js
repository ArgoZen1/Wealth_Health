import Page1 from "./Pages/Page1/Page1";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Page2 from "./Pages/Page2/Page2";
import 'normalize.css';
import { EmployeeProvider } from "./contexts/EmployeeContext";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <EmployeeProvider>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </EmployeeProvider>
    </BrowserRouter>
  );
}

export default App;