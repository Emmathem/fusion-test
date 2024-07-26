import { Button, Input, Select } from 'antd'
import React from 'react'
import { Form, Row, Col } from 'antd'
import { generateReference } from '../utils/helpers';
import { PROD_PAYMENT_LINK } from '../utils/constants';

const Home = () => {
    const [form] = Form.useForm();

    const onFinish = (values, tab) => {
        console.log(values);

        let finalUri = '';

        const paymentLink = `${PROD_PAYMENT_LINK}/redirect`
        const directPayload = {
            redirectUrl: "http://localhost:5100/redirect.html",
            key: process.env.REACT_APP_PROD_PUBLIC_TEST_KEY,
            showPersonalInformation: false,
            customerEmail: "test@yahoo.com",
            customerName: "Vee Tolar",
            reference: generateReference(9),
            shouldWindowClose: false,
            amount: 20,
            currencyCode: values.currencyCode,
        }

        const convertToString = JSON.stringify(directPayload);
        console.log(convertToString)
        const convertToBase64 = btoa(convertToString);
        finalUri = paymentLink + '/' + convertToBase64;
        console.log(finalUri)

        if (tab === 'new_tab') {
            window.open(finalUri, '_blank');
        } else {
            window.location.href = finalUri;
        }
        return finalUri
    };

    const onFinishedFailed = (errorInfo) => {
        console.log(errorInfo);
    };

    const handleFormSubmit = () => {
        form.validateFields()
            .then((values) => {
                onFinish(values)
            })
            .catch((errorInfo) => {
                onFinishedFailed(errorInfo)
            })
    }
    return (
        <div>
            <div>
                <h3 className="tex-left">Direct Collection</h3>
                <div className="border w-4/5">
                    <Form
                        name="collection-form"
                        onFinish={onFinish}
                        onFinishFailed={onFinishedFailed}
                        preserve={false}
                    >
                        <Row gutter={[16]}>
                            <Col>
                                <Form.Item>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Select />
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col>
                                <Button type="primary" onClick={handleFormSubmit()}>Generate Payment</Button>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={handleFormSubmit()}>Generate Payment</Button>
                            </Col>
                        </Row>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default Home