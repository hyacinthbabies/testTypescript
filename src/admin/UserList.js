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
        dataIndex: "name"
      },
      {
        title: "手机号",
        dataIndex: "phone"
      },
      {
        title: "角色",
        dataIndex: "roleId",
        render: (text, record) => {
          return (
            <Select
              style={{ width: 120 }}
              defaultValue={text ? text : "0"}
              onChange={this.onHandleRoleChange.bind(null, record.id)}
            >
              <Option value="1">管理员</Option>
              <Option value="2">普通用户</Option>
            </Select>
          );
        }
      },
      {
        title: "操作",
        render: record => {
          return (
            <a onClick={this.setPermission.bind(null, record.id)}>设置权限</a>
          );
        }
      }
    ];
  }
  state = {
    loading: false,
    visible: false,
    roleId: "",
    privilegeData: [], //权限列表
    personalPrivil: [], //个人权限列表
    data: [] //表格数据
  };

  componentDidMount() {
    this.getUserList();
  }

  //处理角色变更
  onHandleRoleChange = (userId, roleId) => {
    ApiUtil({}, `/user/modify/role?userId=${userId}&roleId=${roleId}`).then(
      res => {
        message.success("操作成功!");
        this.getUserList();
      }
    );
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
  setPermission = roleId => {
    this.getPersonalPrivilge();
    ApiUtil({}, "/privilege/list/all", "GET").then(res => {
      this.setState({ privilegeData: res.data });
    });
    this.setState({ visible: true, roleId });
  };

  //关闭弹窗
  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChangePermission = values => {
    this.setState({
      personalPrivil: values
    });
  };

  //提交权限修改内容
  handleOk = () => {
    let param = {
      roleId: this.state.roleId,
      privilegeIds: this.state.personalPrivil
    };
    ApiUtil(
      param,
      `/role/modify/privilege?userId=${localStorage.getItem("userId")}`
    ).then(res => {
      message.success("操作成功!");
      this.handleCancel();
      this.getUserList();
    });
  };

  //获取个人权限
  getPersonalPrivilge = () => {
    ApiUtil(
      { userId: localStorage.getItem("userId") },
      "/privilege/list/personal",
      "GET"
    ).then(res => {
      //设置权限初始值
      const newPersonalPrivil = res.data.map(pri => {
        return pri.id;
      });
      this.setState({ personalPrivil: newPersonalPrivil });
    });
    this.setState({ visible: true });
  };

  render() {
    const {
      loading,
      data,
      visible,
      privilegeData,
      personalPrivil
    } = this.state;
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
            value={personalPrivil}
            onChange={this.onChangePermission}
          >
            {privilegeData.map(priv => {
              return (
                <Checkbox value={priv.id} key={priv.id}>
                  {priv.name}
                </Checkbox>
              );
            })}
          </CheckboxGroup>
        </Modal>
      </Auth>
    );
  }
}

export default UserList;
