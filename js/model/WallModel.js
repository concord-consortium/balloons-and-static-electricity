// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a wall.
 * Wall have electrons which can change position under force from balloons
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var PropertySet = require( 'AXON/PropertySet' );
  var BalloonModel = require( "BALLOONS_AND_STATIC_ELECTRICITY/model/BalloonModel" );
  var Vector2 = require( 'DOT/Vector2' );
  var PointChargeModel = require( 'BALLOONS_AND_STATIC_ELECTRICITY/model/PointChargeModel' );
  var inherit = require( 'PHET_CORE/inherit' );

  function WallModel( x, width, height ) {

    //Properties of the model.  All user settings belong in the model, whether or not they are part of the physical model
    PropertySet.call( this, {
      numX: 3, //number of columns with charges
      numY: 18, //number of rows with charges
      isVisible: true,
      x: x
    } );

    this.dx = Math.round( 80 / this.numX + 2 );
    this.dy = height / this.numY;
    this.width = width;
    this.height = height;

    this.plusCharges = [];
    this.minusCharges = [];

    for ( var i = 0; i < this.numX; i++ ) {
      for ( var k = 0; k < this.numY; k++ ) {
        //plus
        var position = this.calculatePosition( i, k );
        var plusCharge = new PointChargeModel( x + position[0], position[1] );

        this.plusCharges.push( plusCharge );

        //minus
        var minusCharge = new PointChargeModel( x + position[0] - PointChargeModel.radius, position[1] - PointChargeModel.radius );
        this.minusCharges.push( minusCharge );
      }
    }

  }

  inherit( PropertySet, WallModel, {

    step: function( model ) {

      var k = 10000;
      //calculate force from Balloon to each charge in the wall
      this.minusCharges.forEach( function( entry ) {
        var ch = entry;
        var dv1 = new Vector2( 0, 0 );
        var dv2 = new Vector2( 0, 0 );
        if ( model.balloons[0].isVisible ) {
          dv1 = BalloonModel.getForce( ch.defaultLocation, model.balloons[0].getCenter(), k * PointChargeModel.charge * model.balloons[0].charge, 2.35 );
        }
        if ( model.balloons[1].isVisible ) {
          dv2 = BalloonModel.getForce( ch.defaultLocation, model.balloons[1].getCenter(), k * PointChargeModel.charge * model.balloons[1].charge, 2.35 );
        }
        entry.location = new Vector2( entry.defaultLocation.x + dv1.x + dv2.x, entry.defaultLocation.y + dv1.y + dv2.y );
      } );
      // Make model changes here.
    },

    // Reset the entire model
    reset: function() {

      //Reset the properties in this model
      PropertySet.prototype.reset.call( this );
      this.minusCharges.forEach( function( entry ) {
        entry.reset();
      } );
    },

    //function to place charges on wall's grid
    calculatePosition: function( i, k ) {
      var y0 = i % 2 === 0 ? this.dy / 2 : 1;
      return [i * this.dx + PointChargeModel.radius + 1, k * this.dy + y0];
    }
  } );
  return WallModel;
} );