import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
// utils
import { fullScreen, normalScreen } from 'libs/utils';
// router
import Routes from '../../router'
// style
import './App.less'
// components
import Avatar from '../../components/Avatar/Avatar'
import PageTags from "../../components/PageTags/PageTags";

const {
    Header, Content, Sider
} = Layout
const {
    SubMenu
} = Menu

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
              <Menu theme="dark" defaultSelectedKeys={['sub1']} mode="inline">
                <i className="iconfont iconreact app-logo"></i>
                <Menu.Item key="sub1">
                  <Link to="/">
                    <Icon type="home" />
                    <span>首页</span>
                  </Link>
                </Menu.Item>
                <SubMenu
                    key="sub2"
                    title={<span><Icon type="pie-chart" /><span>数据可视化</span></span>}>
                  <Menu.Item key="sub1-item1">图表</Menu.Item>
                  <Menu.Item key="sub1-item2">热力图</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={<span><Icon type="file-done" /><span>案例</span></span>}>
                  <Menu.Item key="sub2-item1">灭霸的响指</Menu.Item>
                  <Menu.Item key="sub2-item2">音乐播放器</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={<span><Icon type="apartment" /><span>组件</span></span>}>
                  <Menu.Item key="sub3-item1">
                    <Link to="/components/loading">
                      <span>loading</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="sub3-item2">图片剪裁</Menu.Item>
                  <Menu.Item key="sub3-item3">表格</Menu.Item>
                  <Menu.Item key="sub3-item4">拖拽</Menu.Item>
                </SubMenu>
                <Menu.Item key="sub5">
                  <Icon type="dot-chart" />
                  <span>数据埋点</span>
                </Menu.Item>
                <Menu.Item key="sub6">
                  <Link to="/user">
                    <Icon type="user" />
                    <span>个人中心</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="sub7">
                  <Icon type="setting" />
                  <span>系统设置</span>
                </Menu.Item>
              </Menu>
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
