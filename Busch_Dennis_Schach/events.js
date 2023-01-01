auswahl 				= 	0;
auswahlZuruecksetzen	=	false;
markiertesFeld 			=	0;

function zugBenennen( zug ){
	
	for( i = 0; i < zug.length; i++ ){

		if( i % 2 == 0 ){
			
			switch( zug[i] ){
				
				case 1:
					zug[i] = 'A';
					break;
				case 2:
					zug[i] = 'B';
					break;
				case 3:
					zug[i] = 'C';
					break;
				case 4:
					zug[i] = 'D';
					break;
				case 5:
					zug[i] = 'E';
					break;
				case 6:
					zug[i] = 'F';
					break;
				case 7:
					zug[i] = 'G';
					break;
				case 8:
					zug[i] = 'H';
					break;

			}
			
		}
		
	}
	
	return zug;	
	
}

function wechsleYAchse(feldY){
	
	switch( feldY ){
					
					case 1:
						feldY = 8;
						break;
					case 2:
						feldY = 7;
						break;
					case 3:
						feldY = 6;
						break;
					case 4:
						feldY = 5;
						break;
					case 5:
						feldY = 4;
						break;
					case 6:
						feldY = 3;
						break;
					case 7:
						feldY = 2;
						break;
					case 8:
						feldY = 1;
						break;	
				}

	return feldY;
}

function spielerWechsel( spieler ){
	
	if( spieler == 1 ){
		
		document.getElementById('spieler').innerHTML = "Schwarz ist dran!";
		return 2;
	}
	
	document.getElementById('spieler').innerHTML = "Weiss ist dran!";
	return 1;
	
}

