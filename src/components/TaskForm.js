import React, { Component } from 'react'
import { Card, Icon, Form, Input, Select, Button } from 'antd'

export default class TaskForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      status: 'Disabled'
    }
  }
  componentWillMount () {
    let { data } = this.props
    if (data) {
      this.setState({ name: data.name, status: data.status })
    }
  }
  componentWillReceiveProps (newProps) {
    let { data } = newProps
    this.setState({ name: data ? data.name : '', status: data ? data.status : 'Disabled' })
  }
  onExitForm () {
    this.props.exitForm()
  }
  onChange (e) {
    let target = e.target
    let name = target.name
    let value = target.value
    this.setState({ [name]: value })
  }
  onChangeSelect (value) {
    this.setState({ status: value })
  }
  onSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }
  render () {
    return (
      <Card
        title={this.props.title}
        extra={<Icon type='close-circle' onClick={() => this.onExitForm()} />}
        style={{ width: 300 }}
        headStyle={{ backgroundColor: '#f7f7f7' }}
      >
        <Form layout='vertical'>
          <Form.Item label='Task Name' >
            <Input name='name' value={this.state.name} onChange={(e) => this.onChange(e)} />
          </Form.Item>
          <Form.Item label='Status'>
            <Select value={this.state.status} placeholder='Choose a status' onChange={(value) => this.onChangeSelect(value)}>
              <Select.Option value='Actived'>Actived</Select.Option>
              <Select.Option value='Disabled'>Disabled</Select.Option>
            </Select>
          </Form.Item>
          <Button size='large' htmlType='submit' type={'primary'} onClick={(e) => this.onSubmit(e)}><Icon type='save' /> Save</Button>
          <Button size='large' type={'danger'} onClick={() => this.onExitForm()}><Icon type='close' /> Cancel</Button>
        </Form>
      </Card>
    )
  }
}
