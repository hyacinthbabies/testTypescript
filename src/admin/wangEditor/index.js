import React from "react";
import Editor from "wangeditor";
import PropTypes from "prop-types";
// import env from "config";
import emotion from "./emotion.js";
/**
 * 富文本编辑器
 */
class WangEditor extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired, //容器id
    placeholder: PropTypes.string, //默认值
    onChange: PropTypes.func.isRequired //取到编辑器实时内容
  };

  static defaultProps = {
    placeholder: ""
  };

  componentDidMount() {
    this.editor = this.initEditor();
  }

  componentWillUnmount() {
    //销毁编辑器
    this.destroyEditor();
  }

  /**
   * 初始化富文本编辑器
   */
  initEditor = () => {
    //初始化编辑器
    const editor = new Editor(this.props.id);
    //请求上传图片的接口，放到服务器上
    editor.config.uploadImgUrl = `${"env"}/files/upload`;
    //图片名称，后端约定 file
    editor.config.uploadImgFileName = "pic";
    //表情配置
    editor.config.emotions = {
      default: {
        title: "微博表情", // 组名称
        data: emotion
      }
    };
    // 为当前的editor配置密钥
    editor.config.mapAk = "LsrQFnYCVKtv98xw4Dwi7qxYfmA2Xj7c";
    //将后台返回的图片地址插入编辑器
    editor.config.uploadImgFns.onload = function(resultText, xhr) {
      const url = JSON.parse(resultText).url;
      const originalName = editor.uploadImgOriginalName || "";
      editor.command(
        null,
        "insertHtml",
        '<img src="' +
          url +
          '" alt="' +
          originalName +
          '" style="max-width:100%;"/>'
      );
    };
    editor.config.menus = $.map(Editor.config.menus, function(item, key) {
      if (item === "location") {
        return null;
      }
      return item;
    });
    //监听编辑器内容变化，必须放到editor.create()之前
    editor.onchange = () => {
      console.log(editor.$txt.html(), "editor.$txt.html()");
      this.props.onChange(editor.$txt.html());
    };
    this.props.changeTxt(this.onChangeTxt);
    //创建编辑器
    editor.create();
    return editor;
  };

  /**
   * 销毁富文本编辑器
   */
  destroyEditor = () => {
    if (!this.editor) return;
    this.editor.destroy();
    //2版本暂时无法销毁，只能隐藏，所以地图需要自己减，否则会报错
    this.editor = null;
    Editor.numberOfLocation--;
  };

  onChangeTxt = val => {
    this.editor.$txt.html(`<p>${val}</p>`);
  };

  render() {
    const { placeholder } = this.props;
    return (
      <div className="wangeditor">
        <div style={{ height: 250 }} id="editor">
          {placeholder && <p>{this.props.placeholder}</p>}
        </div>
      </div>
    );
  }
}

export default WangEditor;
