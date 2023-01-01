auswahlFelder = 10;

fields = new Array(auswahlFelder).fill(new Array(auswahlFelder));

field = {

		posY 				: null,
		posX 				: null,
		mine 				: null,
		benachbarteFelder 	: null,
		zeichneX			: 0,
		zeichenY			: 0,
		

}

for( y = 0; y < fields.length; y++ ){

	for( x = 0; x < fields[y].length; x++ ){
	
		fields[y][x] = new field;
		fields[y][x].posY = y;
		fields[y][x].posX = x;
		fields[y][x].zeichneX = fields.posX * fieldWidth;
		
	}

}

//zweite Möglichkeit für dich und deinen Code definitiv einfacher wenn du 
//noch nicht mit Ojekten umgehen kannst

summeMienen = 0;
deinZweitesArray = new Array(auswahlFelder).fill(new Array(auswahlFelder));
//Nun prüfst du dein "altes" array und schreibst die summe in das neue
for( y = 0; y < field.length; y++ ){

	for( x = 0; x < field[y].length; x++ ){
	
		//oben links
		if( x != 0 && y != 0// ...){//falls x oder y = 0 wären wärst du ausserhalb des feldes 
			
			//dann prüfe das feld auf miene
			if( field[y][x] == 'mine' ){
				summeMienen++;
			}
			
		}
		//oben mitte
		
		//ab jetzt für die restlichen möglichkeiten.
		
		//oben rechts
		
		//links
		
		//rechts
		
		//unten links
		
		//unten mitte
		
		//unten rechts
		
		deinZweitesArray[y][x] 	=	summeMienen;
		summeMienen 			=	0;
		
	}

}