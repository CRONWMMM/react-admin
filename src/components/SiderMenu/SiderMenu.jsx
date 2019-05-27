import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
// routes
import routes from 'router/routes'
// utils
import { findDeeply } from 'libs/utils'
// components
import { Menu, Icon } from 'antd'
// style
import './SiderMenu.less'

const {
    SubMenu
} = Menu

class AppMenu extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        collapsed: PropTypes.bool, // 菜单是否全部折叠（在简约模式下有用）
        singleOpen: PropTypes.bool // 是否开启单一展开功能（手风琴效果）
    }

    static defaultProps = {
        collapsed: false,
        singleOpen: true
    }

    state = {
        locked: false, // 线程锁
        openKeys: [], // 当前展开的 SubMenu 菜单项 key 数组
        selectedKeys: [ 'home' ] // 当前选中的菜单项 key 数组
    }

    componentWillMount() {
        const { history: $history } = this.props
        this._resetMenuState(routes)

        $history.listen(() => {
            setTimeout(this._resetMenuState, 0, routes)
        })
    }

    componentWillReceiveProps(nextProps) {
        const { collapsed } = nextProps
        if (collapsed) {
            this.setState({
                openKeys: []
            })
        } else {
            setTimeout(this._resetMenuState, 0, routes)
        }
    }

    /**
     * 菜单折叠状态改变时的回调
     * @param openKeys {Array} 此时展开的菜单 keyList
     */
    handleOpenChange = (openKeys) => {
        const { singleOpen } = this.props

        this.setState({
            openKeys: singleOpen ? [ openKeys.pop() ] : openKeys
        })
    }

    /**
     * 菜单选中状态改变时的回调
     * @param key
     */
    handleSelect = ({ key }) => {
        this.setState({
            selectedKeys: [ key ]
        })
    }

    /**
     * 处理 selectedKeys / openKeys 状态改变的回调
     * @param routes {Array} 外部传入的路由配置数组
     */
    _resetMenuState = (routes) => {
        const { locked, openKeys, selectedKeys } = this.state
        const { collapsed } = this.props

        if (locked) {
            return
        } else {
            this.setState({
                locked: true
            })
        }

        const { singleOpen, location: { pathname } } = this.props
        // 查询当前应该高亮的路由 name
        const { name }  = findDeeply(routes, ({ path }) => path === pathname) || {}
        // 查询当前应该展开的父级路由 name
        const { name: parentName } = findDeeply(routes, ({ children = [] }) => children.some(({ path }) => path === pathname)) || {}

        let newState = {
            locked: false,
            openKeys: collapsed ? [] : parentName && singleOpen ? [ parentName ] : parentName && !singleOpen ? openKeys : [],
            selectedKeys: name ? [ name ] : selectedKeys,
        }
        this.setState(newState)
    }

    /**
     * 生成菜单列表
     * @param routes {Array} 路由配置对象
     * @returns {Array}
     * @private
     */
    _generatorMenuItem = (routes) => {
        let result = []

        for (let i = 0, len = routes.length; i < len; i++) {
            let { name, path, meta = {}, children } = routes[i]
            let { tag, icon } = meta

            if (!name) { // 如果没有 name 就不需要生路由组件了
                // eslint-disable-line
            } else if (children) { // 如果还有子路由，使用 SubMenu 组件包裹最外层，然后递归 children
                result.push(
                  <SubMenu key={name}
                           title={(
                             <span>
                               {icon ? <Icon type={icon} /> : null}
                               <span>{tag}</span>
                             </span>
                            )}>
                    {children ? this._generatorMenuItem(children) : null}
                  </SubMenu>
                )
            } else {
                result.push(
                  <Menu.Item key={name}>
                    <Link to={path}>
                      {icon ? <Icon type={icon} /> : null}
                      <span>{tag}</span>
                    </Link>
                  </Menu.Item>
                )
            }
        }
        return result
    }

    render() {
        let { openKeys, selectedKeys } = this.state

        return (
          <Menu className="sider-menu-component"
                mode="inline"
                theme="dark"
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                defaultOpenKeys={openKeys}
                defaultSelectedKeys={selectedKeys}
                onOpenChange={this.handleOpenChange}
                onSelect={this.handleSelect}>
            <i className="iconfont iconreact app-logo"></i>
            {this._generatorMenuItem(routes)}
          </Menu>
        )
    }
}

export default hot(withRouter(AppMenu))
