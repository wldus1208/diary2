<template>
  <div id="divNotice">
    <p
      class="conTitle"
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <span>게시판</span>
    </p>
    <span>
      <table
        style="collapse; border: 1px #50bcdf;"
        width="100%"
        cellpadding="5"
        cellspacing="0"
        border="1"
      >
        <tr style="border: 0px; border-color: blue">
          <td width="50" height="25" style="font-size: 100%; text-align: left">
            <div id="searchArea" class="d-flex justify-content-around">
              <p style="font-size: 20px; vertical-align: middle">제목</p>
              <input
                type="text"
                style="width: 15%"
                class="form-control"
                v-model="title"
              />
              <p style="font-size: 20px; vertical-align: middle">작성일</p>
              <input
                type="date"
                style="width: 15%"
                class="form-control"
                v-model="from_date"
              />
              ~
              <input
                type="date"
                style="width: 15%"
                class="form-control"
                v-model="to_date"
              />
              <span class="fr">
                <a
                  @click="getList()"
                  class="btn btn-primary mx-2"
                  id="btnSearchGrpcod"
                  name="btn"
                >
                  <span>검 색</span>
                </a>
                <a class="btn btn-primary mx-2" name="modal" @click="detail()"
                  ><span>신규등록</span></a
                >
              </span>
            </div>
          </td>
        </tr>
      </table>
    </span>

    <div class="bootstrap-table">
      <div class="fixed-table-container" style="padding-bottom: 0px">
        <div class="fixed-table-body">
          <table class="col">
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">작성일</th>
                <th scope="col">작성자</th>
              </tr>
            </thead>
            <tbody id="listInf">
              <tr
                v-for="item in LIST"
                @click="detail(item.noticeNo)"
                :key="item.noticeNo"
              >
                <td>{{ item.noticeNo }}</td>
                <td>{{ item.noticeTitle }}</td>
                <td>{{ item.noticeRegdate }}</td>
                <td>{{ item.loginId }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 페이징 처리  -->
    <div style="padding: 20px">
      <paginate
        class="justify-content-center"
        v-model="currentPage"
        :page-count="page()"
        :page-range="5"
        :margin-pages="0"
        :click-handler="getList"
        :prev-text="'이전'"
        :next-text="'다음'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </div>
  </div>
</template>
<script>
import { openModal } from "jenesius-vue-modal";
import sampleModal from "./sampleModal.vue";
import Paginate from "vuejs-paginate-next";

export default {
  data: function () {
    return {
      LIST: [],
      title: "",
      from_date: "",
      to_date: "",
      currentPage: 1,
      pageSize: 10,
      totalPage: 1,
      totalCnt: 0,
      loginId: "",
      loginName: "",
      no: "",
      content: "",
      writer: "",
      isSave: false,
      isShow: false,
      action: "",
    };
  },
  computed: {},
  components: {
    paginate: Paginate,
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList: function (num) {
      // 게시판 리스트 가져오기
      let vm = this;

      let params = new URLSearchParams();
      params.append(
        "currentPage",
        num == undefined ? this.currentPage : (this.currentPage = num)
      );
      params.append("pageSize", this.pageSize);
      params.append("title", this.title);
      params.append("from_date", this.from_date);
      params.append("to_date", this.to_date);

      this.axios
        .post("/system/noticeListvue.do", params)
        .then(function (response) {
          console.log(response);

          vm.LIST = response.data.notice;
          vm.currentPage = response.data.currentPage;
          vm.pageSize = response.data.pageSize;
          // vm.loginId = response.data.loginId;
          // vm.loginName = response.data.loginName;
          vm.totalCnt = response.data.noticeCnt;

          vm.totalPage = vm.page();
        })
        .catch(function (error) {
          alert("에러! API 요청에 오류가 있습니다. " + error);
        });
    },
    detail: async function (no) {
      if (no == null || no == "") {
        this.action = "I";

        const modal = await openModal(sampleModal, {
          title: "공지사항 등록",
          action: this.action,
        });

        modal.onclose = () => {
          console.log("Close");
          this.getList();
          //return false; //Modal will not be closed
        };
      } else {
        this.action = "U";
        const modal = await openModal(sampleModal, {
          title: "공지사항 수정",
          noticeNo: no,
          action: this.action,
        });

        modal.onclose = () => {
          console.log("Close ");
          this.getList();
          //return false; //Modal will not be closed
        };
      }
    },
    page: function () {
      var total = this.totalCnt;
      var page = this.pageSize;
      var xx = total % page;
      var result = parseInt(total / page);

      if (xx == 0) {
        return result;
      } else {
        result = result + 1;
        return result;
      }
    },
  },
};
</script>

<style>
#searchArea {
  margin-top: 25px;
  margin-bottom: 25px;
}
#searchArea > * {
  height: auto;
}
</style>
