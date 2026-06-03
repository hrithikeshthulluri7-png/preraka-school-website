"use client";
import React, { useRef, useEffect } from "react";

interface HeroProps {
  trustBadge?: { text: string; icons?: string[] };
  headline: { line1: string; line2: string };
  subtitle: string;
  buttons?: {
    primary?: { text: string; onClick?: () => void };
    secondary?: { text: string; onClick?: () => void };
  };
  className?: string;
}

const shaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}
float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}

void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    // Preraka blue palette: navy(0.016,0.118,0.259) sky(0.631,0.812,0.937) teal(0.18,0.49,0.27)
    col+=.00125/d*(cos(sin(i)*vec3(0.8,2.8,4.6))*0.5+vec3(0.016,0.118,0.259));
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.04,bg*.09,bg*.20),d);
  }
  O=vec4(col,1);
}`;

const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

function useShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;
    glRef.current = gl;

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(vs, vertexSrc);
    gl.compileShader(vs);
    gl.shaderSource(fs, shaderSource);
    gl.compileShader(fs);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    programRef.current = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const dpr = Math.max(1, 0.5 * devicePixelRatio);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (now: number) => {
      gl.useProgram(prog);
      gl.uniform2f(gl.getUniformLocation(prog, "resolution"), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(prog, "time"), now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(prog);
    };
  }, []);

  return canvasRef;
}

export default function AnimatedShaderHero({ trustBadge, headline, subtitle, buttons, className = "" }: HeroProps) {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      <style>{`
        @keyframes fadeInDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .fade-in-down{animation:fadeInDown 0.8s ease-out forwards}
        .fade-in-up{animation:fadeInUp 0.8s ease-out forwards;opacity:0}
        .delay-200{animation-delay:0.2s}
        .delay-400{animation-delay:0.4s}
        .delay-600{animation-delay:0.6s}
        .delay-800{animation-delay:0.8s}
      `}</style>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4">
        {trustBadge && (
          <div className="mb-8 fade-in-down">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full text-sm backdrop-blur-md border"
              style={{ background: "rgba(4,30,66,0.3)", borderColor: "rgba(161,207,239,0.35)" }}>
              {trustBadge.icons?.map((icon, i) => <span key={i}>{icon}</span>)}
              <span style={{ color: "#A1CFEF" }}>{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold fade-in-up delay-200"
            style={{ background: "linear-gradient(135deg, #A1CFEF, #041E42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {headline.line1}
          </h1>
          <h1 className="text-6xl md:text-8xl font-bold fade-in-up delay-400"
            style={{ background: "linear-gradient(135deg, #2E7E46, #A1CFEF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {headline.line2}
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto fade-in-up delay-600">
            {subtitle}
          </p>

          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 fade-in-up delay-800">
              {buttons.primary && (
                <button onClick={buttons.primary.onClick}
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
                  style={{ background: "#041E42", color: "white", border: "1px solid rgba(161,207,239,0.4)" }}>
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button onClick={buttons.secondary.onClick}
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  style={{ background: "rgba(161,207,239,0.12)", border: "1px solid rgba(161,207,239,0.35)", color: "#A1CFEF" }}>
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