function clickEvent(evt){
	
	var posX = evt.offsetX;
	var posY = evt.offsetY;
	var feldX = parseInt( posX / fieldWidth ) + 1;
	var feldY = parseInt( posY / fieldWidth ) + 1;
	feldY = wechsleYAchse( feldY );
	var brettKopie = brett.slice();
	var insSchachBegeben = true;
	
	ausgewaehltesFeld = brettKopie[feldX][feldY];
	
	if( auswahl == 1 ){
		
		if( ausgewaehltesFeld != markiertesFeld && ausgewaehltesFeld.belegt != spieler ){
			
			figurVorher 	= 	brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].figur;
			belegtVorher	=	brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].belegt;
			
			brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].figur 	= 	markiertesFeld.figur;
			brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].belegt 	= 	markiertesFeld.belegt;
			
			brett[markiertesFeld.feldX][markiertesFeld.feldY].figur 		= 	null;
			brett[markiertesFeld.feldX][markiertesFeld.feldY].belegt 		= 	0;
			
			w = getPosKoenigW( brett );
			s = getPosKoenigS( brett );
			
			//falls spieler selbst ins schach gehen will
			if(  spieler == 1 && wirdFeldAngegriffenW(brett[w[0]][w[1]]) ){
			
				insSchachBegeben = false;
				document.getElementById('insSchach').innerHTML = "Du darfst dich nicht sebst ins schach begeben!";

			}else if( spieler == 2 && wirdFeldAngegriffenS(brett[s[0]][s[1]]) ){
				
				insSchachBegeben = false;
				document.getElementById('insSchach').innerHTML = "Du darfst dich nicht sebst ins schach begeben!";

			}else{
				
				document.getElementById('insSchach').innerHTML = "";
				
			}
			
			macheZugRueckgaengig( brett, ausgewaehltesFeld, markiertesFeld, figurVorher, belegtVorher, zuege );
			
			//############################################
				if( weissImSchach){console.log("eins"+ getPosKoenigW(brett))};
				
				if( istZugGueltig( ausgewaehltesFeld, markiertesFeld, spieler, zuege ) && insSchachBegeben ){
					
					var wechsel = true;
					zug = [markiertesFeld.feldX, markiertesFeld.feldY, ausgewaehltesFeld.feldX, ausgewaehltesFeld.feldY];
					zuege.push(zug.slice());
					zug = zugBenennen( zug );
					
					if( rochadeLangWeiss ){
						
						brett[1][1].figur 	= 	null;
						brett[1][1].belegt 	= 	0;
						brett[4][1].figur 	= 	TURM;
						brett[4][1].belegt	=	spieler;
						rochadeLangWeiss 	=	false;
							
					}else if( rochadeKurzWeiss ){
						
						brett[8][1].figur 	= 	null;
						brett[8][1].belegt 	= 	0;
						brett[6][1].figur 	= 	TURM;
						brett[6][1].belegt	=	spieler;
						rochadeKurzWeiss	=	false;
						
					}else if( rochadeKurzSchwarz ){
						
						brett[8][8].figur 	= 	null;
						brett[8][8].belegt 	= 	0;
						brett[6][8].figur 	= 	TURM;
						brett[6][8].belegt	=	spieler;
						rochadeKurzSchwarz	=	false;
						
					}else if( rochadeLangSchwarz ){
						
						brett[1][8].figur 	= 	null;
						brett[1][8].belegt 	= 	0;
						brett[4][8].figur 	= 	TURM;
						brett[4][8].belegt	=	spieler;
						rochadeLangSchwarz	=	false;
						
					}else if( enPassant ){
						
						if( spieler == 1 ){
							
							brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY-1].figur 	= 	null;
							brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY-1].belegt 	= 	0;
							
						}else if( spieler == 2){
							
							brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY+1].figur 	= 	null;
							brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY+1].belegt 	= 	0;
							
						}
						
						enPassant = false;
						
					}
					
					figurVorher 	= 	brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].figur;
					belegtVorher	=	brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].belegt;
					
					brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].figur 	= 	markiertesFeld.figur;
					brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].belegt 	= 	markiertesFeld.belegt;
					
					brett[markiertesFeld.feldX][markiertesFeld.feldY].figur 		= 	null;
					brett[markiertesFeld.feldX][markiertesFeld.feldY].belegt 		= 	0;
					
					//falls ins schach begiebt, alles zurueck
					
					w = getPosKoenigW( brett );
					s = getPosKoenigS( brett );
					
					if( schwarzImSchach ){
						
						if( spieler == 2 ){
							
							//var s = getPosKoenigS( brett );
							
							if( wirdFeldAngegriffenS( brett[s[0]][s[1]] ) ){
								
								//zug wird rückgängig gemacht
								console.log("schwar hat sich nicht aus dem Schach bewegt");
								macheZugRueckgaengig( brett, ausgewaehltesFeld, markiertesFeld, figurVorher, belegtVorher, zuege );
								wechsel = false;
							}
							
						}
						
					}else if( weissImSchach ){
						
						if( spieler == 1 ){
							
							if( wirdFeldAngegriffenW( brett[w[0]][w[1]] ) ){
								
								//zug wird rückgängig gemacht
								console.log("weiss hat sich nicht aus dem Schach bewegt");
								macheZugRueckgaengig( brett, ausgewaehltesFeld, markiertesFeld, figurVorher, belegtVorher, zuege );
								wechsel = false;
							}
							
						}
						
					}
					
					//bauer in letzter reihe?
					if( spieler == 1 ){
						
						for( i = 1; i < 9; i++ ){
							
							if( brett[i][8].figur == BAUER && brett[i][8].belegt == 1 ){
									
								var figur = prompt( "Welche Figur soll es sein?Tippe d DAME, s SPRINGER, l LAEUFER, t TURM" );  
								
								if( figur == "l"){
									
									brett[i][8].figur = LAEUFER;
									
								}else if( figur == "t"){
									
									brett[i][8].figur = TURM;
									
								}else if( figur == "s"){
									
									brett[i][8].figur = SPRINGER;
									
								}else{
									
									brett[i][8].figur = DAME;
									
								}
									
							}
								
						}
							
					}
					
					if( spieler == 2 ){
						
						for( i = 1; i < 9; i++ ){
							
							if( brett[i][1].figur == BAUER && brett[i][1].belegt == 2 ){
									
								var figur = prompt( "Welche Figur soll es sein? Tippe d DAME, s SPRINGER, l LAEUFER, t TURM" );  
								
								if( figur == "l"){
									
									brett[i][1].figur = LAEUFER;
									
								}else if( figur == "t"){
									
									brett[i][1].figur = TURM;
									
								}else if( figur == "s"){
									
									brett[i][1].figur = SPRINGER;
									
								}else{
									
									brett[i][1].figur = DAME;
									
								}
									
							}
								
						}
							
					}
					
					w = getPosKoenigW( brett );
					s = getPosKoenigS( brett );
					istSchach( brett, w, s );
					
					if( wechsel){
						
						spieler 			=	spielerWechsel( spieler );
						zuegeOutput.push( zug[0] + zug[1] + ":" + zug[2] + zug[3] + " ; ");
						a = document.getElementById('zuege');
						a.innerHTML =( zuegeOutput.join("") );
						
					}
					
					markiertesFeld 			= 	null;
					auswahl					=	0	;
					auswahlZuruecksetzen 	= 	true;
					zeichneBrett();
					zeichneFiguren();
					
					dreiZuegeEnde();
					//checkMatt( );
					
				}
			
		}
		
		if( ausgewaehltesFeld == markiertesFeld ){
			
			markiertesFeld 			= 	null;
			auswahl					=	0	;
			auswahlZuruecksetzen 	= 	true;
			zeichneBrett();
			zeichneFiguren();	
			
		}
		
	}
	
	if( auswahl == 0 && !auswahlZuruecksetzen && ausgewaehltesFeld.belegt == spieler ){
		
		markiertesFeld		=	markiereFeld( ausgewaehltesFeld, auswahl );
		auswahl 			= 	1;
		
	}
	
	auswahlZuruecksetzen = false;
	
}


