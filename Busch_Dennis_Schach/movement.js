function istZugGueltig( ausgewaehltesFeld, markiertesFeld, spieler, zuege ){
	
	var m 				= 	markiertesFeld;
	var a 				= 	ausgewaehltesFeld;
	var figurDazwischen = 	false;
	var schach 			= 	false;
	var distanz			=	0;
	
	
	
	function wurdeTurmBewegt( m ){
		
		if( m.feldX == 1 && m.feldY == 1 ) 	{	
		
			brett[m.feldX][m.feldY].figur.wl = true
			
		}else if( m.feldX == 8 && m.feldY == 1 ){

			brett[m.feldX][m.feldY].figur.wr = true;
			
		}else if( m.feldX == 1 && m.feldY == 8 ){

			brett[m.feldX][m.feldY].figur.sl = true;
			
		}else if( m.feldX == 8 && m.feldY == 8 ){

			brett[m.feldX][m.feldY].figur.sr = true;
			
		}

	}
	
	function checkDiagonale( m, a, spieler, figurDazwischen ){
		
		for( i = 1; i < 8; i++ ){
			//richtung (1 1)
			if( a.feldX == m.feldX + i && a.feldY == m.feldY + i ){
					
				//distanz = i;
				for( j = 1; j < i; j++ ){
					
					if( brett[m.feldX + j][m.feldY + j].belegt != 0 ){
						
						figurDazwischen = true;
						
					}
					
				}
				
				if( !figurDazwischen ){
					
					return true;
					
				}
			
			}
			
			//oben links
			if( a.feldX == m.feldX - i && a.feldY == m.feldY + i ){
				
				//distanz = i;
				for( j = 1; j < i; j++ ){
					
					if( brett[m.feldX - j][m.feldY + j].belegt != 0 ){
						
						figurDazwischen = true;
						
					}
					
				}
				
				if( !figurDazwischen ){
					
					return true;
					
				}
				
			}
			// unten rechts
			if( a.feldX == m.feldX + i && a.feldY == m.feldY - i ){
				
				//distanz = i;
				for( j = 1; j < i; j++ ){
					
					if( brett[m.feldX + j][m.feldY - j].belegt != 0 ){
						
						figurDazwischen = true;
						
					}
					
				}
				
				if( !figurDazwischen ){
					
					return true;
					
				}
				
			}
			// unten links
			if( a.feldX == m.feldX - i && a.feldY == m.feldY - i ){
				
				//distanz = i;
				for( j = 1; j < i; j++ ){
					
					if( brett[m.feldX - j][m.feldY - j].belegt != 0 ){
						
						figurDazwischen = true;
						
					}
					
				}
				
				if( !figurDazwischen ){
					
					return true;
					
				}
				
			}	
			
		}
		
	}
	
//#####################ABFRAGEN DER SELEKTIERTEN FIGUR UND DER GÜLTIGKEIT DES ZUGES#######################	
	
	if( m.figur.name == 'BAUER' ){
		
		if( spieler == 1 ){
			//wenn bauer in einer spalte mit zielfeld und ein hoch || 	wenn bauer in einer spalte wie zielfeld und 2 hoeher und in zeile 2 und das feld dazwischen auch nicht belegt
			if( ( a.feldX == m.feldX && a.feldY == m.feldY + 1 ) ||
				( a.feldX == m.feldX && a.feldY == m.feldY + 2 && m.feldY == 2 && brett[m.feldX][m.feldY+1].belegt == 0 ) ){
				
				if( a.belegt == 0 ){
					
					return true;
					
				}
				
			// en passant weiss schlägt schwarz R L
			}else if( 	m.feldX != 8 &&  m.feldY == 5 &&
						brett[m.feldX+1][m.feldY].belegt == 2 &&
						brett[m.feldX+1][a.feldY+1].belegt == 0 &&
						[m.feldX+1,7,m.feldX+1,5].join(",") == zuege[zuege.length-1].join(",") ){
					
					enPassant	=	true;
					return true;
					
			}else if( 	m.feldX != 1 &&  m.feldY == 5 &&
						brett[m.feldX-1][m.feldY].belegt == 2 &&
						brett[m.feldX-1][a.feldY+1].belegt == 0 &&
						[m.feldX-1,7,m.feldX-1,5].join(",") == zuege[zuege.length-1].join(",") ){
					
					enPassant 	=	true;
					return true;
			
			//wenn zielfeld schräg rechts über markiertem feld		
			}else if( a.feldX == m.feldX + 1 && a.feldY == m.feldY + 1 ){
				//schwarz auf feld?
				if( brett[a.feldX][a.feldY].belegt == 2 ){
						
					return true;

				}
			//wenn zielfeld schräg links über markiertem feld
			}else if( a.feldX == m.feldX - 1 && a.feldY == m.feldY + 1 ){
				//schwarz auf feld?
				if( brett[a.feldX][a.feldY].belegt == 2 ){
						
					return true;
						
				}
			}
		}//end spieler1 Abfrage
		
		if( spieler == 2 ){
			//wenn bauer in einer spalte mit zielfeld und ein hoch || 	wenn bauer in einer spalte wie zielfeld und 2 hoeher und in zeile 2 und das feld dazwischen auch nicht belegt
			if( ( a.feldX == m.feldX && a.feldY == m.feldY - 1 ) || ( a.feldX == m.feldX && a.feldY == m.feldY - 2 && m.feldY == 7 && brett[m.feldX][m.feldY-1].belegt == 0 ) ){
				
				if( brett[a.feldX][a.feldY].belegt == 0 ){
					
					return true;
					
				}
				//en Passant
			}else if( 	m.feldX != 1 && m.feldY == 4 &&
						brett[m.feldX-1][m.feldY].belegt == 1 &&
						brett[m.feldX-1][a.feldY-1].belegt == 0 &&
						[m.feldX-1,2,m.feldX-1,4].join(",") == zuege[zuege.length-1].join(",") ){
					
					enPassant 	=	true;
					return true;
					
			}else if( 	m.feldX != 8 && m.feldY == 4 &&
						brett[m.feldX+1][m.feldY].belegt == 1 &&
						brett[m.feldX+1][a.feldY-1].belegt == 0 &&
						[m.feldX+1,2,m.feldX+1,4].join(",") == zuege[zuege.length-1].join(",") ){
					
					enPassant 	=	true;
					return true;
			
			//wenn zielfeld schräg rechts unter markiertem feld
			}else if( a.feldX == m.feldX + 1 && a.feldY == m.feldY - 1 ){
				//schwarz auf feld?
				if( brett[a.feldX][a.feldY].belegt == 1 ){
						
					return true;
						
				}
			
			//wenn zielfeld schräg rechts unter markiertem feld
			}else if( a.feldX == m.feldX - 1 && a.feldY == m.feldY - 1 ){
				//schwarz auf feld?
				if( brett[a.feldX][a.feldY].belegt == 1 ){
						
					return true;
						
				}
	
			}
		
		}
//TURM
	}else if( m.figur.name == 'TURM' ){
		
		if( spieler == 1 || spieler == 2){
			//wenn in einer zeile
			if( a.feldY == m.feldY ){
				//turm nach rechts?
				if( m.feldX < a.feldX ){
					
					for( i = 1; i < a.feldX - m.feldX; i++ ){
						
						if( brett[m.feldX + i][m.feldY].belegt != 0 ){
							
							figurDazwischen = true;
							
						}
						
					}
					
					if( !figurDazwischen ){
						//Kontrolle auf bewegung für die Rochade aller 4 Tuerme
						wurdeTurmBewegt( m );
						return true;
						
					}
				//feld links
				}else if( m.feldX > a.feldX ){			
					
					for( i = 1; i < m.feldX - a.feldX; i++ ){
						
						if( brett[m.feldX - i][m.feldY].belegt != 0 ){
							
							figurDazwischen = true;
							
						}
						
					}
					
					if( !figurDazwischen ){
						
						wurdeTurmBewegt( m );
						return true;
						
					}
					
				}
			//wenn eine spalte	
			}else if( a.feldX == m.feldX ){
				//zug nach oben?
				if( a.feldY > m.feldY ){
					//figur im weg nach oben kontrolle
					for( i = 1; i < a.feldY - m.feldY; i++ ){
						
						if( brett[m.feldX][m.feldY + i].belegt != 0 ){
							
							figurDazwischen = true;
							
						}
						
					}
					
					if( !figurDazwischen ){
						
						wurdeTurmBewegt( m );
						return true;
						
					}
					
				}else if( m.feldY > a.feldY ){
					//figur im weg nach unten kontrolle
					for( i = 1; i < m.feldY - a.feldY; i++ ){
						
						if( brett[m.feldX][m.feldY - i].belegt != 0 ){
							
							figurDazwischen = true;
							
						}
						
					}
					
					if( !figurDazwischen ){
						
						wurdeTurmBewegt( m );
						return true;
						
					}
					
				}
				
			}
			
		}
//SPRINGER

	}else if(  m.figur.name == 'SPRINGER' ){
		
		if( a.feldX == m.feldX + 1 || a.feldX == m.feldX - 1 ){
			
			if( a.feldY == m.feldY + 2 || a.feldY == m.feldY - 2 ){
					
				if( brett[a.feldX][a.feldY].belegt != spieler ){
						
					return true;
						
				}
					
			}
				
		}
		
		if( a.feldX == m.feldX + 2 || a.feldX == m.feldX - 2 ){
			
			if( a.feldY == m.feldY + 1 || a.feldY == m.feldY - 1 ){
					
				if( brett[a.feldX][a.feldY].belegt != spieler ){
						
					return true;
						
				}
					
			}
			
		}
//LAEUFER

	}else if(  m.figur.name == 'LAEUFER' ){

		if( checkDiagonale( m, a, spieler, figurDazwischen ) ){
			
			return true;
			
		}

//KOENIG

	}else if( m.figur.name == 'KOENIG' ){
		//schritt hoch oder runter
		if( a.feldX == m.feldX && ( a.feldY == m.feldY + 1 || a.feldY == m.feldY - 1 ) ){
			
			if( a.belegt != spieler ){
				
				( spieler == 1 ) ? brett[m.feldX][m.feldY].figur.rochadeWeiss = false : brett[m.feldX][m.feldY].figur.rochadeSchwarz = false;
				return true;
				
			}
		//links (oben unten) rechts( oben unten )
		}else if( ( a.feldX == m.feldX + 1 || a.feldX == m.feldX - 1 ) && ( a.feldY == m.feldY + 1 || a.feldY == m.feldY - 1 || a.feldY == m.feldY ) ){
			
			if( a.belegt != spieler ){
				
				( spieler == 1 ) ? brett[m.feldX][m.feldY].figur.rochadeWeiss = false : brett[m.feldX][m.feldY].figur.rochadeSchwarz = false;
				return true;
				
			}
			
			//lange rochade weiss
			
		}else if( m.feldY == 1 && m.feldX == 5 && a.feldX == 3 && a.feldY == 1 ) {
		
			if( spieler == 1 ){
				
				if( m.figur.rochadeWeiss && brett[1][1].figur.wl != true ){
					
					if( brett[m.feldX-1][m.feldY].belegt == 0 && brett[m.feldX-2][m.feldY].belegt == 0 && a.belegt == 0 ){
						
						brett[m.feldX][m.feldY].figur.rochadeWeiss 	= 	false;
						rochadeLangWeiss 							=	true;

						return true;
						
					}
					
				}
				
			}
			
			//kurze rochade weiss	
			
		}else if( m.feldY == 1 && m.feldX == 5 && a.feldX == 7 && a.feldY == 1 ){
			
			if( spieler == 1 ){
				
				if( m.figur.rochadeWeiss && brett[8][1].figur.wr != true ){
					
					if( brett[m.feldX+1][m.feldY].belegt == 0 && a.belegt == 0 ){
						
						brett[m.feldX][m.feldY].figur.rochadeWeiss 	=	false;
						rochadeKurzWeiss							=	true;
						return true;
						
					}
					
				}
				
			}
		
		//kurze Rochade schwarz
		
		}else if( m.feldY == 8 && m.feldX == 5 && a.feldX == 7 && a.feldY == 8 ){
			
			if( spieler == 2 ){
				
				if( m.figur.rochadeSchwarz && brett[8][8].figur.sr != true ){
					
					if( brett[m.feldX+1][m.feldY].belegt == 0 && a.belegt == 0 ){
						
						brett[m.feldX][m.feldY].figur.rochadeSchwarz 	=	false;
						rochadeKurzSchwarz								=	true;
						return true;
						
					}
					
				}
				
			}
		
		//lange Rochade Schwarz
		
		}else if( m.feldY == 8 && m.feldX == 5 && a.feldX == 3 && a.feldY == 8 ){
			
			if( spieler == 2 ){
				
				if( m.figur.rochadeSchwarz && brett[1][8].figur.sl != true ){
					
					if( brett[m.feldX-1][m.feldY].belegt == 0 && brett[m.feldX-2][m.feldY].belegt == 0 && a.belegt == 0 ){
						
						brett[m.feldX][m.feldY].figur.rochadeSchwarz 	=	false;
						rochadeLangSchwarz								=	true;
						return true;
						
					}
					
				}
				
			}
		
		}
		
		
//DAME		
	}else if( m.figur.name == 'DAME'){
		
		if( spieler == 1 || spieler == 2){
			//wenn in einer zeile
			if( a.feldY == m.feldY ){
				//turm nach rechts?
				if( m.feldX < a.feldX ){
					
					for( i = 1; i < a.feldX - m.feldX; i++ ){
						
						if( brett[m.feldX + i][m.feldY].belegt != 0 ){
							
							figurDazwischen = true;
							
						}
						
					}
					
					if( !figurDazwischen ){
						
						return true;
						
					}
				//feld links
				}else if( m.feldX > a.feldX ){			
					
					for( i = 1; i < m.feldX - a.feldX; i++ ){
						
						if( brett[m.feldX - i][m.feldY].belegt != 0 ){
							
							figurDazwischen = true;
							
						}
						
					}
					
					if( !figurDazwischen ){
						
						return true;
						
					}
					
				}
			//wenn eine spalte	
			}else if( a.feldX == m.feldX ){
				//zug nach oben?
				if( a.feldY > m.feldY ){
					//figur im weg nach oben kontrolle
					for( i = 1; i < a.feldY - m.feldY; i++ ){
						
						if( brett[m.feldX][m.feldY + i].belegt != 0 ){
							
							figurDazwischen = true;
							
						}
						
					}
					
					if( !figurDazwischen ){
						
						return true;
						
					}
					
				}else if( m.feldY > a.feldY ){
					//figur im weg nach unten kontrolle
					for( i = 1; i < m.feldY - a.feldY; i++ ){
						
						if( brett[m.feldX][m.feldY - i].belegt != 0 ){
							
							figurDazwischen = true;
							
						}
						
					}
					
					if( !figurDazwischen ){
						
						return true;
						
					}
					
				}
				
			}else{
					
					if( checkDiagonale( m, a, spieler, figurDazwischen ) ) {
						
						return true;
						
					}	
			
			}
			
		}
		
	}
	
}