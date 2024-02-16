<template>
  <el-row type="flex" justify="center" class="list-main">
    <el-col :span="16">
      <!--리스트형,카드형,작성 검색 영역  -->
      <el-row>
        <!-- 작성(Write)로 이동 -->
        <el-col :span="19">
          <!-- (타임라인,카드) 토글 -->
          <el-radio-group v-model="radio" class="radio-group">
            <el-radio-button size="small" label="list"
              ><el-icon size="20"><tickets /></el-icon
            ></el-radio-button>
            <el-radio-button size="small" label="card"
              ><el-icon size="20"><Menu /></el-icon
            ></el-radio-button>
          </el-radio-group>

          <!-- 작성 버튼 -->
          <el-button @click="write" circle
            ><el-icon :size="size" :color="color"> <Edit /> </el-icon
          ></el-button>
        </el-col>

        <!-- 검색 부분 -->
        <el-col :span="5">
          <!-- 검색(input) -->
          <input v-model="search" placeholder="검색" size="small" />
          <!-- 클리어 아이콘 -->
          <el-icon v-if="search != ''" @click="reset"
            ><CircleCloseFilled
          /></el-icon>
        </el-col>
        <!-- /검색 부분 끝 -->
      </el-row>

      <el-divider></el-divider
      ><!--구분선-->

      <!-- 타임라인 형태 시작 -->
      <el-row v-show="radio == 'list'">
        <!-- 다이어리 목록 출력 부분 -->
        <div class="scroll-box">
          <el-timeline class="scroll">
            <el-timeline-item
              v-for="(list, index) in lists"
              :key="index"
              placement="top"
            >
              {{ list.d_diarydt }}
              <el-card @click="detail(index)">
                <div style="width: 1000px">
                  <h4>{{ list.d_title }}</h4>
                  <p class="card-date">{{ list.d_regdate }} 작성</p>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <!-- /다이어리 목록 출력 부분 -->
      </el-row>
      <!-- 타임라인 형태 끝 -->

      <!-- 카드 형태 시작 -->
      <el-row v-show="radio == 'card'" class="scroll-box">
        <!-- 다이어리 목록 출력 부분 -->
        <el-row class="scroll" :gutter="12">
          <el-col v-for="(list, index) in lists" :key="index">
            <!-- 카드영역 -->
            <div @click="detail(index)" class="card">
              <el-card shadow="hover">
                <div class="card-date">
                  {{ list.d_diarydt }}
                  <span>
                    <el-icon @click="remove(index)"><CloseBold /></el-icon
                  ></span>
                </div>
                <div class="card-title">{{ list.d_title }}</div>
                <div class="card-content">
                  날씨: {{ list.d_weather }} 기분: {{ list.d_mood }}
                </div>
              </el-card>
            </div>
            <!-- 카드영역 끝 -->
          </el-col>
        </el-row>
      </el-row>
      <!-- 카드 형태 끝 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      lists: [],
      radio: "list",
      search: "",
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list: function () {
      let vm = this;

      let params = new URLSearchParams();
      params.append("title", this.search);

      this.axios
        .post("/diary/list.do", params)
        .then(function (response) {
          console.log(response.data.diary);
          vm.lists = response.data.diary;
        })
        .catch(function (error) {
          alert("에러! API 요청에 오류가 있습니다. " + error);
        });
    },
  },
};
</script>

<style scoped>
.list-main {
  margin-top: 2%;
}
.el-divider--horizontal {
  margin: 10px 0px 40px 0px;
}
.radio-group {
  margin-right: 20px;
}
.card {
  margin-top: 5%;
  width: 400px;
}
.card-date {
  font-size: 13px;
  color: #9c97f0;
}
.card-title,
.card-content {
  margin-top: 5%;
  font-size: 13px;
}
.card-content {
  color: gray;
}
.scroll-box {
  height: 500px;
  overflow: overlay;
  overflow-x: hidden;
}
.scroll {
  overflow: auto;
  padding: 0 4% 0 3%;
}

.el-card__body:hover {
  visibility: visible;
}
.el-card:hover {
  background-color: #f6f7fd;
}
</style>
