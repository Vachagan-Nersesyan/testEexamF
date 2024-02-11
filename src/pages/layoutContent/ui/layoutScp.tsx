import React, { useEffect, useState } from 'react'
import styles from './layoutStl.module.css'
import { OwnProps } from './layoutTs.interface'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaAlignLeft, FaRegNoteSticky, FaRegUser } from "react-icons/fa6";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

import WorkspaceComp from 'pages/exams';
import UserPage from 'pages/userPage';
import SubjectExamComp from 'feautures/subjectExam';
import TableSubjectComp from 'pages/tableSubject';
import TableSubjectItem from 'pages/tableSubjectItem';

const { Header, Sider, Content } = Layout;

interface MenuItem {
    key: string;
    icon: React.ReactNode;
    label: React.ReactNode;
}

const LayoutComp: React.FC<OwnProps> = () => {



    const location = useLocation()


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();



    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);

    const handleMenuSelect = ({ key }: { key: string }) => {
        setSelectedKeys([key]);
    };

    const menuItems: MenuItem[] = [
        {
            key: '1',
            icon: <FaRegUser />,
            label: (
                <NavLink to="/user-page" className={styles.layout_meun_content_item}>
                    <span style={{ paddingTop: '1em', color: 'white', display: !collapsed ? 'block' : 'none' }}>Իմ էջը</span>
                </NavLink>
            ),
        },
        {
            key: '2',
            icon: <FaRegNoteSticky />,
            label: (
                <NavLink to="/admin" className={styles.layout_meun_content_item}>
                    <span style={{ paddingTop: '1em', color: 'white', display: !collapsed ? 'block' : 'none' }}>Թեստեր</span>
                </NavLink>
            ),
        },
        {
            key: '3',
            icon: <FaAlignLeft />,
            label: (
                <NavLink to="/table-subjects" className={styles.layout_meun_content_item}>
                    <span style={{ paddingTop: '1em', color: 'white', display: !collapsed ? 'block' : 'none' }}>Թեստեր ըստ տեսակի</span>
                </NavLink>
            ),
        },
    ];

    return (
        <Layout className={styles.layout_content}>
            <div className={styles.layout_meun_content_overlay}>

                <Sider className={styles.sider_content} trigger={null} width={250} collapsible collapsed={collapsed}>

                    <Menu
                        className={styles.layout_meun_content}
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectedKeys}
                        onSelect={handleMenuSelect}
                    >
                        {menuItems.map((item) => (
                            <Menu.Item
                                key={item.key}
                                icon={item.icon}
                                style={selectedKeys.includes(item.key) ? { backgroundColor: 'black', color: 'white' } : {}}
                            >
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>

                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            color: 'white',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Sider>

            </div>
            <Layout >
                <div className={collapsed ? styles.content_item : styles.content_item_sec}>
                    <Content
                        style={{
                            margin: '24px 56px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {
                            location.pathname.includes('/workspace')
                                ?
                                <UserPage />
                                :
                                location.pathname.includes('/all-exams') || location.pathname.includes('/admin')
                                    ?
                                    <WorkspaceComp />
                                    :
                                    location.pathname.includes('/user-page')
                                        ?
                                        <UserPage />
                                        :
                                        location.pathname.includes('/exams/')
                                            ?
                                            <SubjectExamComp />
                                            :
                                            location.pathname.includes('/table-subjects/type/')
                                                ?
                                                <TableSubjectItem />
                                                :
                                                location.pathname.includes('/table-subjects')
                                                    ?
                                                    <TableSubjectComp />

                                                    :
                                                    null
                        }
                    </Content>
                </div>

            </Layout>
        </Layout >
    )
}

export default LayoutComp