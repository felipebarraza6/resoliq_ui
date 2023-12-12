import React, { useState, useEffect } from "react";
import { Col, Form, Input, Button, Table, Select } from "antd";

const Waste = () => {
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      name: "Aerosoles",
      lastname: "Unidad",
      type: "4",
    },
    {
      name: "Paños",
      lastname: "Unidad",
      type: "2",
    },
    {
      name: "Tonner",
      lastname: "Kilo",
      type: "3",
    },
    {
      name: "Tubos fluorescentes",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Tinetas",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Filtros aire",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Baterías gel",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Envases de silicona",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Envases de pvc",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Envases de adhesivo",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Flexibles( mangueras hidráulica)",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Envases plásticos",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Neumáticos: grua , camión",
      lastname: "Unidad",
      type: "10",
    },
    {
      name: "Fierrillo",
      lastname: "Unidad",
      type: "10",
    },
  ]);
  useEffect(() => {
    if (selected) {
      form.setFieldValue("name", selected.name);
      form.setFieldValue("lastname", selected.lastname);
      form.setFieldValue("type", selected.type);
    }
  }, [selected]);

  data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <>
      <Col span={16} style={{ padding: "30px" }}>
        <Table
          dataSource={data}
          size="small"
          columns={[
            { title: "Nombre", dataIndex: "name" },
            { title: "Tipo medida", dataIndex: "lastname" },
            { title: "Cantidad", dataIndex: "type" },
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
                    Retiro
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
              setData(
                data.map((item) => {
                  if (item.name === selected.name) {
                    return values;
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
          <Form.Item label="Tipo medicion" name="lastname">
            <Input />
          </Form.Item>
          <Form.Item label="Cantidad" name="type">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginRight: "10px" }}
            >
              {selected ? "Retirar" : "Crear"}
            </Button>
            <Button onClick={() => form.resetFields()}>Limpiar</Button>
          </Form.Item>
        </Form>
      </Col>
    </>
  );
};

export default Waste;
