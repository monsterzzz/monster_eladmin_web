<template>
  <div style="height: 100%;">
    <div style="display: flex;flex-direction: column;height: 100%;padding: 5px 5px 0px;">
      <div style="width: 100%;">
        <el-form ref="form" :model="queryParams" inline>
          <el-form-item>
            <el-input size="mini" v-model="queryParams.base" clearable placeholder="基地" />
          </el-form-item>
          <el-form-item>
            <el-input size="mini" v-model="queryParams.costAttribute" clearable placeholder="费用属性" />
          </el-form-item>
          <el-form-item>
            <el-input size="mini" v-model="queryParams.contractNumber" clearable placeholder="合同编号" />
          </el-form-item>
          <el-form-item>
            <el-input size="mini" v-model="queryParams.contractStart" clearable placeholder="合同起" />
          </el-form-item>
          <el-form-item>
            <el-input size="mini" v-model="queryParams.contractEnd" clearable placeholder="合同止" />
          </el-form-item>
          <el-form-item>
            <el-input size="mini" v-model="queryParams.costCenter" clearable placeholder="成本中心" />
          </el-form-item>
          <el-form-item>
            <el-input size="mini" v-model="queryParams.prNumber" clearable placeholder="pr号" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="getList">查询</el-button>
            <el-button size="mini" @click="resetHandler">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 100%;">
        <el-row>
          <el-button size="mini" type="primary" @click="addOrUpdateRow" >新增</el-button>
          <el-button size="mini" type="primary" @click="isImportExcel = true" >导入EXCEL</el-button>
          <el-button size="mini" type="primary" @click="exportExcel" >导出EXCEL</el-button>
          <el-button size="mini" type="danger" @click="batchDelete">批量删除</el-button>
          <el-button size="mini" type="danger" @click="conditionDelete">条件删除</el-button>
        </el-row>
      </div>
      <div style="flex-grow: 1;width: 100%;overflow: hidden;padding-top: 5px">
        <el-table ref="table" border :data="tableData" size="small"
                  :header-cell-class-name="'is-center'"
                  height="100%"
                  :cell-class-name="'is-center'"
                  v-loading="isLoading"
                  @selection-change="handleSelectionChange">

          >
          <el-table-column type="selection" width="55" align="center" :fixed="'left'"  />
          <el-table-column type="index" label="序号" :fixed="'left'" />
          <el-table-column prop="base" label="基地" align="center"  show-overflow-tooltip/>
          <el-table-column prop="costAttribute" label="费用属性" show-overflow-tooltip align="center"  />
          <el-table-column prop="contractNumber" label="合同编号" show-overflow-tooltip/>
          <el-table-column prop="contractStart" label="合同起" show-overflow-tooltip/>
          <el-table-column prop="contractEnd" label="合同止" show-overflow-tooltip/>
          <el-table-column prop="purchaser" label="采购员" show-overflow-tooltip/>
          <el-table-column prop="supplierCode" label="供应商代码" show-overflow-tooltip width="200px"/>
          <el-table-column prop="supplierName" label="供应商名称" show-overflow-tooltip width="200px"/>
          <el-table-column prop="businessContent" label="业务内容" show-overflow-tooltip width="500px"/>
          <el-table-column prop="costCenter" label="成本中心" show-overflow-tooltip/>
          <el-table-column prop="accountCode" label="科目代码" show-overflow-tooltip />
          <el-table-column prop="accountDescription" label="科目描述" show-overflow-tooltip/>
          <el-table-column prop="prNumber" label="PR号" show-overflow-tooltip />
          <el-table-column prop="settlementMethod" label="结算方式" show-overflow-tooltip />
          <el-table-column prop="contractType" label="合同类别" show-overflow-tooltip />
          <el-table-column prop="contractType" label="合同类别" show-overflow-tooltip />
          <el-table-column prop="contractType" label="合同类别" show-overflow-tooltip />
          <el-table-column prop="contractType" label="合同类别" show-overflow-tooltip />
          <el-table-column prop="contractType" label="合同类别" show-overflow-tooltip />
          <el-table-column prop="contractType" label="合同类别" show-overflow-tooltip :fixed="'right'"/>
          <el-table-column prop="delayStatus" label="是否延期Y/N" show-overflow-tooltip :fixed="'right'"/>
        </el-table>
      </div>
      <div style="width: 100%;  ">
        <el-pagination

            style="margin-top: 2px;padding-left: 0px;"
            @size-change="getList"
            @current-change="getList"
            :current-page.sync="queryParams.page"
            :page-sizes="[10, 20,50,100,200]"
            :page-size.sync="queryParams.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

import Pagination from "@crud/Pagination.vue";
import {oaContractAccruedContractMainData} from "../../../api/oa/contractAccrued/contractMainData";

