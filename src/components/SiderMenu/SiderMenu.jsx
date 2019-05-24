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
            <Menu.Item key="home">
              <Link to="/home">
                <Icon type="home" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <SubMenu key="components" title={<span><Icon type="apartment" /><span>组件</span></span>}>
              <Menu.Item key="components-loading">
                <Link to="/components/loading">
                  <span>loading</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="user" title={<span><Icon type="user" /><span>用户中心</span></span>}>
              <Menu.Item key="user-info">
                <Link to="/user/info">
                  <span>个人信息</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            {/*<SubMenu key="sub2" title={<span><Icon type="pie-chart" /><span>数据可视化</span></span>}>*/}
            {/*<Menu.Item key="sub1-item1">图表</Menu.Item>*/}
            {/*<Menu.Item key="sub1-item2">热力图</Menu.Item>*/}
            {/*</SubMenu>*/}
            {/*<SubMenu key="sub3" title={<span><Icon type="file-done" /><span>案例</span></span>}>*/}
            {/*<Menu.Item key="sub2-item1">灭霸的响指</Menu.Item>*/}
            {/*<Menu.Item key="sub2-item2">音乐播放器</Menu.Item>*/}
            {/*</SubMenu>*/}
            {/*<Menu.Item key="sub5">*/}
            {/*<Icon type="dot-chart" />*/}
            {/*<span>数据埋点</span>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="sub7">*/}
            {/*<Icon type="setting" />*/}
            {/*<span>系统设置</span>*/}
            {/*</Menu.Item>*/}
          </Menu>
        )
    }
}

export default hot(withRouter(AppMenu))
