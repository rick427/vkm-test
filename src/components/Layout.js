import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Layout, Menu, Breadcrumb} from 'antd';

const {Header, Content, Footer} = Layout;

const LayoutComponent = ({children}) => {
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);

    const handleClick = e => {
        setCurrent(e.key);
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />

                <Menu theme="dark" mode="horizontal" onClick={handleClick} selectedKeys={[current]}>
                    <Menu.Item key="/">
                        <Link to="/">Q-1</Link>
                    </Menu.Item>
                    <Menu.Item key="/question/2">
                        <Link to="/question/2">Q-2</Link>
                    </Menu.Item>
                    <Menu.Item key="/question/3">
                        <Link to="/question/3">Q-3</Link>
                    </Menu.Item>
                </Menu>
            </Header>

            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {location.pathname.split('/')[2] === '3' ? (
                            'Question-3'
                        ) : location.pathname.split('/')[2] === '2' ? (
                            'Question-2'
                        ) : 'Question-1'}
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div className="site-layout-content">
                    {children}
                </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                VKM-TEST 2021
            </Footer>
        </Layout>
    )
}

export default LayoutComponent
