import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { numberWithCommas } from "../utils/NumberFormat";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({
  args,
  modal,
  toggle, 
  cart,
  keterangan,
  handleMin,
  handlePlus,
  modalCart,
  handleKeterangan,
  isVisible,
  handleSubmit,
  dataKeranjang
}) => {
  if (!cart || !cart.product || cart.total_harga === undefined) {
    return null;
  }
  console.log(cart);
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>
          {cart.product.nama}{" "}
          <strong>Rp.{numberWithCommas(cart.product.harga)}</strong>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Total Harga</Label>
              <p>
                <strong>{numberWithCommas(modalCart.total_harga)}</strong>
              </p>
            </FormGroup>
            <FormGroup className="position-relative mt-3">
              <Label>Jumlah :</Label>
              <br />
              <Button
                className="btn btn-primary me-2"
                size="sm"
                onClick={() => handleMin()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong>{modalCart.jumlah}</strong>
              <Button
                className="btn btn-primary ms-2 me-2"
                size="sm"
                onClick={() => handlePlus()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              {isVisible && (
                <Alert className="position-absolute " color="danger">
                  Hey! Minimal pesan satu
                </Alert>
              )}
            </FormGroup>

            <FormGroup className="mt-3">
              <Label for="keterangan">Keterangan :</Label>
              <Input
                id="keterangan"
                name="keterangan"
                type="textarea"
                placeholder="Contoh : Pedas, Asin"
                value={modalCart.keterangan}
                onChange={handleKeterangan}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            <FontAwesomeIcon icon={faTrash} />
            Hapus Pesanan
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalKeranjang;
