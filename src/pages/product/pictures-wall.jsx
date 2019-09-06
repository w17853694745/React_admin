import React from "react"
import { Upload, Icon, Modal, message } from "antd";
import PropTypes from "prop-types"

import {reqDeleteImg} from "../../api/index"
import { async } from "q";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  };

  constructor(proprs) {//动态获取图片内容
    super(proprs);
    const { imgs } = this.props;
    let fileList = [];
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: index,
        name: img,
        status: "done",
        url: "http://localhost:5000/upload/" + img
      }));
    }

    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList
    };
  }

  getImgNames = () => this.state.fileList.map(item => item.name);

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    //当没有url和preview的时候,去创建
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = async ({ file, fileList }) => {//把原来的url更换为后台的内容
    //当数据发生变化时调用
    if (file.status === "done") {
      const { name, url } = file.response.data;
      //console.log(name, url);
      fileList[fileList.length - 1].name = name;
      fileList[fileList.length - 1].url = url;
    } else if (file.status === "removed") {
      //删除当前图片
      const result = await reqDeleteImg(file.name);
      console.log(result)
      if (result.status === 0) {
        message.success("删除图片成功");
      }
    }

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview} //点击预览
          onChange={this.handleChange} //状态发生改变
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWall
