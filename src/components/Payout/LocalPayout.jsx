import React from 'react';
import { Col, Row, Table } from 'antd';

const LocalPayout = () => {
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}></Col>
                <Col span={12}>
                    <div>
                        <h3>Response</h3>
                        <code></code>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table />
                </Col>
            </Row>
        </div>
    );
};

export default LocalPayout;
