import { useEffect, useRef } from "react";

export function sumPrice(items) {
    return items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
}
  
export function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {maximumFractionDigits: 0, style:'currency', currency: 'IDR'}).format(number);
}

export function useDocumentTitle(title, prevailOnMount = false) {
    const defaultTitle = useRef(document.title);
    const siteName =  " | Eduwork Store"

    useEffect(() => {
        document.title = title + siteName;
    }, [title]);
    
    useEffect(() => () => {
        if (!prevailOnMount) {
            document.title = defaultTitle.current + siteName;
        }
    }, [prevailOnMount]);
}