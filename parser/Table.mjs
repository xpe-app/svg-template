import SVGTemplate from "../SVGTemplate.mjs";
import Utils from './Utils.mjs';

export default {
  render : (obj, renderBox, styles, tokens) => {
    const output = [];

    if(obj.text){
      const subRenderBox = {...renderBox};
      output.push(this.render({
        type: "multiline",
        text: obj.text,
        style: {...obj.style, fontSize: styles.rem * 1.5 , fontWeight: 700},
        margins:[0,0,styles.rem,0],
      }, subRenderBox, styles, tokens));
      renderBox.height += subRenderBox.height;
    }


    obj.rows.map((row, i) => {
      const subRenderBox = Utils.getRenderBox(
        renderBox.y + renderBox.height,
        renderBox.x,
        renderBox.width
      );

      //default cell padding
      row.forEach(cell => {
        if(!cell.paddings){
          cell.paddings = [
            0.25 * styles.rem,
            obj.borders[1] ? (0.5 * styles.rem) : 0,
            0.25 * styles.rem,
            obj.borders[3] ? (0.5 * styles.rem) : 0,
          ];
        }
      });
      const rowBorders = (i < obj.rows.length-1) ? [0,0,1,0]: [0,0,0,0];

      output.push(SVGTemplate.render({
        type: "columns",
        columns: row,
        spans: obj.spans,
        borders:rowBorders
      }, subRenderBox, styles, tokens));

      renderBox.height += subRenderBox.y + subRenderBox.height;
    });

    return {height: 0, svg: output.map(it => it.svg).join('\n')};
  }
}