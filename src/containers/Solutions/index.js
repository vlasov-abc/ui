/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import _ from 'lodash/fp';

import styles from './index.scss';
import '../../theme/common.scss';
import globalStyles from '../../theme/global.scss';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetSolutions from '../../actions/solutionsActions/getSolutions';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE,
  GET_SOLUTIONS_SUCCESS
} from '../../constants/solutionsConstants/getSolutions';
import SolutionsList from '../../components/SolutionsList';
import RunSolutionModal from '../RunSolution';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';

type Props = {
  history: Object,
  getProfileReducer: Object,
  getSolutionsReducer: Object,
  getNamespacesReducer: Object,
  fetchGetNamespacesIfNeeded: () => void,
  fetchGetSolutionsIfNeeded: () => void
};

export class Solutions extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isOpenedRunSolution: false,
      currentSolutionTemplate: null
    };
  }
  componentDidMount() {
    const { fetchGetSolutionsIfNeeded, getSolutionsReducer } = this.props;
    if (getSolutionsReducer.readyStatus !== GET_SOLUTIONS_SUCCESS) {
      fetchGetSolutionsIfNeeded();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      this.props.fetchGetNamespacesIfNeeded(
        nextProps.getProfileReducer.data.role
      );
    }
    if (nextState.isOpenedRunSolution && typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'hidden';
    } else if (!nextState.isOpenedRunSolution && typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
  }
  componentWillUnmount() {
    if (typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
  }
  handleClickRunSolution = solutionTemplate => {
    this.setState({
      ...this.state,
      isOpenedRunSolution: true,
      currentSolutionTemplate: solutionTemplate
    });
    // this.props.history.push(`/solutions/${solutionTemplate}/runSolution`);
  };
  handleOpenClose = () => {
    this.setState({
      ...this.state,
      isOpenedRunSolution: false,
      currentSolutionTemplate: null
    });
  };

  renderSolutionsList = () => {
    const { getSolutionsReducer, getNamespacesReducer, history } = this.props;
    if (
      !getSolutionsReducer.readyStatus ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_INVALID ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_REQUESTING ||
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING
    ) {
      return (
        <div className="row">
          {new Array(6).fill().map(() => (
            <div
              key={_.uniqueId()}
              className={`col-md-4  ${styles.solutionContainerPlaceholder}`}
              style={{
                display: 'inline-block',
                marginTop: 30,
                height: '307px',
                backgroundColor: '#f6f6f6'
              }}
            />
          ))}
        </div>
      );
    }
    if (
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_FAILURE ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE
    ) {
      return <p>Oops, Failed to load data of Solutions!</p>;
    }

    if (
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_SUCCESS &&
      getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      return (
        <SolutionsList
          data={getSolutionsReducer.data}
          history={history}
          handleClickRunSolution={solutionTemplate =>
            this.handleClickRunSolution(solutionTemplate)
          }
        />
      );
    }
    return null;
  };

  render() {
    const { history } = this.props;
    const { isOpenedRunSolution, currentSolutionTemplate } = this.state;
    return (
      <div>
        {currentSolutionTemplate ? (
          <Helmet title={`Run ${currentSolutionTemplate}`} />
        ) : (
          <Helmet title="Solutions" />
        )}
        {isOpenedRunSolution && (
          <RunSolutionModal
            history={history}
            isOpenedRunSolution={isOpenedRunSolution}
            currentSolutionTemplate={currentSolutionTemplate}
            handleOpenClose={this.handleOpenClose}
          />
        )}
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            {this.renderSolutionsList()}
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getProfileReducer,
    getSolutionsReducer,
    getNamespacesReducer
  }: ReduxState) => ({
    getProfileReducer,
    getSolutionsReducer,
    getNamespacesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role))
  })
);

export default connector(Solutions);
