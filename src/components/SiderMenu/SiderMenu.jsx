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
        autoOpen: PropTypes.bool, // 是否开启自动展开菜单功能（如果当前激活的是子菜单，能够自动展开相应的父级菜单）
        singleOpen: PropTypes.bool // 是否开启单一展开功能（手风琴效果）
    }

    static defaultProps = {
        autoOpen: true,
        singleOpen: true
    }

    state = {
        openKeys: [], // 当前展开的 SubMenu 菜单项 key 数组
        selectedKeys: [ 'home' ] // 当前选中的菜单项 key 数组
    }

    componentWillMount() {
        const { autoOpen, history: $history } = this.props
        let firstLoad = true

        autoOpen && this._resetOpenKeys(routes)
        this._resetSelectedKeys(routes)

        $history.listen(() => {
            setTimeout(() => {
                if (firstLoad) return firstLoad = false
                autoOpen && this._resetOpenKeys(routes)
                this._resetSelectedKeys(routes)
            }, 0)
        })
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
     * 重置打开菜单
     * @param routes { Array } 外部传入的路由配置数组
     */
    _resetOpenKeys(routes) {
        const { location: { pathname } } = this.props
        const targetRoute = findDeeply(routes, ({ children = [] }) => children.some(({ path }) => path === pathname))
        if (targetRoute) {
            this.setState({
                openKeys: [ targetRoute.name ]
            })
        } else {
            this.setState({ openKeys: [] })
        }
    }

    /**
     * 重置高亮菜单
     * @param routes { Array } 外部传入的路由配置数组
     */
    _resetSelectedKeys(routes) {
        const { location: { pathname } } = this.props
        const targetRoute = findDeeply(routes, ({ path }) => path === pathname)
        if (targetRoute) {
            this.setState({
                selectedKeys: [ targetRoute.name ]
            })
        }
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
              <Link to="/">
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
