import { Columns, Block, Text, Hr, ListItem, List, ListItemLine, ListItemDisc, Picture, Table, Signature, MultiLine} from './parser/index.mjs';

export default class SVGTemplate {
  static render(obj, renderBox, defaultStyle={}, tokens={}){
    obj.style = Object.assign({}, defaultStyle, obj.style);
    obj.style.font = (obj.style.fontWeight >= 700 || obj.style.fontWeight === 'bold') ? defaultStyle.fontBold : defaultStyle.font;

    const margins = obj.margins ?? obj.style.margins ?? defaultStyle.margins ?? [0, 0, 0, 0];
    const paddings = obj.paddings ?? obj.style.paddings  ?? defaultStyle.paddings ?? [0, 0, 0, 0];
    const borders = obj.borders ?? obj.style.borders  ?? defaultStyle.borders?? [0, 0, 0, 0];

    renderBox.y      = margins[0] + paddings[0] + borders[0];
    renderBox.x      = margins[3]+ paddings[3] + borders[3];
    renderBox.width  = renderBox.right - renderBox.left - margins[1] - margins[3] - paddings[1] - paddings[3] - borders[1] - borders[3];

    const border_svgs = [];

    const result = this.selectType(obj, renderBox, defaultStyle, tokens);
    renderBox.height = renderBox.height + result.height + paddings[2] + borders[2];

    //top
    if(borders[0]> 0){
      border_svgs.push(`<rect x="${margins[3]}" y="${margins[0]}" width="${renderBox.right - renderBox.left - margins[1] - margins[3]}" height="${borders[0]}" fill="#00000"/>`)
    }

    //bottom
    if(borders[2]> 0){
      border_svgs.push(`<rect x="${margins[3]}" y="${renderBox.y + renderBox.height - borders[2]}" width="${renderBox.right - renderBox.left - margins[1] - margins[3]}" height="${borders[2]}"/>`)
    }

    //left
    if(borders[1]> 0){
      border_svgs.push(`<rect x="${margins[3]}" y="${margins[0]}" width="${borders[1]}" height="${renderBox.height + paddings[0] + borders[0]}"/>`)
    }
    //right
    if(borders[3]> 0){
      border_svgs.push(`<rect x="${renderBox.right - renderBox.left - margins[1] - borders[3] }" y="${margins[0]}" width="${borders[3]}" height="${renderBox.height + paddings[0] + borders[0]}"/>`)
    }

    renderBox.height += margins[2];
    result.svg += border_svgs.join('\n');
    result.svg = `<g transform="translate(${renderBox.left} ${renderBox.top})">\n${result.svg}${obj.debug ? `\n${this.debugDraw(renderBox, margins)}`: ""}\n</g>`;
    return result;
  }

  static debugDraw(renderBox, margins){
    const top =0;
    const right = renderBox.right - renderBox.left;
    const left = 0;
    const bottom = renderBox.y + renderBox.height;

    const innerTop = top + margins[0];
    const innerRight = right - margins[1];
    const innerLeft = left + margins[3];
    const innerBottom = bottom - margins[2];

    let result = "";
    result += '<g class="debug">';
    result += `<path d="M ${left},${top} H ${right} V ${bottom} H ${left} Z M ${innerLeft},${innerTop} V ${innerBottom} H ${innerRight} V ${innerTop} Z" fill="#FF770033" stroke="#F00" fill-rule="evenodd" stroke-width="0.5"/>`
    result += `<rect x="${margins[3]}" y="${margins[0]}" width="${renderBox.right - renderBox.left - margins[1]- margins[3]}" height="${renderBox.y + renderBox.height - margins[0] - margins[2]}" fill="#00000000" stroke="#0F0" stroke-width="0.1"/>`;
    result += `<rect x="${renderBox.x}" y="${renderBox.y}" width="${renderBox.width}" height="${renderBox.height}" fill="#00000000" stroke="#00F" stroke-width="0.1"/>`;
    result += '</g>';
    return result;
  }

  static selectType(obj, renderBox, defaultStyle, tokens){
    switch(obj.type){
      case "block":
        return Block.render(obj, renderBox, defaultStyle, tokens);
      case "columns":
        return Columns.render(obj, renderBox, defaultStyle, tokens);
      case "picture":
        return Picture.render(obj, renderBox, defaultStyle, tokens);
      case "multiline":
        return MultiLine.render(obj, renderBox, defaultStyle, tokens);
      case "text":
        return Text.render(obj, renderBox, defaultStyle, tokens);
      case "table":
        return Table.render(obj, renderBox, defaultStyle, tokens);
      case "list":
        return List.render(obj, renderBox, defaultStyle, tokens);
      case "list-item-line":
        return ListItemLine.render(obj, renderBox, defaultStyle, tokens);
      case "list-item":
        return ListItem.render(obj, renderBox, defaultStyle, tokens);
      case "list-item-disc":
        return ListItemDisc.render(obj, renderBox, defaultStyle, tokens);
      case "signature":
        return Signature.render(obj, renderBox, defaultStyle, tokens);
      case "hr":
        return Hr.render(obj, renderBox, defaultStyle, tokens);
      case "spacer":
        return {height: 0, svg: '<!-- spacer -->'};
      default:
        console.log(obj.type);
    }
  }
}