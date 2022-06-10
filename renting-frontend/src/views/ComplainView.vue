<template>
  <div class="info">
    <div id="shortcut">
      <div class="w" aria-label="顶部导航栏">
        <ul class="top-left">
          <li>
            <div class="dt">
              <router-link to="/">首页</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/about">联系我们</router-link>
            </div>
          </li>
          <li v-if="$store.state.userInfo.id !== undefined && $store.state.userInfo.id !== ''">
            <div class="dt">
              <a @click="logOut" style="color: #f10215">
                退出登录
              </a>
            </div>
          </li>
        </ul>
        <ul class="top-right">
          <li id="login-button" class="shortcut_btn">
            <div v-if = "$store.state.userInfo.id === undefined || $store.state.userInfo.id === ''">
              <router-link to="/login">登录</router-link>
              &nbsp;&nbsp;
              <router-link to="/register" style="color:#f10215;">免费注册</router-link>
            </div>
            <div v-else>
              <router-link to="/info">{{ $store.state.userInfo.username }}</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/order">我的订单</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/ticket">我的报修</router-link>
            </div>
          </li>
          <li>
            <div class="dt">
              <router-link to="/cart">购物车</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div id="info-nav">
      <div class="w">
        <div class="logo">
          <router-link to="/"></router-link>
        </div>
        <div class="title">个人主页</div>
        <div class="nav-items">
          <div class="dte">
            <router-link to="/info">个人首页</router-link>
          </div>
          <div class="dte">
            <router-link to="/info">账号设置</router-link>
          </div>
        </div>
        <div class="info-nav-r">
          <div id="info-nav-search">
            <div class="form">
              <input type="text" id="key" class="text"></input>
              <button type="button" class="button">
                搜索
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="container" class="container">
      <div class="w">
        <div class="sub">
          <div class="menu">
            <dl>
              <dt>订单中心</dt>
              <dd>
                <router-link to="/order">我的订单</router-link>
              </dd>
              <dd>
                <router-link to="/order">评价晒单</router-link>
              </dd>
            </dl>
            <dl>
              <dt>客户服务</dt>
              <dd>
                <router-link to="/ticket_test">我的报修</router-link>
              </dd>
              <dd>
                <router-link to="/ticket_test">报修状态</router-link>
              </dd>
              <dd>
                <router-link to="/complain">我的投诉</router-link>
              </dd>
              <dd>
                <router-link to="/complain">投诉状态</router-link>
              </dd>
            </dl>
            <dl>
              <dt>账号服务</dt>
              <dd>
                <router-link :to="{path:'/info', query:{type:'baseSet'}}">我的信息</router-link>
              </dd>
              <dd>
                <router-link :to="{path:'/info', query:{type:'safeSet'}}">账号安全</router-link>
              </dd>
            </dl>
          </div>
        </div>
        <div class="main">

          <!--el-button type="success" @click="getHouse">注&nbsp;&nbsp;册</el-button-->

          <div class="breadcrumb" >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path: '/info/'}">个人中心</el-breadcrumb-item>
              <el-breadcrumb-item>我的订单</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="divider">
            <el-divider><i class="el-icon-house"></i></el-divider>
          </div>

          <el-dialog
              title="请扫二维码付款"
              :visible.sync="dialogVisible1"
              width="50%"
              center="true"
              :before-close="handleClose">
            <div class="pay_img1">
              <img class="img1" src="../assets/submit.png" alt="图片加载中" width="50%">
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible1 = false; payOrder(order_id_to_pay)">确 定</el-button>
            </div>
          </el-dialog>

          <el-dialog
              title="请填写您的评价"
              :visible.sync="dialogVisible3"
              width="30%"
              center="true"
              :before-close="handleClose">
            <el-form ref="form" :model="commentForm" label-width="80px" size="mini">
              <el-form-item label="我的打分:" prop="rate">
                <el-rate
                    style="margin-top: 5px"
                    v-model="commentForm.comment"
                    show-text>
                </el-rate>
              </el-form-item>
              <el-form-item label="我的评价" prop="info">
                <el-input style="margin-bottom: 5px" type="textarea" v-model="commentForm.info"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="success" @click="test">test</el-button>
            <el-button type="success" @click="testAPI3">testAPI3</el-button>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible3 = false; this.commentForm.comment=null;this.commentForm.info=''">取 消</el-button>
              <el-button type="success" @click="submit_comment">确定</el-button>
            </div>
          </el-dialog>

          <el-dialog
              title="报修信息"
              :visible.sync="dialogVisible2"
              width="30%"
              center="true"
              :before-close="handleClose">
            <el-form ref="form" :model="ticketForm" label-width="80px" size="mini">
              <el-form-item label="用户名" >
                {{this.$store.state.userInfo.username}}
              </el-form-item>
              <el-form-item label="房源编号" prop="hid">
                {{this.ticketForm.hid}}
              </el-form-item>
              <el-form-item label="文字描述" prop="info">
                <el-input style="margin-bottom: 5px" type="textarea" v-model="ticketForm.info"></el-input>
              </el-form-item>
              <el-form-item label="展示图片" prop="img">
                <el-upload
                    action=""
                    list-type="picture-card"
                    :limit="1"
                    :on-change="getFile"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"

                    accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                    :auto-upload="false">
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
                  <i class="el-icon-plus"></i>

                </el-upload>
                <el-dialog :visible.sync="imgVisible">
                  <img width="50%" height="50%" :src="ImageUrl" alt="">
                </el-dialog>

                <!--el-button type="success" @click="test2">test2</el-button-->
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible2 = false; this.imageUrl = '';this.ticketForm.img='';this.ticketForm.info=''">取 消</el-button>
              <el-button type="success" @click="testAPI">确定</el-button>
            </div>
          </el-dialog>

          <el-dialog
              title="投诉信息"
              :visible.sync="dialogVisible4"
              width="30%"
              center="true"
              :before-close="handleClose">
            <el-form ref="form" :model="complainForm" label-width="80px" size="mini">
              <el-form-item label="用户名" >
                {{this.$store.state.userInfo.username}}
              </el-form-item>
              <el-form-item label="工单编号" prop="tid">
                {{this.complainForm.tid}}
              </el-form-item>
              <el-form-item label="文字描述" prop="content">
                <el-input style="margin-bottom: 5px" type="textarea" v-model="complainForm.content"></el-input>
              </el-form-item>
              <el-form-item label="投诉图片" prop="img">
                <el-upload
                    action=""
                    list-type="picture-card"
                    :limit="1"
                    :on-change="getFile2"
                    :on-preview="handlePictureCardPreview2"
                    :on-remove="handleRemove2"
                    accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                    :auto-upload="false">
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
                  <i class="el-icon-plus"></i>

                </el-upload>
                <el-dialog :visible.sync="imgVisible2">
                  <img width="50%" height="50%" :src="ImageUrl2" alt="">
                </el-dialog>

                <!--el-button type="success" @click="test3">test3</el-button>
                <el-button type="success" @click="testAPI">testAPI</el-button-->
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible4 = false; this.imageUrl2 = '';this.complainForm.img='';this.complainForm.content=''">取 消</el-button>
              <el-button type="success" @click="submit_complain">确定</el-button>
            </div>
          </el-dialog>

          <div class="order_tabs">
            <el-tabs v-model="activeName" stretch="true" >
              <el-tab-pane label="全部投诉" name="first">
                <el-table
                    :data="order_all_paging"
                    align="center"
                    border
                    v-loading="this.loading"
                    type="index"
                    width="100%">
                  <el-table-column align="center" prop="id" label="投诉编号" >
                  </el-table-column>
                  <el-table-column align="center" prop="tid" label="工单编号" >
                  </el-table-column>
                  <el-table-column align="center" prop="status" label="工单状态" >
                    <template v-slot="scope">
                      <el-tag type="warning" v-if="scope.row.reply===null || scope.row.reply===''">
                        待回复
                      </el-tag>
                      <el-tag type="success" v-if="scope.row.reply!==null && scope.row.reply!==''">
                        已回复
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="contents" label="文字描述" :show-overflow-tooltip="true" width="250">
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="200">
                    <template v-slot="scope">
                      <div v-if="scope.row.reply===null||scope.row.reply===''">
                        <el-button type="info" plain size="mini">暂无操作</el-button>
                      </div>
                      <div v-if="scope.row.reply!==null&&scope.row.reply!==''">
                        <el-popover placement="left" width="500" trigger="click">
                          <el-button type="success" size="small" plain slot="reference">查看回复</el-button>
                          <el-form ref="form" :model="scope.row" label-width="80px" size="mini">
                            <el-form-item label="客服回复:" prop="reply">
                              {{scope.row.reply}}
                            </el-form-item>
                          </el-form>
                        </el-popover>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" prop="oid" label="详情" width="100">
                    <template v-slot="scope">
                      <el-popover placement="left" width="500" trigger="click">
                        <el-button icon="el-icon-search" circle slot="reference"></el-button>
                        <el-card shadow="hover" :body-style= "{ padding:  '0px'}" width="100%">
                          <div slot="header" style="font-size: 17px; font-weight: bold" >
                            投诉详情
                          </div>

                          <el-card shadow="hover" :body-style= "{ padding:  '0px'}" width="100%">
                            <div style="padding: 14px;">
                              <div>
                                投诉描述: &nbsp;&nbsp;{{scope.row.contents}}
                              </div>
                              <div>
                                投诉图片:
                              </div>
                              <div>
                                <el-image style="position: relative; top: 7px;" :preview-src-list="[scope.row.pictures]" class="ticket_img" :src="scope.row.pictures" alt="暂无图片"></el-image>
                              </div>
                            </div>
                          </el-card>

                        </el-card>

                      </el-popover>
                    </template>

                  </el-table-column>
                </el-table>
                <el-pagination
                    small
                    :page-size="5"
                    :pager-count="7"
                    :current-page="current_page_all"
                    layout="prev, pager, next"
                    @current-change = "order_all_change_page"
                    :total="this.order_all.length"
                    style="float:right">
                </el-pagination>
              </el-tab-pane>

              <el-tab-pane label="待回复投诉" name="second">
                <el-table
                    :data="order_unpaid_paging"
                    align="center"
                    border
                    v-loading="this.loading"
                    type="index"
                    width="100%">
                  <el-table-column align="center" prop="id" label="投诉编号" >
                  </el-table-column>
                  <el-table-column align="center" prop="tid" label="工单编号" >
                  </el-table-column>
                  <el-table-column align="center" prop="status" label="工单状态" >
                    <template v-slot="scope">
                      <el-tag type="warning" v-if="scope.row.reply===null || scope.row.reply===''">
                        待回复
                      </el-tag>
                      <el-tag type="success" v-if="scope.row.reply!==null && scope.row.reply!==''">
                        已回复
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="contents" label="文字描述" :show-overflow-tooltip="true" width="250">
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="200">
                    <template v-slot="scope">
                      <div v-if="scope.row.reply===null||scope.row.reply===''">
                        <el-button type="info" plain size="mini">暂无操作</el-button>
                      </div>
                      <div v-if="scope.row.reply!==null&&scope.row.reply!==''">
                        <el-popover placement="left" width="500" trigger="click">
                          <el-button type="success" size="small" plain slot="reference">查看回复</el-button>
                          <el-form ref="form" :model="scope.row" label-width="80px" size="mini">
                            <el-form-item label="客服回复:" prop="reply">
                              {{scope.row.reply}}
                            </el-form-item>
                          </el-form>
                        </el-popover>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" prop="oid" label="详情" width="100">
                    <template v-slot="scope">
                      <el-popover placement="left" width="500" trigger="click">
                        <el-button icon="el-icon-search" circle slot="reference"></el-button>
                        <el-card shadow="hover" :body-style= "{ padding:  '0px'}" width="100%">
                          <div slot="header" style="font-size: 17px; font-weight: bold" >
                            投诉详情
                          </div>

                          <el-card shadow="hover" :body-style= "{ padding:  '0px'}" width="100%">
                            <div style="padding: 14px;">
                              <div>
                                投诉描述: &nbsp;&nbsp;{{scope.row.contents}}
                              </div>
                              <div>
                                投诉图片:
                              </div>
                              <div>
                                <el-image style="position: relative; top: 7px;" :preview-src-list="[scope.row.pictures]" class="ticket_img" :src="scope.row.pictures" alt="暂无图片"></el-image>
                              </div>
                            </div>
                          </el-card>

                        </el-card>

                      </el-popover>
                    </template>

                  </el-table-column>
                </el-table>
                <el-pagination
                    small
                    :page-size="5"
                    :pager-count="7"
                    :current-page="current_page_unpaid"
                    layout="prev, pager, next"
                    @current-change = "order_unpaid_change_page"
                    :total="this.order_unpaid.length"
                    style="float:right">
                </el-pagination>
              </el-tab-pane>

              <el-tab-pane label="已回复投诉" name="third">
                <el-table
                    :data="order_finished_paging"
                    align="center"
                    border
                    v-loading="this.loading"
                    type="index"
                    width="100%">
                  <el-table-column align="center" prop="id" label="投诉编号" >
                  </el-table-column>
                  <el-table-column align="center" prop="tid" label="工单编号" >
                  </el-table-column>
                  <el-table-column align="center" prop="status" label="工单状态" >
                    <template v-slot="scope">
                      <el-tag type="warning" v-if="scope.row.reply===null || scope.row.reply===''">
                        待回复
                      </el-tag>
                      <el-tag type="success" v-if="scope.row.reply!==null && scope.row.reply!==''">
                        已回复
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="contents" label="文字描述" :show-overflow-tooltip="true" width="250">
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="200">
                    <template v-slot="scope">
                      <div v-if="scope.row.reply===null||scope.row.reply===''">
                        <el-button type="info" plain size="mini">暂无操作</el-button>
                      </div>
                      <div v-if="scope.row.reply!==null&&scope.row.reply!==''">
                        <el-popover placement="left" width="500" trigger="click">
                          <el-button type="success" size="small" plain slot="reference">查看回复</el-button>
                          <el-form ref="form" :model="scope.row" label-width="80px" size="mini">
                            <el-form-item label="客服回复:" prop="reply">
                              {{scope.row.reply}}
                            </el-form-item>
                          </el-form>
                        </el-popover>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" prop="oid" label="详情" width="100">
                    <template v-slot="scope">
                      <el-popover placement="left" width="500" trigger="click">
                        <el-button icon="el-icon-search" circle slot="reference"></el-button>
                        <el-card shadow="hover" :body-style= "{ padding:  '0px'}" width="100%">
                          <div slot="header" style="font-size: 17px; font-weight: bold" >
                            投诉详情
                          </div>

                          <el-card shadow="hover" :body-style= "{ padding:  '0px'}" width="100%">
                            <div style="padding: 14px;">
                              <div>
                                投诉描述: &nbsp;&nbsp;{{scope.row.contents}}
                              </div>
                              <div>
                                投诉图片:
                              </div>
                              <div>
                                <el-image style="position: relative; top: 7px;" :preview-src-list="[scope.row.pictures]" class="ticket_img" :src="scope.row.pictures" alt="暂无图片"></el-image>
                              </div>
                            </div>
                          </el-card>

                        </el-card>

                      </el-popover>
                    </template>

                  </el-table-column>
                </el-table>
                <el-pagination
                    small
                    :page-size="5"
                    :pager-count="7"
                    :current-page="current_page_finished"
                    layout="prev, pager, next"
                    @current-change = "order_finished_change_page"
                    :total="this.order_finished.length"
                    style="float:right">
                </el-pagination>
              </el-tab-pane>

            </el-tabs>
          </div>
          <!--el-button type="success" @click="test">test</el-button-->



        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";

