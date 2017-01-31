import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

import {Grid,  Row, Col, Navbar, Nav,NavDropdown, NavItem,MenuItem, Button, Glyphicon } from 'react-bootstrap';
import Login from './Login';
import LayoutStore from '../stores/LayoutStore';
import LayoutActions from '../actions/LayoutActions';

import _ from 'lodash';


function getLayoutState() {
  return LayoutStore.stateLayout;
}

class Layout extends Component {
    constructor(props, context) {
        super(props);
        this.state = getLayoutState();
        this._onChange = this._onChange.bind(this);
        this.logout = this.logout.bind(this);

      }

    logout() {
       LayoutActions.logUserOut();

       // redirects to login page
       this.context.router.push('/');
     }

    _onChange() {
        this.setState(getLayoutState());
    }

    componentDidMount() {
        LayoutStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        LayoutStore.removeChangeListener(this._onChange);
    }

    render() {
      let connexion;

      if ( this.state.loggedIn ) {
          connexion =  (
              <NavDropdown eventKey={3} title={<Glyphicon glyph="user" >{this.state.profile ? this.state.profile.name : null}</Glyphicon>} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.3} onClick={this.logout} >Log Out <Glyphicon glyph="log-out" className="pull-right"></Glyphicon></MenuItem>
              </NavDropdown>
          ) ;
      }
        return (
          <Grid id='mainLayout' fluid>
            <Row>
              <Navbar fixedTop fluid className="">
                  <Grid>
                    <Navbar.Header>
                    </Navbar.Header>

                    <Navbar.Collapse>
                     <Nav pullRight>
                        <li>
                            <Navbar.Form>
                                {connexion}
                            </Navbar.Form>
                        </li>

                     </Nav>
                   </Navbar.Collapse>
                 </Grid>
               </Navbar>
          </Row>
          <Row className="layout-content">
                    {/* this is the important part */}
                    {this.props.children}
              </Row>
          </Grid>
        );
    }
}

Layout.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default withRouter(Layout);
