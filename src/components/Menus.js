import React from "react";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { numberWithCommas } from "../utils/NumberFormat";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col xs={6} md={4} className="mb-4">
      <Card className="shadow" onClick={()=> masukKeranjang(menu)}>
        <img
          alt="Sample"
          src={`assets/images/${menu.category.nama}/${menu.gambar}`}
          style={{height:'auto'}}
        />
        <CardBody>
          <CardTitle tag="h5">
            {menu.nama} <strong>{`(${menu.kode})`}</strong>
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Rp.{numberWithCommas(menu.harga)}
          </CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Menus;
