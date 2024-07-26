import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { Divider, Spin } from 'antd';

const CallbackPage = () => {
    const [transResponse, setTransResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const paymentReference = searchParams.get('reference');

    const fetchTransactionReference = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance().get(`/api/payment/transactions/${paymentReference}`);
            // console.log(response, 'ress');
            const { value } = response;
            if (response) {
                setLoading(false);
                setTransResponse(value);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }, [paymentReference]);

    useEffect(() => {
        if (paymentReference) {
            fetchTransactionReference();
        }
    }, [paymentReference, fetchTransactionReference]);

    return (
        <div>
            <div>
                <Link to={'/'}>Go Home</Link>
                <Divider />
                {loading ? (
                    <>
                        <Spin />
                    </>
                ) : (
                    <>
                        <div>
                            Status: <strong>{transResponse?.paymentStatus}</strong>
                        </div>
                        <div>
                            Reference: <strong>{transResponse?.paymentReference}</strong>
                        </div>
                        <div>
                            Amount:{' '}
                            <strong>
                                {transResponse?.amount.currencyCode} {transResponse?.amount.amount}
                            </strong>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CallbackPage;
