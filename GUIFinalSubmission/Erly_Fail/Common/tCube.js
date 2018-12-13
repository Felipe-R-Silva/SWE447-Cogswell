//class constructor.....
function initTexture () {  
    texture = gl.createTexture();  
    texImage = new Image();  
    texImage.onload = function () {     
        loadTexture(image, texture);  
    };  
    texImage.src = "http:// ..."; 
}

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
//here you are declaring/creating  variables and assigning at the same time
    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
            //face1 
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
            -0.5, 0.5,0.5,  // Vertex 7-23
        
            
            ]),
        numComponents : 3
    };
    
    
    /*this.colors = {
		values : new Float32Array([
		    1.0, 0.0, 0.0,
		    1.0, 0.0, 0.0,
		    1.0, 0.0, 0.0,
		    1.0, 0.0, 0.0,
            
            1.0, 1.0, 0.0, 
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 
            1.0, 1.0, 1.0, 

            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 
            0.0, 0.0, 1.0, 
            0.0, 0.0, 1.0,

            
            0.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            
            1.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 0.0, 1.0
            
		]),
		numComponents : 4 
       
	};
     */
    this.textures = {
        values : new Float32Array([
            
            //front 
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            //Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            //Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            //Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            //Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ]),
        numComponents : 2
    };
    
    }
    this.indices = {
    values : new Uint16Array([ 
        
        0,1,2,2,3,0,//each side 1
        16,19,17,18,19,16,//each side 5
        4,5,7,6,7,5,//each side 2
        21,20,23,21,23,22,//each side 6
        8,10,9,10,8,11,//each side 3
        15,13,14,12,14,13,//each side 4
    ])
    };

this.initTexture = function () {
        texture = gl.createTexture();
        texImage = new Image();
        texImage.onload = function () {
            handleLoadedTexture (texImage, texture);
        }

            texImage.src = "monkey.png"; //"noodles.jpg" "5.jpg" "3.jpg" "2.jpg" 
            
    }

    this.indices.count = this.indices.values.length;

    //Position BUffer
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );
    
    //ColorBuffer
    /*
    this.colors.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW );
    this.colors.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
    gl.enableVertexAttribArray( this.colors.attributeLoc );
    */

        this.textures.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textures.buffer);
    gl.bufferData( gl.ARRAY_BUFFER, this.textures.values, gl.STATIC_DRAW );
    this.textures.attributeLoc = gl.getAttribLocation( this.program, "aTextureCoord" );
	gl.enableVertexAttribArray(this.textures.attributeLoc);

    //dont know Buffer
        this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );
    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.uniforms = {
	  uSampler: gl.getUniformLocation(this.program, 'uSampler'),

	};
    this.uniforms.MV = gl.getUniformLocation(this.program, "MV");
	this.uniforms.P = gl.getUniformLocation(this.program, "P");
	this.uniforms.sampler = gl.getUniformLocation(this.program, "uSampler");
    this.MV = undefined;
//run
    this.render = function () {
        gl.useProgram( this.program );
        //postion
        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
        //color
        /*
        gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
        gl.vertexAttribPointer( this.colors.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
        */
        //texture
            gl.bindBuffer(gl.ARRAY_BUFFER, this.textures.buffer);
            gl.vertexAttribPointer(this.textures.attributeLoc, this.textures.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );
        gl.uniformMatrix4fv( this.uniforms.P, gl.FALSE, flatten(this.P) );
        
        

        // Draw the cube's base
        
         gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
		    gl.uniform1i(this.uniforms.uSampler, 0);
            gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
};

handleLoadedTexture = function (image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //image = texture.image;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    //if (isPowerOf2(image.width) && isPowerOf2(image.height)) 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}
//Fcolor=vec4(vColor,1.0);