import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import swal from "sweetalert";
import { createOrder } from "../../app/api/order";
import { clearItems } from "../../app/features/Cart/action";
import { useAddressData } from "../../app/hooks/address";
import { formatRupiah, sumPrice, useDocumentTitle } from "../../app/utils";
import { config } from "../../config";

const Checkout = () => {
    useDocumentTitle('Checkout');
    
    const cartItems = useSelector(state => state.cart);
    const total = parseInt(sumPrice(cartItems)) + parseInt(config.global_ongkir);
    const { count, data, limit, page, setPage, status } = useAddressData();

    const [toggleConfirmation, setToggleConfirmation] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckbox = (checked, address) => {
        if (checked === true) {
            setSelectedAddress(address);
        } else {
            setSelectedAddress({});
        }
    }

    const handleSelectedAddress = () => {
        if (!Object.keys(selectedAddress).length) {
            swal({
                text: "Pilih salah satu alamat pengiriman!",
                icon: "warning"
            })
        } else {
            setToggleConfirmation(true);
        }
    }

    const handleCreateOrder = async () => {
        let payload = {
            delivery_address: selectedAddress._id,
            delivery_fee: config.global_ongkir
        }

        const { data } = await createOrder(payload);
        if(!data.error) {
            dispatch(clearItems());
            navigate(`/invoices/${data._id}`);
        }
    }

    if(!cartItems) return navigate('/');
    
    if (status === 'process') return (
        <div className="row justify-content-center">
            <div className="col-4">
                <PuffLoader size={100} color="#0d6efd" cssOverride={{ display: 'table', margin: '0 auto' }} speedMultiplier={3} />
            </div>
        </div>
    );

    return (
        <div className="card">
            <div className="card-header">
                Checkout
            </div>
            {
                !toggleConfirmation ?
                    !Object.keys(data).length ?
                        <div className="card-body text-center">
                            <p>Alamat pengiriman belum ada</p>
                            <Link to="/account" className="btn btn-primary">Tambah alamat pengiriman</Link>
                        </div>

                        :

                        <div className="card-body">
                            <h3 className="card-title">Pilih Alamat Pengiriman</h3>
                            <table className="table">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ 'width': '5%' }}></th>
                                        <th scope="col" style={{ 'width': '40%' }}>Nama</th>
                                        <th scope="col">Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((alamat, key) =>
                                            <tr key={key}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        name="check-alamat"
                                                        id="check-alamat"
                                                        onChange={event => handleCheckbox(event.target.checked, {
                                                            _id: alamat._id,
                                                            nama: alamat.nama,
                                                            detail: alamat.detail,
                                                            kelurahan: alamat.kelurahan,
                                                            kecamatan: alamat.kecamatan,
                                                            kabupaten: alamat.kabupaten,
                                                            provinsi: alamat.provinsi
                                                        })}
                                                    />
                                                </td>
                                                <td>{alamat.nama}</td>
                                                <td>{alamat.detail}, {alamat.kelurahan}, {alamat.kecamatan}, {alamat.kabupaten}, {alamat.provinsi}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className="d-grid justify-content-end">
                                <button className="btn btn-primary" onClick={handleSelectedAddress}>Selanjutnya</button>
                            </div>
                        </div>
                        
                    :

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
                                        {
                                            <td>
                                                <b>{selectedAddress.nama}</b>
                                                <p>{selectedAddress.detail}, {selectedAddress.kelurahan}, {selectedAddress.kecamatan}, {selectedAddress.kabupaten}, {selectedAddress.provinsi}</p>
                                            </td>
                                        }
                                </tr>
                                <tr>
                                    <td>Sub total</td>
                                    <td>{formatRupiah(sumPrice(cartItems))}</td>
                                </tr>
                                <tr>
                                    <td>Ongkir</td>
                                    <td>{formatRupiah(config.global_ongkir)}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th scope="col">Total</th>
                                    <th scope="col">{formatRupiah(total)}</th>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" onClick={() => {setToggleConfirmation(false); setSelectedAddress({});}}>Sebelumnya</button>
                            <button className="btn btn-success" onClick={handleCreateOrder}>BAYAR</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Checkout;