function getPosKoenigW( brett ){
	
	for( i = 1; i < 9; i ++ ){
		
		for( j = 1; j < 9; j++ ){
			
			if( brett[i][j].figur == KOENIG && brett[i][j].belegt == 1 ){
				
				return [ brett[i][j].feldX, brett[i][j].feldY ];
				
			}
			
		}
		
	}
	
}

function getPosKoenigS( brett ){
	
	for( i = 1; i < 9; i ++ ){
		
		for( j = 1; j < 9; j++ ){
			
			if( brett[i][j].figur == KOENIG && brett[i][j].belegt == 2 ){
				
				return [ brett[i][j].feldX, brett[i][j].feldY ];
				
			}
			
		}
		
	}
	
}


function wirdFeldAngegriffenW( f ){//f = feld welches auf angriff geprüft wird
	
	//spieler2 schlägt spieler1
	
	for( i = 1; i < 9; i ++ ){
		
		for( j = 1; j < 9; j++ ){
			
			if( brett[i][j].figur == BAUER && brett[i][j].belegt == 2 ){
				
				if( ( 	f.feldX == i + 1 || f.feldX == i - 1 ) && (	f.feldY == j - 1 ) ){
					
					return true;
					
				}
				
			}else if( brett[i][j].figur == SPRINGER && brett[i][j].belegt == 2 ){
				
				if( ( i + 2 == f.feldX  && ( j + 1 == f.feldY || j - 1 == f.feldY ) ) ||
					( i - 2 == f.feldX  && ( j + 1 == f.feldY || j - 1 == f.feldY ) ) ||
					( i + 1 == f.feldX  && ( j + 2 == f.feldY || j - 2 == f.feldY ) ) ||
					( i - 1 == f.feldX  && ( j + 2 == f.feldY || j - 2 == f.feldY ) )	){
					
					return true;
					
				}
				
			}else if( brett[i][j].figur == TURM && brett[i][j].belegt == 2 ){
				
				if( checkGeraden( f ) ){
					
					return true;
					
				} 

			}else if( brett[i][j].figur == LAEUFER && brett[i][j].belegt == 2 ){
				
				if( checkSchraegen( f ) ){
				
					return true;
					
				}
	
			}else if( brett[i][j].figur == DAME && brett[i][j].belegt == 2 ){
				
				if(  checkSchraegen( f ) ){
					
					return true;
					
				}else if( checkGeraden( f ) ){
					
					return true;
					
				}
				
			}else if( brett[i][j].figur == KOENIG && brett[i][j].belegt == 2 ){
				
				if( ( f.feldX == i + 1 && (f.feldY == j + 1 || f.feldY == j || f.feldY == j - 1 ) ) 	||
					( f.feldX == i && (f.feldY == j + 1 || f.feldY == j - 1) ) 							||
					( f.feldX == i - 1 && (f.feldY == j + 1 || f.feldY == j || f.feldY == j - 1 ) )			){
			
					return true;
					
				}
				
			}
			
		}//end for j
		
	}//end for i
	
}//end function


//###########################WIRD SCHWarzes feld angegriffen?##############################

