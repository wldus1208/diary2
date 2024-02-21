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
          @click="naverLogin"
          class="social-login-image kakao"
        />
        <!-- 추가적인 소셜 로그인 버튼은 여기에 배치 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false, // 모달의 표시 상태
      code: "",
      state: "",
    };
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

      let params = {
        code: code,
        state: state,
      };

      console.log("@#$%@#@#", params);

      this.axios
        .post("/api/auth/naver", params)
        .then((response) => {
          // 인증 성공 처리
          console.log("인증 성공", response);
        })
        .catch((error) => {
          // 에러 처리
          console.error("인증 에러", error);
        });
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
