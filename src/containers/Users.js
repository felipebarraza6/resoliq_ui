import React, { useState, useEffect } from "react";
import { Col, Form, Input, Button, Table, Select } from "antd";

const Users = () => {
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selected) {
      form.setFieldValue("name", selected.name);
      form.setFieldValue("lastname", selected.lastname);
      form.setFieldValue("type", selected.type);
    }
  }, [selected]);
  console.log(selected);
  return (
    <>
      <Col span={12} style={{ padding: "30px" }}>
        <Table
          dataSource={data}
          columns={[
            { title: "Nombre", dataIndex: "name" },
            { title: "Apellido", dataIndex: "lastname" },
            { title: "Tipo usuario", dataIndex: "type" },
            {
              render: (x) => (
                <>
                  <Button
                    style={{ marginRight: "10px" }}
                    type="primary"
                    danger
                    onClick={() => {
                      setData(data.filter((y) => y.name !== x.name));
                    }}
                  >
                    Eliminar
                  </Button>
                  <Button type="primary" onClick={() => setSelected(x)}>
                    Editar
                  </Button>
                </>
              ),
            },
          ]}
        />
      </Col>
      <Col span={12} style={{ padding: "30px" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (selected) {
              setData(
                data.map((item) => {
                  if (item.name === selected.name) {
                    return {
                      ...item,
                      name: values.name,
                      lastname: values.lastname,
                      type: values.type,
                    };
                  }
                  return item;
                })
              );
              form.resetFields();
              setSelected(null);
            } else {
              setData([...data, values]);
              form.resetFields();
            }
          }}
          initialValues={selected}
        >
          <Form.Item label="Nombre" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Apellido" name="lastname">
            <Input />
          </Form.Item>
          <Form.Item label="Tipo Usuario" name="type">
            <Select placeholder="Selecciona una opcion">
              <Select.Option value="Administrador">Administrador</Select.Option>
              <Select.Option value="Bodega">Bodega</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Contraseña" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginRight: "10px" }}
            >
              Crear
            </Button>
            <Button onClick={() => form.resetFields()}>Limpiar</Button>
          </Form.Item>
        </Form>
      </Col>
    </>
  );
};

export default Users;
