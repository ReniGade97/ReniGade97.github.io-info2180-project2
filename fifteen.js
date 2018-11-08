
window.onload = function()
{
	var puzzlearea;
	var squares;
	var shufflebutton;
	var validMoves=[];
	var blankSpaceX = '300px';
	var blankSpaceY = '300px';
	var changePicChkBoxlabel;
	var changePicChkBox;
	var easyModeChkBoxlabel;
	var easyModeChkBox;

	setUpCheckboxes();

	puzzlearea = document.getElementById("puzzlearea");
	squares = puzzlearea.getElementsByTagName("div");
	shufflebutton = document.getElementById("shufflebutton");

	initializeGrid();
	shufflebutton.onclick = shufflePieces;

	calcValidMoves();

	function initializeGrid()
	{

		for (var i=0; i< 15; i++)
		{
			squares[i].className = "puzzlepiece";


			squares[i].style.left = (i % 4 * 100) + "px";
			squares[i].style.top = (parseInt(i / 4) * 100) + "px";

			squares[i].style.backgroundPosition = "-" + squares[i].style.left + " " + "-" + squares[i].style.top;


			squares[i].onclick = function()
			{

				if (easyModeChkBox.checked)
				{
					animatedSwitchPieces(parseInt(this.innerHTML-1));
				}
				else
				{
					if (isValidMove(this.style.left, this.style.top))
					{
						animatedSwitchPieces(parseInt(this.innerHTML-1));
					}
				}
			};



			squares[i].onmouseover = function()
			{
				if (easyModeChkBox.checked)
				{
					this.classList.add("movablepiece");
				}
				else
				{

					if (isValidMove(this.style.left, this.style.top))
					{
						this.classList.add("movablepiece");
					}
				}
			};

		}
	}

	function shufflePieces()
	{
		var rndNum;

		if (changePicChkBox.checked)
			{
				changePic();
			}

		for (var i = 0; i < 100; i++)
		{

			rndNum = Math.floor(Math.random() * validMoves.length);

			for (var x = 0; x < squares.length; x++)
			{
				if ((validMoves[rndNum][0] === parseInt(squares[x].style.left)) &&
					(validMoves[rndNum][1] === parseInt(squares[x].style.top)))
				{

					switchPieces(parseInt(squares[x].innerHTML-1));
					calcValidMoves();


				}
			}
		}
	}

	function animatedSwitchPieces(puzzlePiece)
	{
		var posX = squares[puzzlePiece].style.left;
	  	var posY = squares[puzzlePiece].style.top;
	  	var xFinished = (squares[puzzlePiece].style.left === blankSpaceX);
	  	var yFinished = (squares[puzzlePiece].style.top === blankSpaceY);

	  	var movement = setInterval(MovePiece, 1);


		function MovePiece()
		{
			if ((xFinished) && (yFinished))
			{
				blankSpaceX = posX;
				blankSpaceY = posY;
				clearInterval(movement);
				calcValidMoves();
				checkWin();
			}
			else
			{
				if (!(xFinished))
				{
					if (parseInt(squares[puzzlePiece].style.left) < parseInt(blankSpaceX))
					{
						squares[puzzlePiece].style.left = ((parseInt(squares[puzzlePiece].style.left) + 10) + 'px');
					}
					else
					{
						squares[puzzlePiece].style.left = ((parseInt(squares[puzzlePiece].style.left) - 10) + 'px');
					}

					if (squares[puzzlePiece].style.left === blankSpaceX)
					{
						xFinished = true;
					}
				}

				if (!(yFinished))
				{
					if (parseInt(squares[puzzlePiece].style.top) < parseInt(blankSpaceY))
					{
						squares[puzzlePiece].style.top = ((parseInt(squares[puzzlePiece].style.top) + 10) + 'px');
					}
					else
					{
						squares[puzzlePiece].style.top = ((parseInt(squares[puzzlePiece].style.top) - 10) + 'px');
					}

					if (squares[puzzlePiece].style.top === blankSpaceY)
					{
						yFinished = true;
					}
				}
			}
		}
	}

	function switchPieces(puzzlePiece)
	{
		// Swap X positions
		var temp = squares[puzzlePiece].style.left;
		squares[puzzlePiece].style.left = blankSpaceX;
		blankSpaceX = temp;

		// Swap Y positions
		temp = squares[puzzlePiece].style.top;
		squares[puzzlePiece].style.top = blankSpaceY;
		blankSpaceY = temp;
	}

	function calcValidMoves()
	{
		var tempX = parseInt(blankSpaceX);
		var tempY = parseInt(blankSpaceY);

		validMoves = [];

		if (tempY != 0)
		{
			validMoves.push([tempX, tempY - 100]);
		}

		if (tempX != 300)
		{
			validMoves.push([tempX + 100, tempY]);
		}


		if (tempY != 300)
		{
			validMoves.push([tempX, tempY + 100]);
		}


		if (tempX != 0)
		{
			validMoves.push([tempX - 100, tempY]);
		}
	}


	function isValidMove(pieceX, pieceY)
	{
		pieceX = parseInt(pieceX);
		pieceY = parseInt(pieceY);

		for (var i = 0; i < validMoves.length; i++)
		{
			if ((validMoves[i][0] === pieceX) && (validMoves[i][1] === pieceY))
			{
				return true;
			}
		}
		return false;
	}

	function checkWin()
	{
		var win = true;
		if ((blankSpaceX === "300px") && (blankSpaceY === "300px"))
		{
			for (var i = 0; i < squares.length; i++)
			{
				if ((squares[i].style.left !== (parseInt((i % 4) * 100) + "px")) &&
					(squares[i].style.top !== (parseInt((i / 4) * 100) + "px")))
				{
					win = false;
					break;
				}
			}
			if (win)
			{
				gameWon();
			}
		}
	}

	function gameWon()
	{
		alert("You Win, Congrats!");
	}

	function changePic()
	{
		var listOfPics = ["background.jpg","2 Zelda.jpg","3 Zelda.jpg","4 Mario.jpg"];
		var currentPic = squares[0].style.backgroundImage.slice(5, -2); // Sliced to remove 'url("")' from it
		var rndNum = Math.floor(Math.random() * listOfPics.length);


		if (currentPic.length === 0)
		{
			currentPic = "background.jpg";
		}

		if (currentPic === listOfPics[rndNum])
		{

			while (currentPic === listOfPics[rndNum])
			{
				rndNum = Math.floor(Math.random() * listOfPics.length);
			}
		}

		for (var x = 0; x < squares.length; x++)
		{
			squares[x].style.backgroundImage = "url('" + listOfPics[rndNum] +"')";
		}

	}

	function setUpCheckboxes()
	{
		changePicChkBoxlabel = document.createElement('label');
		changePicChkBoxlabel.htmlFor = "changePicChkBox1";
		changePicChkBoxlabel.appendChild(document.createTextNode('Change picture when shuffled'));

		changePicChkBox = document.createElement("input");
	    changePicChkBox.type = "checkbox";
	    changePicChkBox.id = "changePicChkBox1";


		document.getElementById("controls").appendChild(changePicChkBoxlabel);
		document.getElementById("controls").appendChild(changePicChkBox);


		easyModeChkBoxlabel = document.createElement('label');
		easyModeChkBoxlabel.htmlFor = "changePicChkBox1";
		easyModeChkBoxlabel.appendChild(document.createTextNode('Easy Mode'));

		easyModeChkBox = document.createElement("input");
	    easyModeChkBox.type = "checkbox";
	    easyModeChkBox.id = "easyModeChkBox1";

	}
};