export default {
  name: 'index2',
  // components: {Pagination},
  mounted() {
    this.getList()
    this.initOptions = this.initOptionFunc();
  },
  data(){
    return {
      initOptions: [],
      queryParams: {
        base: '',
        costAttribute: '',
        contractNumber: '',
        contractStart: '',
        contractEnd: '',
        costCenter: '',
        prNumber: '',
        page:1,
        size:20,
      },
      tableData:[],
      total:0,
      isLoading:false,
      exportExcelLoading:false,
      selectedIds:[],
      isAdd:true,
      isImportExcel:false,
      currentImportFileId: '',
      errorImportInfo:[{row:1,msg:'错误信息'}],
      dialogShow: false,
      form:{
        "accountCode": "",
        "accountDescription": "",
        "base": "",
        "businessContent": "",
        "contractEnd": "",
        "contractNumber": "",
        "contractStart": "",
        "contractType": "",
        "costAttribute": "",
        "costCenter": "",
        "delayStatus": "",
        "id": "",
        "prNumber": "",
        "purchaser": "",
        "settlementMethod": "",
        "supplierCode": "",
        "supplierName": ""
      }
    }
  },
  methods:{
    // eslint-disable-next-line vue/no-dupe-keys
    initOptionFunc: function (){
      const map = {}
      const vtv = [
        {fieldName:"base",fieldValue:['总部', '河西', '宝骏', '重庆', '青岛']},
        {fieldName:"costAttribute",fieldValue:["制造","管理","销售"]},
      ]
      for (const item of vtv) {
        map[item.fieldName] = []
        for (const val of item.fieldValue) {
          map[item.fieldName].push({label: val, value: val})
        }
      }
      return map
    },
    addOrUpdateRow(){
      this.isAdd = true
      this.dialogShow = true
    },
    getList(){
      this.isLoading = true
      oaContractAccruedContractMainData.query(this.queryParams).then(res=>{
        this.isLoading = false
        if (res.code !== 200) {
          this.$message.error(res.data.message)
        } else {
          this.$message.success("查询成功")
          this.tableData = res.data.data
          this.queryParams.page = +res.data.page
          this.queryParams.size = +res.data.size
          this.total = +res.data.total
        }
      })
    },
    batchDelete(){
      if (this.selectedIds.length === 0) {
        this.$message.warning("请先选择要删除的数据")
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oaContractAccruedContractMainData.del(this.selectedIds).then(res=>{
          if (res.code !== 200) {
            this.$message.error(res.data.message)
          } else {
            this.$message.success("删除成功")
            this.getList()
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    conditionDelete(){
      this.$confirm('此操作将永久删除该查询条件下所有数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        oaContractAccruedContractMainData.conditionDelete(this.queryParams).then(res=>{
          if (res.code !== 200) {
            this.$message.error(res.data.message)
          } else {
            this.$message.success("删除成功")
            this.getList()
          }
        })
      })
    },
    importExcelSuccessHook(resp,file, fileList){
      if (typeof resp === "string"){
        resp = JSON.parse(resp)
      }
      this.currentImportFileId = resp.data.fileId
      if (resp.data.status) {
        this.$message.success("文件校验成功,请点击确定按钮进行保存！")
      }else{
        this.$message.error("文件校验失败,请点击确定按钮查看错误信息！")
        this.errorImportInfo = resp.data.errorList
      }
    },
    saveImportData(){
      oaContractAccruedContractMainData.saveUpload(this.currentImportFileId).then(res=>{
        if (res.code !== 200) {
          this.$message.error(res.data.message)
        } else {
          this.$message.success("保存成功~")
          this.$refs["oaContractAccruedContractMainDataUpload"].clearFiles()
          this.currentImportFileId = '';
          this.isImportExcel = false
          this.getList()
        }
      })
    },
    cancelUpload(){
      this.isImportExcel = false
      if (this.currentImportFileId === '') {
        return
      }
      oaContractAccruedContractMainData.cancelUpload(this.currentImportFileId).then(res=>{
        if (res.code !== 200) {
          this.$message.error(res.data.message)
        } else {
          this.$message.success("取消上传~")
        }
      })
      this.$refs["oaContractAccruedContractMainDataUpload"].clearFiles()
      this.currentImportFileId = '';
      this.errorImportInfo = [];

    },
    downloadErrorImportMsg(){
      if (this.currentImportFileId === '') {
        this.$message.info("请先上传文件")
        return
      }
      this.$message.success("正在下载错误信息，请稍等...")
      oaContractAccruedContractMainData.exportExcelError(this.currentImportFileId)
    },
    exportExcel() {
      this.$message.success("正在导出EXCEL，请稍等...")
      oaContractAccruedContractMainData.exportExcel(this.queryParams)
    },
    handleSelectionChange(val) {
      let tmpIds = [];
      for (const row of val) {
        tmpIds.push(row.id)
      }
      this.selectedIds = tmpIds;
    },
    resetHandler(){
      this.queryParams =  {
        base: '',
        costAttribute: '',
        contractNumber: '',
        contractStart: '',
        contractEnd: '',
        costCenter: '',
        prNumber: '',
        page:1,
        size:20,
      }
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
.el-form-item--small.el-form-item{margin-bottom: 5px}
.el-pagination{
  .el-input.el-input--mini.el-input--suffix{
    margin-left: 0px;
  }
}

</style>
//  border-left: 1px solid #dfe6ec!important;
<style lang="scss">
thead th:not(.is-hidden):last-child {
  right: -1px !important;
}

</style>