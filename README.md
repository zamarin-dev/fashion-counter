# fashion-counter
ファッションカウンター

## パラメータ
```
const net = await posenet.load(multiplier);
const pose = await net.estimateSinglePose(
    image, imageScaleFactor, flipHorizontal, outputStride
    );
```
参考: [パラメータについて書かれている記事](http://himco.jp/2018/10/11/3_3-posenet/)