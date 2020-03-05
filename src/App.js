import React, { useEffect, useState, } from 'react';
import './App.css';

const TEAMS_URL = "https://tempo-exercises.herokuapp.com/rest/v1/teams";
const USERS_URL = "https://tempo-exercises.herokuapp.com/rest/v1/users";


const User = ({id}) => {
  console.log("here: ", id)
  const [user, setUser] = useState({
    first: '', last: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return
      try {
        const user = await (await fetch(USERS_URL + "/" + id)).json();
        console.log("user: ", user)
        if (user) {
          setUser({
            first: user.name.first, last: user.name.last
          });

        }
      }
      catch (e) {

      }
    }
    fetchUser()
  }, [id]);

  return (
    <li className="user">
      <p >{user.first} - {user.last}</p>
    </li>

  )
}

const TeamCard = ({ team }) => {

  const [teamLeadName, setTeamLead] = useState('');
  const [loading, setLoading] = useState('');
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    const fetchTeamLead = async () => {
      if (!team.teamLead) return
      try {
        const res = await (await fetch(USERS_URL + "/" + team.teamLead)).json();
        console.log("TeamLead: ", res)
        if (res) {
          setTeamLead(res.name);
        }
      }
      catch (e) {

      }
    }
    fetchTeamLead()
  }, [team ])

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const data = await (await fetch(USERS_URL)).json();
        //console.log("USERS: " + data + " team: ", team.name)
        if (data) {
          const ids = data.filter((p) => p.teamId === team.id);
          //console.log("user id list for this team: ", ids)
          setUserIds(ids)
        }
      }
      catch (e) {
      }
    }

    fetchUserIds()
  }, [ team])

  return (
    <div className="team-container" >
      <h2>{team.name}</h2>
      <h6>Leader: {teamLeadName.first} - {teamLeadName.last}</h6>
      <div>
        {userIds.map((user) => (
          <User key={user.userId} id={user.userId} />
        ))}
      </div>
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
        <TeamCard team={team} key={team.id} />
      ))}

    </div>
  );
}

export default App;
