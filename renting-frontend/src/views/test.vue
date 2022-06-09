<template>
  <div class="up-load">
    <el-upload
        action=""
        list-type="picture-card"
        :limit="1"
        :on-change="getFile"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"

        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        :auto-upload="false">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div>
      <el-button type="success" @click="test">test</el-button>
    </div>
    <div>
      <el-button type="primary" @click="testAPI">test</el-button>
    </div>
    <div>
      <el-button type="primary" @click="testAPI2">test2</el-button>
    </div>
    <div>
      <el-image :src="this.workers[0].photo"></el-image>
    </div>
  </div>




</template>

<script>
import qs from "qs";
import axios from "axios";

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      url: '',
      workers: [],

    };
  },
  methods: {
    test() {
      console.log(this.url);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getFile(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isLt2M) {
        this.$message.error('图片大小不能超过2Mb!');
        return ;
      }

      this.getBase64(file.raw).then(res => {
        console.log(res);
        this.url = res;
      });

    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },

    testAPI() {
      let worker = {
        username: '#peter123',
        pwd: 'aaa111',
        name: 'ysa123',
        phoneNum: '13661000000',
        photo: this.url,
      };
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/user_ctrl/add_worker/",
        data: qs.stringify(worker),
      }).then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    },

    testAPI2() {

      axios({
        method: 'get',
        url: "http://127.0.0.1:8000/user_ctrl/get_workers_info/",
      }).then(res => {
        console.log(res.data);
        this.workers = res.data;
      }).catch(err => {
        console.log(err);
      });
    },

  },
  created() {
    this.testAPI2();
  }
}
</script>

<style scoped>
.up-load {
  position: absolute;
  left: 150px;
  top: 150px;
  margin-bottom: 30px;
}
</style>