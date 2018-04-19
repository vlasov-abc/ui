import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { routerLinks } from '../../config';
import Notification from '../Notification';
import DeleteUserMembershipModal from '../../components/CustomerModal/DeleteUserMembershipModal';
import AddUserInMembershipModal from '../../components/CustomerModal/AddUserInMembershipModal';
import MembershipList from '../../components/MembershipList';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionGetNamespaceUsersAccess from '../../actions/namespaceActions/getNamespaceUsersAccess';
import * as actionAddNamespaceUserAccessIfNeeded from '../../actions/namespaceActions/addNamespaceUserAccess';
import * as actionDeleteNamespaceUserAccessIfNeeded from '../../actions/namespaceActions/deleteNamespaceUserAccess';
// import { ADD_NAMESPACE_USER_ACCESS_SUCCESS } from '../../constants/namespaceConstants/addNamespaceAccess';
import {
  GET_NAMESPACE_USERS_ACCESS_INVALID,
  GET_NAMESPACE_USERS_ACCESS_FAILURE,
  GET_NAMESPACE_USERS_ACCESS_REQUESTING,
  GET_NAMESPACE_USERS_ACCESS_SUCCESS
} from '../../constants/namespaceConstants/getNamespaceUsersAccess';
import {
  ADD_NAMESPACE_USER_ACCESS_FAILURE,
  ADD_NAMESPACE_USER_ACCESS_SUCCESS
} from '../../constants/namespaceConstants/addNamespaceUserAccess';
import { DELETE_NAMESPACE_USER_ACCESS_SUCCESS } from '../../constants/namespaceConstants/deleteNamespaceUserAccess';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

type Props = {
  match: Object,
  history: Object,
  getNamespaceUsersAccessReducer: Object,
  addNamespaceUserAccessReducer: Object,
  deleteNamespaceUserAccessReducer: Object,
  getProfileReducer: Object,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchGetNamespaceUsersAccessIfNeeded: (idName: string) => void,
  fetchAddNamespaceUserAccessIfNeeded: (idName: string, data: Object) => void,
  fetchDeleteNamespaceUserAccessIfNeeded: (
    idName: string,
    username: string
  ) => void
};

