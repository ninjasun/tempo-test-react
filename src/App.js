import React, { useEffect, useState } from 'react';
import './App.css';

const TEAMS_URL = "https://tempo-exercises.herokuapp.com/rest/v1/teams";
const USERS_URL = "https://tempo-exercises.herokuapp.com/rest/v1/users";


const TeamCard = ({team}) => {

  const [ userList , setUserList ] = useState([]);
  const [ teamLeadName, setTeamLead ] = useState('');
  const [ loading, setLoading ] = useState('');

  useEffect(() => {
    const fetchTeamLead = async () => {
      if(!team.teamLead) return
      setLoading(true);
      try {
        const res = await (await fetch(USERS_URL+"/"+team.teamLead)).json();
        console.log("TeamLead: ", res)
        if (res) {
          setTeamLead(res.name);
          setLoading(false);
        }
      }
      catch (e) {
        setLoading(false)
      }
    }
    fetchTeamLead()
  }, [team])
 
  return (
    <div className="team-container" >
      <h2>{team.name}</h2>
      <h6>Leader: {teamLeadName.first} - {teamLeadName.last}</h6>
      <ul>
        {userList.map(({name, id}) => <p key={id}>{name.first} - {name.last}</p>)}
      </ul>
    </div>
  )
}

function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const res = await (await fetch(TEAMS_URL)).json();
        console.log("TEAMS: ", res)
        if (res) {
          setTeams(res);
          setLoading(false);
        }
      }
      catch (e) {
        setError(e)
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  return (
    <div className="App">
      {loading && <p>loading..</p>}
      {teams.map((team) => (
          <TeamCard team={team} key={team.id}/>
      ))}

    </div>
  );
}

export default App;
