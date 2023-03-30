import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header.jsx';
import SignIn from './SignIn.jsx';
import CreateEmployee from './CreateEmployee.jsx';
import EmployeeList from './EmployeeList.jsx';
import Error from './Error.jsx';
import Profile from './Profile.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
