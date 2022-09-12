const Invoices = () => {
    return (
        <div className="card">
            <div className="card-header">
                Invoice
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{width: '40%'}}></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Status</td>
                            <td>waiting payment</td>
                        </tr>
                        <tr>
                            <td>Order ID</td>
                            <td>#1</td>
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td>Rp 84.000</td>
                        </tr>
                        <tr>
                            <td>Billed to</td>
                            <td>
                                <b>ALYAD ULYA IMAN</b>
                                <p>alyadulya@gmail.com</p>

                                <p>Kubang Panjang, IV Koto Pulau Punjung, Pulau Punjung, Dharmasraya, Sumatera Barat</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Payment to</td>
                            <td>
                                Edi Hartono<br />
                                edyh221@gmail.com<br />
                                BCA<br />
                                xxxxx-xxxxxx-333-34<br />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Invoices;