<template>
  <div>
    <h1>作业上传</h1>
    <el-upload
      class="upload-demo"
      action="http://localhost:10001/upload?age=18"
      :auto-upload="false"
      name="myhomework"
      ref="homeworkfile"
      drag
      :data="homeworkInfo"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传zip/rar文件，请打包好再上传</div>
    </el-upload>

    <el-input placeholder="上传文件说明" type="textarea" v-model="remark"></el-input>
    <el-button type="success" class="mt-sm" @click="submitUpload">确认上传</el-button>

    <el-row class="mt-lg">
      <el-col :span="12">
        <h4>已上传列表</h4>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-date-picker
          v-model="uploadDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          size="mini"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-table :data="uploadList" stripe style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="file" label="文件"></el-table-column>
      <el-table-column prop="date" label="日期" width="200"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button icon="el-icon-delete" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Homework",
  data() {
    return {
      uploadList: [
        {
          name: "laoxie",
          file: "abc.rar",
          date: "2018-8-19 10:50:23"
        },
        {
          name: "lemon",
          file: "home.rar",
          date: "2018-8-19 11:25:58"
        }
      ],
      remark: "",
      homeworkInfo: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  computed: {
    uploadDate() {
      return new Date().toLocaleDateString().replace(/\//g, "-");
    }
  },
  methods: {
    submitUpload() {
      this.$refs.homeworkfile.submit();
    }
  },
  mounted() {
    console.log("Homework");
  }
};
</script>
