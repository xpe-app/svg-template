import fs from 'node:fs';

import OpenType from 'opentype.js';
const font = await OpenType.load('NotoSans-Regular.ttf');
const fontBold = await OpenType.load('NotoSans-Bold.ttf');
const fontBlack = await OpenType.load('NotoSans-Black.ttf');

import TemplateParser from "../SVGTemplate.mjs";
import Template from "./Template.mjs";
import SVGUtils from "../parser/Utils.mjs";

const output = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="816" height="500" viewBox="0 0 816 500" style="background:#FFF;">',
  '<g font-family="Noto Sans" font-size="'+Template.rem+'" transform="translate(42 0)">',
  TemplateParser.render(Template.page, SVGUtils.getRenderBox(0,0,731),
    {
      lineHeight: 1.2,
      fontFamily: 'Noto Sans',
      fontWeight: 400,
      fontSize: Template.rem,
      font,
      fontBold,
      fontBlack,
      rem: Template.rem
    },
    {
      user: "John Doe",
    }
  ).svg,
  '</g>',
  '</svg>'
]

fs.writeFileSync('test.svg', output.join('\n'), 'utf-8');