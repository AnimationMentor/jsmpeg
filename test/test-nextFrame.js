const MPEG_URL = {
	video1: 'video-orange.mpg',
	video2: 'video-blue.mpg'
};

let player;

function reset() {
	// cleanup jsmpeg player
	if (player) {
		player.stop();
		player = undefined;
	}

	// disable non-load buttons
	document.querySelectorAll('button').forEach(function(button) {
		if (button.className !== 'load') {
			button.disabled = true;
		}
	});
}

function setupVideo(id) {
	let main = document.querySelector('main');

	// reuse canvas
	let canvas = document.querySelector('canvas');

	// new jsmpeg player
	player = new jsmpeg(MPEG_URL[id], {
		progressive: true,
		canvas: canvas,
		seekable: true,
		loop: true
	});

	// enable all buttons
	document.querySelectorAll('button').forEach(function(button) {
		button.disabled = false;
	});
}

document.addEventListener('click', function(event) {
	switch (event.target.className) {
		case 'load':
			reset();
			setupVideo(event.target.id);
			break;

		case 'play':
			player.play();
			break;
		case 'pause':
			player.pause();
			break;
		case 'previous':
			player.pause();
			if (player.currentFrame > 0) {
				player.seekToFrame(player.currentFrame - 1, true);
			} else {
				player.seekToFrame(player.frameCount - 1, true);
			}
			break;
		case 'next':
			player.pause();
			if (player.currentFrame < player.frameCount - 1) {
				player.nextFrame();
			} else {
				player.seekToFrame(0, true);
			}
			break;
	}
});