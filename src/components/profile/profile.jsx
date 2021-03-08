/* eslint-disable */
import React, {useEffect,useState} from 'react';
//import PropTypes from 'prop-types';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {Spin,Pagination} from 'antd';
import 'antd/dist/antd.css';
//import * as actions from '../../redux/tickets-actions';
//import * as appActions from '../../redux/app-actions';
import ArticleList from "../article-list/article-list";
import './index.scss'
import {BrowserRouter, Route, Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as articlesActions from "../../redux/articles-actions";
import {connect} from "react-redux";
import FullArticle from "../full-article/full-article";
import SignIn from "../ authorization/sign-in";
import SignUp from "../ authorization/sign-up";

const Profile = ({getFirstList}) => {
    useEffect(() => {
        getFirstList()
    },[])
    return (
        <div className='content'>
                <header className='content__header'>
                    <h2 className='content__header-title'>Realworld Blog</h2>
                    <Link className='content__header-link-in' to={'/creat-article'}>Create article</Link>
                    <Link className='content__header-link-up' to={'/sign-in'}>Log out</Link>
                </header>

                <div style={{height:40,width:'100%'}}></div>
        </div>
    );
}

const mapStateToProps = (state) =>
    ({
        articleList: state.articleReducer
    })


const mapDispatchToProps = (dispatch) => {
    const articlesBind = bindActionCreators(articlesActions,dispatch)
    return {
        getFirstList:articlesBind.getFirstArticlesFetch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

