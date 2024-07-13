import Utils from './Utils.mjs';
const {wordWrap, replaceToken} = Utils;

export default {
  render : (obj, renderBox, styles, tokens) => {
    const name = replaceToken(obj.name, tokens);
    const text = replaceToken(obj.text, tokens);

    const {
      lineHeight,
      fontSize
    } = obj.style

    const offsetY = renderBox.y + renderBox.height;

    //check name width
    const nameWidth = Math.round(styles.fontBold.getAdvanceWidth(name + ' ', styles.rem));
    const text_first_line = wordWrap(obj.style.font, text, renderBox.width - nameWidth, styles.rem, 1);
    const text_remaining = text.replace(text_first_line[0], '').trim();

    const lines = wordWrap(obj.style.font, text_remaining, renderBox.width, styles.rem);

    //add to first lines
    lines.unshift(`<tspan font-weight="bold">${name}</tspan><tspan alignment-baseline="inherit" x="${nameWidth}">${text_first_line[0]}</tspan>`);

    return {
      height: Math.round(fontSize * lineHeight * lines.length),
      svg: lines.map((line, i) => `<text x="${renderBox.x}" y="${Math.round((i + 1) * (fontSize * lineHeight))+ offsetY}">${line}</text>`).join('\n')
    }
  }
}