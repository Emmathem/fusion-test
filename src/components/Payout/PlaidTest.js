import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { generateReference } from '../../utils/helpers';
import PopupPlaid from '../PopupPlaid';

const { Option } = Select;

const PlaidTest = () => {
    const [plaidResponse, setPlaidResponse] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        const payload = {
            currencyCode: values.currencyCode,
            amount: values.amount,
            channel: 'PayByAccount',
            currency: values.currencyCode,
            reference: generateReference(19),
            amountInfo: {
                amount: values.amount,
                currency: values.currencyCode,
            },
            userInformation: {
                firstName: 'Temitope',
                lastName: 'Falua',
                phone: '07867 282471',
                emailAddress: 'faluatemitopeo@gmail.com',
            },
            metaData: {
                'return-url': 'https://fusion-app.surge.sh/transaction-confirmation',
            },
        };

        try {
            const response = await axiosInstance().post(`/api/payment/pay/initiate`, payload);
            console.log(response);
            const { value } = response;
            const { paymentItem } = value;
            setPlaidResponse(paymentItem);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
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
    const getClientUrl = (url) => {
        const params = new URLSearchParams(url.split('?')[1]); // Extract query string from URL
        console.log(params, 'params');
        const redirectUrl = params.get('client_url');
        const reference = params.get('lb_reference');
        return { redirectUrl, reference };
    };
    const redirectHome = (params) => {
        console.log(params, 'params');
        // window.location.href = this.clientUrl
        debugger;
        const url = new URL(params.redirectUrl)
        url.searchParams.set('reference', params.reference)
        window.location.href = url.toString()
    };
    const openLink = () => {
        console.log(plaidResponse, 'plaidResponse');
        const returnUrlResponse = getClientUrl(plaidResponse.metaData?.AuthUrl);
        console.log(returnUrlResponse, 'ttttt');
        const linkHandler = window.Plaid.create({
            // Create a new link_token to initialize Link
            token: plaidResponse?.metaData?.token,
            // is_mobile_app: true,
            onSuccess: (public_token, metadata) => {
                console.log(public_token, 'publoc');
                console.log(metadata, 'meta data success');
                redirectHome(returnUrlResponse)
                // Show a success page to your user confirming that the
                // payment will be processed.
                //
                // The 'metadata' object contains info about the institution
                // the user selected.
                // For example:
                //  metadata  = {
                //    link_session_id: "123-abc",
                //    institution: {
                //      institution_id: "ins_117243",
                //      name:"Monzo"
                //    }
                //  }
            },
            onExit: (err, metadata) => {
                // The user exited the Link flow.
                console.log(metadata, 'metadata exit');
                console.log(err, 'error exit');
                if (metadata?.error_code === 'PAYMENT_REJECTED') {
                    // window.location.reload()
                    form.resetFields();
                    setPlaidResponse(null);
                    alert(metadata?.display_message);
                }
                if (metadata.error_code === 'PAYMENT_CANCELLED') {
                    setText(metadata.error_message);
                }
                if (err != null) {
                    console.log(err, 'error');
                    if (metadata.error_code === 'PAYMENT_CANCELLED') {
                        setText(metadata.error_message);
                    }
                    // The user encountered a Plaid API error prior to exiting.
                }
                // 'metadata' contains information about the institution
                // that the user selected and the most recent API request IDs.
                // Storing this information can be helpful for support.
            },
            onEvent: (eventName, metadata) => {
                console.log(eventName, 'evee');
                console.log(metadata, 'metadata on event');
                if (metadata?.error_code === 'PAYMENT_REJECTED') {
                    // window.location.reload()
                    form.resetFields();
                    setPlaidResponse(null);
                    alert(metadata?.display_message);
                }
                // Optionally capture Link flow events, streamed through
                // this callback as your users connect with Plaid.
                // For example:
                //  eventName = "TRANSITION_VIEW",
                //  metadata  = {
                //    link_session_id: "123-abc",
                //    mfa_type:        "questions",
                //    timestamp:       "2017-09-14T14:42:19.350Z",
                //    view_name:       "MFA",
                //  }
            },
        });

        linkHandler.open();
    };

    return (
        <div>
            <div>
                <h3 className="font-bold text-2lg">Plaid</h3>
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

                        <Row>
                            <Col span={24}>{text}</Col>
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

                {plaidResponse && (
                    <div className="mt-4">
                        <span>{plaidResponse?.message}</span>
                        <div className="flex mt-3">
                            <p>
                                <code>{plaidResponse?.metaData?.AuthUrl}</code>
                            </p>
                        </div>
                        <div className="flex mt-3">
                            <Button onClick={openLink}>Open Payment</Button>
                        </div>
                    </div>
                )}
            </div>
            <Divider />
            <div>
                <PopupPlaid />
            </div>
        </div>
    );
};

export default PlaidTest;
