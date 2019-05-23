import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Layout, Breadcrumb, Icon } from 'antd'
// utils
import { fullScreen, normalScreen } from 'libs/utils';
// router
import Routes from '../../router'
// style
import './App.less'
// components
import Avatar from '../../components/Avatar/Avatar'
import SiderMenu from '../../components/SiderMenu/SiderMenu'
import PageTags from '../../components/PageTags/PageTags'

const {
    Header, Content, Sider
} = Layout

class App extends React.Component {
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

    render () {
        const { collapsed, fullScreen } = this.state

        return (
          <Layout className="app-wrapper">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={this.onCollapse}>
              <SiderMenu />
            </Sider>
            <Layout>
              <Header className="app-header">
                {/* left part */}
                <div className="left">
                  <Icon className="app-menu"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggleMenu} />
                  <Breadcrumb className="app-breadcrumb">
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
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

export default hot(App)
