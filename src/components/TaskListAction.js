import React, { Component } from 'react'
import { Button, Icon, Popconfirm } from 'antd'

export default class TaskListAction extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.confirm = this.confirm.bind(this)
    this.onUpdateTask = this.onUpdateTask.bind(this)
  }
  onUpdateTask () {
    this.props.updateTask()
  }
  confirm () {
    this.props.deleteTask()
  }
  render () {
    return (
      <div>
        <Button type='primary' onClick={this.onUpdateTask}><Icon type='edit' /> Modify</Button>
        <Popconfirm placement='topLeft' title='Are you sure?' onConfirm={this.confirm} okText='Yes' cancelText='No'>
          <Button type='danger'><Icon type='delete' /> Delete</Button>
        </Popconfirm>
      </div>
    )
  }
}
