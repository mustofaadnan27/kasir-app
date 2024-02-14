import React, { useEffect, useState } from "react";
import {
  Badge,
  Col,
  Row,
} from "reactstrap";
import { API_URL } from "../utils/Constant";
import axios from "axios";
import { numberWithCommas } from "../utils/NumberFormat";
import { ListGroup, ListGroupItem } from "reactstrap";
import TotalBayar from "./TotalBayar";
import { useNavigate } from "react-router-dom";
import ModalKeranjang from "./ModalKeranjang";

const Hasil = ({ keranjangs, args }) => {
  const navigate = useNavigate();
  const [dataKeranjang, setDataKeranjang] = useState([]);
  const [modalCart, setModalCart] = useState({
    id:null,
    jumlah: 0,
    total_harga: 0,
    keterangan: null,
  });
  const [cart, setCart] = useState({});
  const [modal, setModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      id:cart.id,
      jumlah:modalCart.jumlah,
      product:cart.product,
      total_harga:modalCart.total_harga,
      keterangan:modalCart.keterangan
    }
    axios.put(`${API_URL}/keranjangs/${data.id}`, data)
    .then(res => {
      console.log("success ganti data")
    })
    .catch(error => {
      console.log(error);
    })
    console.log(data);

  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  const toggle = (keranjang) => {
    setModal(!modal);
    setCart(keranjang);
    const harga = keranjang.total_harga / keranjang.jumlah;
    console.log(harga);
    console.log(cart);
    setModalCart({
      jumlah: keranjang.jumlah,
      total_harga: keranjang.total_harga,
      keterangan: "",
    });
    console.log(keranjang.jumlah);
  };
  const handleKeterangan = (event) => {
    setModalCart({
      jumlah: modalCart.jumlah,
      total_harga: modalCart.total_harga,
      keterangan: event.target.value,
    });
    console.log(modalCart);
  };
  const handleMin = () => {
    if (modalCart.jumlah > 1) {
      setModalCart({
        jumlah: modalCart.jumlah - 1,
        total_harga: (modalCart.total_harga / modalCart.jumlah) * (modalCart.jumlah - 1),
        keterangan: modalCart.keterangan,
      });
    } else {
      setIsVisible(true);
    }
  };

  const handlePlus = () => {
    const harga = modalCart.total_harga / modalCart.jumlah;
    console.log(harga);
    setModalCart({
      jumlah: modalCart.jumlah + 1,
      total_harga: harga * (modalCart.jumlah + 1),
      keterangan: modalCart.keterangan,
    });
    console.log(modalCart.jumlah);
  };

  useEffect(() => {
    console.log(modalCart);
  }, [modalCart]);

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
      total_bayar: total_bayar,
      menus: keranjangs,
    };
    axios
      .post(`${API_URL}/pesanans`, pesanan)
      .then((res) => {
        navigate("/sukses");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Hasil</strong>
        <hr />
      </h4>
      {Array.isArray(dataKeranjang) && dataKeranjang.length !== 0 && (
        <ListGroup flush>
          {dataKeranjang.map((keranjang) => (
            <ListGroupItem
              tag="a"
              key={keranjang.id}
              onClick={() => toggle(keranjang)}
            >
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
      <ModalKeranjang
        modal={modal}
        toggle={toggle}
        cart={cart}
        handleMin={handleMin}
        handlePlus={handlePlus}
        modalCart={modalCart}
        handleKeterangan={handleKeterangan}
        isVisible={isVisible}
        handleSubmit={handleSubmit}
      />

      <TotalBayar handlePayShop={handlePayShop} dataKeranjang={dataKeranjang} />
    </Col>
  );
};

export default Hasil;
