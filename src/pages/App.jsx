import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import SignIn from './SignIn';
import CreateEmployee from './CreateEmployee';
import EmployeeList from './EmployeeList';
import Error from './Error';
import Profile from './Profile';

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
