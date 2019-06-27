import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
// components
import { Icon } from 'antd'
import UnderlineInput from 'components/UnderlineInput/UnderlineInput'
// style
import './EditableField.less'

class EditableField extends React.Component {
    static propTypes = {
        icon: PropTypes.string, // icon-type
        editable: PropTypes.bool, // editable or not
        children: PropTypes.string.isRequired, // slot 插槽
        onChange: PropTypes.func, // change-handler
        onBlur: PropTypes.func // blur-handler
    }

    static defaultProps = {
        editable: true
    }

    state = {
        active: false
    }

    constructor() {
        super()
        this.underlineInputRef = React.createRef()
    }

    componentDidUpdate() {
        const { active } = this.state
        active && this.underlineInputRef.current.focus()
    }

    handleBlur = (val) => {
        const { onBlur } = this.props
        onBlur && onBlur(val)
        setTimeout(() => {
            this.setState({
                active: false
            })
        }, 200)
    }

    handleEnter = () => {
        setTimeout(() => {
            this.setState({
                active: false
            })
        }, 200)
    }

    handleChange = (val) => {
        const { onChange } = this.props
        onChange && onChange(val)
    }

    handleEditBtnClick = () => {
        this.setState({
            active: true
        })
    }

    render() {
        const { active } = this.state
        const { icon, children, editable } = this.props

        /* eslint-disable */
        return (
            <div className="editable-field">
                { icon ? <Icon className="field-icon" type={icon} /> : null }
                {
                    active ?
                        (<UnderlineInput className="input"
                                ref={this.underlineInputRef}
                                value={children}
                                onBlur={this.handleBlur}
                                onPressEnter={this.handleEnter}
                                onChange={this.handleChange} />) :
                        (<span className="field">
                          <span className="text" title={children}>{children}</span>
                          {editable ? <Icon type="form" className="btn-icon" onClick={this.handleEditBtnClick} /> : null}
                         </span>)
                }
            </div>
        )
    }
}

export default hot(EditableField)
