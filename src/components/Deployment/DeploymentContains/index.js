import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import NavLink from '../../../containers/NavLink';

class DeploymentContains extends Component {
    render() {
        return (
            <div className="content-block">
                <div className="content-block-container container ">
                    <div className="content-block-header">
                        <div className="content-block-header-label">
                            <div className="content-block-header-label__text content-block-header-label_border">Pods</div>
                        </div>
                        {/*<div className="content-block-header-extra-panel">*/}
                            {/*<div className="content-block-header-extra-panel">*/}
                                {/*<button type="button" className="button_blue btn btn-outline-primary">Create</button>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

DeploymentContains.propTypes = {
    children: PropTypes.object.isRequired
};

export default DeploymentContains;
