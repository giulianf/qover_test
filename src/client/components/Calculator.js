import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import Validator from '../../validator/validatorBasicInfo';
import ProvideActions from '../actions/ProvideActions';

export default class Calculator extends Component {
  constructor (props){
    super(props);
  }

  render () {
      const validateName = Validator.validateNom(this.props.simulatorInfo.name) ? "success" : "error";
      const validateCarValue = Validator.validateCarValue(this.props.simulatorInfo.name) ? "success" : "error";

      const carOption = _.map(this.props.carOptionList, carName => {
          return (
              <option value={carName.value}>carName.label</option>
          )
      });

    return (
        <Form>
            <Grid>
                <Row>
                   <Col lg={12}>
                       <FormGroup controlId="formHorizontalNom" validationState={validateName}>
                         <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                           Name
                         </Col>
                         <Col sm={12} md={8}>
                           <FormControl type="text" placeholder="Family namm"
                               onChange={e => ProvideActions.updateBasicInfo({nom: e.target.value})}  value={this.props.simulatorInfo.name}/>
                         </Col>
                       </FormGroup>
                       <FormGroup controlId="formControlsSelect">
                          <ControlLabel>Select a car</ControlLabel>
                          <FormControl componentClass="select" placeholder="Select a car" value={this.props.simulatorInfo.carName}>
                            { carOption }
                          </FormControl>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalNom" validationState={validateCarValue}>
                          <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                            Car Value
                          </Col>
                          <Col sm={12} md={8}>
                            <FormControl type="number" placeholder="Car value"
                                onChange={e => ProvideActions.updateBasicInfo({nom: e.target.value})}  value={this.props.simulatorInfo.carValue}/>
                          </Col>
                        </FormGroup>
                   </Col>
                </Row>
            </Grid>
        </Form>
    );
  }
}
