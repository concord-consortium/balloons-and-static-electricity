// Copyright 2002-2013, University of Colorado Boulder

/**
 * main Model container.
 * Model contains wall, balloons, sweater
 * @author Vasily Shakhov (Mlearner.com)
 */
define( function( require ) {
  'use strict';
  var BalloonModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/model/BalloonModel' );
  var WallModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/model/WallModel' );
  var SweaterModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/model/SweaterModel' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function BalloonsAndStaticElectricityModel( width, height ) {

    //Properties of the model.  All user settings belong in the model, whether or not they are part of the physical model
    PropertySet.call( this, {wallWidth: 80, showCharges: "all"} );

    this.width = width;
    this.height = height;

    this.balloons = [
      new BalloonModel( 440, 100, true ),
      new BalloonModel( 380, 130, false )
    ];
    this.balloons[0].other = this.balloons[1];
    this.balloons[1].other = this.balloons[0];

    this.wall = new WallModel( width - this.wallWidth, 600, height );
    this.sweater = new SweaterModel( 0, -50 );

    this.bounds = {
      minX: 0,
      minY: 0,
      maxX: width - this.wallWidth,
      maxY: height
    };

    this.reset();
  }

  inherit( PropertySet, BalloonsAndStaticElectricityModel, {
    // Called by the animation loop
    step: function() {
      var self = this;
      // Make model changes here.
      var curTime = Date.now();
      var dt = curTime - this.oldTime;

      this.wall.step( self );
      this.balloons.forEach( function( entry ) {
        if ( entry.isVisible ) {
          entry.step( self, dt );
        }
      } );

      this.oldTime = curTime;
    },

    // Reset the entire model
    reset: function() {

      //Reset the properties in this model
      PropertySet.prototype.reset.call( this );

      //Reset balloons, resetChildren don't get them
      this.balloons.forEach( function( entry ) {
        entry.reset();
      } );

      this.sweater.reset();
      this.wall.reset();
      this.oldTime = Date.now();
    },
    //check if balloon outside world borders and return it to border if outside
    checkBalloonRestrictions: function( position, objWidth, objHeight ) {
      var rightBound = this.width;
      //flag to check if we outside borders
      var isOutBounds = false;
      //if wall exist - right border smaller on wallWidth
      if ( this.wall.isVisible ) {
        rightBound -= this.wallWidth;
      }

      //if more than maxRight position - set maxRight position
      if ( position.x + objWidth > rightBound ) {
        position.x = rightBound - objWidth;
        isOutBounds = true;
      }

      //if less then top border set y to minTop position
      if ( position.y < 0 ) {
        position.y = 0;
        isOutBounds = true;
      }//if larger then bottom border set y to maxTop position
      else if ( position.y + objHeight > this.height ) {
        position.y = this.height - objHeight;
        isOutBounds = true;
      }

      //if smaller then left border set x to minLeft position
      if ( position.x < 0 ) {
        position.x = 0;
        isOutBounds = true;
      }

      //set flag
      position.isOutBounds = isOutBounds;
      return position;
    }
  } );

  return BalloonsAndStaticElectricityModel;
} );