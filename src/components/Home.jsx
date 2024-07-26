import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';
import { Form, Row, Col } from 'antd';
import { generateReference } from '../utils/helpers';
import { PROD_PAYMENT_LINK } from '../utils/constants';

const { Option } = Select;

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values, tab) => {
        console.log(values);
        setLoading(true);
        let finalUri = '';

        const paymentLink = `${PROD_PAYMENT_LINK}/redirect`;
        const directPayload = {
            redirectUrl: 'http://localhost:5100/transaction-confirmation',
            key: process.env.REACT_APP_PROD_PUBLIC_TEST_KEY,
            showPersonalInformation: false,
            customerEmail: 'test@yahoo.com',
            customerName: 'Vee Tolar',
            reference: generateReference(12),
            shouldWindowClose: false,
            amount: values?.amount,
            currencyCode: values?.currencyCode,
        };
        console.log(directPayload, 'directPayload');
        const convertToString = JSON.stringify(directPayload);
        console.log(convertToString);
        const convertToBase64 = btoa(convertToString);
        finalUri = paymentLink + '/' + convertToBase64;
        console.log(finalUri);

        setTimeout(() => {
            if (tab === 'new_tab') {
                window.open(finalUri, '_blank');
            } else {
                window.location.href = finalUri;
            }
            setLoading(false);
            return finalUri;
        }, 500);
    };

    const onFinishedFailed = (errorInfo) => {
        console.log(errorInfo);
    };

    const handleFormSubmit = (tab) => {
        form.validateFields()
            .then((values) => {
                onFinish(values, tab);
            })
            .catch((errorInfo) => {
                onFinishedFailed(errorInfo);
            });
    };
    return (
        <div>
            <div>
                <h3 className="text-left font-bold">Direct Collection</h3>
                <div className="border w-1/4 p-4 mt-4">
                    <Form
                        name="collection-form"
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishedFailed}
                        preserve={false}
                    >
                        <Row gutter={[16]}>
                            <Col span={24}>
                                <p>Enter Amount</p>
                                <Form.Item name="amount" rules={[{ required: true, message: 'Enter Amount' }]}>
                                    <Input required name="amount" type="text" placeholder="Enter Amount" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <p>Select Currency</p>
                                <Form.Item name="currencyCode" rules={[{ required: true, message: 'Select Currency' }]}>
                                    <Select id="currencyCode" name="currencyCode" placeholder="Currency">
                                        <Option value="CAD">CAD</Option>
                                        <Option value="NGN">NGN</Option>
                                        <Option value="GBP">GBP</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col>
                                <Button type="default" loading={loading} onClick={() => handleFormSubmit('new_tab')}>
                                    Generate Payment New Tab
                                </Button>
                            </Col>
                            <Col className="mt-4">
                                <Button type="primary" loading={loading} onClick={handleFormSubmit}>
                                    Generate Payment
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Home;
