export default {
  render : (obj, renderBox) => {
    const height = obj.thickness ?? 1;
    const svg = `<rect x="${obj.x ?? renderBox.x}" y="${renderBox.y + renderBox.height}" width="${obj.width ?? renderBox.width}" height="${height}" fill="${obj.style.fill || '#000' }"/>`
    return {height, svg};
  }
}