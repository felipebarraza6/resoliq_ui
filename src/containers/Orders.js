import React, { useState, useEffect } from "react";
import { Col, Form, Input, Button, Table, Select, Row, Checkbox, InputNumber } from "antd";
import pdf from "../assets/reporte.pdf";

import jsPDF from "jspdf";

const Orders = () => {
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      name: "VH12345",
      lastname: "VHHAS12",
      type: "Cliente1",
      residuals: true,
      res: [{ res: "Aerosoles", qt: 10 }],
    },
  ]);

  const [list, setList] = useState([]);
  const [element, setElement] = useState([]);
  console.log(data);
  useEffect(() => {
    if (selected) {
      form.setFieldValue("name", selected.name);
      form.setFieldValue("lastname", selected.lastname);
      form.setFieldValue("type", selected.type);
    }
  }, [selected, data]);

  return (
    <>
      <Col span={14} style={{ padding: "30px" }}>
        <Table
          size="small"
          dataSource={data}
      bordered
          columns={[
            { title: "Camion", dataIndex: "lastname" },
            { title: "Cliente", dataIndex: "type" },
            {
                title: "Reposicion",
                dataIndex: "residuals",
                render: (x) => (<><InputNumber placeholder="Cantidad" style={{width:'100px'}} /></>)
            },
            {
              title: "Residuos",
              dataIndex: "res",
              render: (x) => (
                <>
                  {x && (
                    <>
                      {x.map((r) => (
                        <>
                          {r.res}: {r.qt}
                          <br />
                        </>
                      ))}
                    </>
                  )}
                </>
              ),
            },
            {
              render: (x) => (
                <>
                  <Button
                    type="dashed"
                    style={{ marginRight: "5px" }}
                    size="small"
                    onClick={() => {
                      window.open(pdf);
                      const doc = new jsPDF();
                      doc.text(`Cliente: ${x.type}`, 20, 20);
                      doc.text(`Patente: ${x.lastname}`, 20, 30);
                      doc.text(`Listado Residuos:`, 20, 40);
                      const resList = x.res.map((r) => `${r.res}: ${r.qt}`);
                      doc.text(resList, 30, 50);
                      doc.save("documento.pdf");
                    }}
                  >
                    Descargar
                  </Button>

                  <Button
                    size="small"
                    type="primary"
                    danger
                    onClick={() => {
                      setData(
                        data.filter((item) => item.lastname !== x.lastname)
                      );
                    }}
                  >
                    Eliminar
                  </Button>
                </>
              ),
            },
          ]}
        />
      </Col>
      <Col span={10} style={{ padding: "30px" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {

            if (selected) {
            } else {
              setData([...data, { ...values, res: list }]);
            }
          }}
          initialValues={selected}
        >
          <Form.Item label="Cliente" name="type">
            <Select
              placeholder="Selecciona un cliente"
              style={{ float: "left" }}
              defaultOpen={"cliente1"}
            >
              <Select.Option value="cliente1">
                Cliente1 (11.111.111.-1)
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Camion" name="lastname">
            <Select
              placeholder="Selecciona un camion"
              style={{ float: "left" }}
            >
              <Select.Option value="DPRR72">DPRR72</Select.Option>
              <Select.Option value="RSVJ79">RSVJ79</Select.Option>
              <Select.Option value="FTZK70">FTZK70</Select.Option>
              <Select.Option value="STYP33">STYP33</Select.Option>
              <Select.Option value="SYZR71">SYZR71</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Residuo" name="type">
            <Select
              placeholder="Selecciona un residuo"
              style={{ width: "200px", float: "left" }}
              onSelect={(value) => setElement({ ...element, res: value })}
            >
              <Select.Option value="Aerosoles">Aerosoles</Select.Option>
              <Select.Option value="Filtros">Filtros</Select.Option>
              <Select.Option value="Baterías ge">Baterías ge</Select.Option>
              <Select.Option value="Envases de adhesivo">
                Envases de adhesivo
              </Select.Option>
              <Select.Option value="Tonner">Tonner</Select.Option>
              <Select.Option value="Fenol">Fenol</Select.Option>
              <Select.Option value="Fierrillo">Fierrillo</Select.Option>
              <Select.Option value="Bombonas">Bombonas</Select.Option>
              <Select.Option value="Bencina">Bencina</Select.Option>
              <Select.Option value="Plomo">Plomo</Select.Option>
              <Select.Option value="Fueloil">Fueloil</Select.Option>
              <Select.Option value="Pilas">Pilas</Select.Option>
            </Select>
            <Input
              style={{ width: "100px", marginRight: "10px" }}
              type="number"
              placeholder="cantidad"
              onChange={(e) => setElement({ ...element, qt: e.target.value })}
            />
            <Button onClick={() => setList([...list, element])}>
              Agregar(+)
            </Button>
            <Row
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                marginTop: "10px",
                padding: "10px",
              }}
            >
              {list.map((e) => (
                <>
                  <Col
                    span={12}
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                  >
                    {e.res}
                  </Col>
                  <Col
                    span={6}
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                  >
                    {e.qt}
                  </Col>
                  <Col
                    span={6}
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                  >
                    <Button
                      danger
                      type="primary"
                      size="small"
                      onClick={() => {
                        setList(list.filter((x) => x.res !== e.res));
                      }}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </>
              ))}
            </Row>
          </Form.Item>
          <Form.Item label="Reposicion">
            <Checkbox>Si</Checkbox> 
            <Checkbox>No</Checkbox> 
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginRight: "10px" }}
            >
              Crear
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setList([]);
              }}
            >
              Limpiar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </>
  );
};

export default Orders;
