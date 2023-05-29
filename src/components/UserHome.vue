<!--template表示用模板，模板里面就是组件的构成-->
<template>
  <div>
    <!--//div里面是负责数据展示的组件，分为3块:表单、表格、分页三个插件-->
    <!--//表单插件，不难，主要是不熟，就是加了个el前缀-->
    <!--//inline:true表示在一行中出现，不然是垂直的，默认垂直-->
    <!--//model：数据域，钩子函数、数据域中有对应-->
    <!--//el-form-item与el-input是一组，el-input是输入框，-->
    <!--//v-model：双向绑定，视图变了，数据变，数据变了视图变,就是能将页面上控件输入的值同步更新到相关绑定的data属性，也会在更新data绑定属性时候，更新页面上输入控件的值。分页函数，和获取用户数量那块进行绑定的-->
    <!--//placeholder:文本框中出现的提示文字，如果你输入文字了，就没有了-->
    <!--//v-on:input：如果有内容输入，直接调用handleSearch这个方法-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.search1" size="mini" placeholder="输入姓名查询" v-on:input="handleSearch()">
        </el-input>
      </el-form-item>
      <!--//下拉列表框-->
      <!--//v-on:change:发生变化，直接调用handleSearch方法-->
      <el-form-item>
        <el-select size="mini" v-model="formInline.search2" v-on:change="handleSearch()">
          <el-option label="请选择性别" value=""></el-option>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
        <!--//查询-->
        <!--//el-button按钮-->
        <!--//icon:图标-->
        <!--//type:类型是文本，展示为文本方式-->
        <!--//@click单击，search = true进行查询，要不要都不影响，因为上面两个有变化直接调用handleSearch()-->
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-circle-plus-outline" type="text" @click="search = true">查询</el-button>
      </el-form-item>
      <!--//dialogAdd = true:单击的话，显示增加对话框-->
      <el-form-item>
        <!--dialogAdd：显示增加对话框-->
        <el-button icon="el-icon-circle-plus-outline" type="text" @click="dialogAdd = true">添加</el-button>
      </el-form-item>
      <!--//handleDeleteList:根据表格中复选框进行批量删除-->
      <el-form-item>
        <el-button icon="el-icon-delete" type="text" @click="handleDeleteList()">删除</el-button>
      </el-form-item>
    </el-form>
    <!--//表格-->
    <!--//表格的数据域叫tableData-->
    <!--//border:带边框-->
    <!--//highlight-current-row:鼠标移动到当前行，会显示高亮-->
    <!--//style:样式，撑满整个浏览器-->
    <!--//@selection-change="handleSelectionDelete":支持批量删除-->
    <!--//一个el-table-column就是一列-->
    <!--//type="selection"：列中有复选框-->
    <!--//用户编号里的数据是从scope.row.userId数据域取的，全是实体类中的属性，scope.row就代表一行-->
    <!--//prop:属性，读取实体类的这些属性，用于展示-->
    <!--//el-popover：用户姓名悬停在上面，显示一些信息，在右侧-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionDelete">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="用户编号">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件类型" prop="cardType"></el-table-column>
      <el-table-column label="证件号码" prop="cardNo"></el-table-column>
      <el-table-column label="用户姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>证件类型: {{ scope.row.cardType }}</p>
            <p>证件号码: {{ scope.row.cardNo }}</p>
            <p>用户姓名：{{ scope.row.userName }}</p>
            <p>用户性别: {{ scope.row.userSex }}</p>
            <p>用户年龄: {{ scope.row.userAge }}</p>
            <p>用户角色：{{ scope.row.userRole }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button type="text">{{ scope.row.userName }}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="用户性别" prop="userSex"></el-table-column>
      <el-table-column label="用户年龄" prop="userAge"></el-table-column>
      <el-table-column label="用户角色" prop="userRole"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--
          scope.$index：行的下标
          scope.row：这一行的数据
          -->
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加的对话框
    :visible.sync：允许异步访问，名字为dialogAdd
    -->
    <el-dialog title="添加" :append-to-body='true' :visible.sync="dialogAdd" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" size="medium">
        <el-form-item label="证件类型">
          <el-select v-model="ruleForm.cardType" placeholder="请选择证件类型" prop="cardType">
            <el-option label="身份证" value="身份证"></el-option>
            <el-option label="军官证" value="军官证"></el-option>
            <el-option label="护照" value="护照"></el-option>
            <el-option label="港澳居民通行证" value="港澳居民通行证"></el-option>
            <el-option label="台湾往来大陆通行证" value="台湾往来大陆通行证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="ruleForm.cardNo"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="ruleForm.userSex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户年龄">
          <el-slider v-model="ruleForm.userAge" show-input></el-slider>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="ruleForm.userRole" placeholder="请选择用户角色" prop="userRole">
            <el-option label="国家机关、党群组织、企业、事业单位负责人" value="国家机关、党群组织、企业、事业单位负责人"></el-option>
            <el-option label="专业技术人员" value="专业技术人员"></el-option>
            <el-option label="办事人员和有关人员" value="办事人员和有关人员"></el-option>
            <el-option label="商业、服务业人员" value="商业、服务业人员"></el-option>
            <el-option label="农、林、牧、渔、水利业生产人员" value="农、林、牧、渔、水利业生产人员"></el-option>
            <el-option label="生产、运输设备操作人员及有关人员" value="生产、运输设备操作人员及有关人员"></el-option>
            <el-option label="军人" value="军人"></el-option>
            <el-option label="不便分类的其他从业人员" value="不便分类的其他从业人员"></el-option>
            <el-option label="未知" value="未知"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="emptyUserData()" size="medium">取 消</el-button>
        <!--ruleForm：整个表单，将整个表单作为参数传过去-->
          <el-button @click="addUser('ruleForm')" type="primary" size="medium">确 定</el-button>
</span>
    </el-dialog>
    <!--编辑对话框
    -->
    <el-dialog title="编辑" :append-to-body='true' :visible.sync="dialogUpdate" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
        <el-form-item label="证件类型">
          <el-select v-model="ruleForm.cardType" placeholder="请选择证件类型" prop="cardType">
            <el-option label="身份证" value="身份证"></el-option>
            <el-option label="军官证" value="军官证"></el-option>
            <el-option label="护照" value="护照"></el-option>
            <el-option label="港澳居民通行证" value="港澳居民通行证"></el-option>
            <el-option label="台湾往来大陆通行证" value="台湾往来大陆通行证"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="ruleForm.cardNo"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="ruleForm.userSex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户年龄">
          <el-slider v-model="ruleForm.userAge" show-input></el-slider>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="ruleForm.userRole" placeholder="请选择用户角色" prop="userRole">
            <el-option label="国家机关、党群组织、企业、事业单位负责人" value="国家机关、党群组织、企业、事业单位负责人"></el-option>
            <el-option label="专业技术人员" value="专业技术人员"></el-option>
            <el-option label="办事人员和有关人员" value="办事人员和有关人员"></el-option>
            <el-option label="商业、服务业人员" value="商业、服务业人员"></el-option>
            <el-option label="农、林、牧、渔、水利业生产人员" value="农、林、牧、渔、水利业生产人员"></el-option>
            <el-option label="生产、运输设备操作人员及有关人员" value="生产、运输设备操作人员及有关人员"></el-option>
            <el-option label="军人" value="军人"></el-option>
            <el-option label="不便分类的其他从业人员" value="不便分类的其他从业人员"></el-option>
            <el-option label="未知" value="未知"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"><el-button @click="emptyUserData()" size="medium">取 消</el-button>        <el-button
        @click="updateUser()" type="primary" size="medium">确 定</el-button>
    </span>
    </el-dialog>

    <br>
    <!--//分页插件-->
    <!--//total就是总行数-->
    <!--
    background:点击完谁，就有背景色
    :disabled：允许进行分页处理
    :current-page.sync：允许进行异步分页请求
    small:显示的风格
    prev, pager, next，显示的风格：前一个按钮，页码按钮，后一页按钮
    :page-size：每页显示几条
    :total：总行数
    @current-change：分页插件改变时，调用这个方法，点一下页码，就进行一次分页函数的调用
    -->
    <el-pagination
      background
      :disabled="disablePage"
      :current-page.sync="currentPage"
      small
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>

<script>/* eslint-disable */
  export default {
    name: 'UserHome',//vue组件名
    data() {//数据域
      return {
        ruleForm: {//增加或更新的弹框
          userId: null,//用户id
          cardType: null,//证件类型
          cardNo: null,//证件号码
          userName: null,//用户姓名
          userSex: null,//用户性别
          userAge: 25,//用户年龄
          userRole: null//用户角色
        },
        rules: {},
        tableData: [],
        formInline: {//姓名和姓别
          search1: '',
          search2: ''
        },
        dialogAdd: false,//不显示
        dialogUpdate: false,//不显示
        pageSize: 5,//一页行数
        currentPage: 1,//当前页
        total: 0,//分页插件的总数
        disablePage: false,
        multipleSelection: []  //允许多选
      };
    },
//钩子函数，很出名的，这个组件一打开的时候调用
    created() {
      this.handlePageChange();
      this.getRowCount();
    },
//方法域
    methods: {
      /**
       * 分页
       */
      handlePageChange() {
        //let用于创建变量，es6新语法，作用域比var小
        //stringify：调用stringify方法进行数据转json对象，转完后postData变成：{"page":1,"userName":"","userSex":""}
        let postData = this.qs.stringify({
          page: this.currentPage,//调用上面数据域里面的currentPage
          userName: this.formInline.search1,//用户名文本框的值
          userSex: this.formInline.search2//性别文本框里的值
        });
        //$axios跨域访问，完全类似jquery中ajax的方法
        this.$axios({
          method: 'post',//数据提交方式
          url: '/api/user/selectUserPage', //服务器地址
          data: postData  //提交的数据，也是json格式
        }).then(response => {      //then就如同success:function(){}
          //response就是服务器响应的数据
          this.tableData = response.data;//this.tableData:表格中的数据，将服务器返回的json数据response.data给到表格，这里可以体现elementUI的强悍
        }).catch(error => {
          console.log(error);
        })
      },

      /**
       * 统计用户个数
       */
      getRowCount() {//构建json对象
        let postData = this.qs.stringify({
          userName: this.formInline.search1,//名称必须和后台参数名一致，才能注入
          userSex: this.formInline.search2
        });//ajax跨域访问
        this.$axios({
          method: 'post',
          url: '/api/user/getRowCount',
          data: postData
        }).then(response => {//服务器返回的总行数返回给分页插件使用total
          this.total = response.data;
        }).catch(error => { //相当于error:function(){}
          console.log(error);
        })
      },

      /**
       * 添加用户
       */
      addUser() {
        //任意一个信息为空，都会提示信息不完善
        if (this.ruleForm.cardType == null || this.ruleForm.cardNo == null || this.ruleForm.userName == null || this.ruleForm.userSex == null || this.ruleForm.userRole == null) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        //封装json格式的数据
        let postData = this.qs.stringify({
          cardType: this.ruleForm.cardType,//证件类型
          cardNo: this.ruleForm.cardNo,//证件号码
          userName: this.ruleForm.userName,//用户姓名
          userSex: this.ruleForm.userSex,//用户性别
          userAge: this.ruleForm.userAge,//用户年龄
          userRole: this.ruleForm.userRole,//用户角色
        });
        this.$axios({
          method: 'post',
          url: '/api/user/createUser',
          data: postData
        }).then(response => {
          this.handlePageChange();
          this.getRowCount();
          this.$message({//提示框
            type: 'success',
            message: '已添加!'
          });
          this.emptyUserData();
        }).catch(error => {
          console.log(error);
        })
      },
      search() {
        this.handlePageChange();
        this.getRowCount();
      },

      handleSearch() {
        this.handlePageChange();
        this.getRowCount();
      },
      //更新函数
      handleEdit(index, row) {
        this.dialogUpdate = true;//显示更新对话框
        row.userAge = Number(row.userAge); //数值强制转型
        this.ruleForm = Object.assign({}, row, index); //这句是关键！！！，用于在编辑表单上回显数据，打开了弹框，进行数据回填
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.emptyUserData();
          })
          .catch(_ => {
          });
      },

      /**
       * 清空绑定数据
       * 增加和修改，对话框虽然关闭了，数据域中的数据依旧在，所以要清空
       */
      emptyUserData() {
        this.dialogAdd = false;
        this.dialogUpdate = false;
        this.ruleForm = {
          userId: null,//用户id
          cardType: null,//证件类型
          cardNo: null,//证件号码
          userName: null,//用户姓名
          userSex: null,//用户性别
          userAge: 25,//用户年龄
          userRole: null//用户角色
        };
      },

      /**
       * 根据 userId 删除用户
       * @param index  删除行的下标
       * @param row    该行的数据
       */
      handleDelete(index, row) {
        //console.log(index, row);
        //$confirm：删除时候弹出的提示框
        //'删除操作, 是否继续?'是具体内容，'提示'是标题
        //type:提示类型，对应不同的图标
        this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',//确定按钮
          cancelButtonText: '取消',//取消按钮
          type: 'warning'
        }).then(() => {//确定时候走着一套
          let postData = this.qs.stringify({// 封装提交的数据，userId，转为json格式
            userId: row.userId,
          });
          this.$axios({//ajax跨域请求
            method: 'post',
            url: '/api/user/deleteUserById',
            data: postData
          }).then(response => {//删除成功
            this.getRowCount();//获得行数
            //分页插件的布局格式，不用关注，超过5也会有样式改变
            if (this.total % 5 == 1 && this.currentPage >= 1) {
              if (this.total / 5 < this.currentPage) {
                this.currentPage = this.currentPage - 1;
              }
            }
            this.handlePageChange();//获得表格数据

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //console.log(response);
          }).catch(error => {//删除出错
            console.log(error);
          });

        }).catch(() => {//取消的时候走这一套
          this.$message({
            type: 'info',//弹框类型为消息。消息内容为"已取消删除"
            message: '已取消删除'
          });
        });
      },

      handleSelectionDelete(val) {
        //允许多选
        this.multipleSelection = val;
      },

      /**
       * 根据 userId 批量删除用户
       */
      handleDeleteList() {
        let userIds = "";
        this.multipleSelection.forEach(item => {
          userIds += item.userId + ',';
        })
        console.log(userIds);
        // let userIds= this.multipleSelection.map(item => item.userId).join()

        this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let postData = this.qs.stringify({
            userIdList: userIds
          });
          console.log(postData);
          this.$axios({
            method: 'post',
            url: '/api/user/deleteUserByIdList',
            data: postData
          }).then(response => {
            this.getRowCount();
            if (this.total % 5 == 1 && this.currentPage >= 1) {
              if (this.total / 5 < this.currentPage) {
                this.currentPage = this.currentPage - 1;
              }
            }
            this.handlePageChange();

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //console.log(response);
          }).catch(error => {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },


      updateUser() {
        if (this.ruleForm.cardType == null || this.ruleForm.cardNo == null || this.ruleForm.userName == null || this.ruleForm.userSex == null || this.ruleForm.userRole == null) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          userId: this.ruleForm.userId,//用户 Id
          cardType: this.ruleForm.cardType,//证件类型
          cardNo: this.ruleForm.cardNo,//证件号码
          userName: this.ruleForm.userName,//用户姓名
          userSex: this.ruleForm.userSex,//用户性别
          userAge: this.ruleForm.userAge,//用户年龄
          userRole: this.ruleForm.userRole,//用户角色
        });
        this.$axios({
          method: 'post',
          url: '/api/user/updateUserById',
          data: postData
        }).then(response => {
          this.handlePageChange();
          this.getRowCount();
          this.$message({
            type: 'success',
            message: '已编辑!'
          });
          this.emptyUserData();
          //console.log(response);
        }).catch(error => {
          console.log(error);
        });
      }
    },


  }
  /* eslint-disable */
</script>
<style scoped>
</style>
