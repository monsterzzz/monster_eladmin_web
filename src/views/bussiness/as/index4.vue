<template>
  <div >



    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="tableWidth = '600px'">宽600px</vxe-button>
        <vxe-button @click="tableWidth = '700px'">宽700px</vxe-button>
        <vxe-button @click="tableWidth = '800px'">宽800px</vxe-button>
        <vxe-button @click="tableHeight = '300px'">高300px</vxe-button>
        <vxe-button @click="tableHeight = '500px'">高500px</vxe-button>
        <vxe-button @click="tableHeight = '800px'">高800px</vxe-button>
      </template>
    </vxe-toolbar>

    <div style="overflow: hidden;" :style="{width: tableWidth, height: tableHeight}">
      <vxe-table
          border
          auto-resize
          show-footer
          height="auto"
          :footer-method="footerMethod"
          :data="tableData">
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>
        <vxe-column field="key" title="key" width="150" fixed="left"></vxe-column>

      </vxe-table>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    let tmp = this.getVersionData()
    return {
      tableWidth: null,
      tableHeight: '300px',
      tableData: tmp.data,
      keySize: tmp.keySize,
    }
  },
  methods: {
    getVersionData() {
      let tmpData = {
        "calcData": [{
          "id": "42",
          "recordId": "44",
          "demandId": "五菱20230615002",
          "period": "2023H1",
          "currency": "USD",
          "exchangeRate": 7.00,
          "varietyCode": "E6ZU",
          "model": "CN110V",
          "plpModel": "CN110V",
          "modelDesc": "CN110V N15A 6MT LV00 国Ⅵ 7座",
          "brand": "五菱红标",
          "modelSeries": "微客",
          "engine": "N15A",
          "domesticPrice": 46800.00,
          "basicAllowance": 2808.00,
          "otherAllowance": 1049.28,
          "addedTax": 4601.01,
          "consumptionTax": 1150.25,
          "otherTax": 107.36,
          "cctEf": 135.79,
          "netSalesIncome": 37084.10,
          "materialCost": 35535.77,
          "paymentAllowance": 195.45,
          "freight": 580.65,
          "overseasPromotion": 300.00,
          "oilFee": 50.00,
          "financeFee": 50.00,
          "commodityFee": 249.00,
          "marginalCost": 36220.97,
          "cm": 863.13,
          "cmRate": 2.33,
          "cmRateAdj": 2.33,
          "cmRateAdjRemark": "·12aSD",
          "cmCountPrice": 37187.44,
          "priceAdj": 100.00,
          "priceAdjRemark": "啦啦啦",
          "fcaPrice": 37830.60,
          "fobPrice": 38079.60,
          "exwPrice": 38411.25,
          "isRelease": 0
        }, {
          "id": "43",
          "recordId": "44",
          "demandId": "五菱20230615002",
          "period": "2023H1",
          "currency": "USD",
          "exchangeRate": 7.00,
          "varietyCode": "LACR",
          "model": "CN120S",
          "plpModel": "CN100",
          "modelDesc": "CN120S N15A 6MT LV0G 国Ⅵ 7座",
          "brand": "五菱红标",
          "modelSeries": "MPV",
          "engine": "N15A",
          "domesticPrice": 60100.00,
          "basicAllowance": 3606.00,
          "otherAllowance": 1022.12,
          "addedTax": 5943.42,
          "consumptionTax": 1485.85,
          "otherTax": 138.68,
          "cctEf": 336.39,
          "netSalesIncome": 47903.93,
          "materialCost": 35584.53,
          "paymentAllowance": 195.71,
          "freight": 580.65,
          "overseasPromotion": 300.00,
          "oilFee": 50.00,
          "financeFee": 50.00,
          "commodityFee": 249.00,
          "marginalCost": 36269.47,
          "cm": 11634.46,
          "cmRate": 24.29,
          "cmRateAdj": 24.29,
          "cmRateAdjRemark": "SADF asdf",
          "cmCountPrice": 48037.87,
          "priceAdj": null,
          "priceAdjRemark": null,
          "fcaPrice": 48812.94,
          "fobPrice": 49061.94,
          "exwPrice": 49393.59,
          "isRelease": 0
        }, {
          "id": "44",
          "recordId": "44",
          "demandId": "五菱20230615002",
          "period": "2023H1",
          "currency": "USD",
          "exchangeRate": 7.00,
          "varietyCode": "K9PD",
          "model": "N300L",
          "plpModel": "N300",
          "modelDesc": "N300L N15A 5MT 基本型0 国Ⅵ 7座",
          "brand": "五菱红标",
          "modelSeries": "微客",
          "engine": "N15A",
          "domesticPrice": 51000.00,
          "basicAllowance": 3060.00,
          "otherAllowance": 1477.86,
          "addedTax": 4978.09,
          "consumptionTax": 1244.52,
          "otherTax": 116.16,
          "cctEf": 194.90,
          "netSalesIncome": 40123.37,
          "materialCost": 35372.52,
          "paymentAllowance": 194.55,
          "freight": 580.65,
          "overseasPromotion": 300.00,
          "oilFee": 50.00,
          "financeFee": 50.00,
          "commodityFee": 249.00,
          "marginalCost": 36058.62,
          "cm": 4064.75,
          "cmRate": 10.14,
          "cmRateAdj": 10.13,
          "cmRateAdjRemark": "asdf sd打",
          "cmCountPrice": 40234.37,
          "priceAdj": null,
          "priceAdjRemark": null,
          "fcaPrice": 40845.44,
          "fobPrice": 41094.44,
          "exwPrice": 41426.10,
          "isRelease": 0
        }],
        "recordDesc": "测试备注"
      }
      let result = []
      let keysLength = Object.keys(tmpData.calcData[0]).length
      for (let i = 0; i < keysLength ; i++){
        let tmp = {}
        tmp["key"] = Object.keys(tmpData.calcData[0])[i]
        for (let j = 0; j < tmpData.calcData.length; j++) {
          tmp["col" + (j + 1)] = tmpData.calcData[j][Object.keys(tmpData.calcData[0])[i]]
        }
        result.push(tmp)
      }
      return {
        "keySize": tmpData.calcData.length,
        "data":result
      }

    },
    meanNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    sumNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },
    footerMethod ({ columns, data }) {
      const means = []
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push('平均')
          sums.push('和值')
        } else {
          let meanCell = null
          let sumCell = null
          switch (column.property) {
            case 'age':
            case 'rate':
              meanCell = parseInt(this.meanNum(data, column.property))
              sumCell = this.sumNum(data, column.property)
              break
          }
          means.push(meanCell)
          sums.push(sumCell)
        }
      })
      // 返回一个二维数组的表尾合计
      return [means, sums]
    }
  }
}
</script>

<style>

.myTable {

  .vxe-body--column.col-orange {
    background-color: #7a8b9a;
    color: #fff;
  }

}

</style>