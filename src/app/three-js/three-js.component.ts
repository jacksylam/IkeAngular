import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import * as THREE from 'three';

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

  constructor() { 
      this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;

        const geometry = new THREE.BoxGeometry(200, 200, 200);
        const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);

        this.scene.add(this.mesh);
  }

  ngOnInit() {

  }
  
   ngAfterViewInit() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(500,500);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    }

    animate() {
        window.requestAnimationFrame(() => this.animate());
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }

    
}

























// import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

// import * as THREE from 'three';



// @Component({
//   selector: 'app-three-js',
//   templateUrl: './three-js.component.html',
//   styleUrls: ['./three-js.component.css']
// })
// export class ThreeJsComponent implements OnInit {
//   @ViewChild('rendererContainer') rendererContainer: ElementRef;

//  renderer = new THREE.WebGLRenderer();
//     scene = null;
//     camera = null;
//     mesh = null;
//     clock = null;
//     planet = null;
//     geometry = null;
//     material = null;
//     sphere = null;

//     controls = null;

//   constructor() { 
//       this.scene = new THREE.Scene();

//         this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
//         this.camera.position.z = 1000;

//                     this.clock = new THREE.Clock();

//                     this.geometry = new THREE.SphereGeometry(1,1,32);
//     this.planet = new THREE.Object3D();
//     this.material = new THREE.MeshBasicMaterial({
//                 color: 0x333333,
//                 wireframe: true,
//                 transparent: true
//             });
//               this.sphere = new THREE.Mesh(this.geometry, this.material);
//               this.planet.add(this.sphere);

             

//             // this.controls = new THREE.FlyControls(this.camera);

//   }

//   ngOnInit() {
//       //debugger;
//      $.getJSON("../../../assets/merge_coverge_arcs.geojson", function(data) {
//          //debugger;
//                 // drawThreeGeo(data, 20, 'sphere', {
//                 this.drawThreeGeo(data, 0, 'plane', {
//                     color: 0x8080FF,
//                     linewidth: 1
//                 }, this.planet);
//             });


//               //Set the camera position
//             this.camera.position.z = 0.0058;
//             this.camera.position.x = 0.43;
//             this.camera.position.y = 0.108;
//   }
  
//    ngAfterViewInit() {
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
//         this.animate();
//     }

//     animate() {
//                  var delta = this.clock.getDelta();
//         window.requestAnimationFrame(() => this.animate());
//     // this.controls.update(delta);
//         this.renderer.render(this.scene, this.camera);
//     }

    
// /* Draw GeoJSON

// Iterates through the latitude and longitude values, converts the values to XYZ coordinates,
// and draws the geoJSON geometries.

// */



//  drawThreeGeo(json, radius, shape, materalOptions, container) {
//     container = container;


//     var x_values = [];
//     var y_values = [];
//     var z_values = [];

//     var json_geom = createGeometryArray(json);
//     //An array to hold the feature geometries.
//     var convertCoordinates = getConversionFunctionName(shape);
//     //Whether you want to convert to spherical or planar coordinates.
//     var coordinate_array = [];
//     //Re-usable array to hold coordinate values. This is necessary so that you can add
//     //interpolated coordinates. Otherwise, lines go through the sphere instead of wrapping around.

//     for (var geom_num = 0; geom_num < json_geom.length; geom_num++) {

//         if (json_geom[geom_num].type == 'Point') {
//             convertCoordinates(json_geom[geom_num].coordinates, radius);
//             drawParticle(y_values[0], z_values[0], x_values[0], materalOptions);

//         } else if (json_geom[geom_num].type == 'MultiPoint') {
//             for (var point_num = 0; point_num < json_geom[geom_num].coordinates.length; point_num++) {
//                 convertCoordinates(json_geom[geom_num].coordinates[point_num], radius);
//                 drawParticle(y_values[0], z_values[0], x_values[0], materalOptions);
//             }

//         } else if (json_geom[geom_num].type == 'LineString') {
//             coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates);

//             for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
//                 convertCoordinates(coordinate_array[point_num], radius);
//             }
//             drawLine(y_values, z_values, x_values, materalOptions);

//         } else if (json_geom[geom_num].type == 'Polygon') {
//             for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
//                 coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);

//                 for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
//                     convertCoordinates(coordinate_array[point_num], radius);
//                 }
//                 drawLine(y_values, z_values, x_values, materalOptions);
//             }

//         } else if (json_geom[geom_num].type == 'MultiLineString') {
//             for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
//                 coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);

//                 for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
//                     convertCoordinates(coordinate_array[point_num], radius);
//                 }
//                 drawLine(y_values, z_values, x_values, materalOptions);
//             }

//         } else if (json_geom[geom_num].type == 'MultiPolygon') {
//             for (var polygon_num = 0; polygon_num < json_geom[geom_num].coordinates.length; polygon_num++) {
//                 for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates[polygon_num].length; segment_num++) {
//                     coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[polygon_num][segment_num]);

//                     for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
//                         convertCoordinates(coordinate_array[point_num], radius);
//                     }
//                     drawLine(y_values, z_values, x_values, materalOptions);
//                 }
//             }
//         } else {
//             throw new Error('The geoJSON is not valid.');
//         }
//     }

//     function  createGeometryArray(json) {
//         var geometry_array = [];

//         if (json.type == 'Feature') {
//             geometry_array.push(json.geometry);
//         } else if (json.type == 'FeatureCollection') {
//             for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
//                 geometry_array.push(json.features[feature_num].geometry);
//             }
//         } else if (json.type == 'GeometryCollection') {
//             for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
//                 geometry_array.push(json.geometries[geom_num]);
//             }
//         } else {
//             throw new Error('The geoJSON is not valid.');
//         }
//         //alert(geometry_array.length);
//         return geometry_array;
//     }

