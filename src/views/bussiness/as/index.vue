<template>
  <div class="myTable" style="margin-left: 20px;margin-top: 20px">
    <div >
      <div style="width:100%">
        <vxe-toolbar>
          <template #buttons>
            <vxe-input  v-model="timesInput" type="number" @change="getVersionData(timesInput)"></vxe-input>
          </template>
        </vxe-toolbar>
      </div>
      <div :style="{width: tableWidth}" style="overflow-y: hidden">
        <vxe-table
            size="mini"
            :align="allAlign"
            :data="data"
            height="500px"
            :show-header="true"
            resizable
            over

        >
          <!--          <vxe-column type="seq" width="60"></vxe-column>-->
          <vxe-column field="key" title="key" width="150px" fixed="left"  ></vxe-column>
          <vxe-column v-for="i of colSize - 1" :key="i" :field="'col'+i" :title="'col'+i"   :width="colWidth + 'px'"></vxe-column>

        </vxe-table>
      </div>

    </div>




  </div>
</template>
<script>
import {calcData} from './data.js';
export default {
  mounted() {
    this.getVersionData()
  },
  data() {

    return {
      allAlign: null,
      data: [],
      colSize: 0,
      colWidth:170,
      tableWidth: '300px',
      timesInput: 1
    }
  },
  watch:{

  },
  methods: {
    getVersionData(times=1) {
      if (typeof times === 'string') {
        times = parseInt(times)
      }
      let tmpData = []
      for (let i = 0; i < times; i++) {
        let t = {...calcData}
        t.id = i + 1
        tmpData.push(t)
      }
      console.log(tmpData)
      let result = []
      let keysLength = Object.keys(calcData).length
      for (let i = 0; i < keysLength ; i++){
        let tmp = {}
        tmp["key"] = Object.keys(calcData)[i]
        for (let j = 0; j < times; j++) {

          tmp["col" + (j + 1)] = tmpData[j][Object.keys(calcData)[i]]
        }
        result.push(tmp)
      }

      this.colSize = 1 + (times+0)
      this.tableWidth = (times <= 3 ? (150) + (times) * this.colWidth : (180) + (3) * this.colWidth )  + 'px'
      this.data = result
      console.log(times)
    },

    cellClassGetter({row, rowIndex, column, columnIndex}) {
      if (columnIndex === 0) {
        return 'col-orange'
      }

    }
  }
}
</script>

<style lang="scss">


.myTable{
  .newScroll{
    overflow: scroll;
  }
  ::-webkit-scrollbar {
    height: 6px;
  }

  ::-webkit-scrollbar {
      width: 0;
  }

    /* 滚动槽 */
  ::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
      border-radius: inherit;
      background-color: rgba(144, 147, 153, 0.3);
      -webkit-transition: 0.3s background-color;
      transition: 0.3s background-color;
  }

  //.vxe-table--body-wrapper.body--wrapper{
  //    overflow-x: scroll;
  //}

}







</style>