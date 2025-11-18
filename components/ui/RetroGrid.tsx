"use client";

import { useEffect, useRef } from "react";

export default function RetroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Grid parameters
    const speed = 200; // Pixels per second
    const fov = 300;
    const viewHeight = 180; // Camera height
    const gridSpacing = 100; // Distance between lines
    const gridWidth = 4000; // Total width of grid
    const gridDepth = 2000; // Draw distance

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = (timestamp: number) => {
      // Clear screen with dark background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate offset based on time for smooth movement
      // The offset loops every 'gridSpacing' pixels
      const zOffset = (timestamp * (speed / 1000)) % gridSpacing;

      // Horizon gradient (Sky)
      const gradient = ctx.createLinearGradient(0, 0, 0, centerY);
      gradient.addColorStop(0, "#0a0a0a");
      gradient.addColorStop(1, "rgba(57, 255, 20, 0.05)"); // Faint green glow at horizon
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, centerY);

      // Draw Grid
      ctx.lineWidth = 1;
      
      // 1. Horizontal Lines (Moving towards viewer)
      // We draw lines from z = near to z = far
      // To make it infinite, we draw lines at z = i * spacing - offset
      
      // We need enough lines to fill the depth
      const numLines = Math.ceil(gridDepth / gridSpacing) + 2;

      for (let i = 0; i < numLines; i++) {
        // Calculate Z depth for this line
        // We start from far and come close? Or close to far?
        // Let's define Z as distance from camera.
        // z = i * spacing - offset
        // But we want them to appear at 'gridDepth' and move to 0.
        
        let z = i * gridSpacing - zOffset;
        
        // If z is too close (behind camera or clipping), don't draw or wrap?
        // We want a continuous stream.
        // Let's map z range [0, gridDepth]
        // If z < 0, it's behind. 
        // We want to draw lines at:
        // z_0 = gridSpacing - offset
        // z_1 = 2*gridSpacing - offset
        // ...
        
        // Actually, let's just loop z from near to far
        // z = (i * gridSpacing) - zOffset
        // If z <= 0, we add (numLines * gridSpacing) to wrap it to back?
        // No, simpler: just iterate i such that z > 0.
        
        // Correct infinite scrolling logic:
        // The grid is static in world space. The camera moves.
        // Camera Z = time * speed.
        // Line Z = k * spacing.
        // Relative Z = Line Z - Camera Z.
        // We wrap Relative Z into range [0, gridDepth].
        
        let relativeZ = (i * gridSpacing - zOffset) % gridDepth;
        if (relativeZ < 0) relativeZ += gridDepth;
        
        // Don't draw if too close (clipping)
        if (relativeZ < 10) continue;

        // Project to 2D
        const scale = fov / (fov + relativeZ);
        const y2d = centerY + viewHeight * scale;
        
        // Fade out with distance
        const alpha = 1 - (relativeZ / gridDepth);
        if (alpha <= 0) continue;

        ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.4})`; // Brighter, smoother fade
        ctx.beginPath();
        ctx.moveTo(0, y2d);
        ctx.lineTo(width, y2d);
        ctx.stroke();
      }

      // 2. Vertical Lines (Radiating from vanishing point)
      // These are static relative to lateral movement (unless we strafe)
      // We just draw them from -width to +width in 3D
      
      const numCols = 40;
      const colSpacing = gridWidth / numCols;

      for (let i = -numCols / 2; i <= numCols / 2; i++) {
        const x3d = i * colSpacing;
        
        // Project start point (close)
        const zClose = 10;
        const scaleClose = fov / (fov + zClose);
        const x2dClose = centerX + x3d * scaleClose;
        const y2dClose = centerY + viewHeight * scaleClose;

        // Project end point (far)
        const zFar = gridDepth;
        const scaleFar = fov / (fov + zFar);
        const x2dFar = centerX + x3d * scaleFar;
        const y2dFar = centerY + viewHeight * scaleFar;

        // Fade out vertical lines too?
        // Usually they are constant, but fading at horizon looks better.
        // We can use a gradient stroke if supported, or just solid color.
        // Let's use a global fade mask later.
        
        ctx.strokeStyle = "rgba(57, 255, 20, 0.15)";
        ctx.beginPath();
        ctx.moveTo(x2dClose, y2dClose);
        ctx.lineTo(x2dFar, y2dFar);
        ctx.stroke();
      }

      // Horizon Glow / Fog Mask
      // A gradient from bottom-up to fade the grid into the distance
      const maskHeight = height * 0.6;
      const maskGradient = ctx.createLinearGradient(0, centerY - 50, 0, height);
      maskGradient.addColorStop(0, "#0a0a0a"); // Solid black at horizon (sky)
      maskGradient.addColorStop(0.1, "rgba(10, 10, 10, 0.8)"); // Fade start
      maskGradient.addColorStop(0.4, "rgba(10, 10, 10, 0)"); // Transparent
      
      // Actually we want to mask the TOP of the floor, which is near centerY.
      // The floor is y > centerY.
      // Distance is y near centerY.
      
      const fogGradient = ctx.createLinearGradient(0, centerY, 0, height);
      fogGradient.addColorStop(0, "#0a0a0a"); // Horizon color
      fogGradient.addColorStop(0.2, "rgba(10, 10, 10, 0)"); // Clear
      
      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, centerY, width, height - centerY);

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
