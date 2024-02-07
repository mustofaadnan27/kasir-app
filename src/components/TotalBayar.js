import React from "react";
import { Button, Col, Row } from "reactstrap";
import { numberWithCommas } from "../utils/NumberFormat";
const TotalBayar = ({ dataKeranjang }) => {
//   console.log(dataKeranjang);
//   const keranjangs = dataKeranjang.filter((keranjang) => keranjang.total_harga).reduce((total, keranjang) => {
//     return total+=keranjang.total_harga
//   }, 0)
    const keranjangs = dataKeranjang.reduce(function(result, item){
        return result+=item.total_harga
    }, 0)
//   console.log(keranjangs)
  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="px-4">
             <h4>Total Bayar :<strong className="ps-5">{numberWithCommas(keranjangs)}</strong></h4>

             <div className="pe-0 text-start">
             <Button className="btn-primary mb-3" style={{width:"250px"}}><strong>Bayar</strong></Button>
             </div>
        </Col>
      </Row>
    </div>
  );
};

export default TotalBayar;
