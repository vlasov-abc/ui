import React from 'react';
import { Link } from 'react-router-dom';

const ConfigmapList = () => (
  <table
    className="block-item__tokens-table content-block__table table"
    style={{
      tableLayout: 'fixed',
      width: '100%',
      border: 0,
      cellspacing: 0,
      cellpadding: 0,
      marginTop: '30px'
    }}
  >
    <thead style={{ height: '30px' }}>
      <tr>
        <td className="td-2">Name</td>
        <td className="td-2">Filename</td>
        <td className="td-3">Namespace</td>
        <td className="td-7" />
      </tr>
    </thead>
    <tbody className="domains">
      <tr
        className="content-block-container card-container hover-action"
        style={{ margin: 0 }}
      >
        <td className="td-2">Name</td>
        <td className="td-2">
          <Link style={{ color: '#29abe2' }} to="/a">
            Filename
          </Link>
        </td>
        <td className="td-3">
          <Link style={{ color: '#29abe2' }} to="/b">
            Namespace
          </Link>
        </td>
        <td className="td-7 dropdown no-arrow">
          <i
            className="content-block-table__more ion-more dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-right" role="menu">
            <li className="dropdown-item text-danger">Delete</li>
          </ul>
        </td>
      </tr>
      <tr
        className="content-block-container card-container hover-action"
        style={{ margin: 0 }}
      >
        <td className="td-2">Name</td>
        <td className="td-2">
          <Link style={{ color: '#29abe2' }} to="/a">
            Filename
          </Link>
        </td>
        <td className="td-3">
          <Link style={{ color: '#29abe2' }} to="/b">
            Namespace
          </Link>
        </td>
        <td className="td-7 dropdown no-arrow">
          <i
            className="content-block-table__more ion-more dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-right" role="menu">
            <li className="dropdown-item text-danger">Delete</li>
          </ul>
        </td>
      </tr>
      <tr
        className="content-block-container card-container hover-action"
        style={{ margin: 0 }}
      >
        <td className="td-2">Name</td>
        <td className="td-2">
          <Link style={{ color: '#29abe2' }} to="/a">
            Filename
          </Link>
        </td>
        <td className="td-3">
          <Link style={{ color: '#29abe2' }} to="/b">
            Namespace
          </Link>
        </td>
        <td className="td-7 dropdown no-arrow">
          <i
            className="content-block-table__more ion-more dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-right" role="menu">
            <li className="dropdown-item text-danger">Delete</li>
          </ul>
        </td>
      </tr>
      <tr
        className="content-block-container card-container hover-action"
        style={{ margin: 0 }}
      >
        <td className="td-2">Name</td>
        <td className="td-2">
          <Link style={{ color: '#29abe2' }} to="/a">
            Filename
          </Link>
        </td>
        <td className="td-3">
          <Link style={{ color: '#29abe2' }} to="/b">
            Namespace
          </Link>
        </td>
        <td className="td-7 dropdown no-arrow">
          <i
            className="content-block-table__more ion-more dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-right" role="menu">
            <li className="dropdown-item text-danger">Delete</li>
          </ul>
        </td>
      </tr>
      <tr
        className="content-block-container card-container hover-action"
        style={{ margin: 0 }}
      >
        <td className="td-2">Name</td>
        <td className="td-2">
          <Link style={{ color: '#29abe2' }} to="/a">
            Filename
          </Link>
        </td>
        <td className="td-3">
          <Link style={{ color: '#29abe2' }} to="/b">
            Namespace
          </Link>
        </td>
        <td className="td-7 dropdown no-arrow">
          <i
            className="content-block-table__more ion-more dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-right" role="menu">
            <li className="dropdown-item text-danger">Delete</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
);

export default ConfigmapList;
