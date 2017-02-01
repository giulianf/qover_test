import React, { Component, PropTypes } from 'react';
import {Grid,  Row, Col} from 'react-bootstrap';
import LayoutStore from '../stores/LayoutStore';

import _ from 'lodash';

function getState() {
    return LayoutStore.stateLog;
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = getState();

            this.state.lock;
    }

    componentDidMount() {

    }


    render() {
        return (
            <Grid >
                <Row className='section section-padding'>
                    <Col md={4} sm={8} xs={12} mdOffset={4} smOffset={4} >

                    </Col>
                </Row>
            </Grid>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.func
};

export default Login;
