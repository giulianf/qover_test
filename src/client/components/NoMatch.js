import React, { Component, } from 'react';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router';

export default class NoMatch extends Component {
  constructor (){
    super();
  }

  render () {
    return (
      <Grid fluid>
                  <div className="well">
                      <PageHeader><i className="ace-icon fa fa-sitemap"></i> 404 <small>Page not found!</small></PageHeader>

                    <h3 className="lighter smaller">Sorry, the page you were looking for could not be found!</h3>

                    <hr />
                    <div className="space"></div>

                    <div className="center">
                      <a href="javascript:history.back()" className="btn btn-grey">
                        <i className="ace-icon fa fa-arrow-left"></i>
                        Try using the button below to go to main page of the site
                      </a>

                      <Link to="/" ><i className="ace-icon fa fa-tachometer"></i> Home page</Link>
                    </div>
                  </div>

      </Grid>
    );
  }
}
