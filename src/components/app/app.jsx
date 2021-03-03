/* eslint-disable */
import React, {useEffect} from 'react';
//import PropTypes from 'prop-types';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {Spin,Pagination} from 'antd';
import 'antd/dist/antd.css';
//import * as actions from '../../redux/tickets-actions';
//import * as appActions from '../../redux/app-actions';
import ArticleList from "../article-list/article-list";
import './index.scss'
import {BrowserRouter, Router, Link} from "react-router-dom";

const App = () => {

    return (
        <div className='content'>
            <BrowserRouter>
            <header className='content__header'>
                <h2 className='content__header-title'>Realworld Blog</h2>
                <Link className='content__header-link-in' to={'/'}>Sign in</Link>
                <Link className='content__header-link-up' to={'/'}>Sign Up</Link>
            </header>
        <ArticleList />
        <Pagination
                    defaultCurrent={1}
                    total={40}
                    current={1}
                    onChange={()=> {}}
                    className="pagination"
                    size="small"
        />
            </BrowserRouter>
        </div>
    );
}


export default App;
