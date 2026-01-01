## ✍️ react-signature-simple

Users can easily draw their signature on the canvas and get it as a PNG, either as a blob or in base64 format.
\
\
**Note:** This library works with React versions `^18.0.0` and `^19.0.0`
\
\
![npm version](https://img.shields.io/npm/v/react-signature-simple)
![npm downloads](https://img.shields.io/npm/dm/react-signature-simple)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-signature-simple)
\
\
\
![react-tehran-map](https://raw.githubusercontent.com/buglessir/react-signature-simple/main/assets/react-signature-simple.gif)

## Install
Run the following command to install:

`npm i react-signature-simple`

## Props

| Prop | Type | Default | Description |
|------|--------|----------|-------------|
| **width** | `number` | 300 | Sets the canvas width. |
| **height** | `number` | 150 | Sets the canvas Height. |
| **penColor** | `string` | blue | Sets the drawing color. |
| **canvasBorderColor** | `string` | `#CCCCCC` | Sets the canvas border color. |
| **canvasBorderWidth** | `string` | 1px | Sets the canvas border width. |
| **backgroundColor** | `string` | white | Sets the canvas background color. |
| **onEnd** | `() => void` | `() => {}` | Sets the callback after ending drawing. |

## Example

```javascript
import { useRef } from "react";
import ReactSignatureSimple from "react-signature-simple";
import type { IReactSignatureSimpleHandle } from 'react-signature-simple';

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
      <button onClick={() => sigRef.current?.clear()}>Clear</button>
    </div>
  );
}
```

## Demo

In order to start the demo version, run the following commands:

```
npm run build
cd ./demo
npm i
npm run dev
```
The example project uses **Vite** in background and the output will be here by default: `http://localhost:5173/`