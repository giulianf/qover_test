import React, { Component } from 'react';
import Calculator from './Calculator';
import ProvideStore from '../stores/ProvideStore';
import ProvideActions from '../actions/ProvideActions';

export default class HomePage extends Component {
    constructor (props){
        super(props);
        ProvideActions.getCarList();

        this._onChange = this._onChange.bind(this);
        this._handleSimulateClick = this._handleSimulateClick.bind(this);

        this.state = ProvideStore.stateSimulator;

    }

    _onChange() {
        this.setState(ProvideStore.stateSimulator);
    }

    componentDidMount() {
        ProvideStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ProvideStore.removeChangeListener(this._onChange);
    }

    _handleSimulateClick() {
        ProvideActions.calculate(this.state.profile, this.state.simulatorInfo);
    }

    render () {
        return (
            <div>
              {/* Calculator */}
              <Calculator handleSimulateClick={this._handleSimulateClick} {...this.state}/>
            </div>
        );
    }
}
