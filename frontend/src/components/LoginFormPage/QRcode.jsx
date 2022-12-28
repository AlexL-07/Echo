import React from "react";
import qrcode from "../../assets/qrcode.png"

const QRCode = () =>{
    return (
        <div>
            <center>
                <div className="img-container">
                    <img src={qrcode} height="200" alt="qr-code"/>
                </div>
                <h2>Echo Github</h2>
                <p className="secondary-text">Scan this QR to view the Github Repo.</p>
            </center>
        </div>
    )
}

export default QRCode