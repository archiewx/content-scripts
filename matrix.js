// css matrix 计算
// transform: translate(20, 20) rotate(90deg) scale(0.5) skew(10deg)
// rotate = 90, tx = 20, ty = 20, scale = 0.5 skew = 10

// a, b, c, d, tx, ty
/**
a c tx
b d ty 
 */

a = a1 + a2 = Math.cos((rotate * Math.PI) / 180) + scale;
b = b1 + b2 = Math.sin((rotate * Math.PI) / 180) + Math.tan((skew * Math.PI) / 180);
c = c1 + c2 = -b1 + Math.tan((skew * Math.PI) / 180);
d = d1 + d2 = a1 + scale;
tx = tx
ty = ty

// 公式:

cos(rotate)+scale(x)          tan(skewX)-sin(rotate)       tx
tan(skewY)+sin(rotate)        cos(rotate)+scale(y)         ty
0                             0                            0
