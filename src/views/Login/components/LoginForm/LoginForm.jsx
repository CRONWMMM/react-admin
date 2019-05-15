import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// components
import {
    Form,
    // Icon,
    Input,
    message,
    Button,
    Checkbox
} from 'antd'
// actions
import { updateUserInfo } from '../../../../store/action/userAction'
import './LoginForm.less'

class LoginForm extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        updateUserInfo: PropTypes.func,
        form: PropTypes.object
    }

    constructor(props) {
        super(props)
    }

    /**
     * 登录表单提交
     * @param e
     */
    handleSubmit = e => {
        e.preventDefault()
        const { form: { validateFields } } = this.props
        validateFields((err, values) => {
            if (err) {
                message.warning('请按要求填写表单')
            } else {
                const { username, password } = values
                console.log(values)
                this.login(username, password)
            }
        })
    }

    /**
     * 登录
     * @param username
     * @param password
     */
    login = (username, password) => {
        const { updateUserInfo } = this.props
        updateUserInfo({
            username,
            password
        })
    }

    render() {
        const { className, form: { getFieldDecorator } } = this.props
        const { Item: FormItem } = Form

        return (
          <Form className={[ 'login-form-component', className ]}
                onSubmit={this.handleSubmit}>
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请填写用户名' }]
              })(<Input placeholder="用户名" />)}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请填写密码' }]
              })(<Input type="password" placeholder="密码" />)}
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


const LoginFormWrap = Form.create({ name: 'loginForm' })(LoginForm);

const mapStateToProps = (state) => ({
    userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInfo: (data) => dispatch(updateUserInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormWrap)
