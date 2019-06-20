import React from 'react'
import PropTypes from 'prop-types'
// components
import { Icon, Input } from 'antd';
// style
import './EditableField.less'

class EditableField extends React.Component {
    static propTypes = {
        icon: PropTypes.string, // icon-type
        editable: PropTypes.bool, // editable or not
        children: PropTypes.string.isRequired, // slot 插槽
        onChange: PropTypes.func // change-handler
    }

    static defaultProps = {
        editable: true
    }

    state = {
        active: false
    }

    constructor() {
        super()
        this.inputRef = React.createRef()
    }

    componentDidUpdate() {
        const { active } = this.state
        active && this.inputRef.current.focus()
    }

    handleBlur = () => {
        this.setState({
            active: false
        })
    }

    handleEnter = () => {
        this.setState({
            active: false
        })
    }

    handleChange = (e) => {
        const { onChange } = this.props
        onChange && onChange(e.currentTarget.value)
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
                        (<Input className="input"
                                ref={this.inputRef}
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

export default EditableField
