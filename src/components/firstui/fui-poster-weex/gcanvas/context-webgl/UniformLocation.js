// 本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：  1  30 2 945  9 82 1，身份证尾号：2 906 7   0）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import {getTransferedObjectUUID} from './classUtils';

const name = 'WebGLUniformLocation';

function uuid(id) {
    return getTransferedObjectUUID(name, id);
}

export default class WebGLUniformLocation {
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