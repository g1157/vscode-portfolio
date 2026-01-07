export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  date: string;
  tags: string[];
  cover?: string;
}

export const articles: Article[] = [
  {
    id: 29,
    title: '沉默的主角',
    description: '关于播客、工程师思维方式与职场成长的思考',
    url: 'https://blog.117911.xyz/posts/29-沉默的主角',
    date: '2025-12-14',
    tags: ['播客', '工程师', '思维方式'],
    cover: 'https://gcore.jsdelivr.net/gh/p1157/blog-img@main/cos3.webp',
  },
  {
    id: 28,
    title: 'Zootopia II',
    description: '疯狂动物城2影评 - 关于友情与冒险',
    url: 'https://blog.117911.xyz/posts/28-Zootopia-II',
    date: '2025-11-30',
    tags: ['动画电影', '影评', '疯狂动物城'],
    cover: 'https://gcore.jsdelivr.net/gh/p1157/blog-img@main/zoo2.webp',
  },
  {
    id: 27,
    title: '羁绊者',
    description: '关于动漫中的羁绊、青春与人际关系',
    url: 'https://blog.117911.xyz/posts/27-羁绊者',
    date: '2025-11-28',
    tags: ['动漫', '羁绊', '青春'],
    cover: 'https://gcore.jsdelivr.net/gh/p1157/blog-img@main/jibanzhe%20(11).webp',
  },
  {
    id: 26,
    title: '真物',
    description: '仍在疑惑 - 关于真实的思考',
    url: 'https://blog.117911.xyz/posts/26-真物',
    date: '2025-11-23',
    tags: ['真实', 'Life'],
    cover: 'https://gcore.jsdelivr.net/gh/p1157/blog-img@main/%E6%9E%9C%E7%84%B6%E6%88%91%E7%9A%84%E9%9D%92%E6%98%A5%E6%88%80%E6%84%9B%E5%96%9C%E5%8A%87%E6%90%9E%E9%8C%AF%E4%BA%86250.webp',
  },
  {
    id: 25,
    title: 'Space Cowboy 星际牛仔',
    description: '一部让我在各个方面都很喜欢的动漫，立刻就进入了个人喜欢的历史前二',
    url: 'https://blog.117911.xyz/posts/25-星际牛仔',
    date: '2025-11-23',
    tags: ['动漫', '星际牛仔', '科幻', '经典'],
    cover: 'https://gcore.jsdelivr.net/gh/p1157/blog-img@main/cowboy.webp',
  },
  {
    id: 24,
    title: 'ラヴレター 情书',
    description: '日本电影《情书》影评 - 关于青春与爱情',
    url: 'https://blog.117911.xyz/posts/24-ラヴレター',
    date: '2025-06-17',
    tags: ['日本电影', '情书', '影评', '爱情'],
    cover: 'https://gcore.jsdelivr.net/gh/p1157/blog-img@main/p2922046305.webp',
  },
];
