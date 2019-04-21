<template>
	<div class="namelist clearfix">
        <h4>学员名单</h4>
        <el-row>
           <el-col :lg="2" :md="3" :sm="4" :xs="6" v-for="item in student" :key="item.id">
            <el-button :type="currentUser.id==item.id?'primary':''">{{item.name}}</el-button>
          </el-col>
        </el-row>
    </div>
</template>

<script>
	import {mapState} from'vuex'

	export default {
	  name: 'NameList',
		computed:{
        ...mapState({
          student(state){
            return state.currentClass.student
          },
          currentUser:'currentUser'
        })
    },
	}
</script>
