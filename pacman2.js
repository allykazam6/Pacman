/*
 *		pacmen.js
 *
 *		PacMen demo for Professional Certificate in Coding: Women's Cohort - November 2022
 *
 *		March 20th, 2023
 *
 */


var pos = 0;
var updateInterval = 0;

const pacArray = [
	['./images/PacMan1.png', './images/PacMan2.png'],
	['./images/PacMan3.png', './images/PacMan4.png'],
];

let direction = 0;
const pacMen = []; // This array holds all the pacmen



// This function returns an object with random values
function setToRandom(scale) {
	return {
		x: Math.random() * scale,
		y: Math.random() * scale,
	};
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
	// returns an object with random values scaled {x: 33, y: 21}
	let velocity = setToRandom(10); // {x:?, y:?}
	let position = setToRandom(500);
	
	//choose a random pacman face that's looking to the right
	let pacmanpng = pacArray[0][Math.floor(Math.random()*2)];

	// Add image to div id = game
	let game = document.getElementById('game');
	let newimg = document.createElement('img');
	newimg.style.position = 'absolute';
	newimg.src = pacmanpng;
	newimg.width = 100;
	newimg.style.left = position.x;
	newimg.style.top = position.y;

	game.appendChild(newimg);

	// return details in an object
	return { position, velocity, newimg, };
}

function update() {
	//make the pacmen open or close their mouths every 25 cycles through update.
	updateInterval = (updateInterval==15?0:updateInterval+1);

	// loop over pacmen array and move each one and move image in DOM
	pacMen.forEach((item) => {
		//check for their collisions
		checkCollisions(item);
		item.position.x += item.velocity.x;
		item.position.y += item.velocity.y;

		item.newimg.style.left = item.position.x;
		item.newimg.style.top = item.position.y;
		if(updateInterval==0) {
			let x = (item.velocity.x<0?1:0);
			let n = (item.newimg.src[item.newimg.src.length-5]);
			let y = (n>2?(n-3):(n-1));
			item.newimg.src = pacArray[x][(y==0?1:0)];
			console.log("x = "+x+"; y = "+y);
		}
		//console.log("pacman png = " + item.newimg.src[(item.newimg.src.length-5)]);
	});
	setTimeout(update, 20);
}

function checkCollisions(item) {
	/*	check if the pacman has collided with the left or right wall.  if so, multiply it's
		velocity by -1, which will reverse it's direction, while using less if else
		logic. */
	if(((item.position.x+item.velocity.x+item.newimg.width)>window.innerWidth) ||
		((item.position.x+item.velocity.x)<0)) {
		item.velocity.x *= -1;
		if(item.velocity.x < 0) {
			//if the pacman is move from right to left, then make the pacman face to the left.
			console.log("index of pacmanpng = " + pacArray.indexOf(item.newimg.src));
			item.newimg.src = pacArray[1][Math.floor(Math.random()*2)];
		} else {
			//otherwise, make the pacman face to the right.
			item.newimg.src = pacArray[0][Math.floor(Math.random()*2)];
		}
	}
	
	if(((item.position.y+item.velocity.y+item.newimg.height)>window.innerHeight) ||
	   ((item.position.y+item.velocity.y)<0)) item.velocity.y *= -1;
}

function makeOne() {
	pacMen.push(makePac()); // add a new PacMan
}