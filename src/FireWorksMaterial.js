import React, { useRef, useMemo, useEffect } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { FrontSide, AdditiveBlending, Vector2 } from 'three'

/**
 * Fireworks component by Anderson Mancini.
 * Based on https://www.shadertoy.com/view/4dBGRw
 */

export default function FireWorksMaterial() {
  const { size, viewport } = useThree()
  const ref = useRef()

  const FireWorksMaterial = useMemo(() => {
    return shaderMaterial(
      {
        time: 0,
        iResolution: new Vector2(size.width, size.height)
      },
      ` 
      varying vec2 vUv;
      void main() {
  
        vUv = uv;     
        gl_Position = vec4(position, 1.0);

      }`,
      ` 
        varying vec2 vUv;
        uniform float time;
        uniform vec2 iResolution;

        vec3 texture(vec2 pos, vec2 rocketpos){
            float d = (pos.x-rocketpos.x)+(pos.y-rocketpos.y);
            vec3 col=vec3(1.0);	

            d = mod(d*15.,2.0);
            if(d>1.0){
                col=vec3(0.0,0.0,1.0);
            }
            return col;	
        }

        vec3 rocket(vec2 pos, vec2 rocketpos){
            vec3 col = vec3(0.0);
            float f = 0.;
            float absx= abs(rocketpos.x - pos.x);
            float absy = abs(rocketpos.y-pos.y);
            if(absx<0.05&&absy<0.15){
                col=texture(pos, rocketpos);	
            }
            float point=(rocketpos.y-pos.y-0.25)*-0.7;
            if((rocketpos.y-pos.y)>0.1){
                f=smoothstep(point-0.001,point+0.001,absx);
                
                col=mix(vec3(1.0,0.0,0.0),col, f);	
            }
            return col;
        }

        float rand(float val, float seed){return cos(val*sin(val*seed)*seed);}
        float distance2( in vec2 a, in vec2 b ) { return dot(a-b,a-b); }
        mat2 rr = mat2( cos(1.0), -sin(1.0), sin(1.0), cos(1.0) );

        vec3 drawParticles(vec2 pos, vec3 particolor, float time, vec2 cpos, float gravity, float seed, float timelength){
            vec3 col= vec3(0.0);
            vec2 pp = vec2(1.0,0.0);
            for(float i=1.0;i<=64.0;i++){
                float d=rand(i, seed);
                float fade=(i/64.0)*time;
                vec2 particpos = cpos + time*pp*d;
                pp = rr*pp;
                col = mix(particolor/fade, col, smoothstep(0.0, 0.0001, distance2(particpos, pos)));
            }
            col*=smoothstep(0.0,1.0,(timelength-time)/timelength);
            
            return col;
        }
        
        vec3 drawFireworks(float time, vec2 uv, vec3 particolor, float seed){
            
            float timeoffset = 1.0;
            vec3 col=vec3(0.0);
            if(time<=0.){
                return col;	
            }
            if(mod(time, 2.0)>timeoffset){
                col= drawParticles(uv, particolor, mod(time, 2.0)-timeoffset, vec2(rand(ceil(time/2.0),seed),-0.5), 0.5, ceil(time/2.0), seed);
            }else{
                col= rocket(uv*15., vec2(15.*rand(ceil(time/2.0),seed),15.*(-0.5+(timeoffset-mod(time, 2.0)))));	
            }

            return col;	
        }

        void main() {
            vec3 col=vec3(0.1,0.1,0.2);
            vec2 uv =1.0 -  2.0* gl_FragCoord.xy / iResolution.xy;
	          uv.x *= iResolution.x/iResolution.y;     
            col += drawFireworks(time    , uv,vec3(1.0,0.1,0.1), 1.);
            col += drawFireworks(time-.6, uv,vec3(0.0,1.0,0.5), 1.2);
            col += drawFireworks(time-0.9, uv,vec3(1.0,1.0,0.1), 1.9);
            col += drawFireworks(time-0.1, uv,vec3(1.0,1.0,0.1), 1.1);

            col -= 0.15;
            gl_FragColor = vec4(col, 1.0);
        }`
    )
  }, [])

  extend({ FireWorksMaterial })

  useFrame((state, delta) => {
    ref.current.time += delta
  })

  useEffect(() => {
    ref.current.iResolution.set(size.width, size.height)
  }, [viewport])

  return (
    <fireWorksMaterial
      key={FireWorksMaterial.key}
      side={FrontSide}
      depthTest={false}
      depthWrite={false}
      transparent={true}
      blending={AdditiveBlending}
      ref={ref}
    />
  )
}
