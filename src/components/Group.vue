<template>
  <div class="group">
    <h4>班级分组
      <el-button type="text" @click="showAllMembers=!showAllMembers">（all）</el-button>
    </h4>
    <el-row class="class-group" :gutter="20">
      <el-col
        :lg="4"
        :sm="6"
        :xs="12"
        v-for="group in groupList"
        :key="group.id"
        :style="{height:maxHeight+'px'}"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{group.leader}}（组长）</span>
          </div>
          <div
            v-for="(name,idx) in showMember(group.members)"
            :key="idx"
            class="text item"
            :class="{'text-info':!include(name)}"
          >{{idx+1 + '. ' +name}}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-table v-if="groupList.length==0"></el-table>
  </div>
</template>

<script>
export default {
  name: "Group",
  // props:['groupList'],
  data() {
    return {
      showAllMembers: false,
      maxHeight: 0
    };
  },
  computed: {
    groupList() {
      return this.$store.state.currentClass.groupList;
    },
    students() {
      return this.$store.state.currentClass.student.map(item => item.name);
    }
  },
  methods: {
    include(name) {
      return this.students.includes(name);
    },
    showMember(members) {
      return members.filter(name =>
        this.showAllMembers ? true : this.include(name)
      );
    }
  },
  mounted() {
    console.log("Group");
  }
};
</script>
