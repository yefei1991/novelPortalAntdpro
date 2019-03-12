function getChapterList() {
  const chapters = [];
  for (let i = 0; i < 999; i += 1) {
    const id = i + 1;
    const title = `标题${i}`;
    chapters.push({ id, title });
  }
  return chapters;
}
const novels = [
  { id: 1, author: 'test', type: '连载', name: 'test1', content: '测试内容1' },
  { id: 2, author: 'test', type: '连载', name: 'test1', content: '测试内容1' },
  { id: 3, author: 'test', type: '连载', name: 'test1', content: '测试内容1' },
  { id: 4, author: 'test', type: '连载', name: 'test1', content: '测试内容1' },
  { id: 5, author: 'test', type: '连载', name: 'test1', content: '测试内容1' },
];
const content = {
  detail:
    '晋太元中，武陵人捕鱼为业。缘溪行，忘路之远近。忽逢桃花林，夹岸数百步，中无杂树，芳草鲜美，落英缤纷。渔人甚异之，复前行，欲穷其林。林尽水源，便得一山，山有小口，仿佛若有光。便舍船，从口入。初极狭，才通人。复行数十步，豁然开朗。土地平旷，屋舍俨然，有良田美池桑竹之属。阡陌交通，鸡犬相闻。其中往来种作，男女衣着，悉如外人。黄发垂髫，并怡然自乐。见渔人，乃大惊，问所从来。具答之。便要还家，设酒杀鸡作食。村中闻有此人，咸来问讯。自云先世避秦时乱，率妻子邑人来此绝境，不复出焉，遂与外人间隔。问今是何世，乃不知有汉，无论魏晋。此人一一为具言所闻，皆叹惋。余人各复延至其家，皆出酒食。停数日，辞去。此中人语云：“不足为外人道也。”',
};
export default {
  'GET /api/tableList': (req, res) => {
    setTimeout(() => {
      res.send(novels);
    }, 10);
  },
  'GET /api/chapters': (req, res) => {
    setTimeout(() => {
      res.send(getChapterList());
    }, 10);
  },
  'GET /api/chapterDetail': (req, res) => {
    setTimeout(() => {
      res.send(content);
    }, 10);
  },
};
