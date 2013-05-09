#version 120

// sabit degiskenler
uniform mat4 MVP,ModelView;
uniform float fP;     //fresnel Power

// diziden alinacak degiskenler
attribute vec4 Position;
attribute vec3 Normal;

// fragment shader'a aktarilacak veriler
varying vec3 normal,pos;
varying float fresnelPower;

// vertex shader main metodu
void main()
{	
    // gl_Position ekranda noktanin nerede olacagini belirtir.
    vec3 vVertex = vec3(ModelView * Position);
    
    normal = mat3(ModelView)*Normal;
    pos = vVertex;
	fresnelPower = fP;
    
    gl_Position = MVP * Position;
}