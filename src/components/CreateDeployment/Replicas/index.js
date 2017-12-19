import React, { Component } from 'react';
import PropTypes from "prop-types";
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Replicas extends Component {
    render() {
        return (
	        <div className="blockContainer blockContainerPadin" id="replicas">
		        <div className="col-md-7">
			        <div className="containerTitle"><span>*</span> Replicas
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
			        <div className="containerSubTitle">Enter Replicas count</div>
			        <div className="has-float-label">
				        <input
					        className="form-control
					        customInput"
					        id="text3"
					        value={this.props.value}
					        type="number"
					        min="1"
					        max="15"
					        onChange={(e) => (this.props.onChangeInputReplicas(e.target.value))}
				        />
				        <label className="customLabel" htmlFor="text3">Count</label>
				        <div className="helperText">Max 15 replicas</div>
			        </div>
		        </div>
	        </div>
        );
    }
}

Replicas.propTypes = {
	onChangeInputReplicas: PropTypes.func.isRequired,
	value: PropTypes.string
};

export default Replicas;
