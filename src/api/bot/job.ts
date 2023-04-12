import { defHttp } from '/@/utils/http/axios';
import { Job, DeleteReq } from './model/job';

export enum JobApi {
  jobList = '/job/list',
  jobAdd = '/job/add',
  jobDelete = '/job/delete',
}

export function jobList() {
  return defHttp.get<Job[]>({ url: JobApi.jobList });
}

export function jobAdd(params: Job) {
  return defHttp.post({ url: JobApi.jobAdd, params });
}

export function jobDelete(params: DeleteReq) {
  return defHttp.post({ url: JobApi.jobDelete, params });
}
