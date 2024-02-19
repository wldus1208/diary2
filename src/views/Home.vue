<template>
  <div id="homeContent">
    <div class="hero">
      <img alt="Diary logo" src="../assets/diaryLogo.png" class="logo" />
      <h1 class="hero-title">나만의 공간, 인터넷 일기장.</h1>
      <p class="hero-subtitle">당신의 삶을 기록해 보세요.</p>
      <el-button type="primary" class="start-button" @click="startDiary"
        >일기 시작하기</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    startDiary() {
      this.$router.push({ path: "/dashboard/diary/list" });
    },
  },
  created: function () {
    console.log("home initiate");
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