function wirdFeldAngegriffenS( f ){//f = feld welches auf angriff geprüft wird
	
	//spieler2 schlägt spieler1
	
	for( i = 1; i < 9; i ++ ){
		
		for( j = 1; j < 9; j++ ){
			
			if( brett[i][j].figur == BAUER && brett[i][j].belegt == 1 ){
				
				if( ( 	f.feldX == i + 1 || f.feldX == i - 1 ) && (	f.feldY == j + 1 ) ){
					
					return true;
					
				}
				
			}else if( brett[i][j].figur == SPRINGER && brett[i][j].belegt == 1 ){
				
				if( ( i + 2 == f.feldX  && ( j + 1 == f.feldY || j - 1 == f.feldY ) ) ||
					( i - 2 == f.feldX  && ( j + 1 == f.feldY || j - 1 == f.feldY ) ) ||
					( i + 1 == f.feldX  && ( j + 2 == f.feldY || j - 2 == f.feldY ) ) ||
					( i - 1 == f.feldX  && ( j + 2 == f.feldY || j - 2 == f.feldY ) )	){
					
					return true;
					
				}
				
			}else if( brett[i][j].figur == TURM && brett[i][j].belegt == 1 ){
				
				if( checkGeraden( f ) ){
					
					return true;
					
				} 

			}else if( brett[i][j].figur == LAEUFER && brett[i][j].belegt == 1 ){
				
				if( checkSchraegen( f ) ){
					
					return true;
					
				}
	
			}else if( brett[i][j].figur == DAME && brett[i][j].belegt == 1 ){
				
				if(  checkSchraegen( f ) || checkGeraden( f ) ){
					
					return true;
					
				}
				
			}else if( brett[i][j].figur == KOENIG && brett[i][j].belegt == 1 ){
				
				if( ( f.feldX == i + 1 && (f.feldY == j + 1 || f.feldY == j || f.feldY == j - 1 ) ) 	||
					( f.feldX == i && (f.feldY == j + 1 || f.feldY == j - 1) ) 							||
					( f.feldX == i - 1 && (f.feldY == j + 1 || f.feldY == j || f.feldY == j - 1 ) )			){
					
					return true;
					
				}
				
			}
			
		}//end for j
		
	}//end for i
	
}//end function


//###########################DIAGONALEN AUF ANGRIFF CHECKEN#################################

function checkSchraegen(f){
					
	if( Math.abs( i - f.feldX ) == Math.abs( j - f.feldY ) ){
		
		var schach = true;
			
		for( z = 1; z < Math.abs( i - f.feldX ); z++ ){
			
			
			if( i - f.feldX > 0 && j - f.feldY > 0 ){
				//angriff oben rechts
				
				if( brett[f.feldX + z][f.feldY + z].figur != null ){
				
					schach = false;
				
				}
				//angriffe von unten rechts
			}else if( i - f.feldX > 0 && j - f.feldY < 0 ){
				
				if( brett[f.feldX+z][f.feldY-z].figur != null ){
					
					schach = false;
					
				}
				//angriff von links oben
			}else if( i - f.feldX < 0 && j - f.feldY > 0 ){
				
				if( brett[f.feldX-z][f.feldY+z].figur != null ){
					
					schach = false;
					
				}
				//angriff von links unten
			}else if( i - f.feldX < 0 && j - f.feldY < 0 ){
				
				if( brett[f.feldX-z][f.feldY-z].figur != null ){
					
					schach = false;
					
				}
				
			}
			
		}
		
		return schach;
		
	}

}

//#############################VERTIKAL HORIZONTAL CHECKEN OB FELD ANGEGRIFFEN WIRD#######################

function checkGeraden( f ){

	var schach = false;
	
	if( f.feldX == i ){

		schach = true;
	
		for( z = 1; z < Math.abs( f.feldY - j ); z++ ){
		
			if( f.feldY > j && brett[i][j+z].figur != null ){
			
				schach = false;
			
			}else if( j - z > 0 ){
			
				if( brett[i][j-z].figur != null ){
				
					schach = false;

				}
			
			}
		
		}
			
	}else if( f.feldY == j ){
		
		schach = true;
		
		for( z = 1; z < Math.abs( f.feldX - i ); z++ ){
			
			if( f.feldX > i && brett[i+z][j].figur != null ){

				schach = false;
				
			}else if( i - z > 0 ){
				
				if( brett[i-z][j].figur != null ){
					
					schach = false;
					
				}
				
			}
			
		}
		
	}
	
	if( schach ){
		
		return true;
		
	}
	
	return false;
}

