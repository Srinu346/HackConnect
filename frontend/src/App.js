import './App.css';
import RegisterPage from './pages/RegisterPages';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'
import CreateTeamPage from './pages/createTeamPage';
import MyTeamsPage from './pages/myteams';
import TeamDetailsPage from './pages/teamDetailsPage';
import ProfilePage from './pages/profilePage';
import FindTeamsPage from "./pages/findTeamsPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/create-team' element={<CreateTeamPage/>}></Route>
        <Route path='/teams' element={<FindTeamsPage/>}></Route>
        <Route path='/get-team' element={<TeamDetailsPage/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/my-teams' element={<MyTeamsPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
