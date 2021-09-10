import React, {useState, useEffect} from 'react';
import {Card, Row, Col, Tabs, Spin} from 'antd';

import LayoutComponent from '../components/Layout';

const { TabPane } = Tabs;

const Question2 = () => {
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCOVID();
    }, [])

    const fetchCOVID = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://covidnigeria.herokuapp.com/api');
            const info = await res.json();
            setLoading(false);

            if(info){
                setList(info);
            }
        } catch (error) {
            console.warn('Error fetching data', error);   
        }
    }

    const handleTabChange = key => {
        console.log(key)
    }

    const filterData = (key) => {
        if(list){
            const res = list.data.states.map(item => ({
                state: item.state, 
                data: item[key]
            }));
            return res;
        }
    }

    return (
        <LayoutComponent>
            <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                <Col lg={5} md={12} sm={12} xs={24}>
                    <Card loading={loading} title="Total samples tested">
                        <h1>{list?.data.totalSamplesTested}</h1>
                    </Card>
                </Col>
                <Col lg={5} md={12} sm={12} xs={24}>
                    <Card loading={loading} title="Total confirmed cases">
                        <h1>{list?.data.totalConfirmedCases}</h1>  
                    </Card>
                </Col>
                <Col lg={5} md={12} sm={12} xs={24}>
                    <Card loading={loading} title="Total active cases">
                        <h1>{list?.data.totalActiveCases}</h1>
                    </Card>
                </Col>
                <Col lg={5} md={12} sm={12} xs={24}>
                    <Card loading={loading} title="Total discharged">
                        <h1>{list?.data.discharged}</h1>
                    </Card>
                </Col>
                <Col lg={4} md={12} sm={12} xs={24}>
                    <Card loading={loading} title="Total death">
                        <h1>{list?.data.death}</h1>
                    </Card>
                </Col>
            </Row>

            <Row style={{marginTop: '2rem'}}>
                <Col lg={24}>
                    <Card>
                        {loading ? (
                            <div className="container">
                                <Spin size="large"/>
                            </div>
                        ) : (
                            <Tabs defaultActiveKey="1" onChange={handleTabChange} type="card" size="small">
                                <TabPane tab="Confirmed cases" key="1">
                                    <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                                        {filterData('confirmedCases')?.map(item => (
                                            <Col lg={6}>
                                                <Card loading={loading}>
                                                    <p className="light">State: <strong>{item.state}</strong></p>
                                                    <h1>{item.data}</h1>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </TabPane>
                                <TabPane tab="Admission cases" key="2">
                                    <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                                        {filterData('casesOnAdmission')?.map(item => (
                                            <Col lg={6}>
                                                <Card loading={loading}>
                                                    <p>State: {item.state}</p>
                                                    <h1>{item.data}</h1>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </TabPane>
                                <TabPane tab="Discharged cases" key="3">
                                    <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                                        {filterData('discharged')?.map(item => (
                                            <Col lg={6}>
                                                <Card loading={loading}>
                                                    <p>State: {item.state}</p>
                                                    <h1>{item.data}</h1>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </TabPane>
                                <TabPane tab="Death cases" key="4">
                                    <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                                        {filterData('death')?.map(item => (
                                            <Col lg={6}>
                                                <Card loading={loading}>
                                                    <p>State: {item.state}</p>
                                                    <h1>{item.data}</h1>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </TabPane>
                            </Tabs>
                        )}
                    </Card>
                </Col>
            </Row>
        </LayoutComponent>
    )
}

export default Question2
