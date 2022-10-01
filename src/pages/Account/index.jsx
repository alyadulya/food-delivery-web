import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAddress } from "../../app/api/address";
import { getOrders } from "../../app/api/order";
import { useAddressData } from "../../app/hooks/address";
import { formatRupiah, useDocumentTitle } from "../../app/utils";
import Tabs from "../../components/Tabs";
import "../../components/Tabs/index.css";

const Account = () => {
    const auth = useSelector(state => state.auth);
    useDocumentTitle(auth.user.full_name)
    const { count, data, limit, page, setPage, status } = useAddressData();
    const { register, handleSubmit, formState: {errors}, setError, watch, setValue, getValues } = useForm();
    const allFields = watch();
    const updateValue = (field, value) => setValue(field, value, {shouldValidate: true, shouldDirty: true});

    const [toggleCreateAddress, setToggleCreateAddress] = useState(false);

    const [kodeProvinsi, setKodeProvinsi] = useState('');
    const [kodeKabupaten, setKodeKabupaten] = useState('');
    const [kodeKecamatan, setKodeKecamatan] = useState('');
    const [dataProvinsi, setDataProvinsi] = useState([]);
    const [dataKabupaten, setDataKabupaten] = useState([]);
    const [dataKecamatan, setDataKecamatan] = useState([]);
    const [dataKelurahan, setDataKelurahan] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [fetchOrdersStatus, setFetchOrdersStatus] = useState('idle');
    const [orders, setOrders] = useState([]);
    const [ordersCount, setOrdersCount] = useState(0);
    const [ordersPage, setOrdersPage] = useState(1);
    const [ordersLimit, setOrdersLimit] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        setFetching(true);
        axios
            .get('http://regions-indoneisa.herokuapp.com/api/provinsi')
            .then(({data}) => setDataProvinsi(data))
            .finally(_ => setFetching(false));
        if (kodeProvinsi) {
            setFetching(true);
            axios
                .get(`http://regions-indoneisa.herokuapp.com/api/kabupaten?kode_induk=${kodeProvinsi}`)
                .then(({data}) => setDataKabupaten(data))
                .finally(_ => setFetching(false));
        }
        if (kodeKabupaten) {
            setFetching(true);
            axios
                .get(`http://regions-indoneisa.herokuapp.com/api/kecamatan?kode_induk=${kodeKabupaten}`)
                .then(({data}) => setDataKecamatan(data))
                .finally(_ => setFetching(false));
        }
        if (kodeKecamatan) {
            setFetching(true);
            axios
                .get(`http://regions-indoneisa.herokuapp.com/api/kelurahan?kode_induk=${kodeKecamatan}`)
                .then(({data}) => setDataKelurahan(data))
                .finally(_ => setFetching(false));
        }
    }, [kodeProvinsi, kodeKabupaten, kodeKecamatan]);

    const onSubmit = async FormData => {
        let payload = {
            nama: FormData.nama,
            detail: FormData.detail,
            provinsi: FormData.provinsi,
            kabupaten: FormData.kabupaten,
            kecamatan: FormData.kecamatan,
            kelurahan: FormData.kelurahan
        }
        console.log(payload);
        const {data} = await createAddress(payload);
        if (data.error) return;
        setToggleCreateAddress(false);
    }

    useEffect(() => {
        setValue('kabupaten', null);
        setValue('kecamatan', null);
        setValue('kelurahan', null);

    }, [allFields.provinsi, setValue]);

    useEffect(() => {
        setValue('kecamatan', null);
        setValue('kelurahan', null);
    
    }, [allFields.kabupaten, setValue]);
    
    useEffect(() => {
        setValue('kelurahan', null);
    
    }, [allFields.kecamatan, setValue]);

    const fetchOrders = useCallback( async () => {
        setFetchOrdersStatus('process');

        let { data } = await getOrders({ ordersLimit, ordersPage });

        if (data.error) {
            setFetchOrdersStatus('error');
            return ;
        }

        setFetchOrdersStatus('success');
        setOrders(data.data);
        setOrdersCount(data.count);
    }, [page, limit]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);
    
    return (
        <div className="card">
            <div className="card-header">
                Account
            </div>
            <div className="card-body">
                <Tabs>
                    <div label="Profil">
                        <table className="table" style={{ 'tableLayout': 'fixed' }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nama</td>
                                    <td>{auth.user.full_name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{auth.user.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div label="Pemesanan">
                        {
                            !Object.keys(orders).length ?
                                <div className="text-center p-5">
                                    Belum ada pemesanan
                                </div>

                                :

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
                                        {
                                            orders.map((order, key) =>
                                                <>
                                                    <tr key={key}>
                                                        <td>
                                                            <button
                                                                className="btn btn-light"
                                                                id={`collapse${key}`}
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={`#collapseExample${key}`} aria-expanded="false"
                                                                aria-controls={`collapseExample${key}`}
                                                                title="Lihat detail"
                                                            >
                                                                <FaChevronDown />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            {order.order_number}
                                                        </td>
                                                        <td>
                                                            {
                                                                formatRupiah(
                                                                    order.order_items
                                                                        .reduce((total, item) =>
                                                                            total += (item.price * item.qty), 0
                                                                        )
                                                                    +
                                                                    order.delivery_fee
                                                                )
                                                            }
                                                        </td>
                                                        <td>
                                                            {order.status}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/invoices/${order._id}`}
                                                                className="btn btn-success btn-sm"
                                                            >
                                                                Invoice
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            colSpan={5}
                                                            className="collapse"
                                                            id={`collapseExample${key}`}
                                                        >
                                                            <table
                                                                className="table"
                                                                style={{ 'tableLayout': 'fixed' }}
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Barang</th>
                                                                        <th scope="col">Jumlah</th>
                                                                        <th scope="col">Total harga</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        order.order_items.map((order_item, key) =>
                                                                            <tr key={key}>
                                                                                <td>{order_item.name}</td>
                                                                                <td>{order_item.qty}</td>
                                                                                <td>{order_item.price}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                    <div label="Alamat">
                        <div className="container">
                            {
                                toggleCreateAddress ?
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="nama" className="form-label">
                                                        Nama alamat
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="nama"
                                                        placeholder="Masukkan nama alamat"
                                                        {...register('nama')}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="detail-alamat" className="form-label">
                                                        Detail alamat
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="detail-alamat"
                                                        rows="9"
                                                        {...register('detail')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="provinsi" className="form-label">
                                                        Provinsi
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        disabled={isFetching || !dataProvinsi.length}
                                                        onChange={event => {
                                                            updateValue(
                                                                'provinsi',
                                                                JSON.parse(event.target.value).nama
                                                            );
                                                            setKodeProvinsi(JSON.parse(event.target.value).kode); 
                                                            setDataKabupaten([]);
                                                            setDataKecamatan([]);
                                                            setDataKelurahan([]);
                                                        }}
                                                    >
                                                        <option>Pilih provinsi...</option>
                                                        {
                                                            dataProvinsi.map((wilayah, key) =>
                                                                <option
                                                                    value={`{"kode": "${wilayah.kode}", "nama": "${wilayah.nama}"}`}
                                                                    key={key}
                                                                >
                                                                    {wilayah.nama}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="kabupaten" className="form-label">
                                                        Kabupaten/Kota
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        disabled={isFetching || !dataKabupaten.length}
                                                        onChange={event => {
                                                            updateValue(
                                                                'kabupaten',
                                                                JSON.parse(event.target.value).nama
                                                            );
                                                            setKodeKabupaten(JSON.parse(event.target.value).kode);
                                                            setDataKecamatan([]);
                                                            setDataKelurahan([]);
                                                        }}
                                                    >
                                                        <option>Pilih kabupaten...</option>
                                                        {
                                                            dataKabupaten.map((wilayah, key) =>
                                                                <option
                                                                    value={`{"kode": "${wilayah.kode}", "nama": "${wilayah.nama}"}`}
                                                                    key={key}
                                                                >
                                                                    {wilayah.nama}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="kecamatan" className="form-label">
                                                        Kecamatan
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        disabled={isFetching || !dataKecamatan.length}
                                                        onChange={event => {
                                                            updateValue(
                                                                'kecamatan',
                                                                JSON.parse(event.target.value).nama
                                                            );
                                                            setKodeKecamatan(JSON.parse(event.target.value).kode);
                                                            setDataKelurahan([]);
                                                        }}>
                                                        <option>Pilih kecamatan...</option>
                                                        {
                                                            dataKecamatan.map((wilayah, key) =>
                                                                <option
                                                                    value={`{"kode": "${wilayah.kode}", "nama": "${wilayah.nama}"}`}
                                                                    key={key}
                                                                >
                                                                    {wilayah.nama}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="kelurahan" className="form-label">
                                                        Kelurahan
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        disabled={isFetching || !dataKelurahan.length}
                                                        onChange={event => 
                                                            updateValue(
                                                                'kelurahan',
                                                                JSON.parse(event.target.value).nama
                                                            )
                                                        }
                                                    >
                                                        <option>Pilih kelurahan...</option>
                                                        {
                                                            dataKelurahan.map((wilayah, key) =>
                                                                <option value={`{"kode": "${wilayah.kode}", "nama": "${wilayah.nama}"}`} key={key}>{wilayah.nama}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2 col-6 mx-auto">
                                            <input
                                                type="submit"
                                                className="btn btn-success"
                                                value="Simpan"
                                            />
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => setToggleCreateAddress(false)}
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                    :
                                    <div>
                                        <div className="mb-3">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => setToggleCreateAddress(true)}
                                            >
                                                Tambah alamat
                                            </button>
                                        </div>
                                            {
                                                data.length ?
                                                    <table className="table" style={{ 'tableLayout': 'fixed' }}>
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">Nama</th>
                                                                <th scope="col">Detail</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.map((alamat, key) =>
                                                                    <tr key={key}>
                                                                        <td>{alamat.nama}</td>
                                                                        <td>
                                                                            {alamat.detail}, {alamat.kelurahan}, {alamat.kecamatan}, {alamat.kabupaten}, {alamat.provinsi}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                    :
                                                    <div className="text-center">
                                                        Alamat pengiriman belum ada
                                                    </div>
                                            }
                                    </div>
                                }
                        </div>
                    </div>
                    <div label="Logout" onClick={() => navigate('/logout')}>
                        <Link to="/logout" className="btn btn-danger">Log out</Link>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default Account;