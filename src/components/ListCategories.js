import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { API_URL } from "../utils/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheese, faCoffee, faUtensils } from "@fortawesome/free-solid-svg-icons";

const Icon = ({nama}) => {
  if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="me-2" />
  if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="" />
  if(nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="me-2" />
}

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        const categories = res.data;
        this.setState({
          categories: categories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state.categories)
    const { categories } = this.state;
    const {changeCategory, categoriYangDipilih} = this.props
    // console.log(categoriYangDipilih);
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
          <hr />
          <ListGroup>
            {categories &&
              categories.map((category) => (
                <ListGroupItem style={{cursor:"pointer"}} className={categoriYangDipilih === category.nama ? "category-active" : ""} key={category.id} onClick={()=>changeCategory(category.nama)}>
                  <Icon nama={category.nama} />{category.nama}
                </ListGroupItem>
              ))}
          </ListGroup>
        </h4>
      </Col>
    );
  }
}