//     function getConversionFunctionName(shape) {
//         var conversionFunctionName;

//         if (shape == 'sphere') {
//             conversionFunctionName = convertToSphereCoords;
//         } else if (shape == 'plane') {
//             conversionFunctionName = convertToPlaneCoords;
//         } else {
//             throw new Error('The shape that you specified is not valid.');
//         }
//         return conversionFunctionName;
//     }

//     function createCoordinateArray(feature) {
//         //Loop through the coordinates and figure out if the points need interpolation.
//         var temp_array = [];
//         var interpolation_array = [];

//         for (var point_num = 0; point_num < feature.length; point_num++) {
//             var point1 = feature[point_num];
//             var point2 = feature[point_num - 1];

//             if (point_num > 0) {
//                 if (needsInterpolation(point2, point1)) {
//                     interpolation_array = [point2, point1];
//                     interpolation_array = interpolatePoints(interpolation_array);

//                     for (var inter_point_num = 0; inter_point_num < interpolation_array.length; inter_point_num++) {
//                         temp_array.push(interpolation_array[inter_point_num]);
//                     }
//                 } else {
//                     temp_array.push(point1);
//                 }
//             } else {
//                 temp_array.push(point1);
//             }
//         }
//         return temp_array;
//     }

//     function needsInterpolation(point2, point1) {
//         //If the distance between two latitude and longitude values is
//         //greater than five degrees, return true.
//         var lon1 = point1[0];
//         var lat1 = point1[1];
//         var lon2 = point2[0];
//         var lat2 = point2[1];
//         var lon_distance = Math.abs(lon1 - lon2);
//         var lat_distance = Math.abs(lat1 - lat2);

//         if (lon_distance > 5 || lat_distance > 5) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     function interpolatePoints(interpolation_array) {
//         //This function is recursive. It will continue to add midpoints to the
//         //interpolation array until needsInterpolation() returns false.
//         var temp_array = [];
//         var point1, point2;

//         for (var point_num = 0; point_num < interpolation_array.length - 1; point_num++) {
//             point1 = interpolation_array[point_num];
//             point2 = interpolation_array[point_num + 1];

//             if (needsInterpolation(point2, point1)) {
//                 temp_array.push(point1);
//                 temp_array.push(getMidpoint(point1, point2));
//             } else {
//                 temp_array.push(point1);
//             }
//         }

//         temp_array.push(interpolation_array[interpolation_array.length - 1]);

//         if (temp_array.length > interpolation_array.length) {
//             temp_array = interpolatePoints(temp_array);
//         } else {
//             return temp_array;
//         }
//         return temp_array;
//     }

//     function getMidpoint(point1, point2) {
//         var midpoint_lon = (point1[0] + point2[0]) / 2;
//         var midpoint_lat = (point1[1] + point2[1]) / 2;
//         var midpoint = [midpoint_lon, midpoint_lat];

//         return midpoint;
//     }

//     function convertToSphereCoords(coordinates_array, sphere_radius) {
//         var lon = coordinates_array[0];
//         var lat = coordinates_array[1];

//         x_values.push(Math.cos(lat * Math.PI / 180) * Math.cos(lon * Math.PI / 180) * sphere_radius);
//         y_values.push(Math.cos(lat * Math.PI / 180) * Math.sin(lon * Math.PI / 180) * sphere_radius);
//         z_values.push(Math.sin(lat * Math.PI / 180) * sphere_radius);
//     }

//     function convertToPlaneCoords(coordinates_array, radius) {
//         var lon = coordinates_array[0];
//         var lat = coordinates_array[1];
//         // z_values.push((lat / 180) * radius);
//         // y_values.push((lon / 180) * radius);
//         z_values.push((lat / 180));
//         y_values.push((lon / 360)*-1);
//     }

//     function drawParticle(x, y, z, options) {
//         var particle_geom = new THREE.Geometry();
//         particle_geom.vertices.push(new THREE.Vector3(x, y, z));

//         var particle_material = new THREE.ParticleSystemMaterial(options);

//         var particle = new THREE.ParticleSystem(particle_geom, particle_material);
//         container.add(particle);

//         clearArrays();
//     }

//     function drawLine(x_values, y_values, z_values, options) {
//         var line_geom = new THREE.Geometry();
//         createVertexForEachPoint(line_geom, x_values, y_values, z_values);

//         var line_material = new THREE.LineBasicMaterial(options);
//         var line = new THREE.Line(line_geom, line_material);

//         // var geometry = new THREE.Geometry();
//         // createVertexForEachPoint(geometry, x_values, y_values, z_values);
//         // var line = new MeshLine();
//         // line.setGeometry(geometry);

//         // var material = new MeshLineMaterial();

//         // material.color = 0xFFFFFF;

//         // var mesh = new THREE.Mesh(line.geometry, material);
//         container.add(line);

//         clearArrays();
//     }

//     function createVertexForEachPoint(object_geometry, values_axis1, values_axis2, values_axis3) {
//         for (var i = 0; i < values_axis1.length; i++) {
//             object_geometry.vertices.push(new THREE.Vector3(values_axis1[i],
//                 values_axis2[i], values_axis3[i]));
//         }
//     }

//     function clearArrays() {
//         x_values.length = 0;
//         y_values.length = 0;
//         z_values.length = 0;
//     }
//  }

// }
