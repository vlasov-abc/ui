import React, { Component } from 'react';

export default class TR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }
    getPage() {
        let start = this.props.pageSize * (this.state.currentPage - 1);
        let end = start + this.props.pageSize;
        return {
            currentPage: this.state.currentPage,
            data: this.props.data.slice(start, end),
            numPages: this.getNumPages(),
            handleClick: function(pageNum) {
                return function() { this.handlePageChange(pageNum) }.bind(this)
            }.bind(this)
        }
    }
    getNumPages() {
        let numPages = Math.floor(this.props.data.length / this.props.pageSize);
        if (this.props.data.length % this.props.pageSize > 0) {
            numPages++
        }
        return numPages
    }
    handlePageChange(pageNum) {
        this.setState({currentPage: pageNum})
    }
    render() {
        let page = this.getPage();
        let topics = page.data.map(function(item, index) {
            return (
                <tr key={index}>
                    <th scope='row'>{item.message}</th>
                    <td>{item.source}</td>
                    <td>{item.sub_object}</td>
                    <td>{item.count}</td>
                    <td>{item.first_seen} {item.last_seen}</td>
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
                <a href='#'>
                    <span className='pageLink'>&larr;</span>
                </a>
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
                <a href='#'>
                    <span className='pageLink'>&rarr;</span>
                </a>
            </li>
        );
    }
    return <div className='pager'>{pageLinks}</div>
}