export default {
  name: "CartView",
  data () {
    return {
      activeName: 'first',
      commentForm: {
        uid: this.$store.state.userInfo.id,
        tid: 0,
        comment: null,
        info: '',
      },
      complainForm: {
        uid: this.$store.state.userInfo.id,
        tid: 1,
        content: null,
        img: '',
      },
      loading: true,
      imgVisible: false,
      imageUrl: '',
      imgVisible2: false,
      imageUrl2: '',
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      ticketForm: {
        hid: 0,
        uid: this.$store.state.userInfo.id,
        //username: '',
        info: '', //文字描述
        img: '',//图片
      },
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      showCard: false,
      currentDate: new Date(),
      order_id_to_pay: 0,
      house_data: {
        id: 1,
        short_price: 200,
        long_price: 3000,
        location: '北京海淀区花园路街道',
        area: 80,
        type: 1,
      }, //当前订单的房源数据
      order_data: {
        hid: 1,
        id: 1,
        uid: 1,
        type: 0,
        status: 1,
        paid: 1,
        order_time: '2022-06-03 00:00:00',
        duration: 10,
        amount: 10000,
        start_time: '2022-06-04 22:14:34',
      },
      order_all: [
        {
          reply: null,
          w_name: '小明',
          h_location: '北京海淀区',
          h_area: '80',
          h_type: 1,
          h_short_price: 200,
          h_long_price: 3000,
          id: 1,
          uid: 1,
          hid: 1,
          wid: null,
          info: '我家马桶坏了,赶快来来来来来来来来来来修',
          pictures: "",
          status: 1,
          date: '',
          materials_pic: '',
          materials_text: '',
          comment: null,
          details: '',
        },
        {
          reply: null,
          w_name: '小明',
          h_location: '北京海淀区',
          h_area: '80',
          h_type: 1,
          h_short_price: 200,
          h_long_price: 3000,
          id: 1,
          uid: 1,
          hid: 1,
          wid: null,
          info: '我家电视坏了',
          pictures: "",
          status: 1,
          date: '',
          materials_pic: '',
          materials_text: '',
          comment: null,
          details: '',
        },
        {
          reply: null,
          w_name: '小明',
          h_location: '北京海淀区',
          h_area: '80',
          h_type: 1,
          h_short_price: 200,
          h_long_price: 3000,
          id: 1,
          uid: 1,
          hid: 1,
          wid: 1,
          info: '我家冰箱坏了',
          pictures: "",
          status: 2,
          date: '2022-06-13',
          materials_pic: '',
          materials_text: '',
          comment: null,
          details: '',
        },
        {
          reply: null,
          w_name: '小明',
          id: 1,
          uid: 1,
          hid: 1,
          wid: 2,
          h_location: '北京海淀区',
          h_area: '80',
          h_type: 1,
          h_short_price: 200,
          h_long_price: 3000,
          info: '我家空调坏了',
          pictures: "",
          status: 3,
          date: '2022-06-14',
          materials_pic: '',
          materials_text: '修好了',
          comment: null,
          details: '',
        },
        {
          reply: null,
          w_name: '小明',
          h_location: '北京海淀区',
          h_area: '80',
          h_type: 1,
          h_short_price: 200,
          h_long_price: 3000,
          id: 1,
          uid: 1,
          hid: 1,
          wid: 2,
          info: '我家电脑坏了',
          pictures: "",
          status: 3,
          date: '2022-06-17',
          materials_pic: '',
          materials_text: '修好了',
          comment: 1,
          details: '干得不错',
        },
        {
          reply: null,
          w_name: '小明',
          h_location: '北京海淀区',
          h_area: '80',
          h_type: 1,
          h_short_price: 200,
          h_long_price: 3000,
          id: 1,
          uid: 1,
          hid: 1,
          wid: 2,
          info: '我家遥控器坏了',
          pictures: "",
          status: 3,
          date: '2022-06-18',
          materials_pic: '',
          materials_text: '修好了',
          comment: 1,
          details: '干得不错',
        },
      ], //所有订单
      order_finished: [], //已完成订单
      order_unpaid: [],   //未支付订单
      order_uncommented: [], //未评价订单
      order_handling: [], //正在处理
      order_valid: [],
      //订单数量
      order_all_count: 0,
      order_finished_count: 0,
      order_unpaid_count: 0,
      order_uncommented_count: 0,
      order_handling_count: 0,
      order_valid_count: 0,
      //当前页数
      current_page_all: 1,
      current_page_finished: 1,
      current_page_unpaid: 1,
      current_page_uncommented: 1,
      current_page_handling: 1,
      current_page_valid: 1,
      page_size: 4,
      //当前 各个订单页面中所展示的订单
      order_all_paging: [],
      order_finished_paging: [],
      order_unpaid_paging: [],
      order_uncommented_paging: [],
      order_handling_paging:[],
      order_valid_paging: [],
    }
  },

  methods:{
    //changePage(val)
    test() {
      //console.log('hello!');
      //console.log(this.order_valid);
      //console.log(this.order_valid_paging);
      //console.log(this.order_all);
      //console.log(this.order_all[0].valid);
      //this.order_all[0].valid += 1;
      //console.log(this.order_all[0].valid);
      //console.log(this.order_all_paging);
      //console.log(this.loading);
      //console.log(val);
      //console.log(this.order_all);
      console.log(this.commentForm);
    },
    test2() {
      console.log(this.ticketForm);
    },
    test3() {
      console.log(this.complainForm);
    },
    testAPI3() {
      this.submit_comment();
    },
    testAPI() {
      this.submit_complain();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.ticketForm.img = '';
      this.imageUrl = '';
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList);
      this.complainForm.img = '';
      this.imageUrl = '';
    },
    handlePictureCardPreview(file) {
      this.ImageUrl = file.url;
      this.imgVisible = true;
    },
    handlePictureCardPreview2(file) {
      this.ImageUrl2 = file.url;
      this.imgVisible2 = true;
    },
    getFile(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isLt2M) {
        this.$message.error('图片大小不能超过2Mb!');
        return ;
      }

      this.getBase64(file.raw).then(res => {
        //console.log(res);
        this.url = res;
        this.ticketForm.img = res;
        console.log(this.ticketForm.img)
      });

    },
    getFile2(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isLt2M) {
        this.$message.error('图片大小不能超过2Mb!');
        return ;
      }

      this.getBase64(file.raw).then(res => {
        //console.log(res);
        this.url = res;
        this.complainForm.img = res;
        console.log(this.complainForm.img)
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

    submit_comment() {

      let send_data = {
        uid: this.commentForm.uid,
        tid: this.commentForm.tid,
        score: this.commentForm.comment,
        details: this.commentForm.info,
      };
      console.log(send_data);

      if(send_data.score > 5 || send_data.score < 1 || send_data.score === null) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请给师傅打分哦~',
        });
        return;
      }
      if(send_data.details === '' || send_data.details === null) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请给师傅写点评语哦~',
        });
        return;
      }


      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/tickets/comment/",
        data: qs.stringify(send_data),
      }).then(res => {
        console.log(res.data);
        if(res.data.errno === 0) {

          for(let i = 0; i < this.order_all.length; i++) {
            if(this.order_all[i].id === send_data.tid) {
              this.order_all[i].comment = send_data.score;
              this.order_all[i].info = send_data.info;
              break;
            }
          }

          for(let i = 0; i < this.order_all.length; i++) {
            //待处理
            if (this.order_all[i].status === 1) {
              this.order_unpaid.push(this.order_all[i]);
              console.log(1);
            }

            //正在处理
            if(this.order_all[i].status === 2) {
              this.order_handling[i].push(this.order_all[i]);
            }

            //未评价
            if (this.order_all[i].status === 3 && this.order_all[i].comment === null) {
              this.order_uncommented.push(this.order_all[i]);
              console.log(2);
            }

            if (this.order_all[i].status === 3 && this.order_all[i].comment !== null) {
              this.order_finished.push(this.order_all[i]);
              console.log(2);
            }

            console.log(this.order_all[i]);
          }

          this.order_all_paging = [];
          this.current_page_all = 1;
          if(this.order_all) {
            for(let i = 0; i < this.order_all.length&&i<5; i++) {
              this.order_all_paging.push(this.order_all[i]);
            }
          }
          this.order_unpaid_paging = [];
          this.current_page_unpaid = 1;
          if(this.order_unpaid) {
            for(let i = 0; i < this.order_unpaid.length&&i<5; i++) {
              this.order_unpaid_paging.push(this.order_unpaid[i]);
            }
          }

          this.order_handling_paging = [];
          this.current_page_handling = 1;
          if(this.order_handling) {
            for(let i = 0; i < this.order_handling.length&&i<5; i++) {
              this.order_handling_paging.push(this.order_handling[i]);
            }
          }

          this.order_uncommented_paging = [];
          this.current_page_uncommented = 1;
          if(this.order_uncommented) {
            for(let i = 0; i < this.order_uncommented.length&&i<5; i++) {
              this.order_uncommented_paging.push(this.order_uncommented[i]);
            }
          }

          this.order_finished_paging = [];
          this.current_page_finished = 1;
          if(this.order_finished) {
            for(let i = 0; i < this.order_finished.length&&i<5; i++) {
              this.order_finished_paging.push(this.order_finished[i]);
            }
          }

          this.$message ({
            showClose: true,
            type: "success",
            message: '评价成功',
          });

          //this.dialogVisible3 = false;

        }
        else {
          this.$message.error('评价失败');
          //this.dialogVisible3 = false;
        }

      }).catch(err => {
        console.log(err);
      })
    },

    submit_complain(){

      let send_data = {
        uid: this.complainForm.uid,
        tid: this.complainForm.tid,
        contents: this.complainForm.content,
        pictures: this.complainForm.img,
      };
      console.log(send_data);

      if(send_data.contents === '' || send_data.contents === null) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请输入信息',
        });
        return;
      }
      if(send_data.pictures === '' || send_data.pictures === null) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请选择图片',
        });
        return;
      }


      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/complaint/submit_complaint/",
        data: qs.stringify(send_data),
      }).then(res => {
        console.log(res.data);
        if(res.data.errno === 0) {
          this.$message ({
            showClose: true,
            type: "success",
            message: '提交成功',
          });
        }
        else {
          this.$message.error('提交失败')
        }
        this.dialogVisible4 = false;
        this.imageUrl2 = '';
        this.complainForm.content = '';
        this.complainForm.img = '';
      }).catch(err => {
        console.log(err);
      })

    },

    submit_ticket() {

      let send_data = {
        uid: this.ticketForm.uid,
        hid: this.ticketForm.hid,
        info: this.ticketForm.info,
        pictures: this.ticketForm.img,
      };
      console.log(send_data);

      if(send_data.info === '' || send_data.info === null) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请输入信息',
        });
        return;
      }
      if(send_data.pictures === '' || send_data.pictures === null) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请选择图片',
        });
        return;
      }


      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/tickets/submit_ticket/",
        data: qs.stringify(send_data),
      }).then(res => {
        console.log(res.data);
        if(res.data.errno === 0) {
          this.$message ({
            showClose: true,
            type: "success",
            message: '提交成功',
          });
        }
        else {
          this.$message.error('提交失败')
        }
        this.dialogVisible2 = false;
        this.imageUrl = '';
        this.ticketForm.info = '';
        this.ticketForm.img = '';
      }).catch(err => {
        console.log(err);
      })
    },
    fill_order_valid() {
      this.order_valid = [];
      for(let i = 0; i < this.order_all.length; i++) {
        if(this.order_all[i].valid === 1) {
          this.order_valid[i].push(this.order_all[i]);
        }
      }
      console.log(this.order_valid);


    },
    storeOrder(order_id) {
      this.order_id_to_pay = order_id;
    },
    payOrder(order_id) {
      let formData = {
        oid: order_id,
        uid: this.$store.state.userInfo.id,
      }
      console.log(formData);
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/order/pay/",
        data: qs.stringify(formData),
      }).then(res => {
        console.log(res.data);
        let tmp = res.data;
        if(tmp.error === 0) {
          //this.getOrders();

          for(let i = 0; i < this.order_all.length; i++) {
            if(this.order_all[i].oid === formData.oid) {
              this.order_all[i].paid = 1;
              break;
            }
          }

          this.order_unpaid = [];
          this.order_handling = [];
          this.order_uncommented = [];
          this.order_finished = [];

          for(let i = 0; i < this.order_all.length; i++) {
            let tmp = this.order_all[i];
            if (tmp.paid === 0 && (tmp.status === 0 || tmp.status === 1)) {
              this.order_unpaid.push(tmp);
            } else if (tmp.paid === 1 && tmp.status === 1) {
              this.order_finished.push(tmp);
            } else if (tmp.status == 1 && tmp.paid === 1 && tmp.valid === 1){
              this.order_valid.push(tmp);
            }
          }
          this.order_all_paging = [];
          this.current_page_all = 1;
          if(this.order_all) {
            for(let i = 0; i < this.order_all.length&&i<5; i++) {
              this.order_all_paging.push(this.order_all[i]);
            }
          }
          this.order_unpaid_paging = [];
          this.current_page_unpaid = 1;
          if(this.order_unpaid) {
            for(let i = 0; i < this.order_unpaid.length&&i<5; i++) {
              this.order_unpaid_paging.push(this.order_unpaid[i]);
            }
          }
          this.order_finished_paging = [];
          this.current_page_finished = 1;
          if(this.order_finished) {
            for(let i = 0; i < this.order_finished.length&&i<5; i++) {
              this.order_finished_paging.push(this.order_finished[i]);
            }
          }
          this.order_valid_paging = [];
          this.current_page_valid = 1;
          if(this.order_valid) {
            for(let i = 0; i < this.order_valid.length&&i<5; i++) {
              this.order_valid_paging.push(this.order_valid[i]);
            }
          }


          this.$message ({
            showClose: true,
            type: "success",
            message: '支付成功',
          });
        }
        else {
          this.$message.error('支付失败');
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    getData(oid, hid) {
      console.log(this.order_data);
      for(let i = 0; i < this.order_all.length; i++) {
        if(this.order_all[i].oid === oid) {
          this.order_data = this.order_all[i];
          break;
        }
      }
      console.log(this.order_data);
      let url = "http://127.0.0.1:8000/browse_house/get_house/?hid="+hid;
      axios({
        method: 'get',
        url: url,
      }).then(res => {
        let house = res.data;
        console.log(house);
        this.house_data = house;
      }).catch(err => {
        console.log(err);
      });
      this.loading = false;
    },
    deleteOrder(order_id) {
      let formData = {
        oid: order_id,
        uid: this.$store.state.userInfo.id,
      }
      console.log(formData);
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/order/delete/",
        data: qs.stringify(formData),
      }).then(res => {
        this.$message ({
          showClose: true,
          type: "success",
          message: '删除成功',
        });
        console.log(res.data);
        let tmp = res.data;
        if(tmp.error === 0) {
          //this.getOrders();

          for(let i = 0; i < this.order_all.length; i++) {
            if(this.order_all[i].oid === formData.oid) {
              this.order_all.splice(i, 1);
              break;
            }
          }

          this.order_unpaid = [];
          this.order_finished = [];
          this.order_valid = []
          for(let i = 0; i < this.order_all.length; i++) {
            let tmp = this.order_all[i];
            if (tmp.paid === 0 && (tmp.status === 0 || tmp.status === 1)) {
              this.order_unpaid.push(tmp);
            } else if (tmp.paid === 1 && tmp.status === 1) {
              this.order_finished.push(tmp);
            } else if (tmp.status == 1 && tmp.paid === 1 && tmp.valid === 1){
              this.order_valid.push(tmp);
            }
          }
          this.order_all_paging = [];
          this.current_page_all = 1;
          if(this.order_all) {
            for(let i = 0; i < this.order_all.length&&i<5; i++) {
              this.order_all_paging.push(this.order_all[i]);
            }
          }
          this.order_unpaid_paging = [];
          this.current_page_unpaid = 1;
          if(this.order_unpaid) {
            for(let i = 0; i < this.order_unpaid.length&&i<5; i++) {
              this.order_unpaid_paging.push(this.order_unpaid[i]);
            }
          }
          this.order_finished_paging = [];
          this.current_page_finished = 1;
          if(this.order_finished) {
            for(let i = 0; i < this.order_finished.length&&i<5; i++) {
              this.order_finished_paging.push(this.order_finished[i]);
            }
          }
          this.order_valid_paging = [];
          this.current_page_valid = 1;
          if(this.order_valid) {
            for(let i = 0; i < this.order_valid.length&&i<5; i++) {
              this.order_valid_paging.push(this.order_valid[i]);
            }
          }


        }
        else {
          this.$message.error('删除失败');
        }
      })
    },
    handleScroll()
    {
      let self = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 82) {
        self.needFixed = true;
      } else {
        self.needFixed = false;
      }
    },
    getOrders() {
      this.loading = true;
      let formData = {
        'uid': this.$store.state.userInfo.id,
      };
      let uid = formData.uid;
      console.log(formData);
      let Url = "http://127.0.0.1:8000/complaint/get_complaints/"
      this.$axios({
        method: 'post',
        url: Url,
        data: qs.stringify(formData)
      })
          .then(res => {
            console.log(res.data);
            //console.log(Object.prototype.toString.call(res.data[0]));
            /*
            let result = JSON.parse(res.data);
            this.$store.state.order_all = result;
            this.$store.state.order_all_count = result;

            this.order_all=result;
            this.order_all_count = result;

             */

            this.$store.state.order_all = res.data;
            this.$store.state.order_all_count = res.data.length;

            this.order_all=res.data;
            this.order_all_count = res.data.length;

            this.order_uncommented = [];
            this.order_finished = [];

            for(let i = 0; i < this.order_all.length; i++) {
              let tmp = this.order_all[i];
              let hid = tmp.hid;
              let url = "http://127.0.0.1:8000/complaint/get_complaints/";
              axios({
                method: 'get',
                url: url,
              }).then(res => {
                let house = res.data;
                //console.log(house);
                //this.order_all[i]['valid'] = 0;
                this.order_all[i]['end_time'] = this.order_all[i]['start_time'];
                this.order_all[i]['h_location'] = house.location;
                this.order_all[i]['h_short_price'] = house.short_price;
                this.order_all[i]['h_long_price'] = house.long_price;
                this.order_all[i]['h_type'] = house.type;
                this.order_all[i]['h_area'] = house.area;


                let t;
                let date = new Date();
                //console.log(date);

                t = this.order_all[i]['order_time'];

                this.order_all[i]['order_time'] = this.Time2String(t);

                t = this.order_all[i]['start_time'];
                this.order_all[i]['start_time'] = this.Date2String(t);
                //console.log(this.order_all[i]['start_time']);

                t = this.order_all[i]['end_time'];
                if(this.order_all[i].type === 0) { //短租
                  this.order_all[i]['end_time'] = this.DateCal(t, this.order_all[i].duration);
                }
                if(this.order_all[i].type === 1) { //短租
                  this.order_all[i]['end_time'] = this.MonthCal(t, this.order_all[i].duration);
                }
                //console.log(this.order_all[i]['end_time']);

                let sign1 = this.DateCompare(this.Date2String(date), this.Date2String(this.order_all[i]['start_time']));
                let sign2 = this.DateCompare(this.Date2String(date), this.Date2String(this.order_all[i]['end_time']));

                let sign = sign1 & sign2;
                //console.log(sign1,sign2,2);

                //this.fun(sign1, sign2, this.callbackFunction);


                if(sign1 < 0) {
                  this.order_all[i].valid = 0;
                }

                else if (sign2 > 0){
                  this.order_all[i].valid = 2;
                }

                else {
                  this.order_all[i].valid = 1;
                }


                //console.log(this.order_all[i].valid === undefined,'a');
                //console.log(this.order_all[i].oid,this.order_all[i].valid,this.order_all[i].status,this.order_all[i].paid,'a');

              }).catch(err => {
                //console.log(err);
              });
              //console.log(this.order_all[i]);

              //console.log(this.order_all[i].valid === undefined,'b');
              //console.log(this.order_all[i].oid,this.order_all[i].valid,this.order_all[i].status,this.order_all[i].paid,'b');


              //console.log(this.order_all[i].start_time);
              //console.log(this.order_all[i].end_time);

              //待回复
              if (this.order_all[i].reply === null || this.order_all[i].reply === '') {
                this.order_unpaid.push(this.order_all[i]);
                console.log(1);
              }

              //已回复
              if(this.order_all[i].reply !== null && this.order_all[i].reply !== '') {
                this.order_finished.push(this.order_all[i]);
              }

              console.log(this.order_all[i]);

            }
            this.order_all_paging = [];
            this.current_page_all = 1;
            if(this.order_all) {
              for(let i = 0; i < this.order_all.length&&i<5; i++) {
                this.order_all_paging.push(this.order_all[i]);
              }
            }
            this.order_unpaid_paging = [];
            this.current_page_unpaid = 1;
            if(this.order_unpaid) {
              for(let i = 0; i < this.order_unpaid.length&&i<5; i++) {
                this.order_unpaid_paging.push(this.order_unpaid[i]);
              }
            }

            this.order_finished_paging = [];
            this.current_page_finished = 1;
            if(this.order_finished) {
              for(let i = 0; i < this.order_finished.length&&i<5; i++) {
                this.order_finished_paging.push(this.order_finished[i]);
              }
            }

          })
          .catch(err => {
            console.log(err);
          })
      this.loading = false;
    },
    fun(sign1,sign2,callback) {
      var sign = 0;
      if(sign1 < 0) {
        this.order_all[i].valid = 0;
      }

      else if (sign2 > 0){
        this.order_all[i].valid = 2;
      }

      else {
        this.order_all[i].valid = 1;
      }

      callback(this.order_all[i].valid);
      //return sign;
    },
    callbackFunction(flag) {
      alert(flag);
    },
    cancelOrder(order_id) {
      let formData = {
        oid: order_id,
        uid: this.$store.state.userInfo.id,
      }
      console.log(formData);
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/order/cancel/",
        data: qs.stringify(formData),
      }).then(res => {
        console.log(res.data);
        let tmp = res.data;
        if(tmp.error === 0) {
          //this.getOrders();

          for(let i = 0; i < this.order_all.length; i++) {
            if(this.order_all[i].oid === formData.oid) {
              this.order_all[i].status = 2;
              this.order_all[i].paid = 2;
              break;
            }
          }

          this.order_unpaid = [];
          this.order_finished = [];
          this.order_valid = []
          for(let i = 0; i < this.order_all.length; i++) {
            let tmp = this.order_all[i];
            if (tmp.paid === 0 && (tmp.status === 0 || tmp.status === 1)) {
              this.order_unpaid.push(tmp);
            } else if (tmp.paid === 1 && tmp.status === 1) {
              this.order_finished.push(tmp);
            } else if (tmp.status == 1 && tmp.paid === 1 && tmp.valid === 1){
              this.order_valid.push(tmp);
            }
          }
          this.order_all_paging = [];
          this.current_page_all = 1;
          if(this.order_all) {
            for(let i = 0; i < this.order_all.length&&i<5; i++) {
              this.order_all_paging.push(this.order_all[i]);
            }
          }
          this.order_unpaid_paging = [];
          this.current_page_unpaid = 1;
          if(this.order_unpaid) {
            for(let i = 0; i < this.order_unpaid.length&&i<5; i++) {
              this.order_unpaid_paging.push(this.order_unpaid[i]);
            }
          }
          this.order_finished_paging = [];
          this.current_page_finished = 1;
          if(this.order_finished) {
            for(let i = 0; i < this.order_finished.length&&i<5; i++) {
              this.order_finished_paging.push(this.order_finished[i]);
            }
          }
          this.order_valid_paging = [];
          this.current_page_valid = 1;
          if(this.order_valid) {
            for(let i = 0; i < this.order_valid.length&&i<5; i++) {
              this.order_valid_paging.push(this.order_valid[i]);
            }
          }


          this.$message ({
            showClose: true,
            type: "success",
            message: '取消成功',
          });
        }
        else {
          this.$message.error("取消失败");
        }
      })

    },
    DateCompare(date1, date2) {
      var d1 = new Date(this.Date2String(date1));
      var d2 = new Date(this.Date2String(date2));

      //var d1 = date1;
      //var d2 = date2;

      //console.log(Object.prototype.toString.call(d1));
      //console.log(Object.prototype.toString.call(d2));

      //console.log(d1);
      //console.log(d2);
      var y1 = d1.getFullYear();
      var y2 = d2.getFullYear();
      var m1 = d1.getMonth();
      var m2 = d2.getMonth();
      var day1 = d1.getDate();
      var day2 = d2.getDate();
      //console.log('2022-06-06'>'2022-06-07');
      //console.log(y1,m1,day1);
      //console.log(y2,m2,day2);

      //console.log(1);
      if(y1 > y2) return 1
      if(y1 === y2 && m1 > m2) return 1;
      if(y1 === y2 && m1 === m2 && day1 > day2) return 1;
      if(y1 === y2 && m1 === m2 && day1 === day2) return 0;
      return -1;
    },
    Time2String (date_to_convert) {
      var date=new Date(Date.parse(date_to_convert));
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h=h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second=date.getSeconds();
      second=second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
    Date2String(date_to_convert) {
      var date=new Date(Date.parse(date_to_convert));
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    MonthCal(date_to_convert, month_num) {
      var date=new Date(Date.parse(date_to_convert));
      date.setMonth(date.getMonth()+month_num);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    DateCal(date_to_convert, date_num) {
      var date=new Date(Date.parse(date_to_convert));
      //console.log(1,date);
      date.setDate(date.getDate()+date_num);
      //console.log(2,date);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    handOrder(cart) {
      this.$store.state.handOrderCartInfo = cart;
      this.$router.push('/handOrder');
    },
    order_all_change_page(new_page) {
      console.log(new_page);
      this.order_all_paging = [];
      this.current_page_all = new_page;
      for(let i = 5*(new_page-1); i < this.order_all.length && i < 5*new_page; i++) {
        this.order_all_paging.push(this.order_all[i]);
      }
      console.log(this.order_all_paging);
    },
    order_unpaid_change_page(new_page) {
      this.order_unpaid_paging = [];
      this.current_page_unpaid = new_page;
      for(let i = 5*(new_page-1); i < this.order_unpaid.length && i < 5*new_page; i++) {
        this.order_unpaid_paging.push(this.order_unpaid[i]);
      }
    },
    order_finished_change_page(new_page) {
      this.order_finished_paging = [];
      this.current_page_finished = new_page;
      for(let i = 5*(new_page-1); i < this.order_finished.length && i < 5*new_page; i++) {
        this.order_finished_paging.push(this.order_finished[i]);
      }
    },
    order_handling_change_page(new_page) {
      this.order_handling_paging = [];
      this.current_page_handling = new_page;
      for(let i = 5*(new_page-1); i < this.order_handling.length && i < 5*new_page; i++) {
        this.order_handling_paging.push(this.order_handling[i]);
      }
    },
    order_uncommented_change_page(new_page) {
      this.order_uncommented_paging = [];
      this.current_page_uncommented = new_page;
      for(let i = 5*(new_page-1); i < this.order_uncommented.length && i < 5*new_page; i++) {
        this.order_uncommented_paging.push(this.order_uncommented[i]);
      }
    },
    getUser(uid) {
      let self = this;
      if(self.$store.state.userInfo.id === undefined || self.$store.state.userInfo.id === '') {
        let msg = this.$message.error("尚未登录，3秒后跳转至首页");
        setTimeout(()=>{
          this.$router.push({
            path:'/'
          });
          msg.close();
        }, 3000);
      }
      else {
        self.$axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/browse_house/get_user/',
          params: uid,
        })
            .then(res =>{
              self.user = res.data;
              self.user['uid'] = uid.uid;
              console.log(self.user);
            })
            .catch(err=>{
              console.log(err);
            })
      }

    },
    logOut() {
      this.$store.commit('logout');
      this.$message.success("退出成功，3秒后将回到主页");
      setTimeout(()=>{
        this.$router.push({path:'/'});
      }, 3000);
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    this.getOrders();
    this.getUser(this.$store.state.userInfo.id);
  }
}
</script>

