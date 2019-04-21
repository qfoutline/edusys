<template>
  <div>
    <div>
      <el-button
        type="text"
        :icon="collapseIcon"
        @click="isCollapse=!isCollapse"
      >{{isCollapse ? '展开' : '收缩'}}</el-button>
    </div>
    <el-menu :collapse="isCollapse" :default-active="currentPath" router>
      <el-menu-item v-for="(item,idx) in items" :index="item.link" :key="idx">
        <font-awesome-icon :icon="item.icon"/>
        <span>{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignOutAlt,
  faHome,
  faBullseye,
  faCode,
  faProjectDiagram,
  faUserEdit,
  faCog,
  faRegistered,
  faAngleDoubleRight,
  faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSignOutAlt,
  faHome,
  faBullseye,
  faCode,
  faProjectDiagram,
  faUserEdit,
  faCog,
  faRegistered,
  faAngleDoubleRight,
  faAngleDoubleLeft
);
export default {
  name: "Aside",
  data() {
    return {
      items: [
        {
          name: "首页",
          link: "/home",
          icon: "home"
        },
        {
          name: "点名",
          link: "/rollcall",
          icon: "bullseye"
        },
        {
          name: "作业",
          link: "/homework",
          icon: "code"
        },
        {
          name: "项目",
          link: "/project",
          icon: "project-diagram"
        },
        {
          name: "模面",
          link: "/examination",
          icon: "user-edit"
        },
        {
          name: "设置",
          link: "/settings",
          icon: "cog"
        }
      ],

      // 是否折叠左侧菜单
      isCollapse: false
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    collapseIcon() {
      return this.isCollapse ? "el-icon-d-arrow-right" : "el-icon-d-arrow-left";
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  mounted() {
    console.log("Aside");
  }
};
</script>
