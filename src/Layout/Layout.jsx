import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, DatabaseFilled, ShopFilled, ReadFilled, AppstoreFilled, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Layout as AntLayout, Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags'
import { FcConferenceCall, FcShipped, FcShop, FcFeedback, FcTimeline, FcDoughnutChart, FcViewDetails } from "react-icons/fc";


const { Header, Sider, Content } = AntLayout;


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Users', 'sub1', <FcConferenceCall size={20}/>, [
    getItem('User List', 'userList'),
  ]),
  getItem('Products', 'sub2', <FcShop size={20} />, [
    getItem('Product List', 'productList'),
    getItem('Add Product', 'addProduct')
  ]),
  getItem('Orders', 'sub3', <FcShipped size={20} />, [
    getItem('Orders List', 'ordersList')
  ]),
  getItem('Reviews', 'sub4', <FcFeedback size={20} />, [
    getItem('Reviews List', 'reviewsList')
  ]),
  getItem('Categories', 'sub5', <FcTimeline size={20} />, [
    getItem('Categories List', 'categoriesList'),
    getItem('Add Category', 'addCategory')
  ]),
  getItem('Colors', 'sub6', <FcDoughnutChart size={20}/>, [
    getItem('Colors List', 'colorsList'),
    getItem('Add Color', 'addColor'),
  ]),
  getItem('Brands', 'sub7', <FcViewDetails size={20} />, [
    getItem('Brands List', 'brandsList'),
    getItem('Add Brand', 'addBrand')
  ]),
];


const Layout = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('userList');
  const [collapsed, setCollapsed] = useState(false);

  
  const onClick = (e) => {
    if(e.key !== "userList"){
      navigate(e.key);
      setCurrent(e.key);
    }else{
      setCurrent(e.key);
      navigate("/admin")
    }
  };
  return (
    <AntLayout>
      <Sider trigger={null} theme='light' collapsible collapsed={collapsed}>
        <div className="logo d-flex align-items-center justify-content-center">
          {collapsed ? 
          <div >
           <img src="/images/versace.svg" alt="abc" width={30} className='mt-2'/>
          </div> 
          :
          <div className='d-flex align-items-start justify-content-start'>
            <h2 className='mainTitle'>Rivélle Admin</h2>
          </div>
          }
        </div>
          <Menu
          theme={"light"}
          onClick={onClick}
          
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Sider>
      <AntLayout>
        <Header 
          className='d-flex justify-content-between ps-1 pe-5'
          style={{padding: 0, backgroundColor: "white"}}
          >
          <div className='d-flex align-items-center'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />

            {/* NAVBAR */}
            {/* <div className='nav-bar ms-3 d-flex align-items-center'>
              <input className='form-control form-input' type="text" placeholder='Search' />
            </div> */}
          </div>

          <div className='d-flex gap-5 align-items-center'>

            {/* FLAG */}
            <div>
              <Flag code={"arg"} height={"15"}/>
            </div>

            {/* BELL */}
            {/* <div className='position-relative'>
                <AppstoreFilled className='fs-2'/>
                <span className='position-absolute span-notifications'>3</span>
            </div> */}

            {/* USER */}
            <div className='d-flex gap-3 align-items-center justify-content-center dropdown'>
                {/* User Image */}
                <div className='header-user-image d-flex justify-content-center' role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  <img width={30} height={30} className='img-fluid' src="/images/user.svg" alt="abc"/>
                </div>
                {/* User Details */}
                <div className='d-flex flex-column gap-2 userData'>
                  <span>Nacho GF</span>
                  <span style={{marginTop: "-3rem"}}>rivellecompany@gmail.com</span>
                </div>
                <ul className="dropdown-menu userDropdown" aria-labelledby="dropdownMenuButton1">
                  {/* <li><Link className="dropdown-item" to="/">View Profile</Link></li> */}
                  <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                  <li><Link className="dropdown-item">Logout</Link></li>
                </ul>
            </div>
          </div>
        </Header>

        <Content style={{backgroundColor: "#f5f5f7", padding: 24, minHeight: 280}}>
          <Outlet/>
        </Content>

      </AntLayout>
    </AntLayout>
  );
};
export default Layout;