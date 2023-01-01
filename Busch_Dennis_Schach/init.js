class feld{
	
		constructor( figur, posX, posY, belegt  ){
			
			this.figur		=	figur;
			this.posX		=	posX;
			this.posY		=	posY;
			this.belegt		=	belegt;

		}		
	}

spieler 			= 	1;
WEISS 				= 	1;
SCHWARZ 			= 	2;
rochadeKurzWeiss 	= 	false;
rochadeLangWeiss 	= 	false;
rochadeKurzSchwarz 	= 	false;
rochadeLangSchwarz	=	false;
zuege				=	[];
zuegeOutput			=	[];
enPassant	 		=	false;
weissImSchach		=	false;
schwarzImSchach		=	false;
dreiZuegeAus		=	0;


window.onload 	=	function(){
	
	schachbrett 	= 	document.getElementById('schachbrett');
	ctx				=	schachbrett.getContext('2d');
	width			=	schachbrett.width;
	height			=	schachbrett.height;
	fieldWidth 		= 	width / 8;
	fieldHeight 	= 	height / 8;
	
	schachbrett.onmousedown = clickEvent;
	
	init_imgs();
	init_figuren();
	init_brett();
	zeichneBrett();
	zeichneFiguren();
	
}

function init_figuren(){

BAUER 		= 	{
	
					img : {
							w 	: 	img_bauerWeiss,
							s 	: 	img_bauerSchwarz,
					},
					
					name 		: 	'BAUER',
					zweiFelder 	:	1,
					

				};

TURM  		= 	{

					img : {
							w 	: 	img_turmWeiss,
							s 	: 	img_turmSchwarz,
					},
					
					name		: 	'TURM',

				};
				
SPRINGER 	= 	{

					img : {
							w 	: 	img_springerWeiss,
							s 	: 	img_springerSchwarz,
					},
					
					name		:	'SPRINGER',

				};
				
				
LAEUFER 	= 	{

					img : {
							w 	:	img_laeuferWeiss,
							s 	:	img_laeuferSchwarz,
					},
					
					name		:	'LAEUFER',

				};
				
DAME 		= 	{

					img : {
							w 	: 	img_dameWeiss,
							s 	: 	img_dameSchwarz,
					},
					
					name		:	'DAME',
				};
				
KOENIG 		= 	{

					img : {
							w 	: 	img_koenigWeiss,
							s 	: 	img_koenigSchwarz,
					},
					
					name			:	'KOENIG',
					rochadeWeiss	:	true,
					rochadeSchwarz	:	true,
				};
}

