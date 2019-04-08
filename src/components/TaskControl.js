import React, { Component } from 'react'
import { Button, Row, Icon } from 'antd'
import TaskSeachControl from './TaskSeachControl'

export default class TaskControl extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  onToggleForm () {
    this.props.toggleForm()
  }
  render () {
    return (
      <div className='task-control'>
        <Button type={'primary'} onClick={() => this.onToggleForm()}><Icon type='plus' /> Add Task</Button>
        <Row className='control'>
          <TaskSeachControl onSearch={this.props.onSearch} />
        </Row>
      </div>
    )
  }
}
