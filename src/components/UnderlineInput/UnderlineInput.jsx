import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { hot } from 'react-hot-loader/root'
// style
import './UnderlineInput.less'

class UnderlineInput extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired, // value
        type: PropTypes.string, // input type, 'text' or 'password'
        className: PropTypes.string,
        closable: PropTypes.bool, // closable
        onChange: PropTypes.func, // change handler
        onBlur: PropTypes.func, // blur handler
        onFocus: PropTypes.func, // focus handler
        onPressEnter: PropTypes.func // press-enter handler
    }

    static defaultProps = {
        type: 'text'
    }

    state = {
        focused: false
    }

    constructor() {
        super()
        this.inputRef = React.createRef()
    }

    focus = () => {
        this.inputRef.current.focus()
    }

    onChange = (e) => {
        const { onChange } = this.props
        const value = e.currentTarget.value
        onChange && onChange(value)
    }

    onBlur = (e) => {
        const { onBlur } = this.props
        const value = e.currentTarget.value
        onBlur && onBlur(value)
        this.setState({
            focused: false
        })
    }

    onFocus = (e) => {
        const { onFocus } = this.props
        const value = e.currentTarget.value
        onFocus && onFocus(value)
        this.setState({
            focused: true
        })
    }

    render() {
        const { value, className } = this.props
        const { focused } = this.state

        return (
          <span className={`underline-input-component ${className} ${focused ? 'focused' : ''}`}>
            <input type="text"
                   ref={this.inputRef}
                   value={value}
                   onChange={this.onChange}
                   onFocus={this.onFocus}
                   onBlur={this.onBlur} />
          </span>
        )
    }
}

export default UnderlineInput
