import React from "react";
import { Table, Divider, message, Select, Modal, Checkbox } from "antd";
import ApiUtil from "utils/api";
import { Auth } from "component/Authority";
import Permission from "utils/permission";
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "用户编号",
        dataIndex: "id"
      },
      {
        title: "用户姓名",
        dataIndex: "summary"
      },
      {
        title: "手机号",
        dataIndex: "content"
      },
      {
        title: "角色",
        dataIndex: "roleId",
        render(text) {
          return (
            <Select
              defaultValue={text}
              style={{ width: 120 }}
              onChange={this.handleRoleChange}
            >
              <Option value="0">管理员</Option>
              <Option value="1">普通用户</Option>
              <Option value="2">付费用户</Option>
            </Select>
          );
        }
      },
      {
        title: "操作",
        render: record => {
          return (
            <span>
              <a onClick={this.onHandleEdit.bind(null, record._id)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={this.deleteUser.bind(null, record._id)}>删除</a>
              <Divider type="vertical" />
              <a onClick={this.setPermission.bind(null, record._id)}>
                设置权限
              </a>
            </span>
          );
        }
      }
    ];
  }
  state = {
    loading: false,
    visible: false,
    privilegeData: [], //权限列表
    data: [] //表格数据
  };

  componentDidMount() {
    this.getUserList();
  }

  //处理角色变更
  handleRoleChange = roleId => {
    const userId = localStorage.getItem("userId");
    ApiUtil({ userId, roleId }, "/user/modify/role").then(res => {
      message.success("操作成功!");
    });
  };

  //查询列表
  getUserList = () => {
    ApiUtil({}, "/user/list", "GET").then(res => {
      this.setState({ data: res.data });
    });
  };

  //编辑用户
  onHandleEdit = userId => {};

  //删除用户
  deleteUser = userId => {};

  //设置权限
  setPermission = userId => {
    ApiUtil({}, "/privilege/list/all", "GET").then(res => {
      this.setState({ privilegeData: res.data });
    });
    this.setState({ visible: true });
  };

  //关闭弹窗
  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChangePermission = () => {};

  //提交权限修改内容
  handleOk = () => {
    // ApiUtil({}, "/user/list","GET").then(res => {
    //   this.setState({ data: res.data });
    // });
  };

  render() {
    const { loading, data, visible, privilegeData } = this.state;
    console.log(privilegeData, "privilegeData");
    return (
      <Auth authId={Permission.USER_LIST}>
        <div style={{ width: "100%" }}>
          <Table columns={this.columns} dataSource={data} />
        </div>
        {/* 权限设置 */}
        <Modal
          title="设置权限"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CheckboxGroup
            options={privilegeData}
            value={{ id: 0, privilegeValue: "新闻列表" }}
            onChange={this.onChangePermission}
          />
        </Modal>
      </Auth>
    );
  }
}

export default UserList;
