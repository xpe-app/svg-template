import SVGTemplate from "../SVGTemplate.mjs";
import Utils from './Utils.mjs';

export default {
  render : (obj, renderBox, styles, tokens) => {
    const spans = obj.spans ?? Array(obj.columns.length).fill(1);
    const columnWidth = Math.round(renderBox.width / spans.reduce((a, b) => a + b, 0));
    const ws =  Array(obj.columns.length).fill(0).map((_, i) => spans[i] * columnWidth);

    let mx = renderBox.x;
    const xs = Array(obj.columns.length).fill(renderBox.x).map((_, i) => {
      const output = mx;
      mx = mx + ws[i];
      return output;
    });

    const output = [];
    const subRenderBoxes = [];
    let maxHeight = 0;

    obj.columns.forEach((columnObj, i)=>{
      const subRenderBox = Utils.getRenderBox(renderBox.y + renderBox.height, xs[i],columnWidth * spans[i]);
      subRenderBoxes.push(subRenderBox);
      output.push(SVGTemplate.render(columnObj, subRenderBox, styles, tokens));
    })

    subRenderBoxes.forEach(subRenderBox => {
      const subRenderBoxHeight = subRenderBox.height + subRenderBox.y;
      if(subRenderBoxHeight > maxHeight)maxHeight = subRenderBoxHeight;
    });

    return {height: maxHeight + renderBox.y, svg: output.map(it => it.svg).join('\n')};
  }
}