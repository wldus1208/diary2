<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="hideModal">&times;</span>
      <h2>아이디/비밀번호 찾기</h2>
      <div class="modal-body">
        <p>
          아이디 또는 비밀번호를 잊으셨나요? 등록하신 휴대폰 번호를
          입력해주세요.
        </p>
        <input
          type="text"
          v-model="phoneNumber"
          placeholder="휴대폰 번호"
          class="modal-input"
        />
        <button @click="findAccount" class="modal-button">찾기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      phoneNumber: "",
    };
  },
  methods: {
    showModal() {
      this.isVisible = true;
    },
    hideModal() {
      this.isVisible = false;
    },
    findAccount() {
      // 휴대폰 번호를 이용한 아이디/비밀번호 찾기 로직 구현
      // 예: 휴대폰 번호를 서버로 전송하여 사용자 정보 조회 후 결과 처리
      alert("휴대폰 번호로 아이디/비밀번호 찾기 기능 구현 필요");
    },
  },
};
</script>

<style scoped>
.success-message {
  color: green; /* 성공 메시지 색상 */
}
.error-message {
  color: red; /* 에러 메시지 색상 */
}
h2 {
  font-size: 2.5rem; /* 크기 */
  color: #333; /* 색상 */
  text-align: center; /* 중앙 정렬 */
  text-transform: uppercase; /* 대문자 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 텍스트 그림자 */
  margin-top: 0; /* 상단 여백 */
  margin-bottom: 1rem; /* 하단 여백 */
  padding: 0.5rem; /* 패딩 */
  background-color: #f8f9fa; /* 배경 색상 */
  border-radius: 10px; /* 모서리 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 박스 그림자 */
  display: inline-block; /* 내용의 너비만큼 크기 조정 */
  width: auto; /* 자동 너비 */
  max-width: 100%; /* 최대 너비 설정 */
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

/* 입력 필드 스타일 */
input[type="text"] {
  width: calc(100% - 20px); /* 전체 너비에서 패딩 제외 */
  padding: 10px;
  margin-bottom: 15px; /* 마진 */
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 5px; /* 모서리 둥글게 */
}

/* 버튼 스타일 */
button {
  width: 100%; /* 전체 너비 */
  padding: 10px 20px;
  background-color: #007bff; /* 배경색 */
  color: #fff; /* 글자색 */
  border: none;
  border-radius: 5px; /* 모서리 둥글게 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
}

button:hover {
  background-color: #0056b3; /* 호버 시 배경색 변경 */
}
</style>
