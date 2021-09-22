import { createRouter, createWebHashHistory } from 'vue-router'
import Msg from "../views/msg";
import Log from "../views/log";
import Meta from "../views/meta";
import Request from "../views/request";
import Plugin from "../views/plugin";
import Config from "../views/config";



const routes = [
  {
    path: '/msg',
    name: 'msg',
    component: Msg
  },
  {
    path: '/log',
    name: 'show_log',
    component: Log
  },
  {
    path: '/meta',
    name: 'meta',
    component: Meta
  },
  {
    path: '/requests',
    name: 'requests',
    component: Request
  },
  {
    path: '/plugin',
    name: 'plugin',
    component: Plugin
  },
  {
    path: "/config",
    name: "config",
    component: Config
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
