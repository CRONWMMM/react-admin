import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import Routes from '../../router'
import './App.less'

const {
    Header, Content, Footer, Sider
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
            <Layout className="app-layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <div className="logo" className="app-logo"></div>
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
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            style={{ fontSize: '26px', marginLeft: '10px', padding: '0 20px' }}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle} />
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <Routes></Routes>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default App