<style lang="css" scoped src="../assets/css/shortcut.css">

</style>

<style scoped>
.img1 {
  position: relative;
  width: 50%;
  left: 25%;
}
.card-item {
  margin-bottom: 3px;
}

.ticket_img {
  height: 20%;
  width: 20%;
}
.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {

  background: #e5e9f2;
}
.grid-content {

  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.house-item {
  height: 200px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.house-image {

  height: 180px;
  width: 210px;
  display: inline-block;
  position: relative;
  left: 10px;
  top: 10px;
}

.show_img {
  width: 50%;
  position: relative;
  left: 25%;
}

.image {
  height: 100%;
  width: 100%;
}

.house-dsc {

  height: 180px;
  width: 500px;
  display: inline-block;
  position: relative;
  top: -90px;
  left: 20px;
}

.house-info {

  height: 180px;
  width: 300px;
  display: inline-block;
  position: relative;
  left: 30px;
}

.op_button {

  height: 180px;
  width: 200px;
  display: inline-block;
  position: relative;
  top: -110px;
  left: 40px;
}

.breadcrumb {
  position: relative;
  top: 25px
}

.divider {
  position: relative;
  top: 25px
}

.order_tabs {
  position: relative;
  top: 20px
}

#info-nav {
  height: 82px;
  background-color: #fff;
  color: #333;
}

#info-nav .logo {
  float: left;
}

