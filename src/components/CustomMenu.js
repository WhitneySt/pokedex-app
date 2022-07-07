import React, { useState } from "react";
import { Button, Avatar, Tooltip, Drawer, Menu, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionLogoutAsyn } from "../redux/actions/actionLogin";
import { actionClearSync } from "../redux/actions/actionRegister";
import {
    UserOutlined,
    LogoutOutlined,
    AliwangwangOutlined,
    HomeOutlined,
} from "@ant-design/icons";

const CustomMenu = ({ selectedItem }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { displayName, photoURL } = useSelector((store) => store.loginStore);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem("Home", "1", <HomeOutlined />),
        getItem("Poke ball", "2", <AliwangwangOutlined />),
        getItem("Logout", "3", <LogoutOutlined />),
    ];

    return (
        <>
            <Drawer
                title={`Hi, ${displayName}!`}
                placement={"left"}
                closable={true}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                key={"left"}
            >
                <Menu
                    onClick={(e) => {
                        const key = parseInt(e.key);
                        if (key === 1) {
                            navigate("/home");
                        }

                        if (key === 2) {
                            navigate("/pokeball");
                        }

                        if (key === 3) {
                            dispatch(actionLogoutAsyn());
                            dispatch(actionClearSync());
                        }
                    }}
                    style={{ width: "100%" }}
                    defaultSelectedKeys={[selectedItem]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                />
            </Drawer>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Tooltip title="user" color="#2BE7E8">
                        <Button
                            style={{ backgroundColor: "transparent", border: "none" }}
                            onClick={() => setDrawerVisible(true)}
                        >
                            {photoURL ? <Avatar src={<Image
                                preview={false}
                                src={photoURL}
                                style={{
                                    width: 32,
                                }}
                            />} /> : <Avatar icon={<UserOutlined />} />}
                        </Button>
                    </Tooltip>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>Hi!</span>
                        <span>{displayName}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomMenu;