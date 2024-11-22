
import CreateMatchPage from "./Components/CreateMatch/CreateMatch";
import AddPlayer from "./Components/CreatePlayers/AddPlayer";
import CreatePlayers from "./Components/CreatePlayers/CreatePlayers";
import CreateTeams from "./Components/CreateTeams/CreateTeams";
import CreateWinners from "./Components/CreateWinner/CreateWinner";
import HomePage from "./Components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Transactions from "./Components/Transactions/Transactions";
import Deposite from "./Components/Deposite/Deposite";
import Withdrawl from "./Components/WithDrawl/WithDrawl";
import Users from "./Components/Users/Users";
import NewUsers from "./Components/NewUsers/NewUsers";

function App() {

  return (
    <div>
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />  
          <Route path="/create-match" element={<CreateMatchPage />} />
          <Route path="/create-teams" element={<CreateTeams />} />
          <Route path="/create-winners" element={<CreateWinners />} />
          <Route path="/create-players" element={<CreatePlayers/>} />
          <Route path="/add-players" element={<AddPlayer/>} />
          <Route path="/users" element={<Users />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/deposite" element={<Deposite />} />
          <Route path="/withdrawl" element={<Withdrawl />} />
          <Route path="/new-users" element={<NewUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
