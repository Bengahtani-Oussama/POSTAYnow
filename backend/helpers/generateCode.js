function generateCode(length) {
  let code = '';
  let codeSchema = '0123456789';

  for (let index = 0; index < length; index++) {
    code += codeSchema.charAt(Math.floor(Math.random() * codeSchema.length));
  }
  return code;
}

module.exports = generateCode;
