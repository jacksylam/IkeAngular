

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import * as THREE from 'three';
declare var OrbitControls: any;


@Component({
  selector: 'app-three-js',
  templateUrl: './three-js.component.html',
  styleUrls: ['./three-js.component.css']
})
export class ThreeJsComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;
  clock = null;
  planet = null;
  geometry = null;
  material = null;
  sphere = null;
  controls = null;
  x_values = [];
  y_values = [];
  z_values = [];
  container = null;

  data: Object;

  constructor(private http: Http) {

   this.convertToPlaneCoords = this.convertToPlaneCoords.bind(this);
   this.convertToSphereCoords = this.convertToSphereCoords.bind(this);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera = new THREE.PerspectiveCamera(75, 500 / 500, 1, 10000);

    this.clock = new THREE.Clock();

    this.geometry = new THREE.SphereGeometry(1, 1, 32);
    this.planet = new THREE.Object3D();
    this.material = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true,
      transparent: true     
    });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.planet.add(this.sphere);


      this.scene.add(this.planet);

    //    this.camera.position.z = 0.0058;
    // this.camera.position.x = 0.43;
    // this.camera.position.y = 0.108;



    // this.camera.position.z = 1;
    // this.camera.position.x = 0.4330184434573908;
    // this.camera.position.y = 0.10810104003643287;
    
    this.camera.position.z = 2;
    this.camera.position.x = 42;
    this.camera.position.y = 10;
    // this.controls = new THREE.FlyControls(this.camera);

  }

  ngOnInit() {
    
    this.getJSON().subscribe(data => this.data = data, error => console.log(error));

    setTimeout(() => {
      this.drawThreeGeo(this.data, 0, 'plane', {
      color: 0x8080FF,
      linewidth: 20
    }, this.planet);
        this.scene.add(this.planet);

    }, 2000);
    


   const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);

        this.scene.add(this.mesh);
    // $.getJSON("../../../assets/merge_coverge_arcs.geojson", function (data) {
    //   //debugger;
    //   // drawThreeGeo(data, 20, 'sphere', {
    //   // this.drawThreeGeo(data, 0, 'plane', {
    //   //     color: 0x8080FF,
    //   //     linewidth: 1
    //   // }, this.planet);
    // });


   
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(500, 500);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    var delta = this.clock.getDelta();
    window.requestAnimationFrame(() => this.animate());
    // this.controls.update(delta);
    this.renderer.render(this.scene, this.camera);
  }

  testfunction() {
    console.log("This is a function");
  }

  public getJSON(): Observable<any> {
    return this.http.get("../../assets/merge_coverge_arcs.geojson")
      .map((res: any) => res.json())

  }


  /* Draw GeoJSON
  
  Iterates through the latitude and longitude values, converts the values to XYZ coordinates,
  and draws the geoJSON geometries.
  
  */

  drawThreeGeo(json, radius, shape, materalOptions, container) {
    this.container = container || this.scene;
    

    var json_geom = this.createGeometryArray(json);
    //An array to hold the feature geometries.
    var convertCoordinates = this.getConversionFunctionName(shape);
    //Whether you want to convert to spherical or planar coordinates.
    var coordinate_array = [];
    //Re-usable array to hold coordinate values. This is necessary so that you can add
    //interpolated coordinates. Otherwise, lines go through the sphere instead of wrapping around.

    for (var geom_num = 0; geom_num < json_geom.length; geom_num++) {

      if (json_geom[geom_num].type == 'Point') {
        convertCoordinates(json_geom[geom_num].coordinates, radius);
        this.drawParticle(this.y_values[0], this.z_values[0], this.x_values[0], materalOptions);

      } else if (json_geom[geom_num].type == 'MultiPoint') {
        for (var point_num = 0; point_num < json_geom[geom_num].coordinates.length; point_num++) {
          convertCoordinates(json_geom[geom_num].coordinates[point_num], radius);
          this.drawParticle(this.y_values[0], this.z_values[0], this.x_values[0], materalOptions);
        }

      } else if (json_geom[geom_num].type == 'LineString') {
        coordinate_array = this.createCoordinateArray(json_geom[geom_num].coordinates);

        for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
          convertCoordinates(coordinate_array[point_num], radius);
        }
        this.drawLine(this.y_values, this.z_values, this.x_values, materalOptions);

      } else if (json_geom[geom_num].type == 'Polygon') {
        for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
          coordinate_array = this.createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);

          for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
            convertCoordinates(coordinate_array[point_num], radius);
          }
          this.drawLine(this.y_values, this.z_values, this.x_values, materalOptions);
        }

      } else if (json_geom[geom_num].type == 'MultiLineString') {
        for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
          coordinate_array = this.createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);

          for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
            convertCoordinates(coordinate_array[point_num], radius);
          }
          this.drawLine(this.y_values, this.z_values, this.x_values, materalOptions);
        }

      } else if (json_geom[geom_num].type == 'MultiPolygon') {
        for (var polygon_num = 0; polygon_num < json_geom[geom_num].coordinates.length; polygon_num++) {
          for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates[polygon_num].length; segment_num++) {
            coordinate_array = this.createCoordinateArray(json_geom[geom_num].coordinates[polygon_num][segment_num]);

            for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
              convertCoordinates(coordinate_array[point_num], radius);
            }
            this.drawLine(this.y_values, this.z_values, this.x_values, materalOptions);
          }
        }
      } else {
        throw new Error('The geoJSON is not valid.');
      }
    }
  }

  createGeometryArray(json) {
    var geometry_array = [];

    if (json.type == 'Feature') {
      geometry_array.push(json.geometry);
    } else if (json.type == 'FeatureCollection') {
      for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
        geometry_array.push(json.features[feature_num].geometry);
      }
    } else if (json.type == 'GeometryCollection') {
      for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
        geometry_array.push(json.geometries[geom_num]);
      }
    } else {
      throw new Error('The geoJSON is not valid.');
    }
    //alert(geometry_array.length);
    return geometry_array;
  }

  getConversionFunctionName(shape) {
    var conversionFunctionName;

    if (shape == 'sphere') {
      conversionFunctionName = this.convertToSphereCoords;
    } else if (shape == 'plane') {
      conversionFunctionName = this.convertToPlaneCoords;
    } else {
      throw new Error('The shape that you specified is not valid.');
    }
    return conversionFunctionName;
  }

  createCoordinateArray(feature) {
    //Loop through the coordinates and figure out if the points need interpolation.
    var temp_array = [];
    var interpolation_array = [];

    for (var point_num = 0; point_num < feature.length; point_num++) {
      var point1 = feature[point_num];
      var point2 = feature[point_num - 1];

      if (point_num > 0) {
        if (this.needsInterpolation(point2, point1)) {
          interpolation_array = [point2, point1];
          interpolation_array = this.interpolatePoints(interpolation_array);

          for (var inter_point_num = 0; inter_point_num < interpolation_array.length; inter_point_num++) {
            temp_array.push(interpolation_array[inter_point_num]);
          }
        } else {
          temp_array.push(point1);
        }
      } else {
        temp_array.push(point1);
      }
    }
    return temp_array;
  }

  needsInterpolation(point2, point1) {
    //If the distance between two latitude and longitude values is
    //greater than five degrees, return true.
    var lon1 = point1[0];
    var lat1 = point1[1];
    var lon2 = point2[0];
    var lat2 = point2[1];
    var lon_distance = Math.abs(lon1 - lon2);
    var lat_distance = Math.abs(lat1 - lat2);

    if (lon_distance > 5 || lat_distance > 5) {
      return true;
    } else {
      return false;
    }
  }

  interpolatePoints(interpolation_array) {
    //This function is recursive. It will continue to add midpoints to the
    //interpolation array until needsInterpolation() returns false.
    var temp_array = [];
    var point1, point2;

    for (var point_num = 0; point_num < interpolation_array.length - 1; point_num++) {
      point1 = interpolation_array[point_num];
      point2 = interpolation_array[point_num + 1];

      if (this.needsInterpolation(point2, point1)) {
        temp_array.push(point1);
        temp_array.push(this.getMidpoint(point1, point2));
      } else {
        temp_array.push(point1);
      }
    }

    temp_array.push(interpolation_array[interpolation_array.length - 1]);

    if (temp_array.length > interpolation_array.length) {
      temp_array = this.interpolatePoints(temp_array);
    } else {
      return temp_array;
    }
    return temp_array;
  }

  getMidpoint(point1, point2) {
    var midpoint_lon = (point1[0] + point2[0]) / 2;
    var midpoint_lat = (point1[1] + point2[1]) / 2;
    var midpoint = [midpoint_lon, midpoint_lat];

    return midpoint;
  }

  convertToSphereCoords(coordinates_array, sphere_radius) {
    var lon = coordinates_array[0];
    var lat = coordinates_array[1];

    this.x_values.push(Math.cos(lat * Math.PI / 180) * Math.cos(lon * Math.PI / 180) * sphere_radius);
    this.y_values.push(Math.cos(lat * Math.PI / 180) * Math.sin(lon * Math.PI / 180) * sphere_radius);
    this.z_values.push(Math.sin(lat * Math.PI / 180) * sphere_radius);
  }

  convertToPlaneCoords(coordinates_array, radius) {
    var lon = coordinates_array[0];
    var lat = coordinates_array[1];
    // this.z_values.push((lat / 180) * radius);
    // this.y_values.push((lon / 180) * radius);
    
    // this.z_values.push((lat / 180));
    // this.y_values.push((lon / 360) * -1);

    this.z_values.push((lat *100 / 180));
    this.y_values.push((lon *100/ 360) * -1);

    // debugger;
  }

  drawParticle(x, y, z, options) {
    var particle_geom = new THREE.Geometry();
    particle_geom.vertices.push(new THREE.Vector3(x, y, z));

    var particle_material = new THREE.ParticleSystemMaterial(options);

    var particle = new THREE.ParticleSystem(particle_geom, particle_material);
    this.container.add(particle);

    this.clearArrays();
  }

  drawLine(x_values, y_values, z_values, options) {
    var line_geom = new THREE.Geometry();
    this.createVertexForEachPoint(line_geom, x_values, y_values, z_values);

    var line_material = new THREE.LineBasicMaterial(options);
    var line = new THREE.Line(line_geom, line_material);

    // var geometry = new THREE.Geometry();
    // createVertexForEachPoint(geometry, x_values, y_values, z_values);
    // var line = new MeshLine();
    // line.setGeometry(geometry);

    // var material = new MeshLineMaterial();

    // material.color = 0xFFFFFF;

    // var mesh = new THREE.Mesh(line.geometry, material);
    this.container.add(line);
    
    this.clearArrays();
  }

  createVertexForEachPoint(object_geometry, values_axis1, values_axis2, values_axis3) {
    for (var i = 0; i < values_axis1.length; i++) {
      object_geometry.vertices.push(new THREE.Vector3(values_axis1[i],
        values_axis2[i], values_axis3[i]));
    }
  }

  clearArrays() {
    this.x_values.length = 0;
    this.y_values.length = 0;
    this.z_values.length = 0;
  }
}