#info-nav .logo a {
  display: block;
  width: 158px;
  height: 82px;
  background: url("../assets/logo.png") no-repeat 0 0 ;
}

#info-nav a {
  color:#333;
}

#info-nav .title {
  float: left;
  padding: 40px 0 0 16px;
  font-size: 20px;
  color: #000;
}

.w {
  width: 1190px;
  margin: auto;
}

#info-nav .w{
  background-color: #fff;
}

#info-nav .nav-items {
  display: flex;
  margin-left: 70px;
  float: left;
  padding: 40px 0 0 25px;
  width: 300px;
  color: #333;
}

#info-nav .nav-items .dte {
  padding-right: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
}

#info-nav a:hover {
  color:#e1251b;
}


#info-nav .info-nav-r #info-nav-search{
  width: 210px;
  float: right;
  margin-top: 32px;
}

#info-nav .info-nav-r #info-nav-search .form {
  width:210px;
  height: 36px;
  padding-top: 8px;
}

#info-nav-search .text {
  margin:auto;
  width: 140px;
  border-color: #666666;
  height: 24px;
  float: left;
  line-height: 24px;
  padding: 4px;
  border-width: 2px 0 2px 2px;
  border-style: solid;
  font-size: 14px;
}

#info-nav-search .button {
  width: 60px;
  background: #666666;
  font-size: 14px;
  color: #fff;
  float: left;
  height: 36px;
  border: none;
  cursor:pointer;
}

