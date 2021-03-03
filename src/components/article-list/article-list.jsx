/* eslint-disable */
import PropTypes from 'prop-types';
import React,{useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Article from '../article/article';
import * as articlesActions from '../../redux/articles-actions';


const ArticleList = ({articleList,getFirstList}) => {
    useEffect(() => {
        getFirstList()
    },[])
    console.log(articleList)
    const list = []
    if (!!articleList.articles) {
        const articleInfoMass = articleList.articles
        console.log(articleInfoMass)
        for (let i = 0; i < 10; i++) {
            list.push(<Article articleInfo={articleInfoMass[i]}/>)
        }
    }

    return <div style={{width:'75%',margin:'0 auto'}}>{list}</div>
};

const mapStateToProps = (state) =>
    ({
    articleList: state.articleReducer
  })


const mapDispatchToProps = (dispatch) => {
  const articlesBind = bindActionCreators(articlesActions,dispatch)
   console.log(articlesBind)
  return {
    getFirstList:articlesBind.getFirstArticlesFetch
  }
};

ArticleList.defaultProps = {

}

ArticleList.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

