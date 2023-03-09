import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import CreateEmployee from './CreateEmployee';
import EmployeeList from './EmployeeList';
import Error from './Error';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<CreateEmployee />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
