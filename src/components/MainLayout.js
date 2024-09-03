import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { FaClipboardList, FaUserFriends } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { IoIosColorPalette, IoMdAddCircleOutline } from "react-icons/io";
import {
  MdAddShoppingCart,
  MdAssignmentAdd,
  MdFormatListBulletedAdd,
  MdFormatListNumbered,
} from "react-icons/md";
import {
  RiApps2AddLine,
  RiCoupon2Line,
  RiDashboard3Fill,
  RiListOrdered2,
} from "react-icons/ri";
import {
  TbBellRinging,
  TbBrandAmongUs,
  TbCategory2,
  TbCategoryMinus,
} from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-vertical text-center py-2">
          <h3>Admin</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <RiDashboard3Fill className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "Shop",
              icon: <CiCircleList className="fs-5" />,
              label: "Shop",
              children: [
                {
                  key: "product",
                  icon: <MdAddShoppingCart className="fs-5" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <TiShoppingCart className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <IoMdAddCircleOutline className="fs-5" />,
                  label: "Add Brand",
                },
                {
                  key: "brand-list",
                  icon: <TbBrandAmongUs className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <IoMdAddCircleOutline className="fs-5" />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <TbCategoryMinus className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <IoMdAddCircleOutline className="fs-5" />,
                  label: "Add Color",
                },
                {
                  key: "color-list",
                  icon: <IoIosColorPalette className="fs-5" />,
                  label: "Color List",
                },
              ],
            },

            {
              key: "Blog",
              icon: <FaListCheck className="fs-5" />,
              label: "Blog",
              children: [
                {
                  key: "blog",
                  icon: <MdFormatListBulletedAdd className="fs-5" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <MdFormatListNumbered className="fs-5" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <MdAssignmentAdd className="fs-5" />,
                  label: "Add Category",
                },
                {
                  key: "blog-category-list",
                  icon: <TbCategory2 className="fs-5" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "coupon",
              icon: <RiApps2AddLine className="fs-5" />,
              label: "Add Coupon",
            },
            {
              key: "coupon-list",
              icon: <RiCoupon2Line className="fs-5" />,
              label: "Coupon List",
            },

            {
              key: "orders",
              icon: <RiListOrdered2 className="fs-5" />,
              label: "Orders List",
            },
            {
              key: "customers",
              icon: <FaUserFriends className="fs-5" />,
              label: "Customers",
            },
            {
              key: "enquires",
              icon: <FaClipboardList className="fs-5" />,
              label: "Enquires",
            },
          ]}
        />
      </Sider>
      <Layout className="main-content">
        <Header
          style={{ padding: "0px 20px 0px 0px", background: colorBgContainer }}
          className="d-flex justify-content-between align-items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="right-header mr-5 d-flex align-items-center justify-content-between">
            <div className="px-4 position-relative">
              <TbBellRinging className="fs-4" />
              <div className="header-count position-absolute">5</div>
            </div>
            <div className="profile d-flex align-items-center">
              <img
                src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                style={{ maxHeight: "35px" }}
                className="m-2 rounded"
                alt=""
              />
              <div className="profile-details">
                <h5 className="m-0">Dipan Samadder</h5>
                <p className="m-0">dipansamadder99@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