#info-nav-search .button:hover {
  background: #000;
}

.container {
  width: 100%;
  padding-bottom: 50px;
  background-color: #f4f4f4;
  min-height: 1000px;
}

.sub {
  width: 190px;
  float: left;
}

.container .menu {
  width: 170px;
  background-color: #fff;
  color: #333;
}

.container .menu dl {
  padding:15px 20px;
  border-bottom: 1px solid #f3f3f3;
}

.container .menu dt {
  font-size: 16px;
  font-weight: 700;
  line-height: 32px;
}

.container .menu dd {
  font-size: 14px;
  line-height: 32px;
}

.container .menu a:hover {
  color:#e1251b;
}

.container .menu a {
  color: #333;
}

a {
  text-decoration: none;
}

.container .main {
  float: left;
  width: 1000px;

}

.container .box {
  padding: 20px 0;
  height: 243px;
}

.user-box {
  float:left;
  margin-bottom: 0;
  width: 250px;
  height: 243px;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 30%);
  overflow: hidden;
  zoom: 1;
}

.user-main {
  background-color: #f4ca3a;
  position: relative;
  height: 187px;
  text-align: center;
  overflow: hidden;
  zoom: 1;
}

.avatar {
  width: 64px;
  height: 64px;
  display: block;
  position: relative;
  z-index: 2;
  margin: 20px auto;
  border-radius: 100%;
  border:4px solid #fff;
  box-shadow: 3px 2px 10px rgb(79 5 1 / 84%);
  overflow: hidden;
  background-color: #f4f4f4;
}

