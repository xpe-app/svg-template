import SVGTemplate from "../SVGTemplate.mjs";
import Utils from "./Utils.mjs";

export default {
  render : (obj, renderBox, styles, tokens) => {
    const output = [];
    const blocks = obj.blocks;

    for(let i=0; i< blocks.length; i++){
      const subRenderBox = Utils.getRenderBox(
        renderBox.y + renderBox.height,
        renderBox.x,
        renderBox.width
      );

      const blockObj = blocks[i];
      blockObj.style = Object.assign({}, obj.style, blockObj.style);
      output.push(SVGTemplate.render(blockObj, subRenderBox, styles, tokens));

      renderBox.height += subRenderBox.y + subRenderBox.height;
    }

    return {height: 0, svg: output.map(it => it.svg).join('\n')};
  }
}