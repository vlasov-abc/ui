import React, { Component } from 'react';
import Button from './Button';
import { Link } from 'react-router';
import setDeploymentId from '../../../../../index';

export default class TR extends Component {
  render() {
    var dep = this.props.item.map(function(item, index){
    return (
      <tr key={index}>
        <td className='width_td'>
          <img src='http://placehold.it/50x50' alt='...' className='img-rounded'/>
        </td>
        <th scope='row' onClick={setDeploymentId}><Link data-id={item.name} to={`/Pods/${item.name}`}>{item.name}<td>{item.ram}</td></Link></th>
        <td>{item.status}</td>
        <td>{item.restarts}</td>
        <td>{item.created}</td>
        <td></td>
        <td></td>
        <td className='menu_dropdown'>
          <Button data_id={item.id}/>
        </td>
      </tr>
    );
    })
    return (
      <tbody>
        {dep}
      </tbody>
    )
  }
}
