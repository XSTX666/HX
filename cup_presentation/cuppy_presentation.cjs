const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 16:9
pptx.title = "杯子小子的大冒险";
pptx.author = "Cuppy老师";

// 儿童友好的配色方案
const COLORS = {
  primary: "FF6B6B",      // 珊瑚红 - 主色
  secondary: "4ECDC4",    // 青绿色 - 次色
  accent: "FFE66D",       // 明黄色 - 强调
  dark: "2C3E50",         // 深蓝灰 - 文字
  light: "F8F9FA",        // 浅灰 - 背景
  white: "FFFFFF",
  pink: "FF8ED4",         // 粉色
  orange: "FFA07A",        // 橙色
  blue: "74B9FF",          // 蓝色
  green: "55EFC4",        // 绿色
  purple: "A29BFE"        // 紫色
};

// 创建阴影的工厂函数
const makeShadow = () => ({
  type: "outer",
  color: "000000",
  blur: 8,
  offset: 3,
  angle: 135,
  opacity: 0.2
});

// ==================== 第1部分：开场介绍 ====================

// Slide 1: 封面
let slide1 = pptx.addSlide();
slide1.background = { color: COLORS.primary };
slide1.addText("杯子小子的大冒险", {
  x: 0.5, y: 1.5, w: 9, h: 1.2,
  fontSize: 54, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide1.addText("—— 一场关于杯子的神奇旅程", {
  x: 0.5, y: 2.8, w: 9, h: 0.6,
  fontSize: 28, fontFace: "Microsoft YaHei",
  color: COLORS.accent, align: "center"
});
slide1.addText("👋 大家好！", {
  x: 0.5, y: 4.2, w: 9, h: 0.8,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
// 装饰圆形
slide1.addShape("ellipse", { x: 0.3, y: 0.3, w: 1, h: 1, fill: { color: COLORS.accent, transparency: 30 } });
slide1.addShape("ellipse", { x: 8.5, y: 4.5, w: 1.2, h: 1.2, fill: { color: COLORS.secondary, transparency: 30 } });

// Slide 2: 自我介绍 - 认识Cuppy
let slide2 = pptx.addSlide();
slide2.background = { color: COLORS.light };
slide2.addText("👋 认识一下我的朋友", {
  x: 0.5, y: 0.3, w: 9, h: 0.8,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.primary, align: "center"
});
// Cuppy卡通形象区域
slide2.addShape("ellipse", { x: 3.5, y: 1.3, w: 3, h: 3, fill: { color: COLORS.secondary }, shadow: makeShadow() });
slide2.addText("Cuppy", {
  x: 3.5, y: 2.2, w: 3, h: 1,
  fontSize: 42, fontFace: "Arial", bold: true,
  color: COLORS.white, align: "center"
});
slide2.addText("💧", {
  x: 3.5, y: 1.5, w: 3, h: 0.8,
  fontSize: 36, align: "center"
});
// 自我介绍文字
slide2.addText([
  { text: "大家好！我叫Cuppy！", options: { breakLine: true } },
  { text: "是一个来自杯子王国的快乐小杯子~", options: { breakLine: true } },
  { text: "今天我要带大家去冒险！", options: {} }
], {
  x: 0.5, y: 4.5, w: 9, h: 1.2,
  fontSize: 24, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center", lineSpaceMult: 1.5
});

// Slide 3: 故事开始
let slide3 = pptx.addSlide();
slide3.background = { color: COLORS.accent };
slide3.addText("📖 故事开始啦！", {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 40, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.dark, align: "center"
});
slide3.addShape("roundRect", {
  x: 1, y: 1.6, w: 8, h: 3.5,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.2
});
slide3.addText([
  { text: "在一个美丽的早晨，", options: { breakLine: true } },
  { text: "杯子小子Cuppy从梦中醒来……", options: { breakLine: true } },
  { text: "", options: { breakLine: true } },
  { text: "他发现自己的家里有好多好多不同的杯子！", options: { breakLine: true } },
  { text: "每个杯子都有自己的故事……", options: {} }
], {
  x: 1.3, y: 1.9, w: 7.4, h: 3,
  fontSize: 26, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center", lineSpaceMult: 1.4
});

// ==================== 第2部分：厨房探险 ====================

// Slide 4: 章节页 - 厨房探险
let slide4 = pptx.addSlide();
slide4.background = { color: COLORS.secondary };
slide4.addText("🏠 第一站", {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide4.addText("杯子家族的厨房", {
  x: 0.5, y: 2.3, w: 9, h: 1,
  fontSize: 48, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide4.addText("🍳", {
  x: 0.5, y: 3.5, w: 9, h: 1,
  fontSize: 64, align: "center"
});

// Slide 5: 厨房里的杯子
let slide5 = pptx.addSlide();
slide5.background = { color: COLORS.light };
slide5.addText("🥛 厨房里的杯子家族", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.secondary, align: "center"
});
// 展示不同的杯子
const kitchenCups = [
  { emoji: "🥛", name: "牛奶杯", color: COLORS.blue },
  { emoji: "🥤", name: "饮料杯", color: COLORS.green },
  { emoji: "☕", name: "咖啡杯", color: COLORS.orange },
  { emoji: "🍵", name: "茶杯", color: COLORS.purple }
];
kitchenCups.forEach((cup, i) => {
  const x = 0.8 + i * 2.3;
  slide5.addShape("roundRect", {
    x: x, y: 1.3, w: 2, h: 2.8,
    fill: { color: cup.color }, shadow: makeShadow(),
    rectRadius: 0.15
  });
  slide5.addText(cup.emoji, {
    x: x, y: 1.5, w: 2, h: 1.5,
    fontSize: 48, align: "center"
  });
  slide5.addText(cup.name, {
    x: x, y: 3.2, w: 2, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei", bold: true,
    color: COLORS.white, align: "center"
  });
});
slide5.addText("每个杯子都有自己特别的用处哦！", {
  x: 0.5, y: 4.4, w: 9, h: 0.5,
  fontSize: 22, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// Slide 6: 玻璃杯
let slide6 = pptx.addSlide();
slide6.background = { color: COLORS.light };
slide6.addShape("ellipse", { x: -1, y: -1, w: 4, h: 4, fill: { color: COLORS.blue, transparency: 20 } });
slide6.addText("🔍 玻璃杯的秘密", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.blue, align: "center"
});
slide6.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 4.3, h: 4,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide6.addText("🔮", {
  x: 0.5, y: 1.5, w: 4.3, h: 1.5,
  fontSize: 72, align: "center"
});
slide6.addText([
  { text: "玻璃杯的特点：", options: { bold: true, breakLine: true } },
  { text: "✨ 透明的，能看到里面", options: { breakLine: true } },
  { text: "✨ 滑滑的，很光滑", options: { breakLine: true } },
  { text: "✨ 晶晶亮亮的", options: { breakLine: true } },
  { text: "✨ 用完要轻轻洗", options: {} }
], {
  x: 0.8, y: 3.2, w: 3.7, h: 1.8,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.3
});
slide6.addShape("roundRect", {
  x: 5.2, y: 1.2, w: 4.3, h: 4,
  fill: { color: COLORS.blue }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide6.addText("🏺", {
  x: 5.2, y: 1.5, w: 4.3, h: 1.5,
  fontSize: 72, align: "center"
});
slide6.addText([
  { text: "Cuppy说：", options: { bold: true, breakLine: true } },
  { text: "玻璃杯像水晶一样漂亮！", options: { breakLine: true } },
  { text: "但是要小心不要摔破哦，", options: { breakLine: true } },
  { text: "碎玻璃会割伤小手的！", options: {} }
], {
  x: 5.5, y: 3.2, w: 3.7, h: 1.8,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.white, lineSpaceMult: 1.3
});

// Slide 7: 塑料杯
let slide7 = pptx.addSlide();
slide7.background = { color: COLORS.light };
slide7.addShape("ellipse", { x: 6, y: -1, w: 4, h: 4, fill: { color: COLORS.green, transparency: 20 } });
slide7.addText("🔍 塑料杯的神奇", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.green, align: "center"
});
slide7.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 4.3, h: 4,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide7.addText("🛍️", {
  x: 0.5, y: 1.5, w: 4.3, h: 1.5,
  fontSize: 72, align: "center"
});
slide7.addText([
  { text: "塑料杯的特点：", options: { bold: true, breakLine: true } },
  { text: "💪 摔不破，很坚固", options: { breakLine: true } },
  { text: "🎨 颜色五彩缤纷", options: { breakLine: true } },
  { text: "🪶 轻轻的，拿起来不累", options: { breakLine: true } },
  { text: "♻️ 可以回收再利用", options: {} }
], {
  x: 0.8, y: 3.2, w: 3.7, h: 1.8,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.3
});
slide7.addShape("roundRect", {
  x: 5.2, y: 1.2, w: 4.3, h: 4,
  fill: { color: COLORS.green }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide7.addText("🎈", {
  x: 5.2, y: 1.5, w: 4.3, h: 1.5,
  fontSize: 72, align: "center"
});
slide7.addText([
  { text: "Cuppy说：", options: { bold: true, breakLine: true } },
  { text: "塑料杯很适合出去玩的时候用！", options: { breakLine: true } },
  { text: "而且上面还可以印", options: { breakLine: true } },
  { text: "好多可爱的图案呢！", options: {} }
], {
  x: 5.5, y: 3.2, w: 3.7, h: 1.8,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.white, lineSpaceMult: 1.3
});

// Slide 8: 陶瓷杯
let slide8 = pptx.addSlide();
slide8.background = { color: COLORS.light };
slide8.addShape("ellipse", { x: -1, y: 3, w: 4, h: 4, fill: { color: COLORS.orange, transparency: 20 } });
slide8.addText("🔍 陶瓷杯的温暖", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.orange, align: "center"
});
slide8.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 4.3, h: 4,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide8.addText("🏺", {
  x: 0.5, y: 1.5, w: 4.3, h: 1.5,
  fontSize: 72, align: "center"
});
slide8.addText([
  { text: "陶瓷杯的特点：", options: { bold: true, breakLine: true } },
  { text: "🎨 上面有漂亮的图案", options: { breakLine: true } },
  { text: "☕ 保温效果很好", options: { breakLine: true } },
  { text: "💝 摸起来暖暖的", options: { breakLine: true } },
  { text: "✨ 很有中国传统文化", options: {} }
], {
  x: 0.8, y: 3.2, w: 3.7, h: 1.8,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.3
});
slide8.addShape("roundRect", {
  x: 5.2, y: 1.2, w: 4.3, h: 4,
  fill: { color: COLORS.orange }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide8.addText("☕", {
  x: 5.2, y: 1.5, w: 4.3, h: 1.5,
  fontSize: 72, align: "center"
});
slide8.addText([
  { text: "Cuppy说：", options: { bold: true, breakLine: true } },
  { text: "陶瓷杯最适合喝热热的饮品！", options: { breakLine: true } },
  { text: "冬天捧着它，手都暖暖的~", options: {} }
], {
  x: 5.5, y: 3.2, w: 3.7, h: 1.8,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.white, lineSpaceMult: 1.3
});

// Slide 9: 纸杯
let slide9 = pptx.addSlide();
slide9.background = { color: COLORS.light };
slide9.addShape("ellipse", { x: 6, y: 3, w: 4, h: 4, fill: { color: COLORS.purple, transparency: 20 } });
slide9.addText("🔍 纸杯的本领", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.purple, align: "center"
});
slide9.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 4.3, h: 4,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide9.addText("📄", {
  x: 0.5, y: 1.5, w: 4.3, h: 1.5,
  fontSize: 72, align: "center"
});
slide9.addText([
  { text: "纸杯的特点：", options: { bold: true, breakLine: true } },
  { text: "🌿 用完可以扔掉", options: { breakLine: true } },
  { text: "🤗 用起来很方便", options: { breakLine: true } },
  { text: "📝 上面可以画画写字", options: { breakLine: true } },
  { text: "🧹 卫生又干净", options: {} }
], {
  x: 0.8, y: 3.2, w: 3.7, h: 1.8,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.3
});
slide9.addShape("roundRect", {
  x: 5.2, y: 1.2, w: 4.3, h: 4,
  fill: { color: COLORS.purple }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide9.addText("🎂", {
  x: 5.2, y: 1.5, w: 4.3, h: 1.5,
  fontSize: 72, align: "center"
});
slide9.addText([
  { text: "Cuppy说：", options: { bold: true, breakLine: true } },
  { text: "开派对的时候纸杯最有用啦！", options: { breakLine: true } },
  { text: "而且还可以自己装饰哦~", options: {} }
], {
  x: 5.5, y: 3.2, w: 3.7, h: 1.8,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.white, lineSpaceMult: 1.3
});

// ==================== 第3部分：饮品世界 ====================

// Slide 10: 章节页 - 饮品世界
let slide10 = pptx.addSlide();
slide10.background = { color: COLORS.blue };
slide10.addText("🥤 第二站", {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide10.addText("神奇的饮品世界", {
  x: 0.5, y: 2.3, w: 9, h: 1,
  fontSize: 48, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide10.addText("💧🍎🥛☕", {
  x: 0.5, y: 3.5, w: 9, h: 1,
  fontSize: 48, align: "center"
});

// Slide 11: 水杯
let slide11 = pptx.addSlide();
slide11.background = { color: COLORS.light };
slide11.addText("💧 杯子和水", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.blue, align: "center"
});
slide11.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 9, h: 2.5,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide11.addText("💧", {
  x: 0.8, y: 1.4, w: 2, h: 2,
  fontSize: 80, align: "center"
});
slide11.addText([
  { text: "水是生命之源！", options: { bold: true, breakLine: true } },
  { text: "每天我们要喝6-8杯水哦！", options: { breakLine: true } },
  { text: "水可以帮助我们：", options: { breakLine: true } },
  { text: "🧠 更聪明   🏃 更有力气   💪 不生病", options: {} }
], {
  x: 3, y: 1.5, w: 6.3, h: 2,
  fontSize: 22, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.4
});
slide11.addShape("roundRect", {
  x: 0.5, y: 4, w: 9, h: 1.5,
  fill: { color: COLORS.blue, transparency: 20 },
  rectRadius: 0.15
});
slide11.addText("Cuppy提醒：多喝水可以变聪明哦！记得口渴了就要喝水！", {
  x: 0.8, y: 4.3, w: 8.4, h: 1,
  fontSize: 20, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// Slide 12: 牛奶杯
let slide12 = pptx.addSlide();
slide12.background = { color: COLORS.light };
slide12.addText("🥛 杯子和牛奶", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide12.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 9, h: 2.5,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide12.addText("🥛", {
  x: 0.8, y: 1.4, w: 2, h: 2,
  fontSize: 80, align: "center"
});
slide12.addText([
  { text: "牛奶是营养宝库！", options: { bold: true, breakLine: true } },
  { text: "牛奶里有：", options: { breakLine: true } },
  { text: "🦴 钙 - 让骨头更结实", options: { breakLine: true } },
  { text: "🧠 蛋白质 - 让大脑更聪明", options: {} }
], {
  x: 3, y: 1.5, w: 6.3, h: 2,
  fontSize: 22, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.4
});
slide12.addShape("roundRect", {
  x: 0.5, y: 4, w: 9, h: 1.5,
  fill: { color: COLORS.blue, transparency: 20 },
  rectRadius: 0.15
});
slide12.addText("Cuppy提醒：每天一杯奶，身体棒棒哒！", {
  x: 0.8, y: 4.3, w: 8.4, h: 1,
  fontSize: 20, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// Slide 13: 果汁杯
let slide13 = pptx.addSlide();
slide13.background = { color: COLORS.light };
slide13.addText("🍎 杯子和果汁", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.primary, align: "center"
});
slide13.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 9, h: 2.5,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide13.addText("🍹", {
  x: 0.8, y: 1.4, w: 2, h: 2,
  fontSize: 80, align: "center"
});
slide13.addText([
  { text: "果汁甜甜的真好喝！", options: { bold: true, breakLine: true } },
  { text: "水果里有：", options: { breakLine: true } },
  { text: "🍊 维生素C - 让皮肤美美的", options: { breakLine: true } },
  { text: "🍌 纤维 - 让肚子更舒服", options: {} }
], {
  x: 3, y: 1.5, w: 6.3, h: 2,
  fontSize: 22, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.4
});
slide13.addShape("roundRect", {
  x: 0.5, y: 4, w: 9, h: 1.5,
  fill: { color: COLORS.primary, transparency: 20 },
  rectRadius: 0.15
});
slide13.addText("Cuppy提醒：果汁虽好，但也要多吃新鲜水果哦！", {
  x: 0.8, y: 4.3, w: 8.4, h: 1,
  fontSize: 20, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// Slide 14: 热饮杯
let slide14 = pptx.addSlide();
slide14.background = { color: COLORS.light };
slide14.addText("☕ 杯子和热饮", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.orange, align: "center"
});
slide14.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 9, h: 2.5,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide14.addText("🍫", {
  x: 0.8, y: 1.4, w: 2, h: 2,
  fontSize: 80, align: "center"
});
slide14.addText([
  { text: "热热的一杯，暖暖的心~", options: { bold: true, breakLine: true } },
  { text: "冬天可以喝：", options: { breakLine: true } },
  { text: "☕ 热可可（小朋友要少喝哦）", options: { breakLine: true } },
  { text: "🍵 暖暖的蜂蜜水", options: {} }
], {
  x: 3, y: 1.5, w: 6.3, h: 2,
  fontSize: 22, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.4
});
slide14.addShape("roundRect", {
  x: 0.5, y: 4, w: 9, h: 1.5,
  fill: { color: COLORS.orange, transparency: 20 },
  rectRadius: 0.15
});
slide14.addText("Cuppy提醒：热饮很暖，但要注意安全，不要烫到自己！", {
  x: 0.8, y: 4.3, w: 8.4, h: 1,
  fontSize: 20, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// ==================== 第4部分：世界各地的杯子 ====================

// Slide 15: 章节页 - 世界各地
let slide15 = pptx.addSlide();
slide15.background = { color: COLORS.purple };
slide15.addText("🌍 第三站", {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide15.addText("世界各地的杯子", {
  x: 0.5, y: 2.3, w: 9, h: 1,
  fontSize: 48, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide15.addText("🏺🎎🥡🇨🇳", {
  x: 0.5, y: 3.5, w: 9, h: 1,
  fontSize: 48, align: "center"
});

// Slide 16: 中国茶杯
let slide16 = pptx.addSlide();
slide16.background = { color: COLORS.light };
slide16.addText("🇨🇳 中国的茶杯", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.primary, align: "center"
});
slide16.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 9, h: 4.2,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide16.addText("🍵", {
  x: 0.8, y: 1.5, w: 2.5, h: 2,
  fontSize: 80, align: "center"
});
slide16.addText([
  { text: "中国是茶的故乡！", options: { bold: true, breakLine: true } },
  { text: "🇨🇳 中国人喝茶有几千年的历史", options: { breakLine: true } },
  { text: "🍵 喝茶可以提神、解渴", options: { breakLine: true } },
  { text: "👵 喝杯茶，休息一下", options: { breakLine: true } },
  { text: "", options: { breakLine: true } },
  { text: "茶道是一种很重要的文化哦！", options: {} }
], {
  x: 3.5, y: 1.6, w: 5.8, h: 3.5,
  fontSize: 20, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.4
});

// Slide 17: 日本茶碗
let slide17 = pptx.addSlide();
slide17.background = { color: COLORS.light };
slide17.addText("🇯🇵 日本的茶碗", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.pink, align: "center"
});
slide17.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 9, h: 4.2,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide17.addText("🍵", {
  x: 0.8, y: 1.5, w: 2.5, h: 2,
  fontSize: 80, align: "center"
});
slide17.addText([
  { text: "日本茶道很特别！", options: { bold: true, breakLine: true } },
  { text: "🇯🇵 日本人喝茶很讲究仪式感", options: { breakLine: true } },
  { text: "🎎 茶碗很有艺术感", options: { breakLine: true } },
  { text: "🙏 喝茶时要安静、有礼貌", options: { breakLine: true } },
  { text: "", options: { breakLine: true } },
  { text: "他们还会用抹茶做抹茶蛋糕呢！", options: {} }
], {
  x: 3.5, y: 1.6, w: 5.8, h: 3.5,
  fontSize: 20, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.4
});

// Slide 18: 欧洲咖啡杯
let slide18 = pptx.addSlide();
slide18.background = { color: COLORS.light };
slide18.addText("🇪🇺 欧洲的咖啡杯", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.orange, align: "center"
});
slide18.addShape("roundRect", {
  x: 0.5, y: 1.2, w: 9, h: 4.2,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide18.addText("☕", {
  x: 0.8, y: 1.5, w: 2.5, h: 2,
  fontSize: 80, align: "center"
});
slide18.addText([
  { text: "欧洲人喜欢喝咖啡！", options: { bold: true, breakLine: true } },
  { text: "🇫🇷 法国人喜欢小小的浓缩咖啡", options: { breakLine: true } },
  { text: "🇮🇹 意大利人有漂亮的浓缩咖啡杯", options: { breakLine: true } },
  { text: "🎨 欧洲的杯子图案很精致", options: { breakLine: true } },
  { text: "", options: { breakLine: true } },
  { text: "不过小朋友要少喝咖啡哦！", options: {} }
], {
  x: 3.5, y: 1.6, w: 5.8, h: 3.5,
  fontSize: 20, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.4
});

// ==================== 第5部分：杯子的诞生 ====================

// Slide 19: 章节页 - 杯子的诞生
let slide19 = pptx.addSlide();
slide19.background = { color: COLORS.green };
slide19.addText("🏭 第四站", {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide19.addText("杯子是怎样诞生的", {
  x: 0.5, y: 2.3, w: 9, h: 1,
  fontSize: 48, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide19.addText("🔨🏗️⚙️", {
  x: 0.5, y: 3.5, w: 9, h: 1,
  fontSize: 48, align: "center"
});

// Slide 20: 制作玻璃杯
let slide20 = pptx.addSlide();
slide20.background = { color: COLORS.light };
slide20.addText("🔮 玻璃杯的制作", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.blue, align: "center"
});
const glassSteps = [
  { emoji: "⛰️", text: "第一步：\n挖出沙子" },
  { emoji: "🔥", text: "第二步：\n高温熔化" },
  { emoji: "👄", text: "第三步：\n吹出形状" },
  { emoji: "❄️", text: "第四步：\n冷却成型" }
];
glassSteps.forEach((step, i) => {
  const x = 0.5 + i * 2.4;
  slide20.addShape("roundRect", {
    x: x, y: 1.2, w: 2.2, h: 3.5,
    fill: { color: COLORS.blue }, shadow: makeShadow(),
    rectRadius: 0.15
  });
  slide20.addText(step.emoji, {
    x: x, y: 1.4, w: 2.2, h: 1.2,
    fontSize: 48, align: "center"
  });
  slide20.addText(step.text, {
    x: x, y: 2.8, w: 2.2, h: 1.5,
    fontSize: 16, fontFace: "Microsoft YaHei", bold: true,
    color: COLORS.white, align: "center"
  });
});
slide20.addText("沙子经过1000多度的高温，就能变成透明的玻璃啦！", {
  x: 0.5, y: 4.9, w: 9, h: 0.6,
  fontSize: 18, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// Slide 21: 制作陶瓷杯
let slide21 = pptx.addSlide();
slide21.background = { color: COLORS.light };
slide21.addText("🏺 陶瓷杯的制作", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.orange, align: "center"
});
const ceramicSteps = [
  { emoji: "🟤", text: "第一步：\n揉泥巴" },
  { emoji: "🎨", text: "第二步：\n做成杯子形" },
  { emoji: "🎨", text: "第三步：\n画上图案" },
  { emoji: "🔥", text: "第四步：\n烧制成型" }
];
ceramicSteps.forEach((step, i) => {
  const x = 0.5 + i * 2.4;
  slide21.addShape("roundRect", {
    x: x, y: 1.2, w: 2.2, h: 3.5,
    fill: { color: COLORS.orange }, shadow: makeShadow(),
    rectRadius: 0.15
  });
  slide21.addText(step.emoji, {
    x: x, y: 1.4, w: 2.2, h: 1.2,
    fontSize: 48, align: "center"
  });
  slide21.addText(step.text, {
    x: x, y: 2.8, w: 2.2, h: 1.5,
    fontSize: 16, fontFace: "Microsoft YaHei", bold: true,
    color: COLORS.white, align: "center"
  });
});
slide21.addText("陶瓷需要烧制两次才能变得又硬又漂亮！", {
  x: 0.5, y: 4.9, w: 9, h: 0.6,
  fontSize: 18, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// Slide 22: 制作塑料杯
let slide22 = pptx.addSlide();
slide22.background = { color: COLORS.light };
slide22.addText("🛍️ 塑料杯的制作", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.green, align: "center"
});
const plasticSteps = [
  { emoji: "🛢️", text: "第一步：\n石油变成塑料粒" },
  { emoji: "🌡️", text: "第二步：\n加热融化" },
  { emoji: "📦", text: "第三步：\n压进模具" },
  { emoji: "❄️", text: "第四步：\n冷却完成" }
];
plasticSteps.forEach((step, i) => {
  const x = 0.5 + i * 2.4;
  slide22.addShape("roundRect", {
    x: x, y: 1.2, w: 2.2, h: 3.5,
    fill: { color: COLORS.green }, shadow: makeShadow(),
    rectRadius: 0.15
  });
  slide22.addText(step.emoji, {
    x: x, y: 1.4, w: 2.2, h: 1.2,
    fontSize: 48, align: "center"
  });
  slide22.addText(step.text, {
    x: x, y: 2.8, w: 2.2, h: 1.5,
    fontSize: 16, fontFace: "Microsoft YaHei", bold: true,
    color: COLORS.white, align: "center"
  });
});
slide22.addText("塑料杯是用石油做成的，很轻但也很耐用！", {
  x: 0.5, y: 4.9, w: 9, h: 0.6,
  fontSize: 18, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// ==================== 第6部分：爱护杯子 ====================

// Slide 23: 章节页 - 爱护杯子
let slide23 = pptx.addSlide();
slide23.background = { color: COLORS.accent };
slide23.addText("💝 第五站", {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});
slide23.addText("怎样爱护我们的杯子", {
  x: 0.5, y: 2.3, w: 9, h: 1,
  fontSize: 48, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.dark, align: "center"
});
slide23.addText("💧🧹✨", {
  x: 0.5, y: 3.5, w: 9, h: 1,
  fontSize: 48, align: "center"
});

// Slide 24: 如何清洁杯子
let slide24 = pptx.addSlide();
slide24.background = { color: COLORS.light };
slide24.addText("🧹 怎样清洗杯子", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.secondary, align: "center"
});
const cleanSteps = [
  { emoji: "💧", text: "用清水冲洗\n把脏东西冲掉" },
  { emoji: "🧴", text: "挤点洗洁精\n打出泡泡" },
  { emoji: "🧽", text: "用海绵刷刷\n里里外外都刷到" },
  { emoji: "💧", text: "用清水冲干净\n泡泡都要冲掉" }
];
cleanSteps.forEach((step, i) => {
  const x = 0.5 + i * 2.4;
  slide24.addShape("roundRect", {
    x: x, y: 1.2, w: 2.2, h: 3.2,
    fill: { color: COLORS.secondary }, shadow: makeShadow(),
    rectRadius: 0.15
  });
  slide24.addText(step.emoji, {
    x: x, y: 1.4, w: 2.2, h: 1.2,
    fontSize: 48, align: "center"
  });
  slide24.addText(step.text, {
    x: x, y: 2.7, w: 2.2, h: 1.5,
    fontSize: 14, fontFace: "Microsoft YaHei", bold: true,
    color: COLORS.white, align: "center"
  });
});
slide24.addText("每次用完杯子都要洗干净，这样才卫生哦！", {
  x: 0.5, y: 4.6, w: 9, h: 0.6,
  fontSize: 18, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// Slide 25: 杯子的注意事项
let slide25 = pptx.addSlide();
slide25.background = { color: COLORS.light };
slide25.addText("⚠️ 使用杯子的安全常识", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.primary, align: "center"
});
slide25.addShape("roundRect", {
  x: 0.5, y: 1.1, w: 4.3, h: 2.2,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide25.addText("✅ 正确做法", {
  x: 0.5, y: 1.2, w: 4.3, h: 0.5,
  fontSize: 20, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.green, align: "center"
});
slide25.addText([
  { text: "✔️ 拿杯子要握稳", options: { breakLine: true } },
  { text: "✔️ 热饮要等凉一点再喝", options: { breakLine: true } },
  { text: "✔️ 玻璃杯要轻拿轻放", options: { breakLine: true } },
  { text: "✔️ 自己的杯子自己用", options: {} }
], {
  x: 0.8, y: 1.8, w: 3.7, h: 1.4,
  fontSize: 14, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.3
});
slide25.addShape("roundRect", {
  x: 5.2, y: 1.1, w: 4.3, h: 2.2,
  fill: { color: COLORS.white }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide25.addText("❌ 危险做法", {
  x: 5.2, y: 1.2, w: 4.3, h: 0.5,
  fontSize: 20, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.primary, align: "center"
});
slide25.addText([
  { text: "✖️ 不要用杯子打闹", options: { breakLine: true } },
  { text: "✖️ 不要装太烫的水", options: { breakLine: true } },
  { text: "✖️ 不要咬杯子", options: { breakLine: true } },
  { text: "✖️ 不要互相喝别人的水", options: {} }
], {
  x: 5.5, y: 1.8, w: 3.7, h: 1.4,
  fontSize: 14, fontFace: "Microsoft YaHei",
  color: COLORS.dark, lineSpaceMult: 1.3
});
// 底部提示
slide25.addShape("roundRect", {
  x: 0.5, y: 3.5, w: 9, h: 2,
  fill: { color: COLORS.primary, transparency: 10 },
  rectRadius: 0.15
});
slide25.addText("💡 Cuppy的安全小贴士", {
  x: 0.5, y: 3.6, w: 9, h: 0.5,
  fontSize: 18, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.primary, align: "center"
});
slide25.addText("小朋友使用杯子时，一定要有大人帮忙哦！\n尤其是装热水或者用玻璃杯的时候！", {
  x: 0.8, y: 4.2, w: 8.4, h: 1.2,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.dark, align: "center"
});

// ==================== 第7部分：环保与回收 ====================

// Slide 26: 章节页 - 环保
let slide26 = pptx.addSlide();
slide26.background = { color: COLORS.green };
slide26.addText("🌱 第六站", {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide26.addText("环保小卫士", {
  x: 0.5, y: 2.3, w: 9, h: 1,
  fontSize: 48, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide26.addText("♻️🌍💚", {
  x: 0.5, y: 3.5, w: 9, h: 1,
  fontSize: 48, align: "center"
});

// Slide 27: 回收利用
let slide27 = pptx.addSlide();
slide27.background = { color: COLORS.light };
slide27.addText("♻️ 杯子的回收利用", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.green, align: "center"
});
slide27.addShape("roundRect", {
  x: 0.5, y: 1.1, w: 4.3, h: 4.3,
  fill: { color: COLORS.blue }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide27.addText("🔵 塑料杯回收", {
  x: 0.5, y: 1.3, w: 4.3, h: 0.6,
  fontSize: 22, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide27.addText([
  { text: "塑料杯可以回收哦！", options: { breakLine: true } },
  { text: "", options: { breakLine: true } },
  { text: "♻️ 回收后的塑料", options: { breakLine: true } },
  { text: "可以做成：", options: { breakLine: true } },
  { text: "🎒 新书包", options: { breakLine: true } },
  { text: "👟 运动鞋", options: { breakLine: true } },
  { text: "🛋️ 塑料椅子", options: {} }
], {
  x: 0.8, y: 2, w: 3.7, h: 3.2,
  fontSize: 18, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center", lineSpaceMult: 1.3
});
slide27.addShape("roundRect", {
  x: 5.2, y: 1.1, w: 4.3, h: 4.3,
  fill: { color: COLORS.orange }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide27.addText("🟤 纸杯回收", {
  x: 5.2, y: 1.3, w: 4.3, h: 0.6,
  fontSize: 22, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide27.addText([
  { text: "纸杯也可以回收！", options: { breakLine: true } },
  { text: "", options: { breakLine: true } },
  { text: "♻️ 回收后的纸", options: { breakLine: true } },
  { text: "可以做成：", options: { breakLine: true } },
  { text: "📝 新的纸", options: { breakLine: true } },
  { text: "📚 笔记本", options: { breakLine: true } },
  { text: "📦 纸箱", options: {} }
], {
  x: 5.5, y: 2, w: 3.7, h: 3.2,
  fontSize: 18, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center", lineSpaceMult: 1.3
});

// Slide 28: 环保行动
let slide28 = pptx.addSlide();
slide28.background = { color: COLORS.light };
slide28.addText("🌍 我们可以做什么", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.green, align: "center"
});
const ecoActions = [
  { emoji: "💧", text: "喝水杯\n省纸张" },
  { emoji: "🔄", text: "多次使用\n水杯" },
  { emoji: "♻️", text: "分类投放\n垃圾桶" },
  { emoji: "🌳", text: "多种树\n保护地球" }
];
ecoActions.forEach((action, i) => {
  const x = 0.5 + i * 2.4;
  slide28.addShape("roundRect", {
    x: x, y: 1.2, w: 2.2, h: 3,
    fill: { color: COLORS.green }, shadow: makeShadow(),
    rectRadius: 0.15
  });
  slide28.addText(action.emoji, {
    x: x, y: 1.4, w: 2.2, h: 1.2,
    fontSize: 48, align: "center"
  });
  slide28.addText(action.text, {
    x: x, y: 2.7, w: 2.2, h: 1.3,
    fontSize: 16, fontFace: "Microsoft YaHei", bold: true,
    color: COLORS.white, align: "center"
  });
});
slide28.addShape("roundRect", {
  x: 0.5, y: 4.4, w: 9, h: 1.1,
  fill: { color: COLORS.accent },
  rectRadius: 0.15
});
slide28.addText("💚 保护环境，从我做起！从小事做起！", {
  x: 0.5, y: 4.6, w: 9, h: 0.8,
  fontSize: 24, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.dark, align: "center"
});

// ==================== 第8部分：趣味知识 ====================

// Slide 29: 章节页 - 有趣的知识
let slide29 = pptx.addSlide();
slide29.background = { color: COLORS.pink };
slide29.addText("🤓 第七站", {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide29.addText("杯子趣味小知识", {
  x: 0.5, y: 2.3, w: 9, h: 1,
  fontSize: 48, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide29.addText("🤓💡🎉", {
  x: 0.5, y: 3.5, w: 9, h: 1,
  fontSize: 48, align: "center"
});

// Slide 30: 有趣的杯子之最
let slide30 = pptx.addSlide();
slide30.background = { color: COLORS.light };
slide30.addText("🏆 杯子世界之最", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.purple, align: "center"
});
slide30.addShape("roundRect", {
  x: 0.5, y: 1.1, w: 4.3, h: 2,
  fill: { color: COLORS.purple }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide30.addText("🦕 最大的杯子", {
  x: 0.5, y: 1.2, w: 4.3, h: 0.5,
  fontSize: 18, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide30.addText("有一个杯子\n比一头大象还高！\n有3米多高呢！", {
  x: 0.8, y: 1.8, w: 3.7, h: 1.2,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide30.addShape("roundRect", {
  x: 5.2, y: 1.1, w: 4.3, h: 2,
  fill: { color: COLORS.blue }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide30.addText("🐜 最小的杯子", {
  x: 5.2, y: 1.2, w: 4.3, h: 0.5,
  fontSize: 18, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide30.addText("有的杯子小到\n要用放大镜\n才能看清楚！", {
  x: 5.5, y: 1.8, w: 3.7, h: 1.2,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide30.addShape("roundRect", {
  x: 0.5, y: 3.3, w: 4.3, h: 2,
  fill: { color: COLORS.orange }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide30.addText("🏺 最早使用杯子", {
  x: 0.5, y: 3.4, w: 4.3, h: 0.5,
  fontSize: 18, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide30.addText("早在1万年前\n人类就开始\n使用杯子啦！", {
  x: 0.8, y: 4, w: 3.7, h: 1.2,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});
slide30.addShape("roundRect", {
  x: 5.2, y: 3.3, w: 4.3, h: 2,
  fill: { color: COLORS.green }, shadow: makeShadow(),
  rectRadius: 0.15
});
slide30.addText("💎 最贵的杯子", {
  x: 5.2, y: 3.4, w: 4.3, h: 0.5,
  fontSize: 18, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide30.addText("有的古代茶杯\n价值几百万呢！\n是用金子做的！", {
  x: 5.5, y: 4, w: 3.7, h: 1.2,
  fontSize: 16, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});

// Slide 31: 杯子的发明
let slide31 = pptx.addSlide();
slide31.background = { color: COLORS.light };
slide31.addText("📜 杯子的小历史", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.orange, align: "center"
});
const historyItems = [
  { era: "远古时代", desc: "人们用贝壳、葫芦喝水", emoji: "🐚" },
  { era: "1万年前", desc: "开始用泥土做陶杯", emoji: "🏺" },
  { era: "5000年前", desc: "古埃及人做出玻璃杯", emoji: "🔮" },
  { era: "现代", desc: "有了塑料杯、保温杯", emoji: "🛍️" }
];
historyItems.forEach((item, i) => {
  const y = 1.1 + i * 1.05;
  slide31.addShape("roundRect", {
    x: 0.5, y: y, w: 9, h: 0.95,
    fill: { color: COLORS.white }, shadow: makeShadow(),
    rectRadius: 0.1
  });
  slide31.addText(item.emoji, {
    x: 0.7, y: y + 0.1, w: 1, h: 0.75,
    fontSize: 32, align: "center"
  });
  slide31.addText(item.era, {
    x: 1.8, y: y + 0.15, w: 2, h: 0.65,
    fontSize: 18, fontFace: "Microsoft YaHei", bold: true,
    color: COLORS.orange
  });
  slide31.addText(item.desc, {
    x: 4, y: y + 0.15, w: 5.3, h: 0.65,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: COLORS.dark
  });
});

// ==================== 第9部分：故事结尾 ====================

// Slide 32: Cuppy的告别
let slide32 = pptx.addSlide();
slide32.background = { color: COLORS.secondary };
slide32.addShape("ellipse", { x: 3.3, y: 0.8, w: 3.4, h: 3.4, fill: { color: COLORS.white }, shadow: makeShadow() });
slide32.addText("Cuppy", {
  x: 3.3, y: 1.8, w: 3.4, h: 1,
  fontSize: 42, fontFace: "Arial", bold: true,
  color: COLORS.secondary, align: "center"
 });
slide32.addText("💧", {
  x: 3.3, y: 1.2, w: 3.4, h: 0.8,
  fontSize: 36, align: "center"
});
slide32.addText("👋 小朋友们，再见啦！", {
  x: 0.5, y: 4.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide32.addText("记得要多喝水，爱护你的杯子哦！", {
  x: 0.5, y: 5, w: 9, h: 0.5,
  fontSize: 24, fontFace: "Microsoft YaHei",
  color: COLORS.white, align: "center"
});

// Slide 33: 感谢页
let slide33 = pptx.addSlide();
slide33.background = { color: COLORS.primary };
slide33.addText("🎉 谢谢大家！ 🎉", {
  x: 0.5, y: 1.8, w: 9, h: 1,
  fontSize: 54, fontFace: "Microsoft YaHei", bold: true,
  color: COLORS.white, align: "center"
});
slide33.addText("💧 喝水要喝8杯水 💧", {
  x: 0.5, y: 3, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.accent, align: "center"
});
slide33.addText("🧡 杯子是我们的好朋友 🧡", {
  x: 0.5, y: 3.8, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.accent, align: "center"
});
slide33.addText("🌟 保护环境，从我做起 🌟", {
  x: 0.5, y: 4.6, w: 9, h: 0.7,
  fontSize: 32, fontFace: "Microsoft YaHei",
  color: COLORS.accent, align: "center"
});
// 装饰
slide33.addShape("ellipse", { x: 0.3, y: 0.3, w: 1.5, h: 1.5, fill: { color: COLORS.accent, transparency: 30 } });
slide33.addShape("ellipse", { x: 8, y: 4, w: 1.5, h: 1.5, fill: { color: COLORS.secondary, transparency: 30 } });

// 保存文件
pptx.writeFile({ fileName: "/workspace/cup_presentation/cuppy_adventure.pptx" })
  .then(() => console.log("PPT created successfully!"))
  .catch(err => console.error("Error:", err));
