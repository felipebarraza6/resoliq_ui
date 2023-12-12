import React from "react";
import { Row, Col, Input, Button, Form, Typography } from "antd";
import logo from "../assets/img/logo.jpg";
import logoserco from "../assets/img/sercologo.jpeg";
import { useNavigate } from "react-router-dom";
import { UserOutlined, SecurityScanFilled } from "@ant-design/icons";
const { Title } = Typography;
const Login = () => {
  const navigate = useNavigate();
  return (
    <Row justify={"center"} style={styles.container} align={"middle"}>
      <Col span={24}>
        <img src={logo} alt="logo" width={"30%"} />
      </Col>
      <Col style={styles.colLogin}>
        <Form>
          <Title style={styles.title}>Iniciar Sesión</Title>
          <Form.Item>
            <Input prefix={<UserOutlined />} placeholder="Usuario" />
          </Form.Item>
          <Form.Item>
            <Input prefix={<SecurityScanFilled />} placeholder="Contraseña" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => navigate("/home")}>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col>
        <img src={logoserco} width={"20%"} />
      </Col>
    </Row>
  );
};

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#030852",
  },
  colLogin: {},
  title: {
    color: "white",
  },
};

export default Login;
