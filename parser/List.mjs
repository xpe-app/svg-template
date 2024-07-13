import SVGTemplate from "../SVGTemplate.mjs";
import Utils from "./Utils.mjs";

export default {
  render : (obj, renderBox, styles, tokens) => {
    const output = [];
//    output.push({height: 0, svg: `<g transform="translate(${renderBox.x} ${renderBox.y + renderBox.height})">`});
    const subRenderBox = Utils.getRenderBox(
      renderBox.y + renderBox.height,
      renderBox.x,
      renderBox.width
    );

    if(obj.text){
      output.push(SVGTemplate.render({
        type: "multiline",
        style: obj.style,
        text : obj.text,
        margins:[0,0, styles.rem, 0],
      }, subRenderBox, styles, tokens));
    }

    const result = SVGTemplate.render(
      {type:"block", blocks: obj.items},
      subRenderBox, styles, tokens
    );
    output.push(result);

//    output.push({height: 0, svg: '</g>'});

    return{
      height: subRenderBox.height + subRenderBox.y,
      svg: output.map(it => it.svg).join('\n')
    };
  }
}