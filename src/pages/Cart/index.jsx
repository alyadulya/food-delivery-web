const Cart = () => {
    return (
        <div className="card">
            <div className="card-header">
                Keranjang belanja
            </div>
            <div className="card-body">
                <h3 className="card-title">Sub total: Rp 64.000</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Gambar</th>
                            <th scope="col">Barang</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="..." class="card-img-top" alt="..." /></td>
                            <td>Triple Burger</td>
                            <td>Rp 33.000</td>
                            <td>
                                <button className="btn btn-primary btn-sm">-</button>
                                {` 1 `}
                                <button className="btn btn-primary btn-sm">+</button>
                            </td>
                        </tr>
                        <tr>
                            <td><img src="..." class="card-img-top" alt="..." /></td>
                            <td>Pizza</td>
                            <td>Rp 31.000</td>
                            <td>
                                <button className="btn btn-primary btn-sm">-</button>
                                {` 1 `}
                                <button className="btn btn-primary btn-sm">+</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Cart;