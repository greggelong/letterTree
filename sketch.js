let turn = 3; // when turn gets to 60 the next count is done
let shrink = 0.6; // 0.61
let swept = false;
let ang = 90;
//let ang;
// ang is local \
// tun is global
let count = 0;
let armback = false;

let txt = "greg "
let message

const charMap = {
  32: 'a', 33: 'b', 34: 'c', 35: 'd', 36: 'e', 37: 'f', 38: 'g', 39: 'h', 40: 'i', 41: 'j',
  42: 'k', 43: 'l', 44: 'm', 45: 'n', 46: 'o', 47: 'p', 48: 'q', 49: 'r', 50: 's', 51: 't',
  52: 'u', 53: 'v', 54: 'w', 55: 'x', 56: 'y', 57: 'z', 58: ' ', 59: '.', 60: ',', 61: '!',
  62: '?', 63: '-'
};

function getKeyFromValue(char) {
  return Object.keys(charMap).find(key => charMap[key] === char) || '?';
}


function setup() {
  //createCanvas(930, 800);
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES);

  //frameRate(10)
  swept = false;

  message =txt.toLocaleLowerCase().split("")
  print(message)
}

function draw() {
  background(0);
  let cnum = int(getKeyFromValue(message[count]))
  //print(cnum)

  doArm(width / 2,cnum, 2);
 // print(getKeyFromValue(message[count]), message[count])
  //doArm(width - width / 3.5, count, 2);
  if (!armback) {
    turn += 1;
  } else {
    turn -= 1;
  }
  //print(ang,turn)
  if (turn >= 60 && !armback) {
    armback = true;
    //turn= 1
  }
  if (turn < 0 && armback) {
    armback = false;

    count++;
  }

  if (count > message.length-1) {
    count = 0;
  }
}

function doArm(p, n, base) {
  // this function only plots the arm of the binary number
  let instr = n.toString(base); // only the arm
  //print("arm",instr)

  turtle(instr, color(165,169,180), p);
}

function doTree(p, n, base) {
  // this function plots all the numbers up to and including the number so
  // it prints the whole tree
  //number = 80// 26, 80, 242, 728, 2186
  for (let i = 1; i <= n; i++) {
    // don't need to do zero
    let instr = i.toString(base); // change n to i to get the rest of the tree
    //print("tree",instr)
    turtle(instr, color(255, 255, 0), p);
  }
}

function turtle(inString, clr, p) {
  // print the binary instruction
  fill(0);
  stroke(clr);
  strokeWeight(1);
  rect(10, 70, 150, 50);
  textSize(40);
  fill(0, 255, 0);
  text(message[count], 20, 100);
  noFill();

  let instrarr = inString.split(""); // split into an arry
  //print(instrarr)
  let sz = height/2.8;
  let x = p;
  let y = height;
  // let  x1= x+sz*cos(ang)  // x1 = x + amount * cos (theta)
  //let y1 = y-sz*sin(ang)
  let x1 = x;
  let y1 = y - sz;
  strokeWeight(sz / 9);
  let sw = sz/9
  stroke(165,169,180);
  line(x, y, x1, y1);
  x = x1;
  y = y1;
  ang = 90;
  for (let i = 1; i < instrarr.length; i++) {
    // always skips the first one
    //print("Beep")
    if (instrarr[i] == "1") {
      // turn right

      ang -= turn;
      stroke(224,224,224);
    } else if (instrarr[i] == "0") {
      // turn left

      ang += turn;
      stroke(165,169,180);
    } else if (instrarr[i] == "2") {
      ang = ang * 2 - ang;
      stroke(0, 0, 255);
    }
    // move forward/
    sz = sz * shrink;
    //print(sz)
    x1 = x + sz * cos(ang); // x1 = x + amount * cos (theta)
    y1 = y - sz * sin(ang); // y1 =y + amount * sin (theta)
    //strokeWeight(sw);
    strokeWeight(sz / 7); 
    line(x, y, x1, y1);
    x = x1;
    y = y1;
  }
}
