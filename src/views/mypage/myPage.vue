<template>
    <el-page-header>
        <template #content>
            <span class="text-large font-600 mr-3"> 마이페이지 </span>
        </template>
    </el-page-header>

    <div id="myForm">
        <table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <td>
                        <input v-model="userInfo.userID" type="text" autocomplete="off" />
                    </td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td>
                        <input v-model="userInfo.userNm" type="text" autocomplete="off" />
                    </td>
                </tr>
                <tr>
                    <th>PASSWORD</th>
                    <td class="password">
                        <input
                            v-model="userInfo.password"
                            type="password"
                            autocomplete="off"
                            @keyup="samePassword($event)" />
                    </td>
                </tr>
                <tr>
                    <th>RE-PASSWORD</th>
                    <td>
                        <input
                            v-model="userInfo.checkPassword"
                            type="password"
                            autocomplete="off"
                            @keyup="samePassword($event)" />
                        <div>{{ result }}</div>
                    </td>
                </tr>
                <tr>
                    <th>연락처</th>
                    <td>
                        <input v-model="userInfo.tell" type="text" autocomplete="off" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <el-button style="margin-left: 50%" type="primary" @click="updShow = true"
                >수정</el-button
            >
            <el-button @click="delShow = true">회원탈퇴</el-button>
        </div>

        <!-- 회원탈퇴 및 수정 -->
        <el-dialog v-model="updShow" title="회원정보 수정" width="500" align-center>
            <span>회원정보를 수정하시겠습니까?</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="updUserInfo('U')">네</el-button>
                    <el-button @click="updShow = false"> 아니요 </el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="delShow" title="회원탈퇴" width="500" align-center>
            <span>정말 회원탈퇴를 하실건가요?</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="updUserInfo('D')">네</el-button>
                    <el-button @click="delShow = false"> 아니요 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {
                userID: '',
                userNm: '',
                password: '',
                checkPassword: '',
                tell: '',
            },
            action: '',
            updShow: false,
            delShow: false,
            result: '',
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo: function () {
            this.userInfo.userID = this.$store.state.loginInfo.loginId;
            this.userInfo.userNm = this.$store.state.loginInfo.userNm;
            this.userInfo.password = '';
            this.userInfo.checkPassword = '';
            this.result = '';

            let vm = this;
            let params = new URLSearchParams();
            params.append('loginId', this.userInfo.userID);

            this.axios
                .get('/mypage/myPage.do', params)
                .then(function (response) {
                    console.log(response.data);
                    vm.userInfo.tell = response.data.tell;
                })
                .catch(function (error) {
                    alert('에러! API 요청에 오류가 있습니다. ' + error);
                });
        },
        samePassword: function () {
            let vm = this;

            if (this.userInfo.checkPassword != '') {
                setTimeout(function () {
                    if (vm.userInfo.password == vm.userInfo.checkPassword) {
                        vm.result = '패스워드가 동일합니다.';
                        console.log('PASSWORD same');
                    } else {
                        vm.result = '패스워드가 다릅니다. 다시 확인해주세요.';
                        console.log('PASSWORD  diff');
                    }
                }, 500);
            }
        },

        checkValidition: function () {
            console.log('checkValidition');

            // let vm = this;
            // let params = new URLSearchParams();
            // params.append("noticeNo", this.userInfo.userID);

            // this.axios
            //   .get("/mypage/myPage.do", params)
            //   .then(function (response) {
            //     console.log(response.data);
            //     const tell = response.data.tell;
            //     vm.userInfo.tell = tell.replace(
            //       /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
            //       tell
            //     );
            //   })
            //   .catch(function (error) {
            //     alert("에러! API 요청에 오류가 있습니다. " + error);
            //   });
        },

        updUserInfo: function (act) {
            console.log('updUserInfo');
            console.log('act :: ', act);

            let vm = this;

            if (act == 'D') {
                // 회원탈퇴
                this.axios
                    .post('/mypage/resign.do')
                    .then(function (response) {
                        console.log(response.data);
                        vm.delShow = false;
                        vm.$router.push('/');
                    })
                    .catch(function (error) {
                        alert('에러! API 요청에 오류가 있습니다. ' + error);
                    });
            } else if (act == 'U') {
                // 회원정보 수정

                let params = new URLSearchParams();

                if (
                    this.userInfo.checkPassword != '' &&
                    this.userInfo.password == this.userInfo.checkPassword
                ) {
                    params.append('password', this.userInfo.checkPassword);
                } else if (
                    this.userInfo.checkPassword != '' &&
                    this.userInfo.password != this.userInfo.checkPassword
                ) {
                    this.updShow = false;
                    return alert('비밀번호를 확인해주세요');
                }
                params.append('name', this.userInfo.userNm);
                params.append('tell', this.userInfo.tell);

                this.updShow = false;

                this.axios
                    .post('/mypage/updInfo.do', params)
                    .then(function (response) {
                        console.log(response.data);
                        vm.getInfo();
                    })
                    .catch(function (error) {
                        alert('에러! API 요청에 오류가 있습니다. ' + error);
                    });
            }
        },
    },
};
</script>
<style>
#myForm {
    height: 500px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
table {
    height: inherit;
}

th {
    text-align: center;
    font-size: larger;
}
</style>
