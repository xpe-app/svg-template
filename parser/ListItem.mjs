import SVGTemplate from "../SVGTemplate.mjs";
import Utils from "./Utils.mjs";

export default {
  render : (obj, renderBox, styles, tokens) => {
    const subRenderBox = Utils.getRenderBox(
      renderBox.y + renderBox.height,
      renderBox.x,
      renderBox.width
    );

    const output = [
      SVGTemplate.render({
        type: "multiline",
        text: obj.name,
        style: {fontWeight: 'bold'},
      }, subRenderBox, styles, tokens)
    ];

    obj.texts.forEach(it => {
      output.push(
        SVGTemplate.render(
          ((typeof it === 'string') ? {type: "multiline", text: it} : it),
          subRenderBox, styles, tokens
        )
      )
    })

    return {height: subRenderBox.height, svg: output.map(it => it.svg).join('\n')};
  }
}