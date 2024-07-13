import SVGTemplate from "../SVGTemplate.mjs";
import Utils from "./Utils.mjs";

export default {
  render : (obj, renderBox, styles, tokens) => {
    const {
      lineHeight,
      fontSize,
    } = obj.style;

    const subRenderBox = Utils.getRenderBox(
      renderBox.y + renderBox.height,
      renderBox.x,
      renderBox.width
    );

    const offsetY= renderBox.y + renderBox.height;
    const oWidth = renderBox.width;
    const ox = renderBox.x;
    renderBox.x += 2 * styles.rem;
    renderBox.width -= renderBox.x;

    const output = [
      {
        height: 0,
        svg: `<circle cx="${renderBox.x - styles.rem}" cy="${offsetY + (fontSize * lineHeight * 0.5) + 2}" r="2" fill="black"/>`
      },
      SVGTemplate.render({
        type: "multiline",
        text: obj.text,
        style: obj.style,
        margins:[0,0, styles.rem, styles.rem * 2],
      }, subRenderBox, styles, tokens)
    ];

    renderBox.width = oWidth;
    renderBox.x = ox;
    return {height: subRenderBox.height, svg: output.map(it => it.svg).join('\n')};
  }
}