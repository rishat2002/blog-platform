/* eslint-disable */
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Article from '../article/article';
//import * as appActions from '../../redux/app-actions';

const ArticleList = () => {
   const list = []
   for (let i=0;i<10;i++) {
     list.push(<Article/>)
   }
    return <div style={{width:'75%',margin:'0 auto'}}>{list}</div>
};
/*
const mapStateToProps = (state) =>
    ({
    ticketList: state.ticketsReducer
  })


const mapDispatchToProps = (dispatch) => {
  const appBind = bindActionCreators(appActions,dispatch)
  return {
    moreButtonAction:appBind.moreButtonAction
  }
};

ArticleList.defaultProps = {

}

ArticleList.propTypes = {

}
*/

export default ArticleList;

