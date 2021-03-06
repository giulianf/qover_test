import React, { Component, PropTypes  } from 'react';
import _ from 'lodash';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, HelpBlock, Label } from 'react-bootstrap';
import Validator from '../../validator/validatorBasicInfo';
import ProvideActions from '../actions/ProvideActions';

class Calculator extends Component {
  constructor (props){
    super(props);
  }

  render () {
      if (_.isNil(this.props.simulatorInfo)) {
          return null;
      }
      const validateNameBool = Validator.validateName(this.props.simulatorInfo.name) ;
      const validateCarNameBool = Validator.validateCarName(this.props.carOptionList, this.props.simulatorInfo.carName);
      const validateCarValueBool = Validator.validateCarValue(this.props.simulatorInfo.carValue);
      const validateName = validateNameBool ? "success" : "error";
      const validateCarName = validateCarNameBool ? "success" : "error";
      const validateCarValue = validateCarValueBool ? "success" : "error";

      const carOption = _.map(this.props.carOptionList, carName => {
          return (
              <option key={carName.value} value={carName.value}>{carName.label}</option>
          )
      });

      // Button disable
    const disableCalculate = validateNameBool && validateCarValueBool && validateCarNameBool ? false : true;
    const buttonCalculate = (
        <Button
            bsStyle='primary'
            disabled={ disableCalculate }
            onClick={!disableCalculate ? this.props.handleSimulateClick : null}>
            GET PRICE
        </Button>
    );

    const result = this.props.simulatorInfo.price  ? (
        <Col lg={3}>
            <h3>Price <Label>{ this.props.simulatorInfo.price }</Label></h3>
        </Col>
    ) : null;

    return (
        <Form horizontal>
            <Grid>
                <Row>
                   <Col lg={12}>
                       <FormGroup controlId="formHorizontalName" validationState={validateName}>
                         <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                           Name
                         </Col>
                         <Col sm={6} md={4}>
                           <FormControl type="text" placeholder="Family name"
                               onChange={e => ProvideActions.updateSimulator({name: e.target.value})}  value={this.props.simulatorInfo.name}/>
                               <HelpBlock>Name must at least 5 characters</HelpBlock>
                         </Col>
                       </FormGroup>
                       <FormGroup controlId="formControlsCarSelect" validationState={validateCarName}>
                           <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                             Select a car
                           </Col>
                           <Col sm={6} md={4}>
                              <FormControl componentClass="select"
                              onChange={e => ProvideActions.updateSimulator({carName: e.target.value})}
                              placeholder="Select a car" value={this.props.simulatorInfo.carName}>
                              <option value='select'>Select</option>
                                { carOption }
                              </FormControl>
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalCarValue" validationState={validateCarValue}>
                          <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                            Car Value
                          </Col>
                          <Col sm={6} md={4}>
                            <FormControl type="number" placeholder="Car value"
                                onChange={e => ProvideActions.updateSimulator({carValue: parseFloat(e.target.value)})}  value={this.props.simulatorInfo.carValue}/>
                          </Col>
                        </FormGroup>
                   </Col>
                   </Row>
                    <Row>
                        <Col lg={2} lgOffset={5}>
                        { buttonCalculate }
                        </Col>
                    </Row>
                    <Row>
                         { result }
                    </Row>
            </Grid>
        </Form>
    );
  }
}

Calculator.propTypes = {
  handleSimulateClick: PropTypes.func.isRequired,
};

export default Calculator;
