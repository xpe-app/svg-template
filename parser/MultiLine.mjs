import Utils from './Utils.mjs';
const {wordWrap, replaceToken} = Utils;

export default {
  render : (obj, renderBox, styles, tokens) => {
    let text = replaceToken(obj.text, tokens);

//    text.replaceAll('<b>', '<tspan font-weight="bold">').replaceAll('</b>', '</tspan>');
//    text = text.replaceAll('<b>', '').replaceAll('</b>', '');
//    text = text.replaceAll('<u>', '').replaceAll('</u>', '');

    const {
      lineHeight,
      fontWeight,
      fontSize,
    } = obj.style;

    const width = obj.width || renderBox.width;

    let anchorX = 0;
    let anchorAttr = "";
    if(obj.style.textAnchor === 'end'){
      anchorX = width;
      anchorAttr = 'text-anchor="end"';
    }

    if(obj.style.textAnchor === 'center'){
      anchorX = width / 2;
      anchorAttr = 'text-anchor="center"';
    }

    const lines = wordWrap(obj.style.font, text, width, fontSize);
    const singleLineHeight = Math.round(fontSize * lineHeight);

    return {
      height: Math.round(fontSize * lineHeight * lines.length),
      svg: lines.map((line, i) => `<text alignment-baseline="central" font-size="${fontSize}" font-weight="${fontWeight}" x="${renderBox.x + anchorX}" y="${Math.round((i+0.5) * singleLineHeight) + renderBox.y + renderBox.height}" ${anchorAttr}>${line}</text>`).join('\n')
    }
  }
}