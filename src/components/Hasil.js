import React, { useEffect, useState } from "react";
import { Badge, Col, Row } from "reactstrap";
import { API_URL } from "../utils/Constant";
import axios from "axios";
import { numberWithCommas } from "../utils/NumberFormat";
import { ListGroup, ListGroupItem } from "reactstrap";
import TotalBayar from "./TotalBayar";

const Hasil = ({ keranjangs }) => {
  const [dataKeranjang, setDataKeranjang] = useState([]);

  useEffect(() => {
    const fetchKeranjangs = async () => {
      try {
        const res = await axios.get(`${API_URL}/keranjangs`);
        setDataKeranjang(res.data);
      } catch (error) {
        console.error("Error fetching keranjangs:", error);
      }
    };

    fetchKeranjangs();
  }, [keranjangs]); // Panggil fetchKeranjangs setiap kali keranjangs berubah
// console.log(keranjangs)
  // console.log(dataKeranjang);

  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Hasil</strong>
        <hr />
      </h4>
      {Array.isArray(dataKeranjang) && dataKeranjang.length !== 0 && (
        <ListGroup flush>
          {dataKeranjang.map((keranjang) => (
            <ListGroupItem href="#" tag="a" key={keranjang.id}>
              <Row>
                <Col xs={2}>
                  <h4>
                    <Badge pill color="success">
                      {keranjang.jumlah}
                    </Badge>
                  </h4>
                </Col>
                <Col>
                  <h5>{keranjang.product.nama}</h5>
                  <p>Rp.{numberWithCommas(keranjang.product.harga)}</p>
                </Col>
                <Col className="text-end">
                  <strong>
                    <p>Rp.{numberWithCommas(keranjang.total_harga)}</p>
                  </strong>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      <TotalBayar dataKeranjang={dataKeranjang} />
    </Col>
  );
};

export default Hasil;
