import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ConfirmEmail } from '../../actions/EmailConfirmActions';
import InputEmail from '../auth/InputEmail';
import MiniSpinner from '../MiniSpinner';

import Logo from '../Logo';

class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: '',
            email: '',
            isValidEmail: false
        };
        this.checkValidateEmailInput = this.checkValidateEmailInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        document.body.classList.add('c-body-bg');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: nextProps.errorMessage
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    handleClick(event) {
        event.preventDefault();
        const { dispatch } = this.props;

        if (this.state.isValidEmail) {
            const creds = { email: this.state.email.trim() };
            dispatch(ConfirmEmail(creds));
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Email is not valid'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    checkValidateEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            email: email,
            isValidEmail: isValidEmail
        });
    }
    render() {
        const resetButtonText = this.props.confirmEmailReducer.isFetching ? <MiniSpinner /> : 'Reset';
        return (
            <div className="container">
                <Logo />
                <form className="form-signin" onSubmit={(event) => this.handleClick(event)}>
                    <div className="card c-card">
                        <div className="card-block p-5">
                            <div className="card-label">Reset Password</div>
                            <div id="loginAlert" className="alert alert-danger mb-4 c-alert-danger">
                                { this.state.errorMsg }
                            </div>
                            <InputEmail
                                handleEmail={
                                    (email, isValidEmail) =>
                                        this.checkValidateEmailInput(email, isValidEmail)
                                }
                            />
                            <button ref="button" type="submit" className="btn btn-block c-btn-green">{ resetButtonText }</button>
                        </div>
                        <div className="card-footer text-center">Don`t have an account? <Link to="/SignUp">Sing up</Link></div>
                    </div>
                    <p className="text-center pt-3"><Link to="/Login" className="c-link-wt">Go to Login</Link></p>
                </form>
            </div>
        );
    }
}

Forgot.propTypes = {
    dispatch: PropTypes.func.isRequired,
    confirmEmailReducer: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { confirmEmailReducer } = state;
    const { errorMessage } = confirmEmailReducer;

    return {
        errorMessage,
        confirmEmailReducer
    };
}

export default connect(mapStateToProps)(Forgot);