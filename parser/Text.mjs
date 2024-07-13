import Utils from './Utils.mjs';
const {replaceToken} = Utils;

export default {
  render : (obj, renderBox, styles, tokens) => {
    const text = replaceToken(obj.text, tokens);

    const {
      lineHeight,
      fontWeight,
      fontSize,
    } = obj.style;

    let anchorX = 0;
    let anchorAttr = "";
    if(obj.style.textAnchor === 'end'){
      anchorX = renderBox.width;
      anchorAttr = 'text-anchor="end"';
    }

    if(obj.style.textAnchor === 'center'){
      anchorX = renderBox.width / 2;
      anchorAttr = 'text-anchor="center"';
    }

    const singleLineHeight = Math.round(fontSize * lineHeight);

    return {
      height: singleLineHeight,
      svg: `<text alignment-baseline="central" font-weight="${fontWeight}" font-size="${fontSize}" x="${renderBox.x + anchorX}" y="${renderBox.y + renderBox.height + (singleLineHeight * .5)}" ${anchorAttr}>${text}</text>`
    }
  }
}