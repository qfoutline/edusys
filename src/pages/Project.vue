<template>
  <div class="page-project">
    <h1>项目提交</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="项目类型" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="git仓库地址" prop="giturl">
        <el-input v-model="ruleForm.giturl"></el-input>
      </el-form-item>
      <el-form-item label="演示地址" prop="demonstration">
        <el-input v-model="ruleForm.demonstration"></el-input>
      </el-form-item>
      <el-form-item label="官网地址" prop="original">
        <el-input v-model="ruleForm.original"></el-input>
      </el-form-item>
      <el-form-item label="项目说明" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      ruleForm: {
        name: "",
        category: "",
        giturl: "",
        demonstration: "",
        original: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择项目分类", trigger: "change" }
        ],
        giturl: [
          { required: true, message: "请填写git仓库地址", trigger: "blur" }
        ],
        demonstration: [{ required: true, message: "请填写项目上线地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
