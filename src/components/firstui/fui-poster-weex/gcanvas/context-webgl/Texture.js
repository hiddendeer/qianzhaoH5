// 本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：1 302      945982   1，身份证尾号：   29 06 70）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import {getTransferedObjectUUID} from './classUtils';

const name = 'WebGLTexture';

function uuid(id) {
    return getTransferedObjectUUID(name, id);
}

export default class WebGLTexture {
    className = name;

    constructor(id, type) {
        this.id = id;
        this.type = type;
    }

    static uuid = uuid;

    uuid() {
        return uuid(this.id);
    }
}