<template>
  <el-header>
    <el-row>
      <el-col :span="12">
        <h1>{{sysName}}</h1>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-select
          v-model="currentClass"
          placeholder="请选择班级"
          size="mini"
          value-key="id"
          class="mt-nm v-middle"
          v-if="currentUser.admin"
        >
          <el-option
            v-for="item in classList"
            :key="item.id"
            :value="item"
            :label="item.category + '-' +item.name"
          >
            <span style="float: left">{{ item.category }}-{{ item.name }}</span>
            <span style="float: right;">{{ item.city }}</span>
          </el-option>
        </el-select>
        <el-tag
          class="mt-nm v-middle"
          size="medium"
          v-else
        >{{ currentClass.city }} {{ currentClass.category }}-{{ currentClass.name }}</el-tag>
        <el-button-group class="mt-nm v-middle">
          <el-button @click="register" size="mini" v-if="!currentUser.name">
            <font-awesome-icon icon="registered"/>注册
          </el-button>
          <el-button @click="login" size="mini" v-if="!currentUser.name">
            <font-awesome-icon icon="sign-in-alt"/>登录
          </el-button>
          <el-button @click="logout" size="mini" v-if="currentUser.name">
            <font-awesome-icon icon="sign-out-alt"/>退出
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faSignOutAlt, faSignInAlt);

export default {
  name: "Header",
  data() {
    return {
      sysName: "教学管理系统V3"
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    currentClass: {
      get() {
        return this.$store.state.currentClass;
      },
      set(currentClass) {
        // 修改vuex state数据
        this.$store.commit("changeCurrentClass", currentClass);
        this.$store.dispatch("getStudent", currentClass.id);
        this.$store.dispatch("getGroup", currentClass.id);
      }
    },
    classList() {
      return this.$store.state.classList;
    }
  },
  methods: {
    logout() {
      this.$store.commit("changeCurrentUser", {});
      this.$router.push({ name: "Login" });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    register() {
      this.$router.push({ name: "Register" });
    }
  },
  created() {
    // this.getClassList();

    this.$store.dispatch("getClassList");
  }
}
</script>
