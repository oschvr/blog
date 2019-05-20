import React, { PureComponent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/styles/prism";

class CodeBlock extends PureComponent {
  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter
        language={language}
        style={prism}
        showLineNumbers
        lineNumberStyle={{ color: 'lightgray'}}
        customStyle={{
          fontSize: 14,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'lightgray',
          backgroundColor: 'white'
        }}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;