.user {
  display: inline-block;
  margin-bottom: 10px;
  height: 20px;
  overflow: hidden;
}

.user-name {
  margin: auto;
  text-align: center;
  font: 700 18px/20px Arial;
  color: #232331;
}

.tags a, .tags span{
  padding: 0 10px;
  color: #232331;
  border: 1px solid #000;
  display: inline-block;
  margin: 0 5px;
  height: 22px;
  line-height: 22px;
  border-radius: 12px;
  cursor: pointer;
}

.tags a:hover, .tags span:hover{
  background-color: #fff;
}

.user-bottom {
  height: 36px;
  text-align: center;
  background-color: #232331;
  padding: 10px 20px;
  overflow: hidden;
  zoom: 1;
}

.user-bottom .text {
  float: left;
  margin:auto;
  text-align: center;
  color: #f4ca3a;
}

.user-bottom .text span {
  line-height: 36px;
  margin-left: 18px;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 700;
  display: inline-block;
}

.user-bottom .button {
  float:right;
  padding: 0 10px;
  margin-top: 5px;
  height: 26px;
  line-height: 26px;
  border-radius: 14px;
  background-color: #f4ca3a;
  color: #232331;
  font-weight: 700;
  text-align: center;
}

.user-bottom .button:hover{
  background-color: #fff;
}

