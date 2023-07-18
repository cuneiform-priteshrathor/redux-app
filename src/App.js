import './App.css';
import MatchData from '../src/authentication/pages';
import User from './user/pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { shallowEqual, useSelector } from "react-redux";

function App() {
  const isAuthorized = useSelector((state) => state.auth, shallowEqual);
  console.log('isAuthorized: ', isAuthorized);
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<MatchData />} />

          <Route path="/user" element={<User />} />


        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
