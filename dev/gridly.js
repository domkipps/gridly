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
	$('.js-gridly, .js-gridly-btn').remove();
	if(DEBUG) console.log('%cGridly removed!', 'color:pink;');
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Add or remove gridly
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
if( $('.js-gridly').length ) { //remove

	removeAll();

}
else { //add

	if(DEBUG) console.log('%cGridly created!', 'color:green;font-size:20px;');

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
							var _isVisible = $grid.css('opacity') == 1;

							$('.js-gridly').css({ //hide all open gridlies
								'opacity': 0,
							});

							$grid.css({ //show only this one
								'opacity': _isVisible ? 0 : 1
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