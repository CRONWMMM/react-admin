import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// action
import {
    Form,
    // Icon,
    Input,
    Button,
    Checkbox
} from 'antd'
import { updateUserInfo } from '../../../../store/action/userAction'
// components
import './LoginForm.less'

class LoginForm extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        updateUserInfo: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    login = () => {
        const { updateUserInfo } = this.props
        updateUserInfo({
            username: 'CRONWMMM',
            password: 'ooo'
        });
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
              <Button type="primary" htmlType="submit" className="login-btn" onClick={this.login}>登录</Button>
            </FormItem>
          </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInfo: (data) => dispatch(updateUserInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
