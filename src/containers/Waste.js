import React, { useState, useEffect } from "react";
import { Col, Form, Input, Button, Table, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ExcelJS from "exceljs";

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

  const downloadExcel = () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet
    const worksheet = workbook.addWorksheet("Residuos");

    // Define the column headers
    worksheet.columns = [
      { header: "Nombre", key: "name", width: 20 },
      { header: "Tipo medida", key: "lastname", width: 20 },
      { header: "Cantidad", key: "type", width: 10 },
    ];

    // Add the data rows
    data.forEach((row) => {
      worksheet.addRow(row);
    });

    // Generate a buffer from the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      // Create a Blob from the buffer
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "residuos.xlsx";

      // Simulate a click on the link to start the download
      link.click();

      // Clean up the URL and link
      URL.revokeObjectURL(url);
      link.remove();
    });
  };

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
      <Col>
        <Button
          style={{
            marginLeft: "30px",
            backgroundColor: "green",
            color: "white",
          }}
          onClick={downloadExcel}
          icon={<DownloadOutlined />}
        >
          Descargar listado de residuos
        </Button>
      </Col>
    </>
  );
};

export default Waste;
