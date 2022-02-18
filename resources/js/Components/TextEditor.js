import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

export default function TextEditor({ text, setText, height = "500px" }) {
    return <CodeMirror value={text} height={height} onChange={setText} />;
}
