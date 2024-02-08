import React, { useEffect, useState } from "react";
import { Badge, Col, Row } from "reactstrap";
import { API_URL } from "../utils/Constant";
import axios from "axios";
import { numberWithCommas } from "../utils/NumberFormat";
import { ListGroup, ListGroupItem } from "reactstrap";
import TotalBayar from "./TotalBayar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, matchRoutes } from "react-router-dom";
import Sukses from "../pages/Sukses";
import { useNavigate } from "react-router-dom";

const Hasil = ({ keranjangs }) => {
  const navigate = useNavigate();
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
  const handlePayShop = (total_bayar) => {
    const pesanan = {
      total_bayar:total_bayar,
      menus:keranjangs
    }
    axios.post(`${API_URL}/pesanans`, pesanan)
    .then(res => {
      navigate("/sukses")
    })
    .catch(error => {
      console.log(error)
    })
  }
  

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
      <TotalBayar handlePayShop={handlePayShop} dataKeranjang={dataKeranjang} />
    </Col>
  );
};

export default Hasil;
