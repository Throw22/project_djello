**QUESTIONS:
Authenticating routes beyond login? (access to boards)
--Will be discussed further (react jwt)
Making input box appear when user clicks link (http://kaivi.github.io/riek/)
Express API backend--separate server and client?
Managing state and mongoose DB at same time--wait for mongoose callback to set state?
How does users state update if someone else makes a change? (adds them to board, deletes shared board?)
--Just update individual resources, don't fetch everything every change
****

/////////////////
// Mongoose DB
/////////////////

Users: {
  username: string, //unique
  password: string,
  photo: string,
  boards:[boardIds], //hook when board is deleted to remove that board from every user's board list
}
Boards: {
  title: string, //unique to avoid route clashes?
  lists: [listIds]
}
Lists: {
  title: string,
  description: string,
  cards: [cardIds]
}
Cards: {
  title: string,
  description: string,
  completed: bool,
  members:[userIDs],
  activityFeed:[strings(description of event and date)] //don't make a model for these, only for display
}

/////////////////
// React-Redux
/////////////////

Shape of app:

<Provider store={store}>
  <App>
    <NavBar /> //Brand, username and photo, logout link
    <BoardContainer /> //Displays active board
  </App>
</Provider>

Shape of state:
{
  isLoggedIn: boolean,
  user: {
    username: string,
    avatar: string,
    boards: [{
      title: string,
      description: string,
      lists: [{
        title: string,
        description: string,
        cards: [{
          title: string,
          description: string,
          members: []
        }]
      }]
    }]
  }
}

/////////////////
// User Login
/////////////////

Use state as check for whether use is logged in or not, redirect to login page if not
https://stackoverflow.com/questions/31084779/how-to-restrict-access-to-routes-in-react-router

On form submission validate username/password combo in database

Successful login: set state (loggedin:true, user:username, all known boards/lists/cards?), redirect to boards
Failed login: redirect to login

Login button dispatches action to clear state and redirect user to login

/////////////////
// Boards
/////////////////

***** Board container renders board component for state's activeBoard

const getLists = (boards, activeBoard) => {
  return
}

const mapStateToProps = (state) => {
  return {
    activeBoard: state.activeBoard;
    lists: getLists(state.user.boards, state.activeBoard)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveBoard: (board) => {
      dispatch(setActiveBoard(board))
    },
    createBoard: (name) => {
      dispatch(createBoard(name))
    },
    deleteBoard: () => {
      dispatch(deleteBoard())
    },
    createList: (name) => {
      dispatch(createList())
    }
  }
}

***** Board component just renders data passed into it as props

const Board = ({title, description, lists}) => {

  const boardLists = lists.map((list) => {
    return <List key={list.title} title={list.title} description={list.description} cards={list.cards}/>
    })

  return (
    <div>
      {title}
      {boardLists}
      <BoardSelect /> // will be a dropdown component that redirects to selected board
      <p onClick={createBoard}>Create New Board</p>
    </div>
    )
}

/////////////////
// Lists
/////////////////

***** List components are rendered out of board container?

const List = ({title, description, cards}) => {
  const listCards = cards.map((card) => {
    return <Card key="card.title" title={card.title} description={card.description} members={card.members} activity={card.activity} list={title}/>
    })

  return (
      <div className="list card">
        <div className="card-block">
          {listCards}
        </div>
      </div>
    )
}

/////////////////
// Cards
/////////////////

***** Card components are rendered out of list component

const Card = ({title, description, members, activity, list}) => {
  return (
    <div className="userCard card">
      <div className="card-block">
        Stuff
      </div>
    </div>
    )
}

Members
Activity
