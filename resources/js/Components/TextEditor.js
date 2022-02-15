import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

export default function TextEditor({ text, setText }) {
    return <CodeMirror value={text} height="500px" onChange={setText} />;
}
