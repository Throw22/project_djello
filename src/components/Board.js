import React from 'react';
import List from './List';
import Select from './Select';

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  CardTitle
} from 'reactstrap';

const Board = ({ title, lists, createBoard, options, onChangeBoard }) => {
  const boardLists = lists.map(list => {
    return (
      <List
        key={list._id}
        title={list.title}
        description={list.description}
        cards={list.cards}
      />
    );
  });

  console.log('Title:', title);
  console.log('Lists:', lists);

  return (
    <div>
      <Container>
        <Row style={{ paddingTop: '10px' }}>
          <Col sm="9">
            <h2>{title}</h2>
          </Col>
          <Col sm="3">
            <Select options={options} onChange={onChangeBoard} />
            <a href="/">Delete Board </a>
            <a href="/" style={{ float: 'right' }}> New Board</a>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row style={{ paddingTop: '10px' }}>
          {boardLists}
          <Col sm="3">
            <Card>
              <CardHeader tag="h3" className="text-center">
                <a href="/">Add a List</a>
              </CardHeader>
              <CardTitle
                tag="h5"
                className="text-center"
                style={{ paddingTop: '10px' }}
              />
              <CardBlock />
              <CardFooter className="text-muted text-center" />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Board;
