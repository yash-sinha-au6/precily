import './App.css';
import Todo from './Todo'
import {Container,Row,Col} from 'react-bootstrap'
import Sidepanel from "./Sidepanel"
import Footer from './Footer'
function App() {
  return (

    <Container fluid className="flex-container">
      <Row>
        <Col md={4} sm={4} lg={true} className="flex-item-left">
          <Sidepanel />
        </Col>
        <Col md={8} sm={8} lg={true} className="flex-item-right">
        <Todo />
        </Col>
      </Row>
      <Row>
        <Col md={8} sm={8} lg={true}>
          <Footer />
        </Col>
      </Row>
     
    </Container>
  );
}

export default App;
