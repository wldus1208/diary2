<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <!-- 모달 닫기 버튼 -->
      <span class="close" @click="hideModal">&times;</span>
      <!-- <h2>소셜 로그인</h2> -->
      <!-- 소셜 로그인 버튼 컨테이너 -->
      <div class="social-login-container">
        <!-- 구글 로그인 이미지 버튼 -->
        <img
          src="../../assets/google_login.png"
          alt="Google 로그인"
          @click="googleLogin"
          class="social-login-image google"
        />
        <!-- 네이버 로그인 이미지 버튼 -->
        <img
          src="../../assets/naver_login.png"
          alt="Naver 로그인"
          @click="naverLogin"
          class="social-login-image naver"
        />
        <!-- 카카오 로그인 이미지 버튼 -->
        <img
          src="../../assets/kakao_login.png"
          alt="Kakao 로그인"
          @click="kakaoLogin"
          class="social-login-image kakao"
        />
        <!-- 추가적인 소셜 로그인 버튼은 여기에 배치 -->
      </div>
    </div>
  </div>
  <register-modal ref="registerModal"></register-modal>
</template>

<script>
import RegisterModal from "@/views/user/RegisterModal.vue";

export default {
  data() {
    return {
      isVisible: false, // 모달의 표시 상태
      code: "",
      state: "",
    };
  },
  components: {
    RegisterModal,
  },
  //네이버 로그인 후 리다이렉트된 페이지에서 실행될 스크립트
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.code = urlParams.get("code");
    this.state = urlParams.get("state");
    console.log("인증 코드 전송: ", this.code);
    console.log("인증 상태 전송: ", this.state);

    if (this.code && this.state) {
      this.sendCodeToBackend(this.code, this.state);
    }
  },

  methods: {
    // 카카오 로그인
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_image, account_email",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "http://localhost:8080",
        success: (res) => {
          const kakao_account = res.kakao_account;
          const ninkname = kakao_account.profile.ninkname;
          const email = kakao_account.email;
          console.log("ninkname", ninkname);
          console.log("email", email);

          //로그인처리구현

          alert("로그인 성공!");
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },

    // 구글 로그인
    googleLogin() {
      var clientId =
        "791029232576-26va45aofidk8vio4pfee8ashalguil3.apps.googleusercontent.com"; // 구글 클라이언트 ID
      var redirectUri = "http://localhost:8080"; // 구글에서 인증 후 리다이렉트할 URI
      var scope = "email profile"; // 요청할 권한 범위
      var responseType = "code"; // 응답 타입

      // 구글 OAuth2 인증 URL 구성
      var authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

      // 사용자를 인증 URL로 리다이렉트
      window.location.href = authUrl;

      console.log(window.location.href);
    },

    // 네이버 로그인을 위한 URL로 리다이렉트하는 메소드
    naverLogin() {
      console.log("네이버 로그인 버튼이 클릭되었습니다.");
      const naverClientId = "lOlSYvpZSiJZtjXKIs4v";
      const redirectURI = encodeURIComponent("http://localhost:8080");
      const state = "RANDOM_STATE_STRING";
      const naverLoginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectURI}&state=${state}`;
      console.log("네이버 로그인 URL:", naverLoginURL);
      window.location.href = naverLoginURL;
    },

    sendCodeToBackend(code, state) {
      // axios를 사용하여 백엔드로 코드와 상태 전송

      console.log("@@@@@@@@@@@@-->", code);
      console.log("@@@@@@@@@@@@-->", state);

      // let params = {
      //   code: code,
      //   state: state,
      // };

      // console.log("@#$%@#@#", params);

      this.axios
        .get("/api/auth/naver", { params: { code: code, state: state } })
        .then((response) => {
          // 인증 성공 처리
          console.log("인증 성공", response.data.login_result);
          if (response.data.login_result === 0) {
            alert("화원가입 후 이용해주세요");
            // 모달에 이름과 전화번호를 설정하고 표시
            this.showRegisterModal(
              response.data.name,
              response.data.mobile,
              response.data.naver
            );
          } else {
            // 회원가입이 필요 없는 경우 (즉, 이미 회원인 경우)
            // 휴대폰 번호로 회원 정보 조회 및 로그인 처리
            const phoneNumber = response.data.mobile.replace(/-/g, ""); // 하이픈 제거
            this.loginWithPhoneNumber(phoneNumber);
          }
        })
        .catch((error) => {
          // 에러 처리
          console.error("인증 에러", error);
        });
    },

    // 휴대폰 번호로 로그인 처리하는 메소드
    loginWithPhoneNumber(phoneNumber) {
      this.axios
        .post("/api/login", { hp: phoneNumber })
        .then((loginResponse) => {
          console.log("loginResponse : ", loginResponse);
          if (loginResponse.status == 200) {
            // loginproc.do
            this.axios
              .post(
                "/loginProc.do",
                new URLSearchParams({
                  lgn_Id: loginResponse.data.loginID,
                  pwd: loginResponse.data.password,
                })
              )
              .then((resp) => {
                let data = resp.data;
                console.log("data : ", data);
                if (data.result == "SUCCESS") {
                  this.$store.commit("logged", {
                    loginId: data.loginId,
                    userNm: data.userNm,
                    userType: data.userType,
                    serverName: data.serverName,
                    usrMnuAtrt: data.usrMnuAtrt,
                  });
                  this.$store.commit("auth", { type: data.userType });

                  // guide for making vue files
                  data.usrMnuAtrt.forEach(function (item) {
                    console.log(item.mnu_nm);
                    item.nodeList.forEach(function (item) {
                      let purl = item.mnu_url.replace(".do", ".vue");
                      let vueFilePath = "@/views" + purl;
                      console.log(
                        "  메뉴명: " +
                          item.mnu_nm +
                          " || 파일경로 : " +
                          vueFilePath
                      );
                    });
                  });
                  ////////////////////////////////

                  this.$router.push("/dashboard/home");
                } else {
                  if (data.resultMsg.indexOf("회원가입") > -1)
                    alert(data.resultMsg);
                  else alert("ID 혹은 비밀번호가 틀립니다");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },

    // 모달 표시 메서드
    showRegisterModal(name, phoneNumber, naver) {
      if (this.$refs.registerModal) {
        // 휴대폰 번호에서 하이픈 제거
        const cleanPhoneNumber = phoneNumber.replace(/-/g, "");
        this.$refs.registerModal.userForm.name = name;
        this.$refs.registerModal.userForm.naver = naver;
        this.$refs.registerModal.userForm.hp = cleanPhoneNumber;
        this.$refs.registerModal.showModal();
      }
    },

    showModal() {
      this.isVisible = true;
    },
    hideModal() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.social-login-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  /* 버튼을 수평적으로 배치 */
}

.social-login-image {
  width: 30%; /* 필요에 따라 크기 조정을 위한 너비 */
  cursor: pointer;
  transition: transform 0.3s ease;
  /* 호버 시 약간 확대되는 효과 */
}

.social-login-image:hover {
  transform: scale(1.05); /* 호버 시 이미지 확대 */
}

/* 소셜 로그인 버튼 호버 효과 */
.social-login-button:hover {
  opacity: 0.9; /* 버튼 호버 시 약간 투명하게 */
}
.modal {
  position: fixed; /* 모달을 화면에 고정 */
  left: 0;
  top: 0;
  width: 100%; /* 전체 너비 */
  height: 100%; /* 전체 높이 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 중앙 정렬 */
  z-index: 1000; /* 다른 요소 위에 표시 */
}

.modal-content {
  background-color: #fff; /* 배경색 */
  padding: 20px; /* 패딩 */
  border-radius: 10px; /* 모서리 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  width: 500px; /* 너비 */
  max-width: 80%; /* 최대 너비 */
  animation: modalOpen 0.5s ease; /* 애니메이션 효과 */
}

@keyframes modalOpen {
  from {
    opacity: 0; /* 처음에는 투명 */
    transform: translateY(-50px); /* 위에서 아래로 약간 이동 */
  }
  to {
    opacity: 1; /* 최종적으로 불투명 */
    transform: translateY(0); /* 원래 위치로 */
  }
}

.close {
  float: right; /* 오른쪽 상단에 위치 */
  font-size: 25px; /* 크기 */
  font-weight: bold;
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
  margin-left: 90%;
}

.close:hover {
  color: red; /* 호버 시 색상 변경 */
}
</style>
