var cve = document.getElementById("output");


if (cve.getContext) {
// --------------------
	//  imgタグに表示
	// --------------------
	// canvasをBase64データに変換
	var base64 = cve.toDataURL();
	// 空のimgタグにcanvasで作成した画像を載せる。
	// 以降は通常の画像と同じなので右クリックから保存できるようになる。
	document.getElementById("tempImg").src = base64;

	// --------------------
	//  ダウンロード
	// --------------------
	// ダウンロード ファイル名
	var fileName   = "sample.png";
	// base64データをblobに変換
	var blob = Base64toBlob(base64);

	//  ダウンロード リンクを設定
	// Edge, Chrome等はこれでaタグからダウンロードできるようになります。
	// IEではこの方法ではaタグからダウンロードできません。

	// BlobをBlob URL Schemeへ変換
	document.getElementById("dlImg").href = window.URL.createObjectURL(blob);
	// ダウンロードファイル名を設定
	document.getElementById("dlImg").download = fileName;
}

// --------------------
//	イベントのリスナーを登録
// --------------------
//	ダウンロードボタン
document.getElementById("saveImg").addEventListener("click", DownloadStart, false);


// --------------------
//  ダウンロード開始
// --------------------
function DownloadStart(){
	if (cve.getContext) {
		var ctx = cve.getContext('2d');

		// ダウンロード ファイル名
		var fileName   = "sample.png";

		//  ダウンロード開始
		if (window.navigator.msSaveBlob) {
			// IE
			// base64データをblobに変換してダウンロード
			window.navigator.msSaveBlob(Base64toBlob(base64), fileName);
		} else {
			// Chrome, Firefox, Edge
			// aタグをクリックしてダウンロード開始
			document.getElementById("dlImg").click();
		}
	}
}

// --------------------
// Base64データをBlobデータに変換
// --------------------
// https://st40.xyz/one-run/article/133/
function Base64toBlob(base64)
{
	var tmp = base64.split(',');
	var data = atob(tmp[1]);
	var mime = tmp[0].split(':')[1].split(';')[0];
	var buf = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
		buf[i] = data.charCodeAt(i);
	}
	var blob = new Blob([buf], { type: mime });
	return blob;
}

// ダウンロード2つ目

var cve2 = document.getElementById("output");
var dl = document.getElementById("dlImg2");
var downloadLink = document.getElementById("download_link");
dl.addEventListener('click', function(){
	downloadLink.href = cve2.toDataURL('image/png');
	downloadLink.download = "test.png";
	downloadLink.click();
});
