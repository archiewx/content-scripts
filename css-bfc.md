# 块级格式化上下文(BFC)

块格式化上下文包含创建它的元素内部的所有内容.

## 产生条件

- html 根元素
- float 不为none
- overflow 值不为 visible的块元素
- position 为 absolute，fixed
- display: inline-block/flex/grid/block/inline-block/table(-*)


## 解决问题

- 创建新的BFC，防止外边距坍塌


## 意义

创建一个BFC层元素内部不会受到外部影响
