
import {BaseCrud} from "@/utils/BaseCRUD";

class OaContractAccruedContractMainData extends BaseCrud {
    constructor() {
        super('api/oaContractAccruedContractMainData','合同主数据')
    }
    //这里可以扩展新的方法
}

export const oaContractAccruedContractMainData = new OaContractAccruedContractMainData();

export default { oaContractAccruedContractMainData }
