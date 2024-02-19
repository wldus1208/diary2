<template>
  <div class="post-detail">
    <el-row>
      <el-row class="content-top" justify="center">
        <!-- 버튼 -->
        <el-col class="flex-container">
          <el-button circle @click="back()">
            <el-icon :size="20" :color="color"> <Back /> </el-icon>
          </el-button>
          <el-button class="el-icon-edit" circle @click="revise()">
            <el-icon :size="20" :color="color"> <EditPen /> </el-icon>
          </el-button>
          <el-button type="info" circle @click="remove()">
            <el-icon :size="20" :color="color"> <Delete /> </el-icon>
          </el-button>
        </el-col>
        <el-col :span="16">
          <el-row class="date">
            <p>{{ formatCardDate(lists.d_diarydt) }}</p>
            <!-- {{ lists.d_diarydt }} //20240217 -->
          </el-row>

          <el-row>
            <span>{{ lists.d_title }}</span>
            <span class="weather-feel-icon"
              >{{ lists.d_weather }} ({{ lists.d_mood }})</span
            >
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-row justify="center">
          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>
        </el-row>

        <div justify="center" class="content">
          <PureText>{{ lists.d_contents }}</PureText>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    d_no: String,
    htmlContent: String, // HTML 태그를 포함한 내용을 받아올 prop
  },
  setup(props) {
    // HTML 태그를 제거한 순수한 텍스트를 계산된 속성으로 반환
    const pureTextContent = computed(() => {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = props.htmlContent;
      return tempElement.textContent || tempElement.innerText || "";
    });

    return {
      pureTextContent,
    };
  },
  name: "ListByNo",
  data() {
    return {
      lists: [],
      d_title: "",
      d_contents: "",
      d_weather: "",
      d_mood: "",
      d_diarydt: "",
      pd_no: "",
    };
  },

  mounted() {
    // this.pd_title = this.d_title;
    this.pd_no = this.$route.query.d_no;
    // this.pd_contents = this.d_contents;
    // this.pd_weather = this.d_weather;
    // this.pd_mood = this.d_mood;
    // this.pd_diarydt = this.d_diarydt;

    let vm = this;

    let params = new URLSearchParams();
    params.append("d_no", this.pd_no);
    console.log("pd_no", this.pd_no);

    this.axios.post("/diary/detail.do", params).then(function (response) {
      console.log(response.data.result);
      // HTML 태그를 제거한 순수한 텍스트 추출
      const dContents = response.data.result.d_contents;
      // HTML 태그를 제거한 순수한 텍스트 추출
      const pureText = dContents.replace(/<[^>]+>/g, "");

      vm.lists = {
        d_no: response.data.result.d_no,
        d_diarydt: response.data.result.d_diarydt,
        d_mood: response.data.result.d_mood,
        d_title: response.data.result.d_title,
        d_weather: response.data.result.d_weather,
        d_contents: pureText, // HTML 태그가 제거된 순수한 텍스트로 설정
      };
    });
  },
  methods: {
    back() {
      this.$router.push("/dashboard/diary/list");
    },

    revise() {
      this.$router.push("/dashboard/diary/diary?no=" + this.$route.query.no);
    },

    remove() {
      if (confirm("삭제 하시겠습니까?")) {
        this.$router.push("/dashboard/diary/list");
        this.$message({
          type: "info",
          message: "일기를 삭제하였습니다.",
        });
      }
    },

    formatCardDate(date) {
      if (!date || date.length !== 8) {
        return "날짜를 가져올 수 없습니다.";
      }
      // 문자열을 연, 월, 일로 분할
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);

      // 월과 일에 대해 0을 제거
      const formattedMonth = parseInt(month, 10).toString();
      const formattedDay = parseInt(day, 10).toString();

      // 연도, 월, 일을 조합하여 원하는 형식으로 반환
      return `${year}년 ${formattedMonth}월 ${formattedDay}일`;
    },
  },
};
</script>

<style scoped>
.post-detail {
  margin: 2% auto;
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.content-top {
  margin-top: 2%;
  padding: auto;
}
.date,
.weather-feel-icon {
  color: gray;
}
.flex-container {
  display: flex;
  justify-content: flex-end;
}
.el-icon-edit {
  background-color: #9c97f0;
  color: white;
}
.content {
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
  width: 100%;
}
.el-row {
  flex-direction: column;
}
</style>
