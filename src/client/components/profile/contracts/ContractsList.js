import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
var Griddle = require('griddle-react');
import DetailButton from './DetailButton';
import StatusContract from './StatusContract';
import ProgressBarContract from './ProgressBarContract';
import VerticalLinearStepper from '../../VerticalLinearStepper';

class ContractsList extends Component {
  constructor (props){
    super(props);

  }

  componentDidMount() {
   }

   componentWillUnmount() {
   }

    render () {
        const verticalLinearVisible = !_.isNil(this.props.tabContracts) && this.props.tabContracts.stepWorkflow.visible ?  (<VerticalLinearStepper list={this.props.statusContract} stepWorkflow={this.props.stepWorkflow} />) : null;
        const contracts = !_.isNil(this.props.tabContracts) && !_.isNil(this.props.tabContracts.contracts) ? this.props.tabContracts.contracts : [];

    return (
        <div key={this.props.keyTab}>
            <Col className='space-top-bottom'>
                <Griddle results={ contracts } showFilter={true} showSettings={true} useGriddleStyles={true}
                   noDataMessage="Il n'y a pas de contrats prêteur"
                    columnMetadata={this.customPreteurColumnMetadata} columns={["id", "creationDate", "progress"]}/>
            </Col>
                {verticalLinearVisible}
        </div>
    );
    }

  get customPreteurColumnMetadata() {
   return (
     [
        {
            "columnName": "id",
            "order": 1,
            "locked": true,
            "visible": true,
            "displayName": "Détails",
            "customComponent": DetailButton,
            "metaDataFrom": "contract",
            "cssClassName": "detailClass"
        },
        {
            "columnName": "creationDate",
            "order": 3,
            "locked": false,
            "visible": true,
            "displayName" : "Date de création du contrat",
            "cssClassName" : "creationClass"
        },
        {
            "columnName": "status",
            "order": 4,
            "locked": false,
            "visible": false,
            "displayName" : "Status",
            "customComponent": StatusContract,
            "cssClassName": "statusClass"
        },
        {
            "columnName": "progress",
            "order": 5,
            "locked": true,
            "visible": true,
            "displayName": "Progression",
            "customComponent": ProgressBarContract,
            "metaDataFrom": "contract",
            "cssClassName": "progressClass"
        },
        {
            "columnName": "user_idPreteur",
            "order": 6,
            "locked": true,
            "visible": false,
            "displayName": "preteur"
        },
        {
            "columnName": "stepWorkflow",
            "order": 7,
            "locked": true,
            "visible": false,
            "displayName": "step"
        }
     ]
   );
 }
}


ContractsList.contextTypes = {
    tabContracts: React.PropTypes.object.isRequired,
};

export default ContractsList ;
