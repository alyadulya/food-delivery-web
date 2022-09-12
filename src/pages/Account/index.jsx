import { FaChevronRight } from "react-icons/fa";
import Tabs from "../../components/Tabs";
import "../../components/Tabs/index.css";

const Account = () => {
    return (
        <div className="card">
            <div className="card-header">
                Account
            </div>
            <div className="card-body">
                <Tabs>
                    <div label="Profil">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nama</td>
                                    <td>Alyad Ulya Iman</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>alyadulya@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div label="Pemesanan">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><FaChevronRight /></td>
                                    <td>#1</td>
                                    <td>Rp 48.000</td>
                                    <td>waiting payment</td>
                                    <td><button className="btn btn-success btn-sm">Invoice</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div label="Alamat">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label for="nama" className="form-label">Nama</label>
                                        <input type="text" className="form-control" id="nama" placeholder="Masukkan nama anda" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="detail-alamat" className="form-label">Detail alamat</label>
                                        <textarea className="form-control" id="detail-alamat" rows="9"></textarea>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label for="provinsi" className="form-label">Provinsi</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Pilih lokasi...</option>
                                            <option value="Aceh">Aceh</option>
                                            <option value="Sumatera Utara">Sumatera Utara</option>
                                            <option value="Sumatera Barat">Sumatera Barat</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label for="kabupaten" className="form-label">Kabupaten/Kota</label>
                                        <select className="form-select" aria-label="Disabled select example" disabled>
                                            <option selected>Pilih lokasi...</option>
                                            <option value="Aceh">Aceh</option>
                                            <option value="Sumatera Utara">Sumatera Utara</option>
                                            <option value="Sumatera Barat">Sumatera Barat</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label for="kecamatan" className="form-label">Kecamatan</label>
                                        <select className="form-select" aria-label="Disabled select example" disabled>
                                            <option selected>Pilih lokasi...</option>
                                            <option value="Aceh">Aceh</option>
                                            <option value="Sumatera Utara">Sumatera Utara</option>
                                            <option value="Sumatera Barat">Sumatera Barat</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label for="kelurahan" className="form-label">Kelurahan</label>
                                        <select className="form-select" aria-label="Disabled select example" disabled>
                                            <option selected>Pilih lokasi...</option>
                                            <option value="Aceh">Aceh</option>
                                            <option value="Sumatera Utara">Sumatera Utara</option>
                                            <option value="Sumatera Barat">Sumatera Barat</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="d-grid">
                                <button type="button" className="btn btn-primary">Simpan</button>
                            </div>
                        </div>
                    </div>
                    <div label="Logout">
                        Logout
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default Account;