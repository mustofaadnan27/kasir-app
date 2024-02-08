import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, CardImg } from "reactstrap";
import "../index.css";
import axios from "axios";
import { API_URL } from "../utils/Constant";

const Sukses = () => {
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/keranjangs`);
        setKeranjangs(response.data);

        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    keranjangs.map(async (keranjang) => {
      // console.log(keranjang.id);
      try {
        const deleteResponse = await axios.delete(`${API_URL}/keranjangs/${keranjang.id}`);
        // console.log(deleteResponse);
      } catch (error) {
        console.error(error);
      }
    });
  }, [keranjangs]); 

  // console.log(keranjangs);

  return (
    <div className="container-fluid text-center" style={{ marginTop: "70px" }}>
      <img className="w-25" alt="Sample" src="/assets/images/success.png" />
      <h3>Berhasil Jajan</h3>
      <p>Terimakasih Sudah Memesan</p>
      <Link to="/">
        <Button className="btn-primary">
          Kembali
        </Button>
      </Link>
    </div>
  );
};


export default Sukses;
