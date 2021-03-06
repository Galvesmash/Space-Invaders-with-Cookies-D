var screenCorrection=70;

function spawnEnemy(){
  var enemySize=32, spawnSpace=18/*12*/, enemyMaxPerLine=12/*16*/, enemyMaxLines=5, spawnHeight=0, spawnWidth=0;
  for (var j=0; j<enemyMaxLines; j++){
    spawnHeight+=playerSize+12;
    spawnWidth=spawnSpace+18;
    for (var i=0; i<=enemyMaxPerLine; i++){
      var divEnemy = document.createElement('div');
      document.documentElement.querySelector('.background').appendChild(divEnemy);
      divEnemy.className = 'enemy';

      divEnemy.style.top = spawnHeight + "px";
      divEnemy.style.left = spawnWidth + "px";
      // console.log('spawn enemy' + i + ' in X:' + spawnHeight + ' Y:' + spawnWidth)
      
      spawnWidth += enemySize+spawnSpace;
    }
  }

  enemies = document.querySelectorAll('.enemy');
}

function moveEnemies(){
  if (moveEnemyLeft){
    //console.log(getLeftBorderEnemy() + ' > ' + bkRect.left);
    if (getLeftBorderEnemy() > bkRect.left + screenCorrection){
      for (var i=0; i < enemies.length; i++){
        enemies[i].style.left = (parseInt(enemies[i].style.left)-enemySpeed) + "px";
      }
    }
    else {
      for (var i=0; i < enemies.length; i++){
        enemies[i].style.top = (parseInt(enemies[i].style.top)+enemyDownSpeed) + "px";
      }
      moveEnemyLeft = false;
      screenCorrection--;
    }
  } else {
    //console.log(getRightBorderEnemy() + ' < ' + bkRect.right);
    if (getRightBorderEnemy() < bkRect.right - screenCorrection){
      for (var i=0; i < enemies.length; i++){
        enemies[i].style.left = (parseInt(enemies[i].style.left)+enemySpeed) + "px";
      }
    }
    else {
      for (var i=0; i < enemies.length; i++){
        enemies[i].style.top = (parseInt(enemies[i].style.top)+enemyDownSpeed) + "px";
      }
      turnsToUpSpeed--;
      moveEnemyLeft = true;
      screenCorrection--;
    }
    if (turnsToUpSpeed <= 0){
      turnsToUpSpeed=MinTurn;
      enemySpeed++;
    }
  }
}

function getLeftBorderEnemy(){
  var left = bkRect.right;
  enemies = document.querySelectorAll('.enemy');
  for (var i=0; i < enemies.length; i++){
    var enemyRect = enemies[i].getBoundingClientRect();
    if (left > enemyRect.left){
      //console.log(left + ' < ' + enemyRect.left);
      left = enemyRect.left;
    }
  }
  
  return left;
}

function getRightBorderEnemy(){
  var right = 0.0;
  enemies = document.querySelectorAll('.enemy');
  for (var i=0; i < enemies.length; i++){
    var enemyRect = enemies[i].getBoundingClientRect();
    if (right < enemyRect.right){
      //console.log('right: ' + right + ' < ' + enemyRect.right);
      right = enemyRect.right;
    }
  }

  return right;
}

function resetShotEnemy() {
  enemyCanShot = true;
  canRandEnemy = true;
}

function moveEnemyShots(){
  //enemyShots = document.querySelectorAll('.enemyShot');
  if (enemyShots){
    playerRect = player.getBoundingClientRect();

    for (var i=0; i < enemyShots.length; i++){
      // var enemyShot = enemyShots[i];
      var shotRect = enemyShots[i].getBoundingClientRect();

      if (shotRect.bottom <= playerRect.bottom
            && shotRect.top >= playerRect.top
            && shotRect.left >= playerRect.left
            && shotRect.right <= playerRect.right) {
          if (!invencible) {
            var hitSnd = new Audio("sounds/hit.ogg"); // buffers automatically when created
            hitSnd.play();

            invencible = true;
            lifes--;
            scoreNum-=50;

            player.style.background = 'url(\'img/tankDmg.png\') 0 0';
            document.documentElement.querySelector('.score').innerHTML = 'HighScore: ' + highScore + ' ------ Score: ' + scoreNum + ' ------ Lives: ' + lifes;
            window.setTimeout(resetInvencibility, invencibleTime);
          }

          enemyShots[i].parentNode.removeChild(enemyShots[i]);
          enemyShots[i] = null;
        }

      if (enemyShots[i]){
        enemyShots[i].style.top = (parseInt(enemyShots[i].style.top)+shotSpeed) + "px";
        shotRect = enemyShots[i].getBoundingClientRect();
        if (shotRect.bottom >= screenHeight-1) {
          enemyShots[i].parentNode.removeChild(enemyShots[i]);
          enemyShots[i] = null;
          //enemyShots = document.querySelectorAll('.enemyShot');
        }
      }
    }
    enemyShots = document.querySelectorAll('.enemyShot');
  }
}