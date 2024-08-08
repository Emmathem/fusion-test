import React, { useState } from 'react';
import { Button, Layout, theme, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoneyCollectOutlined,
    MoneyCollectTwoTone,
    UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLB },
    } = theme.useToken();

    const handleChange = (log) => {
        console.log(log);
    };
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                // collapsedWidth={0}
                style={{ overflow: 'auto', zIndex: 9, height: '100vh', left: 0 }}
            >
                <div className="demo-logo-vertical">
                    <span>FUSION SANDBOX</span>
                </div>
                <div className="p-4">
                    <span className="text-white">
                        <Link to="/plaid-test">Plaid Test</Link>
                    </span>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <MoneyCollectTwoTone />,
                            label: 'Collection',
                        },
                        {
                            key: '2',
                            icon: <MoneyCollectOutlined />,
                            label: 'SendR',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'Payout',
                        },
                    ]}
                    onChange={handleChange}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        onClick={() => setCollapsed(!collapsed)}
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        style={{
                            fontSize: '14px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLB,
                    }}
                >
                    <div>{children}</div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
