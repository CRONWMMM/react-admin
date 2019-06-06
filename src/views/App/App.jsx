import React from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
// components
import { Layout, Breadcrumb, Icon } from 'antd'
import Avatar from 'components/Avatar/Avatar'
import SiderMenu from 'components/SiderMenu/SiderMenu'
import PageTags from 'components/PageTags/PageTags'

// utils
import { fullScreen, normalScreen, findDeeply } from 'libs/utils';
// router
import Routes from 'router/index'
import routes from 'router/routes'
// style
import './App.less'

const {
    Header, Content, Sider
} = Layout

class App extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    }

    state = {
        collapsed: false, // 左侧主菜单是否折叠，默认否
        fullScreen: false // 是否是全屏，默认否
    }

    /**
     * 切换左侧主菜单折叠
     * @param collapsed {Boolean} 展开/折叠
     */
    onCollapse = (collapsed) => {
        this.setState({ collapsed })
    }

    /**
     * 切换屏幕尺寸（全屏/非全屏）
     */
    toggleScreen = () => {
        const { fullScreen: isFullScreen } = this.state
        isFullScreen ? normalScreen() : fullScreen()
        this.setState({
            fullScreen: !isFullScreen
        })
    }

    toggleMenu = () => {
        const { collapsed } = this.state
        this.setState({
            collapsed: !collapsed,
        });
    }

    /**
     * 根据路由配置文件生成面包屑导航
     * @param routes {Array} 路由配置文件
     */
    generatorBreadcrumb = (routes) => {
        const { location: { pathname } } = this.props
        const pathList = pathname.split('/')
        const len = pathList.length
        let result = []

        for (let i = len - 1; i > 0; i--) {
            const target = findDeeply(routes, route => route.path === pathList.join('/'))
            target && result.unshift(target)
            pathList.pop()
        }

        return result.map(({name, path, meta: { tag }}) => <Breadcrumb.Item key={name || path}>{tag}</Breadcrumb.Item>)
    }

    render () {
        const { collapsed, fullScreen } = this.state

        return (
          <Layout className="app-wrapper">
            <Sider trigger={null}
                   collapsible
                   collapsed={collapsed}
                   onCollapse={this.onCollapse}>
              <SiderMenu singleOpen collapsed={collapsed} />
            </Sider>
            <Layout>
              <Header className="app-header">
                {/* left part */}
                <div className="left">
                  <Icon className="app-menu"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggleMenu} />
                  <Breadcrumb className="app-breadcrumb">
                    {this.generatorBreadcrumb(routes)}
                  </Breadcrumb>
                </div>
                {/* right part */}
                <div className="right">
                  <Icon className="header-part header-icon" type={fullScreen ? 'fullscreen-exit' : 'fullscreen'} onClick={this.toggleScreen} />
                  <Avatar className="header-part" />
                </div>
              </Header>
              <PageTags />
              <Content className="app-main">
                <Routes></Routes>
              </Content>
            </Layout>
          </Layout>
        )
    }
}

export default hot(withRouter(App))
