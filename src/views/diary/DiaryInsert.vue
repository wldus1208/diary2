<template>
  <div class="content">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"
          >다이어리 {{ isCreating() ? "작성" : "수정" }}
        </span>
      </template>
    </el-page-header>

    <div class="content">
      <div id="divNotice" class="notice-container">
        <p class="conTitle">
          <span>vue diary</span>
        </p>
        <el-button name="Write" @click="focusInput">{{
          isCreating() ? "저장" : "수정 완료"
        }}</el-button>
      </div>
    </div>
    <table>
      <tbody>
        <tr>
          <th>제목</th>
          <td>
            <input
              ref="titleInput"
              type="text"
              id="title"
              v-model="title"
              placeholder="제목을 입력하세요"
            />
          </td>
        </tr>
        <tr>
          <th>날씨선택</th>
          <td class="vertical-align">
            <el-form-item prop="weather">
              <el-radio-group v-model="weather">
                <el-radio-button label="1">
                  <el-icon size="20"><Sunny /></el-icon>
                </el-radio-button>
                <el-radio-button label="2">
                  <el-icon size="20"><Cloudy /></el-icon>
                </el-radio-button>
                <el-radio-button label="3">
                  <el-icon size="20"><Pouring /></el-icon>
                </el-radio-button>
                <el-radio-button label="4">
                  <el-icon size="20"><Lightning /></el-icon>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th>날짜선택</th>
          <td class="vertical-align">
            <div class="demo-date-picker">
              <div class="block">
                <input type="date" v-model="idate" />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>기분</th>
          <td class="vertical-align mood-select">
            <select v-model="mood">
              <option value="1">기쁨</option>
              <option value="2">평범</option>
              <option value="3">우울</option>
              <option value="4">화남</option>
              <option value="5">놀람</option>
            </select>
          </td>
        </tr>

        <tr>
          <th></th>
        </tr>
      </tbody>
    </table>

    <div id="divEditor">
      <quill-editor
        v-model:value="state.content"
        :options="state.editorOption"
        @change="onEditorChange($event)"
      />
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue3-quill";
// import { reactive } from "vue";

