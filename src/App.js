import React, { Component } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "reactstrap";
import { Hasil, ListCategories, NavbarComponent } from "./components";
import { API_URL } from "./utils/Constant";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus }); //menus:menus
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.menus);
    const { menus } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <NavbarComponent dark={true} expand="sm" />
          <div className="mt-3">
            <Container fluid>
              <Row>
                <ListCategories />
                <Col>
                  <h4>
                    <strong>Daftar Produk</strong>
                  </h4>
                  <hr />
                  {menus && menus.map((menu) => <h4>{menu.nama}</h4>)}
                </Col>
                <Hasil />
              </Row>
            </Container>
          </div>
        </header>
      </div>
    );
  }
}
