import React, { useEffect, useState, } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TeamCard from './components/TeamCard';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner'
import TeamDetails from './components/TeamDetails';

const TEAMS_URL = "https://tempo-exercises.herokuapp.com/rest/v1/teams";




function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('first');
  const [team, setTeam] = useState(null);

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
      <Container>
        {loading? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          ) : (
        <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab} activeKey={activeTab} onSelect={k => setActiveTab(k)}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Team list</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Discover</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {teams.map((team) => (
                    <TeamCard team={team} key={team.id} onClick={setActiveTab} handleTeam={setTeam}/>
                  ))}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <p onClick={()=>{setActiveTab('first')}}>vuoto</p>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <p>cartico dettagli</p>
                  <TeamDetails team={team}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        )}
      </Container>

    </div>
  );
}

export default App;
