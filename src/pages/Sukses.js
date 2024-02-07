import React from "react";
import { Link } from "react-router-dom";
import { Button, CardImg } from "reactstrap";
import '../index.css';

const Sukses = () => {
    return(
        <div className="container-fluid text-center" style={{marginTop:'70px'}}>
            <img className="w-25" alt="Sample" src="/assets/images/success.png" />
            <h3>Berhasil Jajan</h3>
            <p>Terimakasih Sudah Memesan</p>
            <Link to="/"><Button className="btn-primary">Kembali</Button></Link>
        </div>
    )
}

export default Sukses