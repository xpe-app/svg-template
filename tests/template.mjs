const rem = 10;
const styles = {
  text: {font: 'Noto Sans', fontSize: rem, fontWeight: 400 },
  textHeader : {font: 'Noto Sans Black', fontSize: rem * 1.5 ,fontWeight: 900 },
  textSmall : {font: 'Noto Sans', fontSize: rem * 0.63, fontWeight: 400 },
  textListHeader : {font: 'Noto Sans', fontSize: rem * 1.5 ,fontWeight: 700 },
}

const spacer = {
  type: 'spacer'
}

const page = {
  type: 'block',
  borders: [1,1,1,1],
  margins: [10,10,10,10],
  paddings: [5,5,5,5],
  debug: true,
  blocks: [
    {
      type: 'text',
      text: '@{{user}}',
      borders:[2,2,2,2],
      margins:[5,5,5,5],
      paddings: [5,5,5,5],
      style: {lineHeight:1},
    },
    {
      type: 'text',
      text: 'Lorem Lipsum',
      margins: [2,2,2,2],
    },
    {
      type: 'text',
      text: 'Lorem Lipsum',
      margins: [2,2,2,2],
      borders:[10,2,5,2],
      style: {lineHeight:3},
    },
    {
      type: 'block',
      style: styles.text,
      borders: [2,2,2,2],
      margins: [10,10,10,10],
      paddings: [5,5,5,5],
      debug: true,
      blocks: [
        {
          type: 'text',
          text: 'Lorem Lipsum',
          borders:[2,2,2,2],
          margins:[5,5,5,5],
          paddings: [5,5,5,5],
          style: {lineHeight:1},
        },
        {
          type: 'text',
          text: 'Lorem Lipsum',
          margins: [2,2,2,2],
        },
        {
          type: 'multiline',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus sapien et lectus varius ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi massa est, interdum non mattis eget, dictum quis arcu. Aenean quis enim ut sem tincidunt aliquet lacinia ut massa.',
          margins: [2,2,2,2],
          borders:[10,2,5,2],
          paddings: [0,10,0,5],
          style: {lineHeight:3},
          debug: true
        },
      ]
    },
    {
      id: "header",
      type: 'table',
      rows: [
        [{type:"text", text:'Document ID'}, {type:"text", text:'agr11111-222222222-33333333-444444-sg5555'}],
        [{type:"text", text:'Customer Name'}, {type:"text", text:"@{{user}}"}],
        [{type:"text", text:'Agreement Created'}, {type:"text", text:'dddd, MMMM D, YYYY h:mm A'}],
      ],
      borders:[2,2,2,2],
      margins:[0,0,rem,0],
      spans:[1,4],
    },
  ]
};

export default {
  rem,
  styles,
  page
};