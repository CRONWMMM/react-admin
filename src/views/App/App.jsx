import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
// router
import Routes from '../../router'
// style
import './App.less'
// components
import Avatar from '../../components/Avatar/Avatar'

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
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render () {
        return (
            <Layout className="app-wrapper">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <i className="iconfont iconreact app-logo"></i>
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>User</span></span>}>
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="app-header">
                        {/* left part */}
                        <div className="left">
                            <Icon
                                className="app-menu"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
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
                    <Content className="app-main">
                        <Routes></Routes>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default App
