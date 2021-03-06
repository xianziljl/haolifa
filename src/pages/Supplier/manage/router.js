export default [{
  path: '/supplier/list',
  name: 'supplier-list',
  component: () => import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
  meta: { level: 2, title: '供应商管理', open: false, id: 'gysgl' }
}, {
  path: '/supplier/add',
  name: 'supplier-add',
  component: () => import(/* webpackChunkName: "supplieradd" */ './add.vue'),
  meta: { level: 2, title: '新增供应商', open: false, id: 'gysgl' }
}, {
  path: '/supplier/edit',
  name: 'supplier-edit',
  component: () => import(/* webpackChunkName: "supplieradd" */ './add.vue'),
  meta: { level: 2, title: '编辑供应商', open: false, id: 'gysgl' }
}, {
  path: '/supplier/:id',
  name: 'supplier-info',
  component: () => import(/* webpackChunkName: "supplieradd" */ './info.vue'),
  meta: { level: 2, title: '供应商详情', open: false, id: 'gysgl' }
}]
