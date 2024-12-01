    import React from 'react';
    import * as THREE from 'three';
    import { useSnapshot } from 'valtio';
    import { Decal, useGLTF, useTexture } from '@react-three/drei';

    import state from '../store'; 

    export function Female(props) {
    const snap = useSnapshot(state); 
    const { nodes, materials } = useGLTF('/sporty_bra_design.glb');

    
    const logoTexture = useTexture(snap.frontLogoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    const backLogoTexture = useTexture(snap.backLogoDecal);
    const createTextTexture = (text, font, size, color) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `${size}px ${font}`;
        const textWidth = ctx.measureText(text).width;
        canvas.width = textWidth;
        canvas.height = size;
        ctx.fillStyle = color;
        ctx.font = `${size}px ${font}`;
        ctx.fillText(text, 0, size);
        return new THREE.CanvasTexture(canvas);
    };

    return (
        <group {...props} dispose={null}>
        <group scale={0.01}>
            <mesh
            geometry={nodes.Sporty_Bra_Design_K_Jersey_100Ctn_110GSM_S_DF22016_FRONT_56418_0.geometry}
            material={materials.K_Jersey_100Ctn_110GSM_S_DF22016_FRONT_56418}
            dispose={null}
            >
            {snap.isFullTexture && (
                <Decal
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={1}
                map={fullTexture}
                depthTest={false}
                depthWrite={true}
                />
            )}

            {snap.isFrontLogoTexture && (
                <Decal
                position={snap.frontLogoPosition}
                rotation={[0, 0, 0]}
                scale={snap.frontLogoScale}
                map={logoTexture}
                map-anisotropy={16}
                depthTest={false}
                depthWrite={true}
                />
            )}
            {snap.isFrontText && (
                <Decal
                position={snap.frontTextPosition}
                rotation={snap.frontTextRotation}
                scale={snap.frontTextScale}
                map={createTextTexture(
                    snap.frontText,
                    snap.frontTextFont,
                    snap.frontTextSize,
                    snap.frontTextColor
                )}
                />
            )}
            </mesh>

            <mesh
            geometry={nodes.Sporty_Bra_Design_K_Jersey_100Ctn_110GSM_S_DF22016_FRONT_56418_0_1.geometry}
            material={materials.K_Jersey_100Ctn_110GSM_S_DF22016_FRONT_56418}
            dispose={null}
            >

            {snap.isBackLogoTexture && (
                <Decal
                position={snap.backLogoPosition}
                rotation={snap.backLogoRotation}
                scale={snap.backLogoScale}
                map={backLogoTexture}
                map-anisotropy={16}
                depthTest={false}
                depthWrite={true}
                />
            )}
            {snap.isBackText && (
                <Decal
                position={snap.backTextPosition}
                rotation={snap.backTextRotation}
                scale={snap.backTextScale}
                map={createTextTexture(
                    snap.backText,
                    snap.backTextFont,
                    snap.backTextSize,
                    snap.backTextColor
                )}
                />
            )}
            </mesh>
        </group>
        </group>
    );
    }

  export default Female
