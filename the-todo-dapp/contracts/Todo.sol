pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Todo {

  struct todoItem {
    uint256 id;
    string content;
    bool done;
  }

  uint256[] public todoItemIDs;
  mapping(uint256 => todoItem) todoItems;

  function getTodos() public view returns (todoItem[] memory){
    todoItem[] memory todos = new todoItem[](todoItemIDs.length);
    for (uint i = 0; i < todoItemIDs.length; i++) {
      todos[i] = todoItems[i];
    }
    return todos;
  }

  function addTodo(string memory content) public {
    uint256 id = todoItemIDs.length;
    todoItem storage newTodo = todoItems[id];
    newTodo.id = id;
    newTodo.content = content;
    newTodo.done = false;
    todoItemIDs.push(id);
  }

  function deleteTodo(uint256 id) public {
    delete todoItems[id];
  }

  function toggleTodo(uint256 id) public {
    todoItem storage updatedTodo = todoItems[id];
    updatedTodo.done = !updatedTodo.done;
    todoItems[id] = updatedTodo;
  }

}
