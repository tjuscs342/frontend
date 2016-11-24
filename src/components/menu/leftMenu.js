import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
import { Link } from 'react-router'

class LeftMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '10'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    this.props.setMenuShow(false)
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Menu
          theme="dark"
          onClick={this.handleClick}
          style={{ width: '100%' }}
          defaultOpenKeys={['sub1', 'sub2', 'sub4']}
          selectedKeys={[this.state.current]}
          mode="inline"
          >
          <SubMenu key="sub1" title={<span><Icon type="bars" /><span></span></span>}>
            <Menu.Item key="5"><Link to="/history"><Icon type="clock-circle-o" className="ourColor" />请假历史记录</Link></Menu.Item>
            <Menu.Item key="11"><Link to="/details"><Icon type="info-circle-o" className="ourColor" />关于假期类型的规定</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore-o" /></span>}>
            <MenuItemGroup title="请假系统">
              <Menu.Item key="1"><Link to="/ask"><Icon type="solution" className="ourColor" />申请请假或加班</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/audit"><Icon type="team" className="ourColor" />下属请假批准</Link></Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /></span>}>
            <Menu.Item key="9"><Link to="/me"><Icon type="user" className="ourColor" />个人信息</Link></Menu.Item>
            <Menu.Item key="10" style={{ display: 'none' }}>选项10</Menu.Item>
            <Menu.Item key="12"><span onClick={this.props.logout}><Icon type="logout" className="ourColor" />退出登录</span></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
LeftMenu.propTypes = {
  logout: React.PropTypes.func,
  setMenuShow: React.PropTypes.func
}
export default LeftMenu
