#version 120

const float rsi = 0.63;          				// ratio of refraction indice of air : plastic (approximately)    

const float r0  = ((1.0 - rsi) * (1.0 - rsi)) / ((1.0 + rsi) * (1.0 + rsi)); 	// reflectance

// vertex shaderindan gelen veriler
varying vec3 normal,pos;
varying float fresnelPower;
// fragment shader main metodu
void main(void)
{
    vec3 lightDir = vec3(gl_LightSource[0].position.xyz - pos);
	vec3 eyeVec = -pos;
    
    vec4 final_color = gl_LightSource[0].ambient;
    
	vec3 N = normalize(normal);
	vec3 L = normalize(lightDir);
	
	vec4 color1 = vec4(N,1.0);
	vec4 color2 = vec4(L,1.0);
	
	float lambertTerm = dot(N,L);
    float fresnel = r0 + (1 - r0)* pow(1 + dot(N,L), fresnelPower);
    
	final_color += gl_LightSource[0].diffuse * lambertTerm;	
    
    // Specular Light
    if(lambertTerm > 0.0)
	{
		vec3 E = normalize(eyeVec);
		vec3 R = reflect(-L, N);
		float specular = pow( max(dot(R, E), 0.0), 32 );
		final_color += gl_LightSource[0].specular * specular;	
	}
	final_color += mix(color1,color2,fresnel);
    
	gl_FragColor = final_color;
    
    
}
