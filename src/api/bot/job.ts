import { defHttp } from '/@/utils/http/axios';
import { JobListRsp, Job } from './model/job';

export enum JobApi {
  jobList = '/job/list',
  jobAdd = '/job/add',
  jobDelete = '/job/delete',
}

export function jobList() {
  return defHttp.get<JobListRsp>({ url: JobApi.jobList });
}

export function jobAdd(params: Job) {
  return defHttp.get({ url: JobApi.jobAdd, params });
}

export function jobDelete() {
  return defHttp.get({ url: JobApi.jobDelete });
}
