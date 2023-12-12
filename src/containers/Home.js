import React, { useState } from "react";
import { Menu, Layout, Button, Row, Col } from "antd";
import logo from "../assets/img/logo.jpg";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import Waste from "./Waste";
import Clients from "./Clients";
import DriversTrucks from "./DriversTrucks";
import Orders from "./Orders";

const { Header, Footer, Sider, Content } = Layout;
const Home = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState(0);
  return (
    <>
      <Sider>
        <img src={logo} width={"80%"} />
        <Row justify={"center"} style={{ marginTop: "70px" }}>
          <Col span={23}>
            <Button
              type="primary"
              block={true}
              style={{ marginBottom: "10px" }}
              onClick={() => setOption(0)}
            >
              Usuarios
            </Button>
            <Button
              type="primary"
              block={true}
              style={{ marginBottom: "10px" }}
              onClick={() => setOption(1)}
            >
              Residuos
            </Button>
            <Button
              type="primary"
              block={true}
              style={{ marginBottom: "10px" }}
              onClick={() => setOption(2)}
            >
              Clientes
            </Button>
            <Button
              type="primary"
              block={true}
              style={{ marginBottom: "10px" }}
              onClick={() => setOption(3)}
            >
              Conductores/Camiones
            </Button>
            <Button
              type="primary"
              block={true}
              style={{ marginBottom: "10px" }}
              onClick={() => setOption(4)}
            >
              Ordenes
            </Button>
          </Col>
        </Row>
      </Sider>
      <Layout>
        <Header>
          <Row>
            <Col offset={19}>
              <Button icon={<UserOutlined />} style={{ marginRight: "10px" }}>
                @usuario
              </Button>
              <Button icon={<LogoutOutlined />} onClick={() => navigate("/")}>
                Salir
              </Button>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row align={"middle"} style={{ height: "80vh" }}>
            {option === 0 && <Users />}
            {option === 1 && <Waste />}
            {option === 2 && <Clients />}
            {option === 3 && <DriversTrucks />}
            {option === 4 && <Orders />}
          </Row>
        </Content>
        <Footer>Resoliq - 2023</Footer>
      </Layout>
    </>
  );
};

export default Home;
