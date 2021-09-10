import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {EditOutlined, DeleteOutlined,} from '@ant-design/icons';
import {Row, Col, Button, Form, Input, Card, Tag, Select, message} from 'antd';

import LayoutComponent from '../components/Layout';
const {Option} = Select;

const Question3 = () => {
    const [record, setRecord] = useState(null);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        values.id = uuidv4();

        if(record){
            alert('Not enough time to finish')
        }
        else{
            setData(prevData => [...prevData, values]);
            message.success('Successfully added new researcher!');
            form.resetFields();
        }
    };

    const handleDelete = (id) => {
        const res = data.filter(item => item.id !== id);
        setData(res);
        message.success('Researcher deleted!')
    };

    const handleUpdate = (id) => {
        const updateItem = data.find(item => item.id === id);
        form.setFieldsValue({
            name: updateItem.name, 
            specialization: updateItem.specialization,
            keyword: updateItem.keyword
        });
        setRecord(updateItem);
    };

    const handleCancel = () => {
        form.resetFields();
        setRecord(null);
    }

    const specs = [
        {
            id: uuidv4(),
            name: 'COVID-19'
        },
        {
            id: uuidv4(),
            name: 'COMMON COLD'
        },
        {
            id: uuidv4(),
            name: 'HIV'
        },
        {
            id: uuidv4(),
            name: 'HEADACHE'
        },
        {
            id: uuidv4(),
            name: 'SORENESS'
        },
    ];

    return (
        <LayoutComponent>
            <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                <Col lg={8}>
                    <Card>
                        <Form 
                            form={form}
                            layout="vertical"
                            name="research"
                            initialValues={{
                                name: '',
                                specialization: [],
                                keyword: ''
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{
                                    required: true,
                                    message: 'Please enter your name'
                                }]}
                                hasFeedback
                            >
                                <Input size="large" placeholder="Please enter your name"/>
                            </Form.Item>

                            <Form.Item
                                label="Specialization"
                                name="specialization"
                                rules={[{
                                    required: true,
                                    message: 'Please enter your specialization'
                                }]}
                                hasFeedback
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select your specialization"
                                    size="large"
                                >
                                    {specs.map((item) => (
                                        <Option key={item.id} value={item.name}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Keyword"
                                name="keyword"
                                rules={[{
                                    required: true,
                                    message: 'Please enter your keyword'
                                }]}
                                hasFeedback
                            >
                                <Input size="large" placeholder="Please enter your keyword"/>
                            </Form.Item>

                            <Button type="primary" htmlType="submit">
                                {record ? 'Update' : 'Submit'}
                            </Button>
                            
                            {record && (
                                <Button style={{marginLeft: '2rem'}} onClick={handleCancel}>
                                    Cancel
                                </Button>
                            )}
                        </Form>
                    </Card>
                </Col>

                <Col lg={16}>
                    <Card title="All Researchers">
                        <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                            {data.length > 0 ? data.map(item => (
                                <Col lg={8} key={item.id}>
                                    <Card 
                                        actions={[
                                            <EditOutlined key="edit" onClick={() => handleUpdate(item.id)} />,
                                            <DeleteOutlined key="delete" onClick={() => handleDelete(item.id)}/>,
                                        ]}
                                    >
                                        <p>
                                            Name - <strong>{item.name}</strong>
                                        </p>
                                        {item.specialization.map(el => (
                                            <Tag color="orange" style={{marginBottom: '.5rem'}}>
                                                {el}
                                            </Tag>
                                        ))}
                                        <p style={{marginTop: '.5rem'}}>
                                            Keywords - <Tag color="green">{item.keyword}</Tag>
                                        </p>
                                    </Card>
                                </Col>
                            )) : (
                                <Col lg={24}>
                                    <h3 style={{color: 'red'}}>
                                        No Researchers! Please add some.
                                    </h3>
                                </Col>
                            )}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </LayoutComponent>
    )
}

export default Question3
