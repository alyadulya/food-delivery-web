import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { PuffLoader } from "react-spinners";
import { getInvoiceByOrderId } from "../../app/api/invoice";
import { formatRupiah, useDocumentTitle } from "../../app/utils";
import { config } from "../../config";

const Invoices = () => {
    useDocumentTitle('Invoice');
    
    const [invoice, setInvoice] = useState({});
    const [error, setError] = useState('');
    const [status, setStatus] = useState('process');
    const { order_id } = useParams();

    useEffect(() => {
        getInvoiceByOrderId(order_id)
            .then(({ data }) => {
                if (data.error) {
                    setError(data.message);
                }

                setInvoice(data);
            })
            .catch(err => setError(err.message))
            .finally(_ => setStatus('success'));
    }, [order_id]);

    console.log(invoice);

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
                            <td>{invoice.payment_status}</td>
                        </tr>
                        <tr>
                            <td>Order ID</td>
                            <td>{invoice?.order?.order_number}</td>
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td>{formatRupiah(invoice?.total)}</td>
                        </tr>
                        <tr>
                            <td>Billed to</td>
                            <td>
                                <b>{invoice?.user?.full_name}</b>
                                <p>{invoice?.user?.email}</p>

                                <p>{invoice?.delivery_address?.nama}</p>
                                <p>{invoice?.delivery_address?.detail}, {invoice?.delivery_address?.kelurahan}, {invoice?.delivery_address?.kecamatan}, {invoice?.delivery_address?.kabupaten}, {invoice?.delivery_address?.provinsi}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Payment to</td>
                            <td>
                                {config.owner}<br />
                                {config.contact}<br />
                                {config.billing.bank_name}<br />
                                {config.billing.account_no}<br />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Invoices;