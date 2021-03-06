export default [
  {
    name: '系统管理',
    id: 'parent-xtgl',
    children: [{
      name: '角色管理',
      url: '/role',
      id: 'jsgl'
    }, {
      name: '权限管理',
      url: '/permission',
      id: 'qxgl'
    }, {
      name: '菜单管理',
      url: '/menu',
      id: 'cdgl'
    }, {
      name: '人员管理',
      url: '/user',
      id: 'rygl'
    }, {
      name: '部门管理',
      url: '/department',
      id: 'bmgl'
    }]
  },
  {
    name: '流程管理',
    id: 'parent-lcgl',
    children: [{
      name: '流程管理',
      url: '/process-manager',
      id: 'lcgl'
    }, {
      name: '节点管理',
      url: '/node',
      id: 'jdgl'
    }]
  },
  {
    name: '库房管理',
    id: 'parent-kfgl',
    children: [{
      name: '库存预警',
      url: '/earlywarning',
      id: 'kcgl'
    }, {
      name: '库房管理',
      url: '/room',
      id: 'kfgl'
    }, {
      name: '库位管理',
      url: '/rack',
      id: 'kwgl'
    }, {
      name: '零件管理',
      url: '/material',
      id: 'ljgl'
    }, {
      name: '成品管理',
      url: '/storeproduct',
      id: 'cpgl'
    }]
  },
  {
    name: '配套管理',
    id: 'parent-ptgl',
    children: [{
      name: '零件设置',
      url: '/part',
      id: 'ljsz'
    }, {
      name: '成品设置',
      url: '/product',
      id: 'cpsz'
    }, {
      name: '零件分类设置',
      url: '/parttype',
      id: 'ljflsz'
    }]
  },
  {
    name: '供应商管理',
    id: 'parent-gysgl',
    children: [{
      name: '供应商管理',
      url: '/supplier/list',
      id: 'gysgl'
    }, {
      name: '供应商产品',
      url: '/supplierproduct',
      id: 'gyscp'
    }, {
      name: '供应商设备',
      url: '/supplierequipment',
      id: 'gyssb'
    }]
  },
  {
    name: '财务管理',
    id: 'parent-cwgl',
    children: [{
      name: '资产管理',
      url: '/assets',
      id: 'zcgl'
    }, {
      name: '费用管理',
      url: '/cost',
      id: 'fygl'
    }, {
      name: '报表管理',
      url: '/report',
      id: 'bbgl'
    }, {
      name: '合同管理',
      url: '/contract',
      id: 'htgl'
    }, {
      name: '发票管理',
      url: '/invoice',
      id: 'fpgl'
    }]
  },
  {
    name: '公告管理',
    id: 'parent-gggl',
    children: [{
      name: '新闻管理',
      url: '/news',
      id: 'xwgl'
    }, {
      name: '通知管理',
      url: '/notification',
      id: 'tzgl'
    }]
  }
]