class Membership extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      inputEmailDelete: '',
      inputEmailAdd: '',
      isOpen: false,
      isOpenAdd: false,
      idUser: null,
      accessNewUser: 'read',
      accessUser: 'read',
      membersList: [],
      errAdd: null
    };
  }
  componentDidMount() {
    const {
      fetchGetNamespaceIfNeeded,
      fetchGetNamespaceUsersAccessIfNeeded,
      match
    } = this.props;
    fetchGetNamespaceIfNeeded(match.params.idName);
    fetchGetNamespaceUsersAccessIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    const {
      fetchGetNamespaceUsersAccessIfNeeded,
      getProfileReducer,
      match
    } = this.props;
    if (
      this.props.getNamespaceUsersAccessReducer.readyStatus !==
        nextProps.getNamespaceUsersAccessReducer.readyStatus &&
      nextProps.getNamespaceUsersAccessReducer.readyStatus ===
        GET_NAMESPACE_USERS_ACCESS_SUCCESS &&
      getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getNamespaceUsersAccessReducer.data.users) {
        const {
          new_access_level: newAccessLevel
        } = nextProps.getNamespaceUsersAccessReducer.data;
        const users = nextProps.getNamespaceUsersAccessReducer.data.users.concat(
          [
            {
              login: nextProps.getProfileReducer.data.login,
              new_access_level: newAccessLevel
            }
          ]
        );
        this.setState({
          ...this.state,
          membersList: users.sort(
            (a, b) =>
              a.new_access_level === 'owner' || b.new_access_level === 'owner'
          )
        });
      } else {
        this.props.history.push(
          routerLinks.namespaceLink(this.props.match.params.idName)
        );
      }
    }
    if (
      (this.props.addNamespaceUserAccessReducer.readyStatus !==
        nextProps.addNamespaceUserAccessReducer.readyStatus &&
        nextProps.addNamespaceUserAccessReducer.readyStatus ===
          ADD_NAMESPACE_USER_ACCESS_SUCCESS) ||
      (this.props.deleteNamespaceUserAccessReducer.readyStatus !==
        nextProps.deleteNamespaceUserAccessReducer.readyStatus &&
        nextProps.deleteNamespaceUserAccessReducer.readyStatus ===
          DELETE_NAMESPACE_USER_ACCESS_SUCCESS)
    ) {
      this.setState({
        ...this.state,
        isOpen: false,
        idUser: null,
        inputEmailDelete: '',
        isOpenAdd: false,
        inputEmailAdd: '',
        errAdd: null
      });
      fetchGetNamespaceUsersAccessIfNeeded(match.params.idName);
    }
    if (
      this.props.addNamespaceUserAccessReducer.readyStatus !==
        nextProps.addNamespaceUserAccessReducer.readyStatus &&
      nextProps.addNamespaceUserAccessReducer.readyStatus ===
        ADD_NAMESPACE_USER_ACCESS_FAILURE
    ) {
      const { err: errAdd } = nextProps.addNamespaceUserAccessReducer;
      this.setState({
        errAdd
      });
    }
  }
  choiceAccessNewUser = access => {
    this.setState({
      ...this.state,
      accessNewUser: access
    });
  };
  changeAccessUser = (login, access) => {
    const { fetchAddNamespaceUserAccessIfNeeded, match } = this.props;
    const user = this.state.membersList.find(member => member.login === login);
    const { new_access_level: newAccessLevel } = user;
    if (access !== newAccessLevel) {
      this.setState(
        {
          ...this.state,
          accessUser: access
        },
        () => {
          fetchAddNamespaceUserAccessIfNeeded(
            match.params.idName,
            {
              username: login,
              access
            },
            'change'
          );
        }
      );
    }
  };
  handleDeleteDMembers = idUser => {
    this.setState({
      ...this.state,
      idUser,
      isOpen: true
    });
  };
  handleAddMembersAdd = () => {
    this.setState({
      ...this.state,
      isOpenAdd: true
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
      idUser: null,
      inputEmailDelete: ''
    });
  };
  handleOpenCloseModalAdd = () => {
    this.setState({
      isOpenAdd: !this.state.isOpenAdd,
      accessNewUser: 'read',
      inputEmailAdd: '',
      errAdd: null
    });
  };
  handleInputEmailDelete = inputEmailDelete => {
    this.setState({
      ...this.state,
      inputEmailDelete
    });
  };
  handleInputEmailAdd = inputEmailAdd => {
    this.setState({
      ...this.state,
      inputEmailAdd
    });
  };

  renderMembershipList = () => {
    const { getNamespaceUsersAccessReducer, match } = this.props;
    if (
      !getNamespaceUsersAccessReducer.readyStatus ||
      getNamespaceUsersAccessReducer.readyStatus ===
        GET_NAMESPACE_USERS_ACCESS_INVALID ||
      getNamespaceUsersAccessReducer.readyStatus ===
        GET_NAMESPACE_USERS_ACCESS_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '200px',
            margin: '10px 0',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (
      getNamespaceUsersAccessReducer.readyStatus ===
      GET_NAMESPACE_USERS_ACCESS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Namespaces!</p>;
    }

    return (
      <MembershipList
        idName={match.params.idName}
        membersList={this.state.membersList}
        changeAccessUser={this.changeAccessUser}
        handleDeleteDMembers={this.handleDeleteDMembers}
      />
    );
  };

  render() {
    const {
      match,
      deleteNamespaceUserAccessReducer,
      addNamespaceUserAccessReducer,
      fetchAddNamespaceUserAccessIfNeeded,
      fetchDeleteNamespaceUserAccessIfNeeded
    } = this.props;
    const {
      status: statusAdd,
      idName: idNameAdd,
      isFetching: isFetchingAdd,
      method: methodAdd
    } = addNamespaceUserAccessReducer;
    const {
      status: statusDelete,
      idName: idNameDelete,
      err: errDelete
    } = deleteNamespaceUserAccessReducer;
    const { idName } = match.params;
    return (
      <div>
        <Helmet title={`Membership of ${idName}`} />
        <Notification
          status={statusDelete}
          name={idNameDelete}
          errorMessage={errDelete}
        />
        <Notification status={statusAdd} name={idNameAdd} method={methodAdd} />
        <DeleteUserMembershipModal
          type="Delete User access"
          name={this.state.inputEmailDelete}
          isOpened={this.state.isOpen}
          typeName={this.state.idUser}
          idName={idName}
          handleInputEmailDelete={this.handleInputEmailDelete}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchDeleteNamespaceUserAccessIfNeeded}
        />
        <AddUserInMembershipModal
          type="Add User"
          name={this.state.inputEmailAdd}
          isOpened={this.state.isOpenAdd}
          handleInputEmailAdd={this.handleInputEmailAdd}
          handleOpenCloseModal={this.handleOpenCloseModalAdd}
          onHandleAdd={fetchAddNamespaceUserAccessIfNeeded}
          isFetchingAdd={isFetchingAdd}
          accessNewUser={this.state.accessNewUser}
          choiceAccessNewUser={this.choiceAccessNewUser}
          namespaceId={match.params.idName}
          err={this.state.errAdd}
        />
        <div className="content-block">
          <div className="container no-back">
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className="content-block">
                  <div
                    className="content-block-container container"
                    style={{ paddingTop: '40px' }}
                  >
                    <div className="content-block-header">
                      <div className="content-block-header-label__text content-block-header-label_main__membership content-block-header-label_main content-block-header-label__text_namspace-info">
                        {idName}
                      </div>
                      <div
                        className="content-block-header-nav"
                        style={{ marginBottom: 20 }}
                      >
                        <ul
                          className="content-block-menu nav nav-pills content-block-menu__membership"
                          role="tablist"
                          style={{ height: '50px' }}
                        >
                          <li
                            className="content-block-menu__li content-block-menu__li_membership nav-item"
                            style={{ width: 'auto' }}
                          >
                            <NavLink
                              to={routerLinks.getMembershipLink(idName)}
                              className="content-block-menu__link"
                            >
                              Users
                            </NavLink>
                          </li>
                          <li className="membership-btn-container">
                            <button
                              className="membership-btn"
                              onClick={this.handleAddMembersAdd}
                            >
                              Add Users
                            </button>
                          </li>
                        </ul>
                      </div>
                      {this.renderMembershipList()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getNamespaceUsersAccessReducer,
    getNamespaceReducer,
    addNamespaceUserAccessReducer,
    deleteNamespaceUserAccessReducer,
    getProfileReducer
  }: ReduxState) => ({
    getNamespaceUsersAccessReducer,
    getNamespaceReducer,
    addNamespaceUserAccessReducer,
    deleteNamespaceUserAccessReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchGetNamespaceUsersAccessIfNeeded: (idName: string) =>
      dispatch(
        actionGetNamespaceUsersAccess.fetchGetNamespaceUsersAccessIfNeeded(
          idName
        )
      ),
    fetchAddNamespaceUserAccessIfNeeded: (
      idName: string,
      date: Object,
      access: string
    ) =>
      dispatch(
        actionAddNamespaceUserAccessIfNeeded.fetchAddNamespaceUserAccessIfNeeded(
          idName,
          date,
          access
        )
      ),
    fetchDeleteNamespaceUserAccessIfNeeded: (
      idName: string,
      username: string
    ) =>
      dispatch(
        actionDeleteNamespaceUserAccessIfNeeded.fetchDeleteNamespaceUserAccessIfNeeded(
          idName,
          username
        )
      )
  })
);

export default connector(Membership);
