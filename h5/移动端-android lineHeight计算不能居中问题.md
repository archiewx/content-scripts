# Android lineHeight 不居中问题

## 原因

因为文字在 content-area 内部渲染的时候已经偏移了，而 css 的居中方案都是控制的整个 content-area 的居中。 Android 在排版计
算的时候参考了 primyfont 字体的相关属性

## 解决方式

1. transform: scale 先放大在缩小
2. lineHeight: normal
3. flex上下居中
