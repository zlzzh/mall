import {request} from "./axios";
export function getHomeMultidata() {
  return request({
    url:'home/multidata'
  })
}