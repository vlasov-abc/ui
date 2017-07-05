import React, { Component } from 'react';
import PanelTokens from './PanelTokens';
import Post from './Post';
import Documents from './Documents';

export default class Tokens extends Component {
    render() {
        return (
            <div className='row'>
                <PanelTokens />
                <div className='col-md-9'>
                    <h4>Related Post</h4>
                    <Post />
                    <Post />
                    <Post />
                </div>
                <Documents />
            </div>
        );
    }
}