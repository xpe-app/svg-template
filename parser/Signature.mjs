import Utils from './Utils.mjs';
import SVGTemplate from "../SVGTemplate.mjs";
const {wordWrap, replaceToken} = Utils;

export default {
  render : (obj, renderBox, styles, tokens) => {
    const values = Object.assign(
      {
        image: "",
        name: "Buyer's Acceptance:",
        note: '(electronic signature) @{{customer_name}}',
        text: "Electronic Signature [1]",
        info: "dddd, MMMM D, YYYY h:mm A added via IP {}",
        date: "MM/DD/YYYY"
      }, obj
    )
    const {
      lineHeight,
      fontSize
    } = obj.style;

    const name = replaceToken(values.name, tokens);
    const note = replaceToken(values.note, tokens);
    const text = replaceToken(values.text, tokens);
    const info = replaceToken(values.info, tokens);
    const date = replaceToken(values.date, tokens);

    const output = [{height: 0, svg:'<!-- signature -->'}];
    const subRenderBox = Utils.getRenderBox(
      renderBox.y + renderBox.height,
      renderBox.x,
      renderBox.width * 0.8
    );

    output.push(SVGTemplate.render({
      type: "list-item-line",
      name,
      text: note,
      margins:[0,0, styles.rem, 0],
    }, subRenderBox, styles, tokens));

    subRenderBox.height = subRenderBox.height + 50;

    output.push(SVGTemplate.render({
      type: "text",
      text,
    }, subRenderBox, styles, tokens));

    output.push(SVGTemplate.render({
      type: "text",
      text:info,
      borders:[0,0,1,0],
      margins:[0,0, styles.rem * 0.5 ,0],
    }, subRenderBox, styles, tokens));

    output.push(SVGTemplate.render({
      type: "list-item-line",
      name: "Date:",
      text: date,
    }, subRenderBox, styles, tokens));

    return {height: subRenderBox.y + subRenderBox.height, svg: output.map(it => it.svg).join('\n')};
  }
}