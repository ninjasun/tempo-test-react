import React, { useEffect, useState } from 'react';
import './App.css';

const TEAM_URL = "https://tempo-exercises.herokuapp.com/rest/v1/teams";


function TeamCard({id, teamLead, name}) {
  const [ userList , setUserList ] = useState([]);
  const [ teamLeadName, setTeamLead ] = useState('');

  return (
    <div className="team-container" >
      <h2>{name}</h2>
      <h6>teamLead</h6>
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
        const res = await (await fetch(TEAM_URL)).json();
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
