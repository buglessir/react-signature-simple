import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { IReactSignatureSimpleHandle, IReactSignatureSimpleProps } from './types';

const ReactSignatureSimple = forwardRef<IReactSignatureSimpleHandle, IReactSignatureSimpleProps>(
  (
    {
      width = 300,
      height = 150,
      penColor = 'blue',
      canvasBorderWidth = '1px',
      canvasBorderColor = '#CCCCCC',
      backgroundColor = 'white',
      onEnd = () => {},
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const drawingRef = useRef(false);

    useEffect(() => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      ctxRef.current = ctx;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }, [width, height, penColor, backgroundColor]);

    const getPos = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      drawingRef.current = true;
      const pos = getPos(e);
      ctxRef.current?.beginPath();
      ctxRef.current?.moveTo(pos.x, pos.y);
    };

    const stopDrawing = () => {
      drawingRef.current = false;
      ctxRef.current?.closePath();
      onEnd();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!drawingRef.current) return;
      const pos = getPos(e);
      ctxRef.current?.lineTo(pos.x, pos.y);
      ctxRef.current?.stroke();
    };

    const getBase64 = (): string => {
      return canvasRef.current!.toDataURL('image/png');
    };

    const getBlob = (): Promise<Blob | null> => {
      return new Promise((resolve) => {
        canvasRef.current?.toBlob((blob) => resolve(blob ?? null), 'image/png');
      });
    };

    const clear = () => {
      if (!ctxRef.current || !canvasRef.current) return;
      ctxRef.current.fillStyle = backgroundColor;
      ctxRef.current.fillRect(0, 0, width, height);
    };

    useImperativeHandle(ref, () => ({
      getBase64,
      getBlob,
      clear,
    }));

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          borderWidth: canvasBorderWidth,
          borderColor: canvasBorderColor,
          borderStyle: 'solid',
          touchAction: 'none'
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    );
  }
);

export default ReactSignatureSimple;
