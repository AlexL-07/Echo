import React from "react";
import qrcode from "../../assets/qrcode.png"

const QRCode = () =>{
    return (
        <div>
            <center>
                <div className="img-container">
                    <img src={qrcode} height="200" alt="qr-code"/>
                </div>
                {/* <h2>Echo Github</h2>
                <p className="secondary-text">Scan this QR to view the Github Repo.</p> */}
                <h2>Log in with QR Code</h2>
                <p>Scan this with the Echo mobile app to log in instantly.</p>
            </center>
        </div>
    )
}

export default QRCode