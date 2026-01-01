export interface IReactSignatureSimpleProps {
  width?: number;
  height?: number;
  penColor?: string;
  canvasBorderColor?: string;
  canvasBorderWidth?: string;
  backgroundColor?: string;
  onEnd?: () => void;
}

export interface IReactSignatureSimpleHandle {
  getBase64: () => string;
  getBlob: () => Promise<Blob | null>;
  clear: () => void;
}