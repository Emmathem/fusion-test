import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { generateReference } from '../utils/helpers';
// import axiosInstance from '../utils/axiosInstance';

const { Option } = Select;

const PopupPlaid = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const popUp = new Window.LeatherbackPopUp({
            amount: values.amount,
            currencyCode: values.currencyCode,
            onSuccess: function (arg) {
                console.log(arg, 'success');
            },
            onError: function (error) {
                console.log(error, 'err');
            },
            key: process.env.REACT_APP_PUBLIC_KEY,
            showPersonalInformation: true,
            customerEmail: 'test@leatherback.co',
            disableCloseAfterTransaction: true,
            customerName: 'Vee James',
            reference: generateReference(9),
            channels: ['Card', 'PayByTransfer', 'PayByAccount'],
        });
        popUp.generatePaymentPopUp();
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
            <h3 className="font-bold text-2lg">PopUp Plaid</h3>
            <div className="border lg:w-1/4 md:w-full sm:w-full p-4 mt-4">
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
                        {/* <Col>
                                <Button type="default" loading={loading} onClick={() => handleFormSubmit('new_tab')}>
                                    Generate Payment New Tab
                                </Button>
                            </Col>*/}
                        <Col className="mt-4">
                            <Button type="primary" onClick={handleFormSubmit}>
                                Open Popup Payment
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default PopupPlaid;
