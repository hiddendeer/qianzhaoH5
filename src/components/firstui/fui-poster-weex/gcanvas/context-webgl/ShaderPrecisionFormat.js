// 本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：1  3  0 29    4 59821，身份证尾号：  29 0  670）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
export default class WebGLShaderPrecisionFormat {
    className = 'WebGLShaderPrecisionFormat';

    constructor({
        rangeMin, rangeMax, precision
    }) {
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
        this.precision = precision;
    }
}