<template>
    <div class="common-layout" style="background-color: white">
        <el-container style="min-height: 100vh">
            <el-header>
                <template v-if="loginInfo.loginId">
                    <div class="header" @click="movePage">
                        <span class="flex items-center">
                            <el-avatar
                                class="mr-3"
                                :size="32"
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        </span>
                        <span class="flex items-center">
                            {{ loginInfo.loginId }}
                        </span>
                    </div>
                    <div class="flex items-center">
                        <el-button type="primary" round @click="logoutproc()">LOGOUT</el-button>
                    </div>
                </template>
            </el-header>
            <el-container>
                <el-aside width="200px"><Menu></Menu></el-aside>
                <el-main>
                    <router-view :type="type" :menu="menu"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Menu from '@/components/leftMenu.vue';

export default {
    data: function () {
        return {
            type: this.$route.params.type,
            menu: this.$route.params.menu,
            loginInfo: {
                menulist: [],
                loginId: '',
            },
        };
    },
    mounted: function () {
        let loginInfo = this.$store.state.loginInfo;
        loginInfo.usrMnuAtrt.forEach((item) => {
            item.isShow = false;
        });
        this.loginInfo.menulist = loginInfo.usrMnuAtrt;
        this.loginInfo.loginId = loginInfo.loginId;
    },
    watch: {
        $route(to) {
            this.type = to.params.type;
            this.menu = to.params.menu;
        },
    },
    beforeRouteUpdate: function (to, from, next) {
        this.$router.options.methods.checkAuthed(to, from, next);
    },
    created: function () {
        console.log(this.$store.state.loginInfo);
        this.type = this.$route.params.type;
        this.menu = this.$route.params.menu;
    },
    methods: {
        movePage: async function () {
            // 마이페이지 이동
            this.$router.push('/dashboard/mypage/myPage');
        },
    },
    components: { Menu },
};
</script>
<style>
.header {
    display: flex;
    align-items: center;
    font-family: '나눔바른고딕', NanumBarunGothic;
    font-size: 18px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 1px gray;
}
.el-header {
    display: flex;
    background-color: rgba(93, 157, 255, 0.7);
    justify-content: space-between;
    align-items: center;
}
.el-aside {
    overflow: hidden !important;
    border-right: solid 1px var(--el-menu-border-color);
}
</style>
