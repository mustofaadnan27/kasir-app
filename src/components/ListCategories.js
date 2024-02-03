import React, { Component } from "react";
import { Col } from "reactstrap";

export default class ListCategories extends Component {
  render() {
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
          <hr />
        </h4>
      </Col>
    );
  }
}
