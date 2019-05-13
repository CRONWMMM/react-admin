import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
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
        collapsed: false
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed })
    }

    toggle = () => {
        const { collapsed } = this.state
        this.setState({
            collapsed: !collapsed,
        });
    }

    render () {
        const { collapsed } = this.state

        return (
          <Layout className="app-wrapper">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={this.onCollapse}>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <i className="iconfont iconreact app-logo"></i>
                <SubMenu
                        key="sub1"
                        title={<span><Icon type="pie-chart" /><span>数据可视化</span></span>}>
                  <Menu.Item key="sub1-item1">图表</Menu.Item>
                  <Menu.Item key="sub1-item2">热力图</Menu.Item>
                </SubMenu>
                <SubMenu
                        key="sub2"
                        title={<span><Icon type="file-done" /><span>案例</span></span>}>
                  <Menu.Item key="sub2-item1">灭霸的响指</Menu.Item>
                  <Menu.Item key="sub2-item2">音乐播放器</Menu.Item>
                </SubMenu>
                <SubMenu
                        key="sub3"
                        title={<span><Icon type="apartment" /><span>组件</span></span>}>
                  <Menu.Item key="sub3-item1">图片剪裁</Menu.Item>
                  <Menu.Item key="sub3-item2">表格</Menu.Item>
                  <Menu.Item key="sub3-item3">拖拽</Menu.Item>
                </SubMenu>
                <Menu.Item key="sub4">
                  <Icon type="dot-chart" />
                  <span>数据埋点</span>
                </Menu.Item>
                <Menu.Item key="sub5">
                  <Icon type="user" />
                  <span>个人中心</span>
                </Menu.Item>
                <Menu.Item key="sub6">
                  <Icon type="setting" />
                  <span>系统设置</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header className="app-header">
                {/* left part */}
                <div className="left">
                  <Icon
                            className="app-menu"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle} />
                  <Breadcrumb className="app-breadcrumb">
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                {/* right part */}
                <div className="right">
                  <a href="#" className="header-part header-icon">
                    <Icon type="fullscreen" />
                  </a>
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

export default App
