<template>
  <div class="content">
    <el-page-header>
      <template #content>
        <span class="text-large font-600 mr-3"> PROTOTYPE </span>
      </template>
    </el-page-header>
    <div id="divNotice">
      <p class="conTitle">
        <span>에디터</span>
        <span>
          참고 사이트 :: https://element-plus.org/en-US/ <br /><br />-- npm
          install <br />npm install element-plus --save <br />npm i
          unplugin-auto-import unplugin-vue-components -D <br />npm install
          @element-plus/icons-vue <br /><br />-- main.js <br />import
          ElementPlus from "element-plus";<br />
          import "element-plus/dist/index.css"; <br />import * as
          ElementPlusIconsVue from '@element-plus/icons-vue'; <br /><br />for
          (const [key, component] of Object.entries(ElementPlusIconsVue)) {
          app.component(key, component) } <br /><br />app .use(store)
          <br />.use(router) <br />.use(VueSession, sessionOptions)
          <br />.use(Paginate) <br />//.use(twLib) <br />.use(VueDaumpostcode)
          <br />.use(ElementPlus) <br />.mount("#app");
        </span>
      </p>
    </div>

    <div id="divEditor">
      <quill-editor
        v-model:value="state.content"
        :options="state.editorOption"
        @change="onEditorChange($event)"
      />
    </div>
  </div>

  <div class="content">
    <div id="divNotice">
      <p class="conTitle">
        <span>SAMPLE</span>
        <span>
          참고 사이트 :: https://flyween.github.io/vue3-quill/
          <br />
          npm i vue3-quill
        </span>
      </p>
    </div>
    <table>
      <tbody>
        <tr>
          <th>날씨선택</th>
          <td>
            <el-form-item prop="weather">
              <el-radio-group v-model="weather">
                <el-radio-button label="sunny">
                  <el-icon size="20"><Sunny /></el-icon>
                </el-radio-button>
                <el-radio-button label="cloudy">
                  <el-icon size="20"><Cloudy /></el-icon>
                </el-radio-button>
                <el-radio-button label="pouring">
                  <el-icon size="20"><Pouring /></el-icon>
                </el-radio-button>
                <el-radio-button label="lightning">
                  <el-icon size="20"><Lightning /></el-icon>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th>날짜선택</th>
          <td>
            <div class="demo-date-picker">
              <div class="block">
                <el-date-picker
                  v-model="date"
                  type="date"
                  placeholder="날짜를 선택하세요."
                  :disabled-date="disabledDate"
                  :shortcuts="shortcuts"
                  :size="size"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>검색아이콘</th>
          <td>
            <el-row>
              <el-button class="el-icon-edit" circle
                ><el-icon><Search /></el-icon
              ></el-button>
            </el-row>
          </td>
        </tr>
        <tr>
          <th>슬라이드</th>
          <td>
            <div class="block text-center">
              <el-carousel height="150px">
                <el-carousel-item v-for="item in 2" :key="item">
                  <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </td>
        </tr>
        <tr>
          <th>타이틀</th>
          <td>
            <el-page-header>
              <template #content>
                <span class="text-large font-600 mr-3"> Title </span>
              </template>
            </el-page-header>
          </td>
        </tr>
        <tr>
          <th></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { quillEditor } from "vue3-quill";
import { reactive } from "vue";

