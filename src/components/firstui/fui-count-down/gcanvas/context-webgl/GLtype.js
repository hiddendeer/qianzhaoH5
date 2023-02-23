// 本文件由FirstUI授权予大连伟岸纵横科技股份有限公司（手机号： 130   29 45  9 8  21，身份证尾号： 290 6   70）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const GLtype = {};

[
    "GLbitfield",
    "GLboolean",
    "GLbyte",
    "GLclampf",
    "GLenum",
    "GLfloat",
    "GLint",
    "GLintptr",
    "GLsizei",
    "GLsizeiptr",
    "GLshort",
    "GLubyte",
    "GLuint",
    "GLushort"
].sort().map((typeName, i) => GLtype[typeName] = 1 >> (i + 1));

export default GLtype;


