import React, { Component } from 'react';
import { Link } from 'react-router';
import setDeploymentId from '../../../../index';

export default class TR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };
    }
    getPage() {
        let start = this.props.pageSize * (this.state.currentPage - 1);
        let end = start + this.props.pageSize;
        return {
            currentPage: this.state.currentPage,
            data: this.props.data.replicasets.slice(start, end),
            numPages: this.getNumPages(),
            handleClick: function(pageNum) {
                return function() { this.handlePageChange(pageNum) }.bind(this)
            }.bind(this)
        }
    }
    getNumPages() {
        let numPages = Math.floor(this.props.data.replicasets.length / this.props.pageSize);
        if (this.props.data.replicasets.length % this.props.pageSize > 0) {
            numPages++
        }
        return numPages
    }
    handlePageChange(pageNum) {
        this.setState({currentPage: pageNum});
    }
    render() {
        let page = this.getPage();
        let topics = page.data.map(function(item, index) {
            return (
                <tr key={index}>
                    <td className='width_td'></td>
                    <th className='editDepTable' scope='row' onClick={setDeploymentId}>
                        <Link data-id={item.name} to={`/ReplicaSets/${item.name}`}>{item.name}</Link>
                    </th>
                    <td className='editDepTable'>{item.pods_active} / {item.pods_limit}</td>
                    <td className='editDepTable'>{item.images.map(function(item, index){
                        return (
                            <div key={index}>
                                {item}
                            </div>
                        )
                    })}</td>
                    <td className='editDepTablelabel'>{item.created}</td>
                    <td>{item.labels.map(function(item, index){
                        return (
                            <div key={index}>
                                app: {item}
                            </div>
                        )
                    })}</td>
                    <td className='replicatd'></td>
                </tr>
            );
        });
        return (
            <tbody>
                {pager(page)}
                {topics}
            </tbody>
        )
    }
}

function pager(page) {
    let pageLinks = [];
    if (page.currentPage > 1) {
        pageLinks.push(
            <li className='previous' onClick={page.handleClick(page.currentPage - 1)}>
                <a href='#'><span className='pageLink'>&larr;</span></a>
            </li>
        );
        pageLinks.push(' ');
    }
    pageLinks.push(
        <span className='currentPage'>{page.currentPage} - {page.numPages}</span>
    );
    if (page.currentPage < page.numPages) {
        pageLinks.push(' ');
        pageLinks.push(
            <li className='next' onClick={page.handleClick(page.currentPage + 1)}>
                <a href='#'><span className='pageLink'>&rarr;</span></a>
            </li>
        );
    }
    return <div className='pager'>{pageLinks}</div>
}