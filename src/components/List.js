import React from 'react';
import ListCard from './ListCard';
import {
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  CardTitle,
  Col
} from 'reactstrap';

const List = ({ title, description, cards }) => {
  function shortenString(string, length) {
    if (string.length > length) {
      return string.substring(0, length) + '...';
    }
    return string;
  }

  const listCards = cards.map(card => {
    return (
      <ListCard
        key={card._id}
        title={card.title}
        description={card.description}
        members={card.members}
        activity={card.activity}
        list={title}
      />
    );
  });

  return (
    <Col sm="3">
      <Card>
        <CardHeader tag="h3">{shortenString(title, 12)}</CardHeader>
        <CardTitle
          tag="h7"
          className="text-center"
          style={{ paddingTop: '10px' }}
        >
          {description}
          {/* {shortenString(description, 20)} */}
        </CardTitle>
        <CardBlock>
          {listCards}
        </CardBlock>
        <CardFooter className="text-muted text-center">
          <a href="/">Add a Card</a>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default List;
