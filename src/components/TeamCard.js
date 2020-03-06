import React, { useEffect, useState, } from 'react';

const USERS_URL = "https://tempo-exercises.herokuapp.com/rest/v1/users";

const TeamCard = ({ team, onClick, handleTeam }) => {

    const [teamLeadName, setTeamLead] = useState('');

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
    }, [team])

    function handleClick(){
        onClick('third');
        handleTeam(team);
        return
    }

    return (
        <div className="team-container" onClick={()=> handleClick()}>
            <h2>{team.name}</h2>
            <h6>Leader: {teamLeadName.first} - {teamLeadName.last}</h6>
        </div>
    )
}

export default TeamCard;