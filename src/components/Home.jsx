import { Button, Input, Select, Switch } from 'antd';
import React, { useState } from 'react';
import { Form, Row, Col } from 'antd';
import { generateReference } from '../utils/helpers';
import { PROD_PAYMENT_LINK } from '../utils/constants';

const { Option } = Select;

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(true);
    const [form] = Form.useForm();

    const toggleChange = (value) => {
        setTab(value);
    };
    const onFinish = (values) => {
        console.log(values);
        setLoading(true);
        let finalUri = '';

        const paymentLink = `${PROD_PAYMENT_LINK}/redirect`;
        const directPayload = {
            redirectUrl: 'http://localhost:5100/transaction-confirmation',
            key: process.env.REACT_APP_PUBLIC_KEY,
            showPersonalInformation: false,
            customerEmail: 'test@yahoo.com',
            customerName: 'Vee Tolar',
            reference: generateReference(10),
            shouldWindowClose: false,
            amount: values?.amount,
            currencyCode: values?.currencyCode,

            // redirectUrl: 'https://rozeremit.com/transfer/success?leatherback=true',
            // key: 'pk_live_hcfa9b460fehf9h26f9829ac6b8e1b218e27ahf',
            // showPersonalInformation: false,
            // customerEmail: 'hamziiiiii6@gmail.com',
            // customerName: 'Hamza Akram',
            // reference: generateReference(10),
            // shouldWindowClose: false,
            // amount: 90,
            // currencyCode: 'CAD',
        };
        console.log(directPayload, 'directPayload');
        const convertToString = JSON.stringify(directPayload);
        console.log(convertToString);
        const convertToBase64 = btoa(encodeURI(convertToString));
        finalUri = paymentLink + '/' + convertToBase64;
        console.log(finalUri);

        setTimeout(() => {
            if (!tab) {
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

    const handleFormSubmit = () => {
        form.validateFields()
            .then((values) => {
                onFinish(values);
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

                        <Row>
                            <Col span={24}>
                                <Switch
                                    defaultChecked
                                    unCheckedChildren="In New Tab"
                                    checkedChildren="Within Tab"
                                    onChange={toggleChange}
                                />
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            {/* <Col>
                                <Button type="default" loading={loading} onClick={() => handleFormSubmit('new_tab')}>
                                    Generate Payment New Tab
                                </Button>
                            </Col>*/}
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
