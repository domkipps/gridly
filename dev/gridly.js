//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Globals
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var DEBUG = true;

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dom elements
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

var $content = $('<div>') //inner col div
	.css({
		'height': '100%',
		'background-color': 'pink',
		'opacity': '0.3',
	});

var $col = $('<div>') //col div
	.addClass('col-xs-1')
	.css({
		'height': '100%',
	})
	.append( $content );


var $row = $('<div>') //row div
	.addClass('row')
	.css({
		'height': '100%',
	})
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col.clone() )
	.append( $col );


var $grid = $('<div>') //grid div
	.css({
		'position': 'fixed',
		'opacity': 0,
		'-webkit-transition': 'all 0.4s ease',
		'pointer-events': 'none',
		'z-index': 99999999999,
	})
	.addClass('js-gridly')
	.append( $row );


var $pin = $('<button>') //button
	.text('grid') // overwritten by full target container classname
	.addClass('js-gridly-btn')
	.css({
		'position': 'absolute',
		'-webkit-appearance': 'none',
		'border': '1px red solid',
		'font-size': '9px',
		'background': 'pink',
		'line-height': '1',
		'z-index': 999999999999,
	});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
function removeAll() {
	$('.js-gridly, .js-gridly-btn, .gridlines').remove();
	if(DEBUG) console.log('%cGridly removed!', 'color:pink;');
}
function addGridLines() {

	var html = [];
	var noGridLines = 1000;
	var offsetTop = 0;

	$('body').append( '<div class="gridlines" style="pointer-events: none; opacity:0; width:100%; height:100%; position:absolute; z-index:999999;"></div>' );

	for (j = 0; j < noGridLines; j++)  {
		var gridline = '<div class="gridline" style="pointer-events: none; border-bottom:1px solid rgba(255, 0, 0, 0.07); height:6px; width:100%; position:absolute; left:0; top:' + offsetTop + 'px; z-index:999999;"></div>';
		html.push(gridline); 
		offsetTop += 6;
		//if(DEBUG) console.log('addGridLines');
		if(j == noGridLines-1) {
			$('.gridlines').append(html);
			
			// if(DEBUG) console.log('last gridline');
			//if(DEBUG) console.log(html);
		}
	}
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Add or remove gridly
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
if( $('.js-gridly').length ) { //remove

	removeAll();

}
else { //add

	if(DEBUG) console.log('%cGridly created!', 'color:green;font-size:20px;');

	addGridLines();

	var i = 0;
	$('.container, .container-fluid').each(function() {
		var $this = $(this);
		var left = parseInt($this.offset().left) + parseInt($this.css('paddingLeft')) || 0; //get sizes and position
		var width = parseInt($this.width()) || 0;
		var top = parseInt($this.offset().top) + parseInt($this.css('paddingTop')) || 0;
		var height = parseInt($this.height()) || 0;
		var text = $this.attr('class');

		if(height > 0 && width > 0) { //exclude all grids not visible

			$('body').prepend( //prepend to body for positioning

				$grid
					.clone()
					.css({
						'left': left,
						'width': width,
						'top': '0px',
						'height': '100%',
						'bottom': '0px',
					})
					.attr('data-id', i)

				)
				.prepend( //add buttons and their listeners

					$pin
						.clone()
						.attr('data-id', i)
						.text(text)
						.css({
							'left': left,
							'top': top,
						})
						.on('click', function() {
							var $id =  $(this).attr('data-id');
							var $grid = $('.js-gridly[data-id=' + $id + ']');
							var $gridlines = $('.gridlines');
							var _isVisible = $grid.css('opacity') == 1;
							var _isVisibleGridline = $gridlines.css('opacity') == 1;

							$('.js-gridly').css({ //hide all open gridlies
								'opacity': 0,
							});

							$('.body .gridline').css({ //hide all open gridlies
								'opacity': 0,
							});

							$grid.css({ //show only this one
								'opacity': _isVisible ? 0 : 1
							});

							$gridlines.css({ //show only this one
								'opacity': _isVisibleGridline ? 0 : 1,
								'top': '0px'
							});


						})

				);
			}

		i++;
	});

	if(DEBUG) console.log('%c' + i + ' gridlies created', 'color:gray;');
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Listeners
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
$(window).on('resize', function() { //remove gridly if window is resized
	removeAll();
});