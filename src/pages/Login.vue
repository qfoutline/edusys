<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
    <el-form-item label="用户名" prop="username" ref="username" :error="userError">
      <el-input type="username" v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" ref="password" :error="userError">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="班级" prop="class" ref="class" :error="userError" v-show="!ruleForm.isAdmin">
      <el-select v-model="currentClass" placeholder="请选择班级" value-key="id">
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
    </el-form-item>
    <el-form-item label="管理员登录">
      <el-switch v-model="ruleForm.isAdmin"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="Login">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    // 用户名验证规则
    let validUsername = (rule, value, callback) => {
      if (value.trim() === "") {
        return callback(new Error("用户名不能为空"));
      }

      callback();
    };

    let validPassword = (rule, value, callback) => {
      // console.log(rule,value,callback)
      if (value.trim() === "") {
        return callback(new Error("密码不能为空"));
      }

      callback();
    };
    return {
      ruleForm: {
        password: "",
        username: "",
        isAdmin: false
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
          // {validator: validUsername, trigger: 'blur'}
        ],
        password: { required: true, message: "密码不能为空", trigger: "blur" }
      },
      userError: ""
    };
  },
  computed: {
    currentClass: {
      get() {
        return this.$store.state.currentClass;
      },
      set(currentClass) {
        // 修改vuex state数据
        this.$store.commit("changeCurrent", currentClass);
        this.$store.dispatch("getStudent", currentClass);
        this.$store.dispatch("getGroup", currentClass);
      }
    },
    classList() {
      return this.$store.state.classList;
    }
  },
  methods: {
    Login() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return false;
        }

        // this.$store.dispatch('login',{
        // 	username:this.ruleForm.username,
        // 	password:this.ruleForm.password,
        // 	isAdmin:this.isAdmin,
        // 	success:res=>{
        // 		console.log(res);
        // 		if(res === 'fail'){
        // 			// this.userError = '用户名或密码不正确'
        // 			// this.$refs.username.error = '用户名或密码不正确'
        // 			// this.$refs.password.error = '用户名或密码不正确'
        // 		}else if(res === 'success'){
        // 			this.$router.push({
        // 				name:'Home'
        // 			});
        // 		}
        // 	}
        // });

        console.log("admin:", this.ruleForm.isAdmin);

        axios
          .post("/api/login", {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
						class_id:this.ruleForm.isAdmin ? undefined : this.currentClass.id
          })
          .then(({ data: { data, token, code } }) => {
            console.log(data);
            if (code === 200) {
							// 更新token与用户信息
							let currentUser = { 'Authorization':data.name+'|'+token, ...data }
              this.$store.commit("changeCurrentUser", currentUser);

              
              this.$router.push({
                name: "Home"
              });
            } else {
              this.userError = "用户名或密码不正确，或你不在当前班级";
              // this.$refs.username.error = '用户名或密码不正确';
              // this.$refs.password.error = '用户名或密码不正确';
            }
          });
      });
    }
  },
  destroyed() {
    console.log("destroy");
    this.$store.commit("UPDATE_SHOW_MENU", true);
  },
  mounted() {
    console.log("mounted");
    this.$store.commit("UPDATE_SHOW_MENU", false);
  }
};
</script>
