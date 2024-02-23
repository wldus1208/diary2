<template>
  <div>
    <el-calendar v-model="Calendar" @click="handleDateClick" />
    <el-dialog v-model="modalVisible" title="일정 추가">
      <el-form label-width="120px">
        <el-form-item label="내용">
          <el-input
            type="textarea"
            v-model="eventContent"
            placeholder="일정 내용을 입력하세요"
          />
        </el-form-item>
        <el-form-item>
          <el-button name="Write" type="primary" @click="addEvent"
            >저장</el-button
          >
          <el-button @click="cancelEvent">취소</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CalendarComponent",
  data() {
    return {
      calendar: new Date(),
      modalVisible: false,
      eventContent: "",
    };
  },
  methods: {
    handleDateClick({ isDisabled, date }) {
      // 날짜 박스를 클릭하고, 해당 날짜가 비활성 상태가 아닐 때만 모달을 표시합니다.
      if (!isDisabled) {
        console.log("Clicked Date:", date);
        this.modalVisible = true;
      }
    },
    addEvent() {
      // 일정 추가 로직을 구현합니다.
      console.log("일정 추가:", this.eventContent);
      // 모달을 닫습니다.
      this.modalVisible = false;
      // 입력 필드 초기화

      this.eventContent = "";
    },
    cancelEvent() {
      // 모달을 닫습니다.
      this.modalVisible = false;
      // 입력 필드 초기화

      this.eventContent = "";
    },
  },
};
</script>

<style scoped>
#homeContent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  padding: 40px;
  color: #333;
}
#homeContent:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
#homeContent h1 {
  font-size: 2rem;
  margin-top: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero {
  text-align: center;
  max-width: 600px;
}

.logo {
  max-width: 120px;
  animation: float 3s ease-in-out infinite;
}

.hero-title {
  font-size: 2.5rem;
  margin-top: 20px;
  font-weight: bold;
  color: #333;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-top: 10px;
  color: #555;
}
.start-button {
  margin-top: 30px;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 25px;
  transition: background-color 0.3s, transform 0.3s;
}
.start-button:hover {
  background-color: #8c62fd;
  transform: translateY(-3px);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
