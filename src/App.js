import React, { Component } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "reactstrap";
import { Hasil, ListCategories, Menus, NavbarComponent } from "./components";
import { API_URL } from "./utils/Constant";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan"
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/products?category.nama=${this.state.categoriYangDipilih}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus }); //menus:menus
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus:[]
    })

    axios
    .get(`${API_URL}/products?category.nama=${value}`)
    .then((res) => {
      const menus = res.data;
      this.setState({ menus }); //menus:menus
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    // console.log(this.state.menus);
    const { menus, categoriYangDipilih } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <NavbarComponent dark={true} expand="sm" fixed="top" />
          <div className="" style={{marginTop:'70px'}}>
            <Container fluid>
              <Row>
                <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih}  />
                <Col>
                  <h4>
                    <strong>Daftar Produk</strong>
                  </h4>
                  <hr />
                  <Row>
                  {menus && menus.map((menu) => (
                    <Menus menu={menu} key={menu.id} />
                    ))}
                    </Row>
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
