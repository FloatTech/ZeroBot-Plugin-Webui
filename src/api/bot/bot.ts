import { defHttp } from '/@/utils/http/axios';
import { PluginModel, GroupModel, FriendModel, RequestModel } from './model/gocq';

export enum Api {
  getBotList = '/getBotList',
  getFriendList = '/getFriendList',
  getGroupList = '/getGroupList',
  getPlugin = '/manage/getPlugin',
  getAllPlugin = '/manage/getAllPlugin',
  updatePluginStatus = '/manage/updatePluginStatus',
  updateResponseStatus = '/manage/updateResponseStatus',
  sendMsg = '/sendMsg',
  getLog = '/api/getLog',
  data = '/api/data',
  getRequestList = '/getRequestList',
  handleRequest = '/handleRequest',
}

export const wsUrl =
  process.env.NODE_ENV === 'development'
    ? `ws://localhost:3000`
    : `ws://${window.document.location.host}`;

export function getBotList() {
  return defHttp.get<number[]>({ url: Api.getBotList });
}

export function getGroupList(params: { selfId: number }) {
  return defHttp.get<GroupModel[]>({ url: Api.getGroupList, params });
}

export function getFriendList(params: { selfId: number }) {
  return defHttp.get<FriendModel[]>({ url: Api.getFriendList, params });
}

export function getPlugin(params: { groupId: number; name: string }) {
  return defHttp.get<PluginModel>({
    url: Api.getPlugin,
    params,
  });
}

export function getAllPlugin(params: { groupId: number }) {
  return defHttp.get<PluginModel[]>({
    url: Api.getAllPlugin,
    params,
  });
}

export function updatePluginStatus(params: { groupId: number; name: string; status: number }) {
  return defHttp.post({
    url: Api.updatePluginStatus,
    params,
  });
}

export function updateResponseStatus(params: { groupId: number; status: number }) {
  return defHttp.post({
    url: Api.updateResponseStatus,
    params,
  });
}

export function sendMsg(params: { selfId: number; gidList: number[]; message: string }) {
  return defHttp.post({
    url: Api.sendMsg,
    params,
  });
}

export function getRequestList(params: { selfId: number }) {
  return defHttp.get<RequestModel[]>({ url: Api.getRequestList, params });
}

export function handleRequest(params: { flag: string; reason: string; approve: boolean }) {
  return defHttp.post({ url: Api.handleRequest, params });
}
