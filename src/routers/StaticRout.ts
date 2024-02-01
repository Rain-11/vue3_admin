import { RouteRecordRaw } from "vue-router";

export const staticRout: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("@/layout/index.vue"),
    redirect: "/Home",
    children: [
      {
        path: "/Home",
        name: "Home",
        component: () => import("@/views/Home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ],
    meta: {
      hidden: false,
    },
  },
  {
    path: "/dataWithBottle",
    name: "dataWithBottle",
    component: () => import("@/views/DataBigScreen/index.vue"),
    meta: {
      title: "数据大屏",
      icon: "Platform",
      hidden: false,
    },
  },
  {
    path: "/permissionManagement",
    name: "PermissionManagement",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "权限管理",
      icon: "Lock",
      hidden: false,
    },
    redirect: "/permissionManagement/userManagement",
    children: [
      {
        path: "/permissionManagement/userManagement",
        name: "UserManagement",
        component: () => import("@/views/permission/UserManagement/index.vue"),
        meta: {
          title: "用户管理",
          icon: "User",
          hidden: false,
        },
      },
      {
        path: "/permissionManagement/roleManagement",
        name: "RoleManagement",
        component: () => import("@/views/permission/RoleManagement/index.vue"),
        meta: {
          title: "角色管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
      {
        path: "/permissionManagement/menuManagement",
        name: "MenuManagement",
        component: () => import("@/views/permission/MenuManagement/index.vue"),
        meta: {
          title: "菜单管理",
          icon: "MoreFilled",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/goodsManagement",
    name: "GoodsManagement",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "商品管理",
      icon: "Handbag",
      hidden: false,
    },
    redirect: "/goodsManagement/brandManagement",
    children: [
      {
        path: "/goodsManagement/brandManagement",
        name: "BrandManagement",
        component: () => import("@/views/Goods/BrandManagement/index.vue"),
        meta: {
          title: "品牌管理",
          icon: "ShoppingCartFull",
          hidden: false,
        },
      },
      {
        path: "/goodsManagement/attributeManagement",
        name: "AttributeManagement",
        component: () => import("@/views/Goods/AttributeManagement/index.vue"),
        meta: {
          title: "属性管理",
          icon: "ChromeFilled",
          hidden: false,
        },
      },
      {
        path: "/goodsManagement/spuManagement",
        name: "SPUManagement",
        component: () => import("@/views/Goods/SPUManagement/index.vue"),
        meta: {
          title: "SPU管理",
          icon: "Memo",
          hidden: false,
        },
      },
      {
        path: "/skuManagement",
        name: "SKUManagement",
        component: () => import("@/views/Goods/SKUManagement/index.vue"),
        meta: {
          title: "SKU管理",
          icon: "Tickets",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Any",
    redirect: "/404",
    meta: {
      title: "默认路由",
      hidden: true,
    },
  },
];
