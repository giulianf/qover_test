import React, { Component, PropTypes } from 'react';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, HelpBlock, Checkbox } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideActions from '../../../actions/ProvideActions';
var DatePicker = require("react-bootstrap-date-picker");
import { validateEmail } from '../../../../common/Utility';
import belgium from '../../../../data/zipcode-belgium.json';
import Validator from '../../../../validator/validatorBasicInfo';

class ProfileTabBasic extends Component {
    constructor (props){
        super(props);
        this._handleSaveBasicInfo = this._handleSaveBasicInfo.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _handleSaveBasicInfo() {
       // Save action for Server
       this.props.updateBasicInfo(this.props.basicInfo);
    }
    render () {
        const listZip = _.sortedUniq(_.map(belgium, (city) => {
            return city.zip;
        }));
        const cityData = _.map(listZip, (city) => {
            return (<option key={city} value={city}></option>);
        });

        const validatePrenom = Validator.validatePrenom(this.props.basicInfo.prenom) ? "success" : "error";
        const validateNom = Validator.validateNom(this.props.basicInfo.nom) ? "success" : "error";
        const validateNaissance = Validator.validateNaissance(this.props.basicInfo.dateNaissance) ? "success" : "error";
        const validateNational = Validator.validateNational(this.props.basicInfo.numNational) ? "success" : "error";
        const validateEmailAddress = Validator.validateEmailAddress(this.props.basicInfo.email) ? "success" : "error";
        const validateAddress = Validator.validateAddress(this.props.basicInfo.address) ? "success" : "error";
        const validateCodePostal = Validator.validateCodePostal(this.props.basicInfo.codePostal) ? "success" : "error";
        const validateVille = Validator.validateVille(this.props.basicInfo.ville) ? "success" : "error";

        return (
            <div key='profileTabBasic'>
                <Col md={9} sm={9} className='space-top-bottom'>
                    <Form horizontal>
                      <FormGroup controlId="formHorizontalPrenom" validationState={validatePrenom}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Prénom
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Prénom"
                              onChange={e => ProvideActions.updateBasicInfo({prenom: e.target.value})}  value={this.props.basicInfo.prenom}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalNom" validationState={validateNom}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Nom
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Nom"
                              onChange={e => ProvideActions.updateBasicInfo({nom: e.target.value})}  value={this.props.basicInfo.nom}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalNaissance" validationState={validateNaissance}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Date de Naissance
                        </Col>
                        <Col sm={12} md={8}>
                            <DatePicker id="example-datepicker" dateFormat='DD/MM/YYYY' value={this.props.basicInfo.dateNaissance}
                                dayLabels={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']}
                                monthLabels={['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']}
                                onChange={ (value, formattedValue) => ProvideActions.updateBasicInfo({dateNaissance: value}) } />
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalnumNational" validationState={validateNational}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Numéro National
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="number" placeholder="Numéro National"
                              onChange={e => ProvideActions.updateBasicInfo({numNational: e.target.value})}  value={this.props.basicInfo.numNational}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalemail" validationState={validateEmailAddress}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          e-mail
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="email" placeholder="michel.martin@exemple.com"
                              onChange={e => ProvideActions.updateBasicInfo({email: e.target.value})}  value={this.props.basicInfo.email}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaladdress" validationState={validateNom}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Adresse
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Adresse postale"
                              onChange={e => ProvideActions.updateBasicInfo({address: e.target.value})}  value={this.props.basicInfo.address}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalcode" validationState={validateCodePostal}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Code Postal
                        </Col>
                        <Col sm={4} md={4}>
                            <FormControl type="text" placeholder="Code Postal" list="list"
                                onChange={e => ProvideActions.updateBasicInfo({codePostal: parseInt(e.target.value)})}  value={this.props.basicInfo.codePostal}/>
                            <datalist id="list">
                                    {cityData}
                                </datalist>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalville" validationState={validateNom}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Ville
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Ville"
                              onChange={e => ProvideActions.updateBasicInfo({ville: e.target.value})}  value={this.props.basicInfo.ville}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalville" validationState={validateNom}>
                        <Col sm={12} md={8}>
                            <Checkbox checked={ this.props.basicInfo.isEmprunteur } onChange={e => ProvideActions.updateBasicInfo({isEmprunteur: !this.props.basicInfo.isEmprunteur})} >
                            Souhaitez-vous emprunter
                          </Checkbox>
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Col smOffset={10} sm={2} mdOffset={8} md={2}>
                          <Button bsStyle="primary"
                            onClick={ this._handleSaveBasicInfo }>
                            Enregistrer
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                </Col>
            </div>
        );
    }
}

ProfileTabBasic.contextTypes = {
    basicInfo: React.PropTypes.object.isRequired
};


export default ProfileTabBasic;
