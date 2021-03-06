/**
 * Utils/jquery.js
 *
 * Extend jquery
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['jquery', 'DB/DBManager'], function( jQuery, DB )
{
	"use strict";


	/**
	 * Overwrite text() to support npc code
	 *
	 * @param {string} value
	 */
	jQuery.fn.text = function( value ) {
		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				return jQuery.text( this );
			}

			var reg, txt, result;

			// Escape, secure entry
			value = String(value);
			txt   = value.replace( /\</g, "&#60;").replace(/\>/g,"&#62;");

			// Msg color ^000000
			reg = /\^([a-fA-F0-9]{6})/ ;
			while( result = reg.exec(txt) ) {
				txt = txt.replace( result[0], '<span style="color:#' + result[1] + '">') + "</span>";
			}

			// Hiding hack ^nItemID^502
			reg = /\^nItemID\^(\d+)/g;
			while( result = reg.exec(txt) ) {
				txt = txt.replace( result[0], DB.itemList[ result[1] ] ? DB.itemList[ result[1] ].identifiedDisplayName : "Unknown Item" );
			}

			// Line feed feature
			txt = txt.replace(/\n/g, '<br/>');

			return jQuery(this).html( txt );

		}, null, value, arguments.length );
	};


	/**
	 * Export
	 */
	return jQuery.noConflict( true );
});