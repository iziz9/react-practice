import React, { useEffect } from 'react'



const User = ({ user, onRemove, onToggle, onEdit }) => {

  useEffect(() => {
    console.log(user);
  })

  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
      <button onClick={() => onEdit(user)}>수정</button>
    </div>
  )
}

function UserList({ users, onRemove, onToggle, onEdit }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} onEdit={onEdit} />
      ))}
    </div>
  );
}



export default UserList