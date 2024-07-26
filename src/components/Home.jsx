import { Button, Input, Select } from 'antd';
import React from 'react';
import { Form, Row, Col } from 'antd';
import { generateReference } from '../utils/helpers';
import { PROD_PAYMENT_LINK } from '../utils/constants';

const { Option } = Select;

const Home = () => {
    const [form] = Form.useForm();

    const onFinish = (values, tab) => {
        console.log(values);
        let finalUri = '';
        debugger;
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

        // if (tab === 'new_tab') {
        //     window.open(finalUri, '_blank');
        // } else {
        //     window.location.href = finalUri;
        // }
        return finalUri;
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
                                <Form.Item name="amount" rules={[{ required: true, message: 'Enter Amount' }]}>
                                    <p className="mb-2">Enter Amount</p>
                                    <Input required name="amount" type="text" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item name="currencyCode" rules={[{ required: true, message: 'Select Currency' }]}>
                                    <p className="mb-2">Select Currency</p>
                                    <Select id="currencyCode" name="currencyCode" required>
                                        <Option value="CAD">CAD</Option>
                                        <Option value="NGN">NGN</Option>
                                        <Option value="GBP">GBP</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            {/*<Col>
                                <Button type="primary" onClick={() => handleFormSubmit('new_tab')}>Generate Payment</Button>
                            </Col>*/}
                            <Col>
                                <Button type="primary" onClick={handleFormSubmit}>
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
