// @ts-ignore
import { useRef } from "react";
import ReactSignatureSimple from "../../dist/index.esm.js";
import type { IReactSignatureSimpleHandle } from '../../dist/index.js';

export default function App() {
  const sigRef = useRef<IReactSignatureSimpleHandle>(null);

  const save = async () => {
    const base64 = sigRef.current?.getBase64();
    console.log("Base64:", base64);

    const blob = await sigRef.current?.getBlob();
    console.log("Blob:", blob);
  };

  return (
    <div>
      <ReactSignatureSimple ref={sigRef} />
      <br />
      <button onClick={save}>Save</button>
      &nbsp;
      <button onClick={() => sigRef.current?.clear()}>Clear</button>
    </div>
  );
}