export default {
  name: "App",
  components: {
    quillEditor,
  },
  data() {
    return {
      weather: "sunny",
      date: "",
    };
  },
  setup() {
    const state = reactive({
      content: `<p>&lt;<span style="color: rgb(255, 126, 219);">template</span>&gt;</p><p>&nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">div</span> <span style="color: rgb(254, 222, 93);">class</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"content"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">div</span> <span style="color: rgb(254, 222, 93);">id</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"divNotice"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">p</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">class</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"conTitle"</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">style</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"</span></p><p><span style="color: rgb(255, 139, 57);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; display: flex;</span></p><p><span style="color: rgb(255, 139, 57);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; align-items: center;</span></p><p><span style="color: rgb(255, 139, 57);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; justify-content: space-between;</span></p><p><span style="color: rgb(255, 139, 57);">&nbsp; &nbsp; &nbsp; &nbsp; "</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">span</span><span style="color: rgb(54, 249, 246);">&gt;</span>에디터<span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">span</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">p</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">div</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">div</span> <span style="color: rgb(254, 222, 93);">id</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"divEditor"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">quill-editor</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">v-</span><span style="color: rgb(254, 68, 80);">model</span><span style="color: rgb(54, 249, 246);">:</span><span style="color: rgb(255, 126, 219);">value</span>="<span style="color: rgb(255, 126, 219);">state</span><span style="color: rgb(54, 249, 246);">.</span><span style="color: rgb(255, 126, 219);">content"</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">:</span><span style="color: rgb(255, 126, 219);">options</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"</span><span style="color: rgb(255, 126, 219);">state</span>.<span style="color: rgb(255, 126, 219);">editorOption</span><span style="color: rgb(255, 139, 57);">"</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">@</span><span style="color: rgb(255, 126, 219);">change</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"</span><span style="color: rgb(54, 249, 246);">onEditorChange</span>(<span style="color: rgb(255, 126, 219);">$event</span>)<span style="color: rgb(255, 139, 57);">"</span></p><p>&nbsp; &nbsp; &nbsp; /<span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">div</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">div</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p><br></p><p>&nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">div</span> <span style="color: rgb(254, 222, 93);">class</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"content"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">div</span> <span style="color: rgb(254, 222, 93);">id</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"divNotice"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">p</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">class</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"conTitle"</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">style</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"</span></p><p><span style="color: rgb(255, 139, 57);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; display: flex;</span></p><p><span style="color: rgb(255, 139, 57);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; align-items: center;</span></p><p><span style="color: rgb(255, 139, 57);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; justify-content: space-between;</span></p><p><span style="color: rgb(255, 139, 57);">&nbsp; &nbsp; &nbsp; &nbsp; "</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">span</span><span style="color: rgb(54, 249, 246);">&gt;</span>날씨 아이콘<span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">span</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">p</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">div</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">div</span> <span style="color: rgb(254, 222, 93);">id</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"divWeather"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-form-item</span> <span style="color: rgb(254, 222, 93);">prop</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"weather"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-radio-group</span> <span style="color: rgb(254, 222, 93);">v-</span><span style="color: rgb(254, 68, 80);">model</span>=<span style="color: rgb(255, 139, 57);">"</span><span style="color: rgb(255, 126, 219);">weather</span><span style="color: rgb(255, 139, 57);">"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-radio-button</span> <span style="color: rgb(254, 222, 93);">label</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"sunny"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-icon</span> <span style="color: rgb(254, 222, 93);">size</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"20"</span><span style="color: rgb(54, 249, 246);">&gt;&lt;</span><span style="color: rgb(114, 241, 184);">Sunny</span> <span style="color: rgb(54, 249, 246);">/&gt;&lt;/</span><span style="color: rgb(114, 241, 184);">el-icon</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">el-radio-button</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-radio-button</span> <span style="color: rgb(254, 222, 93);">label</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"cloudy"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-icon</span> <span style="color: rgb(254, 222, 93);">size</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"20"</span><span style="color: rgb(54, 249, 246);">&gt;&lt;</span><span style="color: rgb(114, 241, 184);">Cloudy</span> <span style="color: rgb(54, 249, 246);">/&gt;&lt;/</span><span style="color: rgb(114, 241, 184);">el-icon</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">el-radio-button</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-radio-button</span> <span style="color: rgb(254, 222, 93);">label</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"pouring"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-icon</span> <span style="color: rgb(254, 222, 93);">size</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"20"</span><span style="color: rgb(54, 249, 246);">&gt;&lt;</span><span style="color: rgb(114, 241, 184);">Pouring</span> <span style="color: rgb(54, 249, 246);">/&gt;&lt;/</span><span style="color: rgb(114, 241, 184);">el-icon</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">el-radio-button</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-radio-button</span> <span style="color: rgb(254, 222, 93);">label</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"lightning"</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;</span><span style="color: rgb(114, 241, 184);">el-icon</span> <span style="color: rgb(254, 222, 93);">size</span><span style="color: rgb(182, 177, 177);">=</span><span style="color: rgb(255, 139, 57);">"20"</span><span style="color: rgb(54, 249, 246);">&gt;&lt;</span><span style="color: rgb(114, 241, 184);">Lightning</span> <span style="color: rgb(54, 249, 246);">/&gt;&lt;/</span><span style="color: rgb(114, 241, 184);">el-icon</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">el-radio-button</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">el-radio-group</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">el-form-item</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">div</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&nbsp; <span style="color: rgb(54, 249, 246);">&lt;/</span><span style="color: rgb(114, 241, 184);">div</span><span style="color: rgb(54, 249, 246);">&gt;</span></p><p>&lt;/<span style="color: rgb(255, 126, 219);">template</span>&gt;</p><p>&lt;<span style="color: rgb(255, 126, 219);">script</span>&gt;</p><p><span style="color: rgb(114, 241, 184);">import</span> { <span style="color: rgb(255, 126, 219);">quillEditor</span> } <span style="color: rgb(254, 222, 93);">from</span> <span style="color: rgb(255, 139, 57);">"vue3-quill"</span>;</p><p><span style="color: rgb(114, 241, 184);">import</span> { <span style="color: rgb(255, 126, 219);">reactive</span> } <span style="color: rgb(254, 222, 93);">from</span> <span style="color: rgb(255, 139, 57);">"vue"</span>;</p><p><br></p><p><span style="color: rgb(114, 241, 184);">export</span> <span style="color: rgb(254, 222, 93);">default</span> {</p><p>&nbsp; <span style="color: rgb(255, 126, 219);">name</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"App"</span>,</p><p>&nbsp; <span style="color: rgb(255, 126, 219);">components</span><span style="color: rgb(182, 177, 177);">:</span> {</p><p>&nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">quillEditor</span>,</p><p>&nbsp; },</p><p>&nbsp; <span style="color: rgb(54, 249, 246);">data</span>() {</p><p>&nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">return</span> {</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">weather</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"sunny"</span>,</p><p>&nbsp; &nbsp; };</p><p>&nbsp; },</p><p>&nbsp; <span style="color: rgb(54, 249, 246);">setup</span>() {</p><p>&nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">const</span> <span style="color: rgb(255, 126, 219);">state</span> <span style="color: rgb(255, 255, 255);">=</span> <span style="color: rgb(54, 249, 246);">reactive</span>({</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">content</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">""</span>,</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">_content</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">""</span>,</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">editorOption</span><span style="color: rgb(182, 177, 177);">:</span> {</p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">placeholder</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"내용을 작성해주세요."</span>,</p><p>&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">modules</span><span style="color: rgb(182, 177, 177);">:</span> {</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">toolbar</span><span style="color: rgb(182, 177, 177);">:</span> [</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<span style="color: rgb(255, 139, 57);">"bold"</span>, <span style="color: rgb(255, 139, 57);">"italic"</span>, <span style="color: rgb(255, 139, 57);">"underline"</span>, <span style="color: rgb(255, 139, 57);">"strike"</span>],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<span style="color: rgb(255, 139, 57);">"blockquote"</span>, <span style="color: rgb(255, 139, 57);">"code-block"</span>],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">header</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(46, 226, 250);">1</span> }, { <span style="color: rgb(255, 126, 219);">header</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(46, 226, 250);">2</span> }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">list</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"ordered"</span> }, { <span style="color: rgb(255, 126, 219);">list</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"bullet"</span> }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">script</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"sub"</span> }, { <span style="color: rgb(255, 126, 219);">script</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"super"</span> }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">indent</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"-1"</span> }, { <span style="color: rgb(255, 126, 219);">indent</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"+1"</span> }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">direction</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(255, 139, 57);">"rtl"</span> }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">size</span><span style="color: rgb(182, 177, 177);">:</span> [<span style="color: rgb(255, 139, 57);">"small"</span>, <span style="color: rgb(249, 126, 114);">false</span>, <span style="color: rgb(255, 139, 57);">"large"</span>, <span style="color: rgb(255, 139, 57);">"huge"</span>] }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">header</span><span style="color: rgb(182, 177, 177);">:</span> [<span style="color: rgb(46, 226, 250);">1</span>, <span style="color: rgb(46, 226, 250);">2</span>, <span style="color: rgb(46, 226, 250);">3</span>, <span style="color: rgb(46, 226, 250);">4</span>, <span style="color: rgb(46, 226, 250);">5</span>, <span style="color: rgb(46, 226, 250);">6</span>, <span style="color: rgb(249, 126, 114);">false</span>] }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">color</span><span style="color: rgb(182, 177, 177);">:</span> [] }, { <span style="color: rgb(255, 126, 219);">background</span><span style="color: rgb(182, 177, 177);">:</span> [] }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">font</span><span style="color: rgb(182, 177, 177);">:</span> [] }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [{ <span style="color: rgb(255, 126, 219);">align</span><span style="color: rgb(182, 177, 177);">:</span> [] }],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<span style="color: rgb(255, 139, 57);">"clean"</span>],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<span style="color: rgb(255, 139, 57);">"link"</span>, <span style="color: rgb(255, 139, 57);">"image"</span>, <span style="color: rgb(255, 139, 57);">"video"</span>],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ],</p><p>&nbsp; &nbsp; &nbsp; &nbsp; },</p><p>&nbsp; &nbsp; &nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// more options</em></p><p>&nbsp; &nbsp; &nbsp; },</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">disabled</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(249, 126, 114);">false</span>,</p><p>&nbsp; &nbsp; });</p><p><br></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// const onEditorBlur = (quill) =&gt; {</em></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// &nbsp; console.log("editor blur!", quill);</em></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// };</em></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// const onEditorFocus = (quill) =&gt; {</em></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// &nbsp; console.log("editor focus!", quill);</em></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// };</em></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// const onEditorReady = (quill) =&gt; {</em></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// &nbsp; console.log("editor ready!", quill);</em></p><p>&nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// };</em></p><p>&nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">const</span> <span style="color: rgb(54, 249, 246);">onEditorChange</span> <span style="color: rgb(255, 255, 255);">=</span> ({ <em style="color: rgb(255, 126, 219);">quill</em>, <em style="color: rgb(255, 126, 219);">html</em>, <em style="color: rgb(255, 126, 219);">text</em> }) <span style="color: rgb(254, 222, 93);">=&gt;</span> {</p><p>&nbsp; &nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">//console.log("editor change!", quill, html, text);</em></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">state</span>.<span style="color: rgb(255, 126, 219);">_content</span> <span style="color: rgb(255, 255, 255);">=</span> <em style="color: rgb(255, 126, 219);">html</em>;</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">console</span>.<span style="color: rgb(54, 249, 246);">log</span>(<span style="color: rgb(255, 139, 57);">"############ onEditorChange START ############"</span>);</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">console</span>.<span style="color: rgb(54, 249, 246);">log</span>(<span style="color: rgb(255, 139, 57);">"quill &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:: &nbsp;"</span>, <em style="color: rgb(255, 126, 219);">quill</em>);</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">console</span>.<span style="color: rgb(54, 249, 246);">log</span>(<span style="color: rgb(255, 139, 57);">"html &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :: &nbsp;"</span>, <em style="color: rgb(255, 126, 219);">html</em>);</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">console</span>.<span style="color: rgb(54, 249, 246);">log</span>(<span style="color: rgb(255, 139, 57);">"text &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :: &nbsp;"</span>, <em style="color: rgb(255, 126, 219);">text</em>);</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">console</span>.<span style="color: rgb(54, 249, 246);">log</span>(<span style="color: rgb(255, 139, 57);">"state._content :: &nbsp;"</span>, <span style="color: rgb(255, 126, 219);">state</span>.<span style="color: rgb(255, 126, 219);">_content</span>);</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">console</span>.<span style="color: rgb(54, 249, 246);">log</span>(<span style="color: rgb(255, 139, 57);">"############ onEditorChange &nbsp; END ############"</span>);</p><p>&nbsp; &nbsp; };</p><p><br></p><p>&nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">setTimeout</span>(() <span style="color: rgb(254, 222, 93);">=&gt;</span> {</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">state</span>.<span style="color: rgb(255, 126, 219);">disabled</span> <span style="color: rgb(255, 255, 255);">=</span> <span style="color: rgb(249, 126, 114);">true</span>;</p><p>&nbsp; &nbsp; }, <span style="color: rgb(46, 226, 250);">2000</span>);</p><p><br></p><p>&nbsp; &nbsp; <span style="color: rgb(254, 222, 93);">return</span> {</p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(255, 126, 219);">state</span>,</p><p>&nbsp; &nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// onEditorBlur,</em></p><p>&nbsp; &nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// onEditorFocus,</em></p><p>&nbsp; &nbsp; &nbsp; <em style="color: rgb(132, 139, 189);">// onEditorReady,</em></p><p>&nbsp; &nbsp; &nbsp; <span style="color: rgb(54, 249, 246);">onEditorChange</span>,</p><p>&nbsp; &nbsp; };</p><p>&nbsp; },</p><p>};</p><p>&lt;/<span style="color: rgb(255, 126, 219);">script</span>&gt;</p><p>&lt;<span style="color: rgb(255, 126, 219);">style</span>&gt;</p><p><span style="color: rgb(54, 249, 246);">#container</span> <span style="color: rgb(114, 241, 184);">ul</span> <span style="color: rgb(114, 241, 184);">li</span><span style="color: rgb(254, 222, 93);">.contents</span> <span style="color: rgb(254, 222, 93);">.content</span> {</p><p>&nbsp; <span style="color: rgb(114, 241, 184);">min-height</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(249, 126, 114);">450px</span>;</p><p>}</p><p><span style="color: rgb(54, 249, 246);">#divEditor</span>,</p><p><span style="color: rgb(54, 249, 246);">#divWeather</span> {</p><p>&nbsp; <span style="color: rgb(114, 241, 184);">padding</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(249, 126, 114);">20px</span>;</p><p>}</p><p><span style="color: rgb(254, 222, 93);">.ql-container</span> {</p><p>&nbsp; <span style="color: rgb(114, 241, 184);">height</span><span style="color: rgb(182, 177, 177);">:</span> <span style="color: rgb(249, 126, 114);">200px</span>;</p><p>}</p><p>&lt;/<span style="color: rgb(255, 126, 219);">style</span>&gt;</p><p><br></p>`,
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
    });

    // const onEditorBlur = (quill) => {
    //   console.log("editor blur!", quill);
    // };
    // const onEditorFocus = (quill) => {
    //   console.log("editor focus!", quill);
    // };
    // const onEditorReady = (quill) => {
    //   console.log("editor ready!", quill);
    // };
    const onEditorChange = ({ quill, html, text }) => {
      //console.log("editor change!", quill, html, text);
      state._content = html;
      console.log("############ onEditorChange START ############");
      console.log("quill          ::  ", quill);
      console.log("html           ::  ", html);
      console.log("text           ::  ", text);
      console.log("state._content ::  ", state._content);
      console.log("############ onEditorChange   END ############");
    };

    setTimeout(() => {
      state.disabled = true;
    }, 2000);

    return {
      state,
      // onEditorBlur,
      // onEditorFocus,
      // onEditorReady,
      onEditorChange,
    };
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
</style>
