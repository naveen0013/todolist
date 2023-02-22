import React from 'react'
import { Card,Row,Col,Button } from 'react-bootstrap'
import '../App.css';

function Indexview(data) {
    let types=[{status:"completed",ele:<i className="fa fa-check-circle" aria-hidden="true"></i>},
    {status:"expired",ele:<i class="fa fa-asterisk" aria-hidden="true"></i>},
    {status:"in-progress",ele:<i className="fa fa-spinner" aria-hidden="true"></i>}]

    let tasks=data.data.taskList;


  return (
    <div className='all'>
        <Row xs={"auto"} md={3} className="g-4">
            {types.map((type,i)=>
        <Col key={i}  style={{maxHeight:"180px"}}>
            <Button variant="info" className="primaryBtn" ><h1>{type.ele}</h1></Button>
        {/* <Card id="cardId">
            <Card.Body>
                <Card.Text>
                    {type.status} &nbsp;
                    
                </Card.Text>
                
            </Card.Body>
        </Card>  */}
        </Col>)}
        </Row>
    </div>
  )
}

export default Indexview