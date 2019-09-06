import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types"

class RichTextEditor extends Component {
  static propTypes = {
    detail:PropTypes.string
  }

  constructor(props){
    super(props)
    const {detail} = this.props
    if (detail) {
      const contentBlock = htmlToDraft(detail);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty()
      };
    }
    
  }

  

  onEditorStateChange=editorState => {
    this.setState({
      editorState
    });
  };

  getEdlitor = ()=>{
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  }

  uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/manage/img/upload");
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response); //返回的结果是response
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}



  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{
            height: 300,
            paddingLeft: "20px",
            border: "1px solid black"
          }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            alt: { present: true, mandatory: true },
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
        />
      </div>
    );
  }
}
export default RichTextEditor