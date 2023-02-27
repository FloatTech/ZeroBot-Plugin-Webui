import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/bot',
  name: 'Bot',
  component: LAYOUT,
  redirect: '/bot/plugin',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('routes.bot.bot'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'plugin',
      name: 'Plugin',
      component: () => import('/@/views/bot/plugin/index.vue'),
      meta: {
        title: t('routes.bot.plugin'),
      },
    },
    {
      path: 'log',
      name: 'Log',
      component: () => import('/@/views/bot/log/index.vue'),
      meta: {
        title: t('routes.bot.log'),
        ignoreKeepAlive: false,
      },
    },
    {
      path: 'request',
      name: 'Request',
      component: () => import('/@/views/bot/request/index.vue'),
      meta: {
        title: t('routes.bot.request'),
      },
    },
    {
      path: 'test',
      name: 'Test',
      component: () => import('/@/views/bot/test/index.vue'),
      meta: {
        title: t('routes.bot.test'),
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
