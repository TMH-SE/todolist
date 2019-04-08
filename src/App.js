import React, { Component } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import { Row, Col } from 'antd'
import TaskControl from './components/TaskControl'
import TaskList from './components/TaskList'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      isDisplayForm: false,
      titleFrm: '',
      taskEdit: null,
      searchKey: ''
    }
    this.onUpdateTask = this.onUpdateTask.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }
  componentWillMount () {
    if (localStorage && localStorage.getItem('tasks')) {
      this.setState({ tasks: JSON.parse(localStorage.getItem('tasks')) })
    }
  }
  onToggleForm () {
    if (this.state.taskEdit) {
      this.setState({ isDisplayForm: true, titleFrm: 'Add Task', taskEdit: null })
    } else {
      this.setState({ isDisplayForm: !this.state.isDisplayForm, titleFrm: 'Add Task', taskEdit: null })
    }
  }
  onExitForm () {
    this.setState({ isDisplayForm: false })
  }
  onSubmit (task) {
    let { tasks, taskEdit } = this.state
    if (!taskEdit) {
      task.key = tasks.length + 1
      tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.setState({ isDisplayForm: false })
    } else if (taskEdit) {
      let indx
      tasks.map((task, i) => task.key === taskEdit.key ? (indx = i) : null)
      task.key = taskEdit.key
      tasks[indx] = task
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.setState({ isDisplayForm: false, taskEdit: null })
    }
  }
  onUpdateStatus (key) {
    let { tasks } = this.state
    tasks.map(task => task.key === key ? (task.status = task.status === 'Actived' ? 'Disabled' : 'Actived') : '')
    this.setState({ tasks: tasks })
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
  }
  onUpdateTask (key) {
    let { tasks } = this.state
    let taskEdit = tasks.filter(task => task.key === key)
    this.setState({ taskEdit: taskEdit[0], isDisplayForm: true, titleFrm: 'Modify Task' })
  }
  onDeleteTask (key) {
    let { tasks } = this.state
    tasks.map(task => task.key === key ? (tasks.splice(tasks.indexOf(task), 1)) : '')
    this.setState({ tasks: tasks })
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
  }
  onSearch (v) {
    this.setState({ searchKey: v.toLowerCase() })
  }
  render () {
    let { tasks, isDisplayForm, titleFrm, taskEdit, searchKey } = this.state
    let elmFrm = isDisplayForm ? <TaskForm data={taskEdit} title={titleFrm} exitForm={() => this.onExitForm()} onSubmit={(task) => this.onSubmit(task)} /> : ''
    if (searchKey) {
      tasks = tasks.filter(task => (task.name.toLowerCase()).indexOf(searchKey) !== -1)
    }
    return (
      <div className='container'>
        <div className='header'>
          <h1>Todo List</h1>
        </div>
        <Row>
          <Col span={isDisplayForm ? 8 : 0}>
            { elmFrm }
          </Col>
          <Col span={isDisplayForm ? 16 : 24}>
            <TaskControl onSearch={this.onSearch} toggleForm={() => this.onToggleForm()} />
            <TaskList data={tasks} toggleFormModiFy={() => this.onToggleFormModify()} updateStatus={(key) => this.onUpdateStatus(key)} updateTask={this.onUpdateTask} deleteTask={(key) => this.onDeleteTask(key)} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
