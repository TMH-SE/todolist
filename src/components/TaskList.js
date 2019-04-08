import React, { Component } from 'react'
import { Table } from 'antd'
import TaskListAction from './TaskListAction'
export default class TaskList extends Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      sorter: (a, b) => (a.name).localeCompare(b.name),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '30%',
      filters: [
        { text: 'Actived', value: 'Actived' },
        { text: 'Disabled', value: 'Disabled' }
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => <label className={`${text.toLowerCase()}`} onClick={() => { this.onUpdateStatus(record) }}>{text}</label>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (t, r) => <TaskListAction deleteTask={() => this.onDeleteTask(r)} updateTask={this.onUpdateTask.bind(this, r)} />
    }]
  }
  onUpdateTask (r) {
    this.props.updateTask(r.key)
  }
  onUpdateStatus (record) {
    this.props.updateStatus(record.key)
  }
  onDeleteTask (r) {
    this.props.deleteTask(r.key)
  }
  render () {
    return (
      <div className='task-list'>
        <Table columns={this.columns} dataSource={this.props.data} bordered scroll={{ y: 300 }} />
      </div>
    )
  }
}
