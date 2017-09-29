import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import nslogo from '../../../images/deploym.png';

// import Notification from '../../components/Notification';

class NamespacesContainer extends Component {
    handleClickTR(href) {
        browserHistory.push('/Namespaces/' + href);
    }
    handleClose(e) {
        e.stopPropagation();
    }
    handleClickDeletingNamespace(idName) {
        // this.props.onDeletingNamespace(idName);
        console.log(idName);
    }
    render() {
        return (
            <div>
                {/* <Notification*/}
                {/* status={this.props.DeleteDeploymentReducer.status}*/}
                {/* name={this.props.DeleteDeploymentReducer.deploymentName}*/}
                {/* errorMessage={this.props.DeleteDeploymentReducer.errorMessage}*/}
                {/* />*/}
                <div className="row double">
                    {
                        this.props.PostsNamespacesDataReducer.map((item) => {
                            const name = item.name;
                            // const nameFirstChar = name.substring(0, 1).toUpperCase();
                            const id = `item_${name}`;
                            return (
                                <div className="col-md-4" id={id} key={id} onClick={href => this.handleClickTR(item.name)}>
                                    <div className="content-block-container card-container hover-action">
                                        <div className="content-block-header">
                                            <div className="content-block-header-label">
                                                <div className="content-block-header-img">
                                                    <img src={nslogo} alt=""/>
                                                </div>
                                                <div className="content-block-header-label__text content-block-header-label_main">{name}</div>
                                            </div>
                                            {/*<div className="content-block-header-extra-panel" onClick={this.handleClose.bind(this)}>*/}
                                                {/*<div className="content-block-header-extra-panel dropdown no-arrow">*/}
                                                    {/*<i*/}
                                                        {/*className="content-block-header__more ion-more dropdown-toggle"*/}
                                                        {/*data-toggle="dropdown"*/}
                                                        {/*aria-haspopup="true"*/}
                                                        {/*aria-expanded="false"*/}
                                                    {/*> </i>*/}
                                                    {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                                        {/*<button*/}
                                                            {/*className="dropdown-item text-danger"*/}
                                                            {/*onClick={idName => this.handleClickDeletingNamespace(name)}*/}
                                                        {/*>Delete</button>*/}
                                                    {/*</ul>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        </div>

                                        <div className="content-block-content card-block">
                                            <div className="content-block__info-item ">
                                                <div className="content-block__info-name inline">RAM ( Usage / Total ) :&nbsp;</div>
                                                <div className="content-block__info-text inline">{item.memory} / {item.memory_limit} MB</div>
                                            </div>
                                            <div className="content-block__info-item">
                                                <div className="content-block__info-name inline">CPU ( Usage / Total ) :&nbsp;</div>
                                                <div className="content-block__info-text inline">{item.cpu / 1000} / {item.cpu_limit / 1000}</div>
                                            </div>
                                            {/*<div className="content-block__info-item">*/}
                                                {/*<div className="content-block__info-name inline">Volume ( Usage / Total ) :&nbsp;</div>*/}
                                                {/*<div className="content-block__info-text inline">431 / 500 GB</div>*/}
                                            {/*</div>*/}
                                        </div>

                                    </div>
                                </div>
                            );
                        })
                    }
                    {/*<div className="col-md-4 align-middle">*/}
                        {/*<div className="add-new-block content-block-content card-container hover-action ">*/}
                            {/*<div className="action"><i>+</i> Add a namespace</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

NamespacesContainer.propTypes = {
    PostsNamespacesDataReducer: PropTypes.array
};

export default NamespacesContainer;