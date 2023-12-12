import React, { useState, useEffect } from "react";
import { Col, Form, Input, Button, Table, Select } from "antd";

const DriversTrucks = () => {
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      patente: "DPRR72",
    },
    {
      patente: "RSVJ79",
    },
    {
      patente: "FTZK70",
    },
    {
      patente: "STYP33",
    },
    {
      patente: "SYZR71",
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
      <Col span={8} style={{ padding: "30px" }}>
        <Table
          dataSource={data}
          columns={[
            { title: "Patente", dataIndex: "patente" },
            {
              render: (x) => (
                <Button
                  onClick={() => {
                    setData(data.filter((item) => item.patente !== x.patente));
                  }}
                >
                  Eliminar
                </Button>
              ),
            },
          ]}
        />
      </Col>
      <Col span={6} style={{ padding: "30px" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (selected) {
            } else {
              setData([...data, values]);
            }
          }}
          initialValues={selected}
        >
          <Form.Item label="Patente" name="patente">
            <Input />
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

export default DriversTrucks;
