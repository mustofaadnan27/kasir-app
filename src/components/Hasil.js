import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { API_URL } from "../utils/Constant";
import axios from "axios";
// import { numberWithCommas } from "../utils/NumberFormat";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/keranjangs`)
      .then((res) => {
        this.setState({
          keranjangs: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { keranjangs } = this.state;
  
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
          <hr />
        </h4>
        {Array.isArray(keranjangs)&&keranjangs.length !== 0 && (
          <ListGroup flush>
            {keranjangs.map((keranjang) => (
              <ListGroupItem href="#" tag="a" key={keranjang.id}>
                {keranjang.product.nama}
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
