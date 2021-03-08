/* eslint-disable */
import PropTypes from 'prop-types';
import React,{useEffect,useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Article from '../article/article';
import * as articlesActions from '../../redux/articles-actions';
import {Pagination} from "antd";
import {Link} from "react-router-dom";
import header from "../header/header";
import Header from "../header/header";


const ArticleList = ({articleList,getFirstList}) => {
    const list = []
    const [current,setCurrent] = useState(1)
    const onChange = page => {
        getFirstList()
        setCurrent(page)
    };
    if (!!articleList.articles) {
        const articleInfoMass = articleList.articles
        for (let i = 0; i < 10; i++) {
            list.push(<Article articleInfo={articleInfoMass[i]}/>)
        }
    }

    return (<div>
        <Header />
        <div style={{width:'75%',margin:'0 auto'}}>{list}</div>
        <Pagination
        defaultCurrent={1}
        total={40}
        current={current}
        onChange={onChange}
        className="pagination"
        size="small"
        />
    </div>)
};

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

ArticleList.defaultProps = {

}

ArticleList.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

