let textNo = 0;
let channelId = '2193523'; // LINE LIVEのID(2193523)
let phoUrl = 'https://192.168.1.**/****/xmlWriter.php'; // 環境に合わせて変更

let checkComment = (rawText, name, owner) => {
	if (!name) { // 名前がnullならお知らせ
		name = "お知らせ";
		var text = rawText; // お知らせならrawTextがそのまま本文
	} else {
		var text = rawText.replace(name + ' ', ''); // rawTextからコメント本文だけ抜き出す
	}
	if (!owner) owner = 0;

	submitText(name, text, owner);
}

let submitText = (name, text, owner) => {
	let t = new Date();
	let d = Math.floor(t.getTime() / 1000);
	let site = 'linelive';
	if (owner) site = 'hidden';

	let url = phoUrl+'?name=' + name + '&comment=' + text + '&site=' + site + '&time=' + d + '&no=' + textNo + '&owner=' + owner;
	let request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function (event) {
		if (request.readyState === 4) {
			if (request.status === 200) {
				console.log(name + ': ' + text);
			} else {
				console.log(request.statusText);
			}
		}
	};

	request.onerror = function (event) {
		console.log(event.type);
	};

	request.send();
	textNo++;
}

$(function () {
	var target = document.querySelector('.mdMN15Scroll');
	if (!target) {
		setTimeout(arguments.callee, 1000);
		return false;
	}

	var observer = new MutationObserver(function (mutations) {
		if (mutations.some(x =>
				x.addedNodes &&
				x.addedNodes instanceof NodeList &&
				x.addedNodes.length > 0 &&
				x.type == 'childList'
			)) {
			if (mutations[0].addedNodes[0].innerText) {
				let rawText = mutations[0].addedNodes[0].innerText;
				let rawHtml = mutations[0].addedNodes[0].innerHTML;
				let matchName = rawHtml.match(/mdMN17Ttl\">(\D+)<\/span/);
				checkComment(rawText, matchName[1]);

			} else if (mutations[0].addedNodes[0].nextElementSibling.innerText) {
				let rawText = mutations[0].addedNodes[0].nextElementSibling.innerText;
				checkComment(rawText);
			}
		}
	});

	observer.observe(target, {
		childList: true,
		subtree: true
	});
});

let getNextLive = () => {
	let url = 'https://live-api.line-apps.com/app/channel/' + channelId;
    
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function()
    {
        if( this.readyState == 4 && this.status == 200 )
        {
            if( this.response )
            {
                let nextId = this.response.liveBroadcasts.rows[0].id;
                if (nextId) {
                    let nextUrl = 'https://live.line.me/channels/' + channelId + '/broadcast/' + nextId;
                    checkComment('次のURLは多分ここ → ' + nextUrl, '', 1);
                }

            }
        }
    }

    xmlHttpRequest.open( 'GET', url, true );
    xmlHttpRequest.responseType = 'json';
    xmlHttpRequest.send( null );
}


let liveCheck = () => {
	let nowTime = time.innerText;
	if (lastTime == nowTime) {
		checkComment('LINE LIVEの放送が終了しました。', '', 1);
		clearInterval(liveCheckLoop);
        setTimeout(getNextLive, 3000);
	}
	lastTime = nowTime;
}


checkComment('LINE LIVEのコメント取得を開始しました。', '', 1);
