import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';
import {
  getData,
  setActiveBoard,
  createBoard,
  deleteBoard,
  createList,
  getBoard
} from '../actions';

class BoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isFetching: true,
      error: null,
      activeBoard: 0,
      currentBoard: null
    };
  }

  componentDidMount() {
    console.log(
      'Component mounted, getting board based on params:',
      this.props.match.params.title
    );

    this.props.getBoard(this.props.match.params.title);
  }

  // shouldComponentUpdate(newProps) {
  //   if (newProps === this.props) {
  //     return false;
  //   }
  //   return true;
  // }

  onChangeBoard = e => {
    let page = e.target.value;

    this.props.history.push(page);
  };

  render() {
    console.log('Props:', this.props);
    if (!this.props.currentBoard) {
      return <h3 className="text-center">Loading...</h3>;
    }
    return (
      <div>
        <Board
          title={this.props.currentBoard.title}
          lists={this.props.user.boards[0].lists}
          createBoard={this.props.createBoard}
          options={this.props.user.boards}
          onChangeBoard={this.onChangeBoard}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentBoard: state.currentBoard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoard: board => {
      dispatch(getBoard(board));
    },
    setActiveBoard: board => {
      dispatch(setActiveBoard(board));
    },
    createBoard: name => {
      dispatch(createBoard(name));
    },
    deleteBoard: () => {
      dispatch(deleteBoard());
    },
    createList: name => {
      dispatch(createList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
