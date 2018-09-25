
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
           0.0, 0.0,0.0, // Vertex 0
		    -0.5, 0.0,0.0, // Vertex 1
		    -0.5, 0.5,0.0, // Vertex 2
		    0.0, 0.5,0.0, // Vertex 3
            //face2
            0.0, 0.0,0.0, // Vertex 0-4
            0.0, 0.5,0.0, // Vertex 3-5
            0.0, 0.5,0.5, // Vertex 4-6
            0.0, 0.0,0.5, // Vertex 5-7
            //face3
            0.0, 0.5,0.5, // Vertex 4-8
		    0.0, 0.0,0.5, // Vertex 5-9
		    -0.5, 0.0,0.5, // Vertex 6-10
		    -0.5, 0.5,0.5, // Vertex 7-11
            //face4
            -0.5, 0.0,0.0, // Vertex 1-12
            -0.5, 0.5,0.0, // Vertex 2-13
            -0.5, 0.0,0.5, // Vertex 6-14
		    -0.5, 0.5,0.5,  // Vertex 7-15
            //face5
            0.0, 0.0,0.0, // Vertex 0-16
		    -0.5, 0.0,0.0, // Vertex 1-17
            0.0, 0.0,0.5, // Vertex 5-18
		    -0.5, 0.0,0.5, // Vertex 6-19
            //face6
            -0.5, 0.5,0.0, // Vertex 2-20
		    0.0, 0.5,0.0, // Vertex 3-21
            0.0, 0.5,0.5, // Vertex 4-22
            -0.5, 0.5,0.5  // Vertex 7-23
            ]),
        numComponents : 3
    };
    
    this.colors = {
		values : new Float32Array([
		    1.0, 0.0, 0.0, 
		    1.0, 0.0, 0.0,
		    1.0, 0.0, 0.0,
		    1.0, 0.0, 0.0
		]),
		numComponents : 3 
	};
    this.indices = {
    values : new Uint16Array([ 
        ,1,2,2,3,0,//each side 1
        16,19,17,18,19,16,//each side 5
        4,5,7,6,7,5,//each side 2
        21,20,23,21,23,22,//each side 6
        8,10,9,10,8,11,//each side 3
        15,13,14,12,14,13//each side 4
    ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
