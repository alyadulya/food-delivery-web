const Checkout = () => {
    return (
        <div className="card">
            <div className="card-header">
                Checkout
            </div>
            <div className="card-body">
                <h3 className="card-title">Konfirmasi</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{width: '40%'}}></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Alamat</td>
                            <td>
                                <b>Rumah</b>
                                <p>Kubang Panjang, IV Koto Pulau Punjung, Pulau Punjung, Dharmasraya, Sumatera Barat</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Sub total</td>
                            <td>Rp 64.000</td>
                        </tr>
                        <tr>
                            <td>Ongkir</td>
                            <td>Rp 20.000</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope="col">Total</th>
                            <th scope="col">Rp 84.000</th>
                        </tr>
                    </tfoot>
                </table>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary">Sebelumnya</button>
                    <button className="btn btn-success">BAYAR</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout;