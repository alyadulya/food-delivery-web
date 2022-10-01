import { useCallback, useEffect, useState } from "react"
import { getAddress } from "../api/address";

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export const useAddressData = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(statusList.idle);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const fetchAddress = useCallback(async () => {

        setStatus(statusList.process);
        let { data: { data, count, error } } = await getAddress({page, limit});

        if (error) {
            setStatus(statusList.error);
            return;
        }

        setStatus(statusList.success);
        setData(data);
        setCount(count);

    }, [page, limit]);

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    return {
        data,
        count,
        status,
        page,
        limit,
        setPage,
        setLimit
    }
}