export default class Utils{
  static wordWrap(font, text, maxWidth, fontSize, maxLines=Infinity) {
    if(text === "")return [];

    if(text.includes('<tspan')){
      return [text];
    }

    const lines = [];
    let currentLine = '';

    const words = text.split(' ');

    for(let i =0; i< words.length; i++){
      const word = words[i];
      const wordWidth = font.getAdvanceWidth(currentLine + ' ' + word, fontSize);
      if (wordWidth > maxWidth || (word[i-1] ?? "").includes('\n')) {
        // Add current line to results and start a new one
        lines.push(currentLine.trim());
        if(lines.length >= maxLines)break;
        currentLine = word;
      } else {
        currentLine += ' ' + word;
      }
    }
    // Add the last line
    if(lines.length < maxLines) lines.push(currentLine.trim());

    return lines;
  }

  static replaceToken(text, tokens={}){
    let output = text;
    Object.keys(tokens).forEach(key =>{
      output = output.replaceAll("@{{"+key+"}}", tokens[key]);
    })
    return output;
  }

  static getRenderBox(top=0, left=0, width=100){
    return {
      top,
      left,
      right: left + width,
      x: 0,
      y: 0,
      width: width,
      height:0,
    }
  }
}