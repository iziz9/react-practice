import { useRef, useState } from 'react';
import './App.css';
import Counter from './Counter';
import CreateUser from './CreateUser';
import Hello from './Hello';
import InputSample from './InputSample';
import UserList from './UserList';
import User from './UserList';
import Wrapper from './Wrapper';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    id: ''
  })

  const { username, email, id } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4)
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    }
    setUsers(users.concat(user))


    setInputs({
      username: '',
      email: ''
    })
    nextId.current += 1;
  }

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id))
    //일치하지 않는 원소만 추출해 새 배열 만듦 (일치하면 제거)
  }

  const onToggle = id => {
    setUsers(users.map(user => user.id === id ? { ...user, active: !user.active } : user))
  }

  const onEdit = user => {
    setInputs({
      username: user.username,
      email: user.email,
      id: user.id
    })
  }

  const onUpdate = () => {
    setUsers(
      users.map(user => user.id === id ? { ...user, username: username, email: email } : user)
    )
    setInputs({
      username: '',
      email: '',
      id: ''
    })
  }

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        onUpdate={onUpdate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} onEdit={onEdit} />
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
