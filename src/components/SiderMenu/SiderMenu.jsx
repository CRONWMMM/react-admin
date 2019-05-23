import React from 'react'
// components
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
// style
import './SiderMenu.less'

const {
    SubMenu
} = Menu

class AppMenu extends React.Component {
    render() {
        return (
          <Menu className="sider-menu-component"
                  mode="inline"
                  theme="dark"
                  defaultSelectedKeys={['sub1']}>
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
        )
    }
}

export default AppMenu
