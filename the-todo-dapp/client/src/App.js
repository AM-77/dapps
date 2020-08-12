import React, { Component } from "react"
import TodoContract from "./contracts/Todo.json"
import getWeb3 from "./getWeb3"

class App extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = { 
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null,
      todo: "",
      todos: []
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()
      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = TodoContract.networks[networkId]      
      const instance = new web3.eth.Contract(TodoContract.abi, deployedNetwork && deployedNetwork.address )

      // Set web3, accounts and contract to the state.
      this.setState({ web3, accounts, contract: instance }, this.initTodos)
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.error(error)
    }
  }

  initTodos = async () => {
    const  { contract } = this.state
    // Get the todo list from the smart contract and set it to the state.
    const todos = await contract.methods.getTodos().call()
    console.log("todos: ", todos)
    if(todos) this.setState({ todos })
  }

  onInputChange = e => {
    const value = e.currentTarget.value
    const name = e.currentTarget.name
    
    this.setState({[name]: value})
  }

  onFormSubmit = e => {
    e.preventDefault()

    const { accounts, contract, todo } = this.state
    contract.methods.addTodo(todo).send({ from: accounts[0] }).then(() => {
      contract.methods.getTodos().call().then(todos => this.setState({ todos }))
    })
  }

  onTodoCheck = id => {
    const { accounts, contract } = this.state    
    contract.methods.toggleTodo(id).send({ from: accounts[0] }).then(() => {
      contract.methods.getTodos().call().then(todos => this.setState({ todos }))
    })
  }

  onTodoDelete = id => {
    console.log(id)
    const { accounts, contract } = this.state    
    contract.methods.deleteTodo(id).send({ from: accounts[0] }).then(() => {
      contract.methods.getTodos().call().then(todos => this.setState({ todos }))
    })
  }

  render() {
    const { web3, todo, todos } = this.state
        return <div className="app-container">
        <div className="header">
          <h1>The TODO DAPP</h1>
        </div>
        <div className="main">
          {
            web3 ?
              <>
                <div className="form">
                  <form onSubmit={this.onFormSubmit}>
                    <input type="text" placeholder="your todo" name="todo" value={todo} onChange={this.onInputChange} />
                    <input value="+" type="submit" />
                  </form>
                </div>
                <div className="todos">
                  {
                    todos.map((todo, index) => {
                      if (todo.content !== "" )
                        return <div key={index} className="todo">
                            <input type="checkbox" onChange={() => this.onTodoCheck(todo.id)} checked={todo.done}/>
                            <p className="content">{todo.content}</p>
                            <button onClick={() => this.onTodoDelete(todo.id)} alt="delete">x</button>
                          </div>
                    })
                  }
                </div>
              </>
              :
              <div className="error">
                <p className="message">Failed to load web3, accounts, or contract. Check console for details.</p>
              </div>
          }
        </div>
    </div>
  }
}

export default App