function init_imgs(callback){
	
	img_bauerWeiss			=	new Image();
	img_bauerSchwarz		=	new Image();
	img_koenigWeiss			=	new Image();
	img_koenigSchwarz		=	new Image();
	img_dameWeiss			=	new Image();
	img_dameSchwarz			=	new Image();
	img_turmWeiss			=	new Image();
	img_turmSchwarz			=	new Image();
	img_springerWeiss		=	new Image();
	img_springerSchwarz		=	new Image();
	img_laeuferWeiss		=	new Image();
	img_laeuferSchwarz		=	new Image();
	
	img_bauerWeiss.src		= 	'bilder/bauerWeiss.png';
	img_bauerSchwarz.src	=	'bilder/bauerSchwarz.png';
	img_koenigWeiss.src		= 	'bilder/koenigWeiss.png';
	img_koenigSchwarz.src	=	'bilder/koenigSchwarz.png';
	img_dameWeiss.src		= 	'bilder/dameWeiss.png';
	img_dameSchwarz.src		=	'bilder/dameSchwarz.png';
	img_turmWeiss.src		= 	'bilder/turmWeiss.png';
	img_turmSchwarz.src		=	'bilder/turmSchwarz.png';
	img_springerWeiss.src	= 	'bilder/springerWeiss.png';
	img_springerSchwarz.src	=	'bilder/springerSchwarz.png';
	img_laeuferWeiss.src	= 	'bilder/laeuferWeiss.png';
	img_laeuferSchwarz.src	=	'bilder/laeuferSchwarz.png';
	
	img_bauerWeiss.onload		=	callback;
	img_bauerSchwarz.onload		=	callback;
	img_koenigWeiss.onload		=	callback;
	img_koenigSchwarz.onload	=	callback;
	img_dameWeiss.onload		=	callback;
	img_dameSchwarz.onload		=	callback;
	img_turmWeiss.onload		=	callback;
	img_turmSchwarz.onload		=	callback;
	img_springerWeiss.onload	=	callback;
	img_springerSchwarz.onload	=	callback;
	img_laeuferWeiss.onload		=	callback;
	img_laeuferSchwarz.onload	=	callback;
	
}

	
function init_brett(){
	
	brett		=	new Array(9).fill(0).map(a => new Array(9).fill(0));
	
	brett[1][1]	=	new feld(  TURM 	, 0 * fieldWidth, 7 * fieldHeight,	WEISS	);
	brett[2][1]	=	new feld(  SPRINGER	, 1 * fieldWidth, 7 * fieldHeight,	WEISS	);
	brett[3][1]	=	new feld(  LAEUFER	, 2 * fieldWidth, 7 * fieldHeight,	WEISS	);
	brett[4][1]	=	new feld(  DAME		, 3 * fieldWidth, 7 * fieldHeight,	WEISS	);
	brett[5][1]	=	new feld(  KOENIG	, 4 * fieldWidth, 7 * fieldHeight,	WEISS	);
	brett[6][1]	=	new feld(  LAEUFER 	, 5 * fieldWidth, 7 * fieldHeight,	WEISS	);
	brett[7][1]	=	new feld(  SPRINGER	, 6 * fieldWidth, 7 * fieldHeight,	WEISS	);
	brett[8][1]	=	new feld(  TURM		, 7 * fieldWidth, 7 * fieldHeight,	WEISS	);
	
	brett[1][2]	=	new feld(  BAUER	, 0 * fieldWidth, 6 * fieldHeight,	WEISS	);
	brett[2][2]	=	new feld(  BAUER	, 1 * fieldWidth, 6 * fieldHeight,	WEISS	);
	brett[3][2]	=	new feld(  BAUER	, 2 * fieldWidth, 6 * fieldHeight,	WEISS	);
	brett[4][2]	=	new feld(  BAUER	, 3 * fieldWidth, 6 * fieldHeight,	WEISS	);
	brett[5][2]	=	new feld(  BAUER	, 4 * fieldWidth, 6 * fieldHeight,	WEISS	);
	brett[6][2]	=	new feld(  BAUER	, 5 * fieldWidth, 6 * fieldHeight,	WEISS	);
	brett[7][2]	=	new feld(  BAUER	, 6 * fieldWidth, 6 * fieldHeight,	WEISS	);
	brett[8][2]	=	new feld(  BAUER	, 7 * fieldWidth, 6 * fieldHeight,	WEISS	);
	
	brett[1][3]	=	new feld(  null		, 0 * fieldWidth, 5 * fieldHeight,	0		);
	brett[2][3]	=	new feld(  null		, 1 * fieldWidth, 5 * fieldHeight,	0		);
	brett[3][3]	=	new feld(  null		, 2 * fieldWidth, 5 * fieldHeight,	0		);
	brett[4][3]	=	new feld(  null  	, 3 * fieldWidth, 5 * fieldHeight,	0		);
	brett[5][3]	=	new feld(  null		, 4 * fieldWidth, 5 * fieldHeight,	0		);
	brett[6][3]	=	new feld(  null  	, 5 * fieldWidth, 5 * fieldHeight,	0		);
	brett[7][3]	=	new feld(  null		, 6 * fieldWidth, 5 * fieldHeight,	0		);
	brett[8][3]	=	new feld(  null		, 7 * fieldWidth, 5 * fieldHeight,	0		);
	
	brett[1][4]	=	new feld(  null	  	, 0 * fieldWidth, 4 * fieldHeight,	0		);
	brett[2][4]	=	new feld(  null		, 1 * fieldWidth, 4 * fieldHeight,	0		);
	brett[3][4]	=	new feld(  null	  	, 2 * fieldWidth, 4 * fieldHeight,	0		);
	brett[4][4]	=	new feld(  null	 	, 3 * fieldWidth, 4 * fieldHeight,	0		);
	brett[5][4]	=	new feld(  null	 	, 4 * fieldWidth, 4 * fieldHeight,	0		);
	brett[6][4]	=	new feld(  null	 	, 5 * fieldWidth, 4 * fieldHeight,	0		);
	brett[7][4]	=	new feld(  null		, 6 * fieldWidth, 4 * fieldHeight,	0		);
	brett[8][4]	=	new feld(  null		, 7 * fieldWidth, 4 * fieldHeight,	0		);
	
	brett[1][5]	=	new feld(  null		, 0 * fieldWidth, 3 * fieldHeight,	0		);
	brett[2][5]	=	new feld(  null		, 1 * fieldWidth, 3 * fieldHeight,	0		);
	brett[3][5]	=	new feld(  null		, 2 * fieldWidth, 3 * fieldHeight,	0		);
	brett[4][5]	=	new feld(  null		, 3 * fieldWidth, 3 * fieldHeight,	0		);
	brett[5][5]	=	new feld(  null	 	, 4 * fieldWidth, 3 * fieldHeight,	0		);
	brett[6][5]	=	new feld(  null		, 5 * fieldWidth, 3 * fieldHeight,	0		);
	brett[7][5]	=	new feld(  null		, 6 * fieldWidth, 3 * fieldHeight,	0		);
	brett[8][5]	=	new feld(  null		, 7 * fieldWidth, 3 * fieldHeight,	0		);
	
	brett[1][6]	=	new feld(  null		, 0 * fieldWidth, 2 * fieldHeight,	0		);
	brett[2][6]	=	new feld(  null		, 1 * fieldWidth, 2 * fieldHeight,	0		);
	brett[3][6]	=	new feld(  null		, 2 * fieldWidth, 2 * fieldHeight,	0		);
	brett[4][6]	=	new feld(  null	  	, 3 * fieldWidth, 2 * fieldHeight,	0		);
	brett[5][6]	=	new feld(  null	 	, 4 * fieldWidth, 2 * fieldHeight,	0		);
	brett[6][6]	=	new feld(  null	 	, 5 * fieldWidth, 2 * fieldHeight,	0		);
	brett[7][6]	=	new feld(  null		, 6 * fieldWidth, 2 * fieldHeight,	0		);
	brett[8][6]	=	new feld(  null		, 7 * fieldWidth, 2 * fieldHeight,	0		);
	
	brett[1][7]	=	new feld(  BAUER	, 0 * fieldWidth, 1 * fieldHeight,	SCHWARZ	);
	brett[2][7]	=	new feld(  BAUER	, 1 * fieldWidth, 1 * fieldHeight,	SCHWARZ	);
	brett[3][7]	=	new feld(  BAUER	, 2 * fieldWidth, 1 * fieldHeight,	SCHWARZ	);
	brett[4][7]	=	new feld(  BAUER	, 3 * fieldWidth, 1 * fieldHeight,	SCHWARZ	);
	brett[5][7]	=	new feld(  BAUER	, 4 * fieldWidth, 1 * fieldHeight,	SCHWARZ	);
	brett[6][7]	=	new feld(  BAUER	, 5 * fieldWidth, 1 * fieldHeight,	SCHWARZ	);
	brett[7][7]	=	new feld(  BAUER	, 6 * fieldWidth, 1 * fieldHeight,	SCHWARZ	);
	brett[8][7]	=	new feld(  BAUER	, 7 * fieldWidth, 1 * fieldHeight,	SCHWARZ	);
	
	brett[1][8]	=	new feld(  TURM		, 0 * fieldWidth, 0 * fieldHeight,	SCHWARZ	);
	brett[2][8]	=	new feld(  SPRINGER	, 1 * fieldWidth, 0 * fieldHeight,	SCHWARZ	);
	brett[3][8]	=	new feld(  LAEUFER	, 2 * fieldWidth, 0 * fieldHeight,	SCHWARZ	);
	brett[4][8]	=	new feld(  DAME	 	, 3 * fieldWidth, 0 * fieldHeight,	SCHWARZ	);
	brett[5][8]	=	new feld(  KOENIG	, 4 * fieldWidth, 0 * fieldHeight,	SCHWARZ	);
	brett[6][8]	=	new feld(  LAEUFER	, 5 * fieldWidth, 0 * fieldHeight,	SCHWARZ	);
	brett[7][8]	=	new feld(  SPRINGER	, 6 * fieldWidth, 0 * fieldHeight,	SCHWARZ );
	brett[8][8]	=	new feld(  TURM		, 7 * fieldWidth, 0 * fieldHeight,	SCHWARZ );
	
	for( j = 0; j < brett.length; j++ ){
		
		for( i = 1; i < brett[j].length; i++ ){
			
			if( j > 0 ){
				
				brett[i][j].feldX = parseInt( brett[i][j].posX / fieldWidth) + 1;
				brett[i][j].feldY = parseInt( brett[i][j].posY / fieldHeight ) + 1;
				
				switch( brett[i][j].feldY ){
					
					case 1:
						brett[i][j].feldY = 8;
						break;
					case 2:
						brett[i][j].feldY = 7;
						break;
					case 3:
						brett[i][j].feldY = 6;
						break;
					case 4:
						brett[i][j].feldY = 5;
						break;
					case 5:
						brett[i][j].feldY = 4;
						break;
					case 6:
						brett[i][j].feldY = 3;
						break;
					case 7:
						brett[i][j].feldY = 2;
						break;
					case 8:
						brett[i][j].feldY = 1;
						break;	
				}
				
				/*if( brett[i][j].figur != null ){
					
					brett[i][j].figur.feldX = brett[i][j].feldX;
					brett[i][j].figur.feldY = brett[i][j].feldY;//vielleicht für die Schachabfragen...
					
				}*/
				
			}
			
		}
		
	}
	
}

