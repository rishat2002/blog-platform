import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import '../authorization/index.scss';
import CreateForm from "../form/create-form";

const TagInput = ({ tagInfo, deleteFunc }) => {
  const { register} = useForm();
  /* eslint-disable */
  const [tagValue, setTagValue] = useState('');
  const handleChangeTag = (event) => {
    setTagValue(event.target.value);
    tagInfo.tagName = event.target.value;
  };
  /* eslint-enable */
  return (
    <div style={{ display: 'flex' }}>
      <input
        className="form__input"
        placeholder="Tag"
        onChange={handleChangeTag}
        ref={register({ required: true, minLength: 1 })}
        name="tagError"
        style={{ width: 300 }}
        value={tagInfo.tagName}
      />
      <button
        type="button"
        onClick={() => {
          deleteFunc(tagInfo.id);
        }}
        className="form__button-delete-tag red-button"
      >
        Delete
      </button>
    </div>
  );
};

const Form = ({ formTitle, sendDataFunc, profile, currentArticle}) => {
  const createForm = new CreateForm();
  const { register, handleSubmit, errors } = useForm();
  const [articleInfo, setArticleInfo] = useState({title:'',description:'',body:''});
  const [tagMass, setTagMass] = useState([]);
  const [postForm, setPostForm] = useState(false);
  const handlersObject = createForm.createInputHandlers(articleInfo,setArticleInfo,()=>{})
  useEffect(() => {
    setArticleInfo({ ...currentArticle });
  }, [currentArticle]);

  const onSubmit = () => {
    setArticleInfo({
      ...articleInfo,
      tagList: tagMass.map((item) => item.tagName),
    });
    setPostForm(true);
  };
  if (postForm) {
    if (currentArticle === undefined) {
      sendDataFunc(articleInfo, profile.user.token);
    } else {
      sendDataFunc(articleInfo, profile.user.token, currentArticle.slug);
    }
  }
  const deleteFunc = (id) => {
    const newTagMass = tagMass.filter((item) => item.id !== id);
    setTagMass(newTagMass);
  };

  const addTagHandler = () => {
    let key = 0;
    if (tagMass.length !== 0) {
      key = tagMass[tagMass.length - 1].key + 1;
    }
    const newTag = { key, tagName: '', id: key };
    setTagMass([...tagMass, newTag]);
  };

  const tagComponentMass = tagMass.map((item) => <TagInput tagInfo={item} deleteFunc={deleteFunc} />);
  const { body, description, title } = articleInfo;
  return (
    <section>
      {postForm ? <Redirect to="/articles" /> : null}
      <form onSubmit={handleSubmit(onSubmit)} action="" className="form content__article-form">
        <h3 className="form__name">{formTitle}</h3>
        <label className="form__label">Title
        <input
          className="form__input form__input--article"
          placeholder="Title"
          onChange={handlersObject.title}
          value={title}
          ref={register({ required: true, minLength: 1 })}
          name="titleError"
        />
        </label>
        {errors.titleError && <div className="error form__error">Enter title</div>}
        <label className="form__label">Short description
        <input
          className="form__input form__input--article"
          placeholder="Short description"
          onChange={handlersObject.description}
          value={description}
          ref={register({ required: true, minLength: 1 })}
          name="shortDescriptionError"
        />
        </label>
        {errors.shortDescriptionError && <div className="error form__error">Enter short description</div>}
        <label className="form__label">Text
        <textarea
          className="form__input form__input--article form--text"
          placeholder="Text"
          onChange={handlersObject.body}
          value={body}
          ref={register({ required: true, minLength: 1 })}
          name="textError"
        />
        </label>
        <label className="form__label">
          Tags
          {tagComponentMass}
          <button type="button" onClick={addTagHandler} className="form__button-add-tag">
            Add tag
          </button>
        </label>
        <input type="submit" className="form__submit form__submit--edit" value="Send" />
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer
});


TagInput.defaultProps = {
  tagInfo:{},
  deleteFunc:() => {}
};

TagInput.propTypes = {
  tagInfo:PropTypes.objectOf(PropTypes.object,PropTypes.string),
  deleteFunc:PropTypes.func
};

Form.defaultProps = {
  formTitle:"",
  sendDataFunc:()=>{},
  profile:{user:{},errors:{}},
  currentArticle:{}
}

Form.propTypes = {
  formTitle:PropTypes.string,
  sendDataFunc:PropTypes.func,
  profile:PropTypes.objectOf(PropTypes.object),
  currentArticle:PropTypes.objectOf(PropTypes.object,PropTypes.string,PropTypes.array)
}

export default connect(mapStateToProps,null)(Form);
