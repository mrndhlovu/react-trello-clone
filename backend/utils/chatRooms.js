const users = [];

const addUser = ({ id, name, room }) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) return { error: "Username is take!!" };
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getCurrentUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { getUsersInRoom, getCurrentUser, removeUser, addUser };
