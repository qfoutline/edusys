export default {
    changeCurrentClass(state, payload) {
        // 利用扩展运算符，避免影响原有属性的属性特性
        state.currentClass = { ...state.currentClass, ...payload };
    },
    changeStudent(state, payload) {
        state.currentClass.student = payload;
    },
    changeGroupList(state, payload) {
        state.currentClass.groupList = payload;
    },
    changeClassList(state, payload) {
        state.classList = payload;
    },
    changeCurrentUser(state, payload) {
        state.currentUser = payload

        // 修改本地数据
        localStorage.setItem("currentUser", JSON.stringify(payload));
    },

    // 过滤groupList中不在当前班级的成员
    // UPDATE_MEMBERS(state) {
    //     if (state.currentClass.student.length === 0 || state.currentClass.groupList.length === 0) return;

    //     let res = state.currentClass.groupList.map(item => {
    //         item.members = item.members.filter(name => {
    //             return state.currentClass.student.includes(name);
    //         });

    //         return item;
    //     });

    //     state.currentClass.groupList = res;
    // },

    //更新showMenu
    UPDATE_SHOW_MENU(state, payload) {
        state.showMenu = payload;
    },

}