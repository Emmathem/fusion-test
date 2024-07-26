import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { Spin } from 'antd';

const CallbackPage = () => {
    const [transResponse, setTransResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const paymentReference = searchParams.get('reference');
    console.log(paymentReference, 'get');

    const fetchTransactionReference = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance().get(`/api/payments/transactions/${paymentReference}`);
            console.log(response, 'ress');
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
                {loading ? (
                    <>
                        <Spin tip="Fetching Status" />
                    </>
                ) : (
                    <>
                        <span>
                            Reference: <strong>{transResponse?.paymentStatus}</strong>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default CallbackPage;
