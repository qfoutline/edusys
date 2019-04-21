export default {
    // 获取所有班级
    async getClassList(context) {
        let {data:{data}} = await this._vm.$axios.get('/api/class', {
            params: {
                sort: 'id',
                desc: true
            }
        });
  
        context.commit('changeClassList', data);
  
        // 默认把第一个班级设为当前班级
        let currentClass = data[0]
        context.commit('changeCurrentClass', currentClass);
        context.dispatch('getStudent', currentClass.id);
        context.dispatch('getGroup', currentClass.id);
        
    },

    // 根据班级id获取所有学生
    async getStudent(context, class_id) {
        // 请求当前班级的学生名单
        let {data:{data}} = await this._vm.$axios.get('/api/user', {
            params: {
                class_id
            }
        })

        // 更新currentClass.student
        context.commit('changeStudent', data);
    },

    //根据班级id获取所有分组
    async getGroup(context, class_id) {
        let {data:{data}} = await this._vm.$axios.get('/api/group', {
            params: {
                class_id
            }
        });

        data.forEach(item => {
            // 过滤不在本班的学生（留级，休学等原因）
            item.members = item.members.split(',')
            // .filter(name=>{
            //     return currentClass.student.some(obj=>{
            //         return obj.name === name;
            //     });
            // });
        });

        // 更新currentClass.groupList
        context.commit('changeGroupList', data);
    },

    // 验证token是否过期
    async tokenVerify(context, Authorization = context.state.currentUser.Authorization) {
        let res = await this._vm.$axios.get('/api/tokenverify', {
            headers: {
                Authorization
            }
        });

        res = res.data;
        if (res.code == 401) {
            // token失效则清空
            context.commit('changeCurrentUser', {});
        }
    }

}