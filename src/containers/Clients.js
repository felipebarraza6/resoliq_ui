import React, { useState, useEffect } from "react";
import { Col, Form, Input, Button, Table, Select } from "antd";

const Clients = () => {
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      name: "Cliente1",
      dni: "11.111.111-1",
      address: "Direccion1",
      phone: "+56 9 1234 5678",
      email: "contact@dominio.cl",
    },
  ]);
  useEffect(() => {
    if (selected) {
      form.setFieldValue("name", selected.name);
      form.setFieldValue("dni", selected.dni);
      form.setFieldValue("address", selected.address);
      form.setFieldValue("phone", selected.phone);
      form.setFieldValue("email", selected.email);
    }
  }, [selected]);
  console.log(selected);
  return (
    <>
      <Col span={16} style={{ padding: "30px" }}>
        <Table
          size="small"
          dataSource={data}
          columns={[
            { title: "Nombre", dataIndex: "name" },
            { title: "Rut", dataIndex: "dni" },
            { title: "Direccion", dataIndex: "address" },
            { title: "Telefono", dataIndex: "phone" },
            {
              render: (x) => (
                <>
                  <Button
                    size="small"
                    style={{ marginRight: "10px" }}
                    type="primary"
                    onClick={() => {
                      if (selected) {
                        const updatedData = data.filter(
                          (item) => item.dni !== selected.dni
                        );
                        setData(updatedData);
                        form.resetFields();
                        setSelected(null);
                      }
                    }}
                    danger
                  >
                    Eliminar
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => setSelected(x)}
                  >
                    Editar
                  </Button>
                </>
              ),
            },
          ]}
        />
      </Col>
      <Col span={8} style={{ padding: "30px" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (selected) {
              const updatedData = data.map((item) => {
                if (item.dni === selected.dni) {
                  return { ...item, ...values };
                }
                return item;
              });
              setData(updatedData);

              setSelected(null);
              form.resetFields();
            } else {
              setData([...data, values]);
            }
          }}
          initialValues={selected}
        >
          <Form.Item label="Nombre" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Rut" name="dni">
            <Input />
          </Form.Item>
          <Form.Item label="Direccion" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Telefono" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginRight: "10px" }}
            >
              {selected ? "Actualizar" : "Crear"}
            </Button>
            <Button onClick={() => form.resetFields()}>Limpiar</Button>
          </Form.Item>
        </Form>
      </Col>
    </>
  );
};

export default Clients;
