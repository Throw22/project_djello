import React from 'react';
import {
  Card,
  CardBlock,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

class ListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  shortenString(string, length) {
    if (string.length > length) {
      return string.substring(0, length) + '...';
    }
    return string;
  }

  buildMembers(members) {
    return members.map(member => {
      return (
        <div key={member._id}>
          <p>
            <img
              src={member.photo}
              height="64"
              width="64"
              alt={member.username}
              style={{ paddingRight: '5px' }}
            />
            {member.username}
            <span>
              <a href="/">(remove)</a>
            </span>
          </p>
        </div>
      );
    });
  }

  buildActivity(activity) {
    return activity.map(action => {
      return (
        <div key={action}>
          <p className="text-muted">{action}</p>
        </div>
      );
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { title, description, members, activity, list } = this.props;
    return (
      <div>
        <Card onClick={this.toggle}>
          <CardBlock>
            <CardTitle tag="h5">{this.shortenString(title, 14)}</CardTitle>
            <CardText>
              {this.shortenString(description, 40)}
            </CardText>
          </CardBlock>
        </Card>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <p>
              <span>
                In list: <a href="/">{list}</a>
              </span>
              <span style={{ float: 'right' }}>
                <a href="/">Mark as completed</a>
              </span>
            </p>

            <p>
              {description}
            </p>

            <h4>Members:</h4>
            {this.buildMembers(members)}
            <p><a href="/">Add a new member</a></p>

            <h6>Activity:</h6>
            {this.buildActivity(activity)}
          </ModalBody>
          {/* <ModalFooter /> */}
        </Modal>
      </div>
    );
  }
}

export default ListCard;