.my-block {
  background-color: #fff;
  margin-bottom: 20px;
}

.my-cart {
  margin: 9px 0 9px 250px;
  overflow: visible;
}

.my-block .mt {
  padding: 0 20px;
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid #f0f3ef;
  overflow: visible;
}

.my-block h3 {
  font-size: 18px;
  font-weight: 600;
}

.mc {
  overflow: hidden;
}

.my-cart .mc ul {
  display: flex;
  padding: 20px;
  height: 129px;
}

.my-cart .mc li {
  position: relative;
  width: 100px;
  height: 129px;
  margin: 0 10px 10px;
  border: none;
}

.my-block .mc a {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.my-block .mc a:hover {
  box-shadow: 2px 2px 10px rgb(0 0 0 / 30%);
}

.my-cart .mc img {
  width: 80px;
  height: 80px;
  margin: 10px;
}

.my-cart .mc .more {
  width: 40px;
  height: 40px;
  margin: 30px;
}

.my-cart .mc span {
  top: 0;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  margin: 0 5px 0 5px;
  color: #666;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.my-block .nav{
  padding: 15px 20px;
  height: 90px;
}

.my-block .nav ul {
  display: flex;
  padding: 5px 20px 5px 20px;
  height: 80px;
}

.my-block .nav li {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 20px 0 20px;
  border: none;
}

.my-block .nav img {
  width: 40px;
  height: 40px;
  margin: 10px 20px 5px 20px;
}

.my-block .nav span {
  height: 24px;
  line-height: 24px;
  text-align: center;
  position: relative;
  display: block;
}

.box-left {
  float: left;
  width: 694px;
}

.box-right {
  float: none;
  margin-left: 714px;
  width: 286px;
}

.my-rec ul {
  display: block;
  padding: 10px;
}

.my-rec li {
  float: left;
  position: relative;
  width: 100px;
  height: 100px;
  margin: 5px 10px;
  border: none;
}

.my-rec img {
  width: 60px;
  height: 60px;
  margin: 5px 20px;
}

.my-rec span {
  top: 0;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  margin: 0 5px 0 5px;
  color: #666;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>