function zeichneBrett(){
	
var x 	= 0;
var cnt = 0;
	
	ctx.clearRect(0, 0, width, height );
	
	while( cnt < 8 ){
		
		if( cnt % 2 == 0 ){
			
			( x % 2 == 0 ) ? ctx.fillStyle = '#ffffff' : ctx.fillStyle = '#CD661D';
			
		}else{
			
			( x % 2 == 1 ) ? ctx.fillStyle = '#ffffff' : ctx.fillStyle = '#CD661D';
			
		}
		
		ctx.fillRect( fieldWidth * x, fieldHeight * cnt, fieldWidth, fieldHeight );
		x++;
		
		if( x == 8 ){
			x = 0;
			cnt++;
		}
		
	}
	
}

function zeichneFiguren(){
	
	for( j = 0; j < brett.length; j++ ){
		
		for( i = 0; i < brett[j].length; i++ ){
			
			if( j > 0 && brett[i][j].belegt == 1 && brett[i][j].figur != null ){
				
				ctx.drawImage( brett[i][j].figur.img.w, brett[i][j].posX, brett[i][j].posY );
				
			}
			
			if( j > 0 && brett[i][j].belegt == 2 && brett[i][j].figur != null ){
				
				ctx.drawImage( brett[i][j].figur.img.s, brett[i][j].posX, brett[i][j].posY );
				
			}
			
		}
		
	}
	
}

function markiereFeld( ausgewaehltesFeld, auswahl ){
	
	zeichneBrett();
	var posX = ausgewaehltesFeld.posX;
	var posY = ausgewaehltesFeld.posY;
	
	ctx.fillStyle	=	'rgba(255, 0, 0, 10)';
	
	if( auswahl == 0 ){
		
		ctx.fillRect( ausgewaehltesFeld.posX, ausgewaehltesFeld.posY, fieldWidth, fieldHeight );
		
	}
	
	zeichneFiguren();
	
	var feld = ausgewaehltesFeld;
	
	return feld;
	
}