export default {
  name: "App",
  components: {
    quillEditor,
  },
  data: function () {
    return {
      action: "",
      weather: "",
      idate: "", // 다이어리 등록 날짜
      title: "", // 제목
      mood: "", // 기분상태 5단계
      lists: [],
      loginId: "",
      state: {
        content: "",
        _content: "",
        editorOption: {
          placeholder: "내용을 작성해주세요.",
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image", "video"],
            ],
          },
          // more options
        },
        disabled: false,
      },
    };
  },
  //////////////////////////////methods////////////////////////////////////////////////////////////
  mounted() {
    this.action = this.$route.query.action || "";
    console.log("Received action query parameter:", this.action);

    const d_no = this.$route.query.d_no;
    console.log("Received d_no query parameter:", d_no);

    if (this.action === "U") {
      let params = new URLSearchParams();
      params.append("d_no", d_no);
      console.log("params: ", d_no);

      this.axios.post("/diary/detail.do", params).then((response) => {
        console.log("response", response.data.result);

        this.lists = {
          d_no: response.data.result.d_no,
          d_diarydt: response.data.result.d_diarydt,
          d_mood: response.data.result.d_mood,
          d_title: response.data.result.d_title,
          d_weather: response.data.result.d_weather,
          d_contents: response.data.result.d_contents,
        };

        if (this.lists.d_title) {
          this.title = this.lists.d_title;
          this.weather = this.lists.d_weather;
          // 날짜 형식 변경
          const dateParts = this.lists.d_diarydt.match(/(\d{4})(\d{2})(\d{2})/);
          const date = new Date(
            `${dateParts[1]}-${dateParts[2]}-${dateParts[3]}T00:00:00`
          );
          // YYYY-MM-DD 형식으로 변환
          this.idate = date.toISOString().split("T")[0];

          const moodMap = {
            기쁨: "1",
            평범: "2",
            우울: "3",
            화남: "4",
            놀람: "5",
          };
          this.mood = moodMap[this.lists.d_mood];
          this.state.content = this.lists.d_contents;
        }
      });
    }
  },

  methods: {
    isCreating() {
      // 'action' 값이 'I'인 경우 true 반환, 그렇지 않으면 false 반환
      return this.action === "I";
    },
    goBack() {
      this.$router.go(-1); // 이전페이지 이동
    },
    onEditorChange: function ({ quill, html, text }) {
      // 텍스트 편집기 내용이 변경될때 호출디는 콜백 함수 onEditorChange 정의
      this.state._content = html;
      console.log("############ onEditorChange START ############");
      console.log("quill          ::  ", quill);
      console.log("html           ::  ", html);
      console.log("text           ::  ", text);
      console.log("state._content ::  ", this.state._content);
      console.log("############ onEditorChange   END ############");
    },
    focusInput() {
      let loginInfo = this.$store.state.loginInfo;
      this.loginId = loginInfo.loginId;

      let params = new URLSearchParams();

      console.log("this.state._content : ", this.state._content);
      const d_no = this.$route.query.d_no;
      params.append("d_no", d_no);
      params.append("loginId", this.loginId);
      params.append("d_title", this.title);
      params.append("d_diarydt", this.formatDate(this.idate));
      params.append("d_mood", this.mood);
      params.append("d_contents", this.state.content);
      params.append("action", this.action);
      console.log("this.action", this.action);

      params.append("d_weather", this.weather);
      params.append("noticeContent", this.state._content);
      //params.append("diarydt", this.diarydt);

      this.axios.post("/diary/Save.do", params).then((response) => {
        console.log(response);
        if (response.data.resultMsg == "SUCCESS") {
          alert("일기를 저장하였습니다.");
          this.$router.go(0);
          this.$router.push("/dashboard/diary/list");
        } else if (response.data.resultMsg == "UPDATED") {
          alert("일기를 수정하였습니다.");
          this.$router.go(0);
        }
      });

      if (this.$refs.titleInput) {
        this.$refs.titleInput.focus();
      }
    },
    Write: async function goWritepage() {
      // await createRouter.push("/DiaryInsert.vue/"); //경로
    },

    disabledDate(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 오늘의 시간을 00:00:00으로 설정
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0); // 선택한 날짜의 시간을 00:00:00으로 설정

      return selectedDate > today;
    },
    formatDate(date) {
      // 주어진 날짜를 Date 객체로 변환합니다.
      const parsedDate = new Date(date);
      // 원하는 형식에 맞게 문자열로 변환합니다.
      return parsedDate.toISOString().slice(0, 10).replace(/-/g, "");
    },
  },
};
</script>
<style>
tr,
th,
td {
  height: 70px;
  min-width: 108px;
  text-align: center;
}
#container ul li.contents .content {
  min-height: 450px;
}
#divEditor,
#divWeather {
  padding: 20px;
}
.ql-container {
  height: 200px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
.list-main {
  margin-top: 2%;
}
.el-divider--horizontal {
  margin: 10px 0px 40px 0px;
}
.el-icon-edit {
  background-color: #9c97f0;
  color: white;
}
.el-icon-edit:hover {
  color: black;
}
.radio-group {
  margin-right: 20px;
}
.content input,
.content select {
  border: none;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-page-header__header {
  font-family: "나눔바른고딕", NanumBarunGothic;
  line-height: 60px;
  font-size: 28px;
  font-weight: bold;
  margin: 0px 0px 20px;
}
div.content p.conTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto !important;
}

table {
  width: 100%;
}
.vertical-align {
  vertical-align: middle;
}

/* 제목과 해당 입력 상자를 왼쪽에 정렬 */
th,
td {
  text-align: left;
}

/* 기분 select box를 오른쪽에 정렬 */
.mood-select {
  width: calc(100% - 170px); /* 남은 공간 계산 */
  display: inline-block; /* inline-block으로 변경 */
  vertical-align: middle; /* 수직 정렬 */
  margin-left: 50px; /* 왼쪽 마진 추가 */
}
</style>
