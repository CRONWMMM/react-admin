import React from 'react'
import PropTypes from 'prop-types'
// components
import {
    Form,
    // Icon,
    Input,
    Button,
    Checkbox
} from 'antd'
import './LoginForm.less'

class LoginForm extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props
        const { Item: FormItem } = Form

        return (
          <Form className={[ 'login-form-component', className ]}>
            <FormItem>
              <Input placeholder="用户名" />
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="密码" />
            </FormItem>
            <FormItem>
              <div className="clear-f">
                <Checkbox className="float-left">记住密码</Checkbox>
                <a href="#" className="float-right">忘记密码</a>
              </div>
              <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
            </FormItem>
          </Form>
        )
    }
}

export default LoginForm
