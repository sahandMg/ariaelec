import React, { Component } from 'react';
import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import createFocusPlugin from 'draft-js-focus-plugin';
import createColorBlockPlugin from './colorBlockPlugin/colorBlockPlugin';
import 'draft-js-undo-plugin/lib/plugin.css';
import HeadlinesButton from './HeadlinesButton/HeadlinesButton';
import AddImage from './AddImage/AddImage';
import './DraftPlugin.css';
import linkStyles from './linkStyles.css';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,

} from 'draft-js-buttons';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import alignmentToolStyles from './alignmentToolStyles.css';
import buttonStyles from './buttonStyles.css';

const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin({
    theme: {
        alignmentToolStyles,
        buttonStyles,
    },
});
const { AlignmentTool } = alignmentPlugin;
const decorator = composeDecorators(
    alignmentPlugin.decorator,
    focusPlugin.decorator,
);
const colorBlockPlugin = createColorBlockPlugin({ decorator });
const linkPlugin = createLinkPlugin({
    theme: linkStyles,
    placeholder: 'http://…'
});
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;
const toolbarPlugin = createToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
        HeadlinesButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton,
        linkPlugin.LinkButton
    ]
});
const { Toolbar } = toolbarPlugin;
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin, toolbarPlugin, undoPlugin, linkPlugin, focusPlugin, alignmentPlugin, colorBlockPlugin];
const text = 'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternativly you can use any image url on the web.';

export default class DraftPlugin extends Component {

    state = {
        editorState: createEditorStateWithText(text),
    };

    onChange = (editorState) => {
        this.setState({editorState});
        this.props.update(editorState);
    };

    focus = () => {this.editor.focus();};

    render() {
        return (
            <div className="editor">
                <AddImage editorState={this.state.editorState} onChange={this.onChange} modifier={imagePlugin.addImage}/>
                <div onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <Toolbar />
                    {/*<AlignmentTool />*/}
                </div>
                <div className="options">
                    <UndoButton />
                    <RedoButton />
                </div>
            </div>
        );
    }
}
