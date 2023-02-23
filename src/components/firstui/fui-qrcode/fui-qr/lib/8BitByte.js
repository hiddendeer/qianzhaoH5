// 本文件由FirstUI授权予江苏伟岸纵横科技股份有限公司（手机号：130 2 9    4598    21，身份证尾号： 29  06 7 0）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import mode from './mode.js'

function QR8bitByte(data) {
	this.mode = mode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function(buffer) {
		return this.data.length;
	},

	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

export default QR8bitByte;