/**
 * @author James Baicoianu / http://www.baicoianu.com/
 */

THREE.FlyControls = function ( object, domElement ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;
	if ( domElement ) this.domElement.setAttribute( 'tabindex', - 1 );

	// API

	// this.movementSpeed = 1.0;
	this.movementSpeed = 0.001;
	this.rollSpeed = 0.1;

	this.dragToLook = false;
	this.autoForward = false;

	// disable default target object behavior

	// internals

	this.tmpQuaternion = new THREE.Quaternion();

	this.mouseStatus = 0;

	this.moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };
	this.moveVector = new THREE.Vector3( 0, 0, 0 );
	this.rotationVector = new THREE.Vector3( 0, 0, 0 );

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	this.keydown = function( event ) {

		if ( event.altKey ) {

			return;

		}

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

			case 87: /*W*/ this.moveState.forward = 1; break;
			case 83: /*S*/ this.moveState.back = 1; break;

			case 65: /*A*/ this.moveState.left = 1; break;
			case 68: /*D*/ this.moveState.right = 1; break;

			case 82: /*R*/ this.moveState.up = 1; break;
			case 70: /*F*/ this.moveState.down = 1; break;

			case 38: /*up*/ this.moveState.pitchUp = 1; break;
			case 40: /*down*/ this.moveState.pitchDown = 1; break;

			case 37: /*left*/ this.moveState.yawLeft = 1; break;
			case 39: /*right*/ this.moveState.yawRight = 1; break;

			case 81: /*Q*/ this.moveState.rollLeft = 1; break;
			case 69: /*E*/ this.moveState.rollRight = 1; break;

		}

		this.updateMovementVector();
		this.updateRotationVector();

	};

	this.keyup = function( event ) {

		switch ( event.keyCode ) {

			case 16: /* shift */ this.movementSpeedMultiplier = 1; break;

			case 87: /*W*/ this.moveState.forward = 0; break;
			case 83: /*S*/ this.moveState.back = 0; break;

			case 65: /*A*/ this.moveState.left = 0; break;
			case 68: /*D*/ this.moveState.right = 0; break;

			case 82: /*R*/ this.moveState.up = 0; break;
			case 70: /*F*/ this.moveState.down = 0; break;

			case 38: /*up*/ this.moveState.pitchUp = 0; break;
			case 40: /*down*/ this.moveState.pitchDown = 0; break;

			case 37: /*left*/ this.moveState.yawLeft = 0; break;
			case 39: /*right*/ this.moveState.yawRight = 0; break;

			case 81: /*Q*/ this.moveState.rollLeft = 0; break;
			case 69: /*E*/ this.moveState.rollRight = 0; break;

		}

		this.updateMovementVector();
		this.updateRotationVector();

	};

	this.mousedown = function( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( this.dragToLook ) {

			this.mouseStatus ++;

		} else {

			switch ( event.button ) {

				case 0: this.moveState.forward = 1; break;
				case 2: this.moveState.back = 1; break;

			}

			this.updateMovementVector();

		}

	};

	this.mousemove = function( event ) {

		if ( ! this.dragToLook || this.mouseStatus > 0 ) {

			var container = this.getContainerDimensions();
			var halfWidth  = container.size[ 0 ] / 2;
			var halfHeight = container.size[ 1 ] / 2;

			this.moveState.yawLeft   = - ( ( event.pageX - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;
			this.moveState.pitchDown =   ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;

			this.updateRotationVector();

		}

	};

	this.mouseup = function( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( this.dragToLook ) {

			this.mouseStatus --;

			this.moveState.yawLeft = this.moveState.pitchDown = 0;

		} else {

			switch ( event.button ) {

				case 0: this.moveState.forward = 0; break;
				case 2: this.moveState.back = 0; break;

			}

			this.updateMovementVector();

		}

		this.updateRotationVector();

	};

	this.update = function( delta ) {

		var moveMult = delta * this.movementSpeed;
		var rotMult = delta * this.rollSpeed;

		this.object.translateX( this.moveVector.x * moveMult );
		this.object.translateY( this.moveVector.y * moveMult );
		this.object.translateZ( this.moveVector.z * moveMult );

		this.tmpQuaternion.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();
		this.object.quaternion.multiply( this.tmpQuaternion );

		// expose the rotation vector for convenience
		this.object.rotation.setFromQuaternion( this.object.quaternion, this.object.rotation.order );


	};

	this.updateMovementVector = function() {

		var forward = ( this.moveState.forward || ( this.autoForward && ! this.moveState.back ) ) ? 1 : 0;

		this.moveVector.x = ( - this.moveState.left    + this.moveState.right );
		this.moveVector.y = ( - this.moveState.down    + this.moveState.up );
		this.moveVector.z = ( - forward + this.moveState.back );

		//console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

	};

	this.updateRotationVector = function() {

		this.rotationVector.x = ( - this.moveState.pitchDown + this.moveState.pitchUp );
		this.rotationVector.y = ( - this.moveState.yawRight  + this.moveState.yawLeft );
		this.rotationVector.z = ( - this.moveState.rollRight + this.moveState.rollLeft );

		//console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

	};

	this.getContainerDimensions = function() {

		if ( this.domElement != document ) {

			return {
				size	: [ this.domElement.offsetWidth, this.domElement.offsetHeight ],
				offset	: [ this.domElement.offsetLeft,  this.domElement.offsetTop ]
			};

		} else {

			return {
				size	: [ window.innerWidth, window.innerHeight ],
				offset	: [ 0, 0 ]
			};

		}

	};

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function() {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _mousedown, false );
		this.domElement.removeEventListener( 'mousemove', _mousemove, false );
		this.domElement.removeEventListener( 'mouseup', _mouseup, false );

		window.removeEventListener( 'keydown', _keydown, false );
		window.removeEventListener( 'keyup', _keyup, false );

	};

	var _mousemove = bind( this, this.mousemove );
	var _mousedown = bind( this, this.mousedown );
	var _mouseup = bind( this, this.mouseup );
	var _keydown = bind( this, this.keydown );
	var _keyup = bind( this, this.keyup );

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );

	this.domElement.addEventListener( 'mousemove', _mousemove, false );
	this.domElement.addEventListener( 'mousedown', _mousedown, false );
	this.domElement.addEventListener( 'mouseup',   _mouseup, false );

	window.addEventListener( 'keydown', _keydown, false );
	window.addEventListener( 'keyup',   _keyup, false );

	this.updateMovementVector();
	this.updateRotationVector();

};
