import request from '@/utils/request'
import { parseTime} from "@/utils";
import qs from "qs";

export class BaseCrud{

    API_URL = '';
    API_NAME = '';
    constructor(API_URL,API_NAME) {
        this.API_URL = API_URL
        this.API_NAME = API_NAME
    }
    query(params) {
        return request({
            url: this.API_URL,
            method: 'get',
            params: params
        })
    }
    addOrEdit(data) {
        return request({
            url: this.API_URL,
            method: 'post',
            data
        })
    }

    del(ids) {
        return request({
            url: this.API_URL,
            method: 'delete',
            data: ids
        })
    }

    conditionDelete(data) {
        return request({
            url: this.API_URL + "/conditionDelete",
            method: 'post',
            data: data
        })
    }

    upload(data) {
        return request({
            url: this.API_URL + '/upload',
            ContentType: 'multipart/form-data',
            method: 'post',
            data: data
        })
    }

    cancelUpload(fileId) {
        return request({
            url: this.API_URL + '/cancelUpload/' + fileId,
            method: 'post',
        })
    }

    saveUpload(fileId) {
        return request({
            url: this.API_URL + '/saveUpload/' + fileId,
            method: 'post',
        })
    }

    download(url, params) {
        return request({
            url: url + '?' + qs.stringify(params, { indices: false }),
            method: 'get',
            responseType: 'blob'
        })
    }

    downloadFile(obj, name, suffix) {
        const url = window.URL.createObjectURL(new Blob([obj]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        const fileName = parseTime(new Date()) + '-' + name + '.' + suffix
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }


    exportExcel(params) {
        this.download(this.API_URL+ '/download',params).then(result => {
            this.downloadFile(result, this.API_NAME + '数据', 'xlsx')
        }).catch((error) => {
            console.log(error.message)
            throw new Error('下载失败');
        })
    }

    exportExcelError(fileId) {
        this.download(this.API_URL+ '/downloadErrorMsg/' + fileId).then(result => {
            this.downloadFile(result, this.API_NAME +  "上传文件错误信息", 'xlsx')
        }).catch((error) => {
            console.log(error.message)
            throw new Error('下载失败');
        })
    }





}

export default { BaseCrud }
