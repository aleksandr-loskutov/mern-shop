import React, { useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
    UncontrolledTooltip
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/products";

const ProductList = () => {
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    console.log("products here", products);
    return (
        <Col md="9">
            <div className="products">
                <Row>
                    {products.content
                        ? products.content.map((product) => (
                              <Col md="4" sm="4" key={product._id}>
                                  <Card className="card-product card-plain">
                                      <div className="card-image">
                                          <Link
                                              to={`/product/${product.urlAlias}`}
                                          >
                                              <img
                                                  alt={product.name + "."}
                                                  className="img-rounded img-responsive"
                                                  src={
                                                      require(`assets/img/products/${product.article}/${product.article}.jpg`)
                                                          .default
                                                  }
                                              />
                                          </Link>
                                          <CardBody>
                                              <div className="card-description">
                                                  <CardTitle tag="h5">
                                                      {product.name}
                                                  </CardTitle>
                                                  <p className="card-description">
                                                      {product.brand}
                                                  </p>
                                              </div>
                                              <div className="price">
                                                  <h5>{product.price} ₽</h5>
                                              </div>
                                          </CardBody>
                                      </div>
                                  </Card>
                              </Col>
                          ))
                        : "Загрузка"}
                </Row>
                <Col className="offset-md-4" md="3">
                    <Button
                        className="btn-round"
                        color="default"
                        data-rotation-color="gray"
                        id="successBtn"
                        outline
                    >
                        Load more...
                    </Button>
                </Col>{" "}
            </div>
        </Col>
    );
};

export default ProductList;