//##################################ist aktuell schach##################################################

function istSchach( brett, w, s ){
	
	//var koenigWeiss 	= 	getPosKoenigW( brett );
	//var koenigSchwarz 	= 	getPosKoenigS( brett );
	
	
	
	if( wirdFeldAngegriffenW( brett[w[0]][w[1]]) ){
		
		document.getElementById('txt_schach').innerHTML = "SCHACH!!!";
		document.getElementById('se_schach').play();
		weissImSchach = true;
		
	}else if( wirdFeldAngegriffenS( brett[s[0]][s[1]]) ) {	
		
	
		document.getElementById('txt_schach').innerHTML = "SCHACH!!!";
		document.getElementById('se_schach').play();
		schwarzImSchach = true;
		
	}else{
		
		document.getElementById('txt_schach').innerHTML = "";
		schwarzImSchach = false;
		weissImSchach	= false;
	}
}

//######################zug rückgängig machen#######################################

function macheZugRueckgaengig( brett, ausgewaehltesFeld, markiertesFeld, FigurVorher, belegtVorher ){
	
	brett[markiertesFeld.feldX][markiertesFeld.feldY].figur 		= 	ausgewaehltesFeld.figur;
	brett[markiertesFeld.feldX][markiertesFeld.feldY].belegt 		= 	ausgewaehltesFeld.belegt;
	brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].figur 	= 	figurVorher;
	brett[ausgewaehltesFeld.feldX][ausgewaehltesFeld.feldY].belegt 	= 	belegtVorher;	
	
	//zuege.pop();
	
}
//dieser ansatz klappte nicht, hatte nur noch 45 min zeit. Mein rechner brauchte etwa 2 min für die abfragen. 
//deshalb muss andere lösung her aber die felder verschwimmen schon ;)

function checkMatt1( ){

	for( i = 1; i < 9; i++ ){
		
		for( j = 0; j < 9; j++ ){
			
			if( brett[i][j].figur != null && brett[i][j].belegt == 1 ){
				
				var markiertesFeld = brett[i][j];
				var tempFigur = brett[i][j].figur;
				//brett[i][j].figur = null;
				
				for( var a = 1; a < 9; a++ ){
					
					for( var b = 1; b < 9; b++ ){
						
						if( brett[a][b].belegt != 1 ){

							//tempZielfeldFigur = brett[a][b].figur;
							//tempZielfeldBelegt = brett[a][b].belegt;
							//brett[a][b].belegt = 1;
							//brett[a][b].figur = tempFigur;
							
							//if( istZugGueltig( brett[a][b], markiertesFeld, 1, zuege ) ){
								
								//console.log("zug ist gueltig");
								
							//}
							console.log("a");
							//brett[a][b].figur = tempZielfeldFigur;
							//brett[a][b].belegt = tempZielfeldBelegt;
							
						}
						
					}
					
				}
				
			}
			
		}
		
	}
	
}

function checkMatt(){
	
	
	
}

function dreiZuegeEnde(){
	
	var l = zuege.length-1;
	
	if( l >= 12 ){
		
		if( zuege[l].join("") == zuege[l-4].join("") && zuege[l].join("") == zuege[l-8].join("") ){
			
			if( zuege[l-1].join("") == zuege[l-5].join("") && zuege[l-1].join("") == zuege[l-9].join("") ){
				
				if( zuege[l-2].join("") == zuege[l-6].join("") && zuege[l-2].join("") == zuege[l-10].join("") ){
					
					if( zuege[l-3].join("") == zuege[l-7].join("") && zuege[l-3].join("") == zuege[l-11].join("") ){
						
						console.log("unentschieden");
						ctx.fillStyle = 'rgb(90,90,90)';
						ctx.fillRect( 0, 0, 600, 600);
						document.getElementById('txt_schach').innerHTML = "UNENTSCHIEDEN";
						neuesSpiel();
					}
					
				}
				
			}
			
		}
		
	}
	
}

function neuesSpiel(){
	
	
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
	init_figuren();
	init_brett();
	
}
