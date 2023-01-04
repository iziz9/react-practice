import { useRef, useState, useMemo, useCallback, useReducer } from 'react';
import './App.css';
import Counter from './Counter';
import CreateUser from './CreateUser';
import Hello from './Hello';
import InputSample from './InputSample';
import UserList from './UserList';
import User from './UserList';
import Wrapper from './Wrapper';


function countActiveUsers(users) {
  console.log('활성 사용자 수 세는중');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT': //액션객체, input상태 업데이트
      return {
        ...state, //불변성을 지키기 위해 spread연산 사용
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user)
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => { //재사용
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: '',
  //   // id: ''
  // })

  // const { username, email } = inputs;

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   setInputs(inputs => ({
  //     ...inputs,
  //     [name]: value
  //   }));
  // }, []);

  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     username: 'velopert',
  //     email: 'public.velopert@gmail.com',
  //     active: true
  //   },
  //   {
  //     id: 2,
  //     username: 'tester',
  //     email: 'tester@example.com',
  //     active: false
  //   },
  //   {
  //     id: 3,
  //     username: 'liz',
  //     email: 'liz@example.com',
  //     active: false
  //   }
  // ]);

  // const nextId = useRef(4)

  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email
  //   }
  //   setUsers(users => users.concat(user))


  //   setInputs({
  //     username: '',
  //     email: ''
  //   })
  //   nextId.current += 1;
  // }, [username, email]);

  // const onRemove = useCallback(id => {
  //   setUsers(users => users.filter(user => user.id !== id))
  //   //일치하지 않는 원소만 추출해 새 배열 만듦 (일치하면 제거)
  // }, []);

  // const onToggle = useCallback(id => {
  //   setUsers(users => users.map(user => user.id === id ? { ...user, active: !user.active } : user))
  // }, []);

  // const onEdit = useCallback(user => {
  //   setInputs({
  //     username: user.username,
  //     email: user.email,
  //     id: user.id
  //   })
  // }, []);

  // const onUpdate = useCallback(() => {
  //   setUsers(users =>
  //     users.map(user => user.id === id ? { ...user, username: username, email: email } : user)
  //   )
  //   setInputs({
  //     username: '',
  //     email: '',
  //     id: ''
  //   })
  // }, [users, username, email, id]);
  // const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수 : {count} </div>

      {/* <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count} </div> */}
    </>

    // <Wrapper>
    //   <User />
    //   <InputSample />
    //   <Hello name="react" color="red" isSpecial={true} />
    //   <Hello color="blue" />
    //   <Counter />
    // </Wrapper>
  );
}
export default App;
