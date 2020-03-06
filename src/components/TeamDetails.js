import React, { useEffect, useState, } from 'react';
import User from './User';
import { Container, Row, Col } from 'react-bootstrap/';

const USERS_URL = "https://tempo-exercises.herokuapp.com/rest/v1/users";

const TeamDetails = ({ team }) => {

    const [teamLeadName, setTeamLead] = useState('');
    const [userIds, setUserIds] = useState([]);

    useEffect(() => {
        const fetchTeamLead = async () => {
            if (!team || !team.teamLead) return
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

    useEffect(() => {
        const fetchUserIds = async () => {
            try {
                const data = await (await fetch(USERS_URL)).json();
                if (data) {
                    const ids = data.filter((p) => p.teamId === team.id);
                    setUserIds(ids)
                }
            }
            catch (e) {
            }
        }

        fetchUserIds()
    }, [team])

    return (
        <Container>
            <Row>
                <Col sm={8}>
                    {team&&<h2>{team.name}</h2>}
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <h6>Leader: {teamLeadName.first} - {teamLeadName.last}</h6>
                    <div>
                        {userIds.map((user) => (
                            <User key={user.userId} id={user.userId} />
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TeamDetails;