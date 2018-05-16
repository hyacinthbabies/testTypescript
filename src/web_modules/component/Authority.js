import React, { Component } from "react";

/**
 * 权限判定
 * @author niko
 * @param  {string | [string]}   authId 权限代号，可以是数组
 * @return {Boolean}
 */
const isAuth = authId => {
  if (authId === undefined || authId === null) {
    return true;
  }
  let ids = [];
  // 可能是个数组
  if (authId.length) {
    ids = ids.concat(authId);
  } else {
    ids.push(authId);
  }
  let authIds = [];
  if (window.localStorage.getItem("auth")) {
    authIds = window.localStorage.getItem("auth").split(",");
  }

  // 只要满足一个就标示具有该权限
  for (const userAuthId of ids) {
    for (const id of authIds) {
      if (userAuthId == id) {
        return true;
      }
    }
  }
  return false;
};

const Auth = props => {
  if (isAuth(props.authId)) {
    return props.children;
  } else {
    return null;
  }
};

export { isAuth, Auth };
