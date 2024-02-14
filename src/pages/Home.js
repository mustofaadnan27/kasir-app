import React, { Component } from "react";
import '../index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "reactstrap";
import { Hasil, ListCategories, Menus, NavbarComponent } from "../components";
// import { API_URL } from "./utils/Constant";
import { API_URL } from "../utils/Constant";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: []

    };
  }

  componentDidMount() {
    const productsRequest = axios.get(`${API_URL}/products?category.nama=${this.state.categoriYangDipilih}`);
    const keranjangsRequest = axios.get(`${API_URL}/keranjangs`);
  
    Promise.all([productsRequest, keranjangsRequest])
      .then(([productsRes, keranjangsRes]) => {
        const menus = productsRes.data;
        const keranjangs = keranjangsRes.data;
  
        this.setState({ menus, keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.keranjangs !== nextState.keranjangs;
  // }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    const stateKeranjang = this.state.keranjangs
    console.log(prevState.keranjangs.length);
 
    stateKeranjang.map((keranjang) => {
      if( prevState.keranjangs.length === 0 && this.state.keranjangs.length > 0) {
        return null
      }else if(prevState.keranjangs.length !== this.state.keranjangs.length) {
  
        console.log("Keranjangs berubah!");
           axios
        .get(API_URL + "/keranjangs")
        .then((res) => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch((error) => {
          console.log("Error yaa ", error);
        });
      }

    })
    
  }
  
  
  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value, 
      menus:[],
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

  masukKeranjang = (value) => {
    axios
    .get(`${API_URL}/keranjangs?product.id=${value.id}`)
    .then((res) => {
      console.log(this.state.keranjangs)
        if(res.data.length === 0) {
          const keranjang = {
            jumlah:1,
            total_harga:value.harga,
            product:value
         }
        //  console.log({...this.state.keranjangs})
         const keranjangg = [...this.state.keranjangs]
         keranjangg.push(keranjang);
         console.log(keranjangg);
         this.setState({keranjangs:keranjangg})
         axios
         .post(`${API_URL}/keranjangs`, keranjang)
         .then(res => {
           Swal.fire({
             title: "Sukses",
             text: "sukses masuk keranjang"+keranjang.product.nama,
             icon: "success",
             timer: 1500
           });
         })
         .catch((error) => {
          console.log("Error yaa ", error);
        });
        //  axios
        //  .get(`${API_URL}/keranjangs`)
        //  .then(res => {
        //   this.setState({keranjangs:res.data})
        //  })
        } else {
          const keranjang = {
            jumlah:res.data[0].jumlah+1,
            total_harga:res.data[0].total_harga+value.harga,
            product:value
         }
         axios
         .put(`${API_URL}/keranjangs/${res.data[0].id}`, keranjang)
         .then(res => {
           Swal.fire({
             title: "Sukses",
             text: "sukses masuk keranjang"+keranjang.product.nama,
             icon: "success",
             timer: 1500
           });
         this.setState({keranjangs:keranjang})
           
         })
         .catch((error) => {
          console.log("Error yaa ", error);
        })
        }
    })
    .catch((error) => { 
      console.log(error);
    });
 
  
  }

  render() {
    // console.log(this.state.keranjangs);
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    // console.log(keranjangs);
    return (
      <div className="App">
        <header className="App-header">
          {/* <NavbarComponent dark={true} expand="sm" fixed="top" /> */}
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
                    <Menus menu={menu} key={menu.id} masukKeranjang={this.masukKeranjang} />
                    ))}
                    </Row>
                </Col>
                <Hasil keranjangs={keranjangs} />
              </Row>
            </Container>
          </div>
        </header>
      </div>
    );
  }
}
