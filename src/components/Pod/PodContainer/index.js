import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import rectangle from '../../../images/rectangle.png';

class PodContainer extends Component {
    render() {
        // console.log(this.props.GetPodReducer);
        const containers = Object.keys(this.props.GetPodReducer.data).length ? this.props.GetPodReducer.data.containers : [];
        // const nameFirstChar = name.substring(0, 1).toUpperCase();
        // const imageColor = podStatus.toUpperCase() === 'Running'.toUpperCase() ? '#009688' : '#D64242';
        // const containers = Object.keys(this.props.GetPodReducer.data).length ? this.props.GetPodReducer.data.containers : [];
        return (
            <div className="content-block">
                <div className=" container no-back">
                    <div className="row double">
                        {
                            containers.map((item, index) => {
                                return (
                                    <div className="col-md-6" key={index}>
                                        <div className="content-block-container card-container hover-action mt-0">
                                            <div className="content-block-header">
                                                <div className="content-block-header-label">
                                                    <div className="content-block-header-img"><img src={rectangle} alt="" /></div>
                                                    <div className="content-block-header-label__text content-block-header-label_main">{item.name}</div>
                                                </div>
                                                {/*<div className="content-block-header-extra-panel">*/}
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
                                                            {/*>Delete</button>*/}
                                                        {/*</ul>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            </div>
                                            <div className="content-block-content card-block collapsed">
                                                <div className="content-block__info-item ">
                                                    <div className="content-block__info-name inline">RAM ( Usage / Total ) :&nbsp;</div>
                                                    <div className="content-block__info-text inline">{item.ram} MB</div>
                                                </div>
                                                <div className="content-block__info-item">
                                                    <div className="content-block__info-name inline">CPU ( Usage / Total ) :&nbsp;</div>
                                                    <div className="content-block__info-text inline">{item.cpu} m</div>
                                                </div>
                                                <div className="content-block__info-item">
                                                    <div className="content-block__info-name inline">Image:&nbsp;</div>
                                                    <div className="content-block__info-text inline">{item.image}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

PodContainer.propTypes = {
    GetPodReducer: PropTypes.object,
    idName: PropTypes.string,
    idDep: PropTypes.string,
    idPod: PropTypes.string
};

function mapStateToProps(state) {
    return {
        GetPodReducer: state.GetPodReducer
    };
}

export default connect(mapStateToProps)(PodContainer);
