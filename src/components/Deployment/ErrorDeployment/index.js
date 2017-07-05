import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorDeployment extends Component {
    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-block c-table-card-block">
                                ERROR {this.props.errorMessage}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ErrorDeployment.propTypes = {
    errorMessage: PropTypes.string
};

export default ErrorDeployment;