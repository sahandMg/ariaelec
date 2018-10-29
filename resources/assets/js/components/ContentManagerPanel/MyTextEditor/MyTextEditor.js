import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import {AtomicBlockUtils, Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, Modifier, CompositeDecorator} from 'draft-js';
import '../../../../node_modules/draft-js/dist/Draft.css';
import './RichEditor.css';

class MyTextEditor extends Component {

    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ]);

        this.state = {
            editorState: EditorState.createEmpty(decorator),
            showURLInput: false,
            url: '',
            urlType: '',
            showURLInputLink: false,
            urlValue: ''
        };
    }

    focus = () => this.refs.editor.focus();

    logState = () => {
        const content = this.state.editorState.getCurrentContent();
        console.log(convertToRaw(content));
    };

    onURLChange = (e) => this.setState({urlValue: e.target.value});

    onChange = (editorState) => {
        this.setState({editorState});
        // the raw state, stringified
        // const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
        // this.props.handleEditorStateChang(rawDraftContentState);
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    setDomEditorRef = ref => this.domEditor = ref;

    mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    toggleBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    toggleInlineStyle = (inlineStyle) => {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    confirmMedia = (e) => {
        e.preventDefault();
        const {editorState, urlValue, urlType} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            urlType,
            'IMMUTABLE',
            {src: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity}
        );

        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.focus(), 0);
        });
    }

    onURLInputKeyDown = (e) => {
        if (e.which === 13) {
            this.confirmMedia(e);
        }
    }

    promptForMedia = (type) => {
        this.setState({
            showURLInput: true,
            urlValue: '',
            urlType: type,
        }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
        });
    }

    addAudio = () => {
        this.promptForMedia('audio');
    }

    addImage = () => {
        this.promptForMedia('image');
    }

    addVideo = () => {
        this.promptForMedia('video');
    }

    toggleColor = (toggledColor) => {
        const {editorState} = this.state;
        const selection = editorState.getSelection();

        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(colorStyleMap)
            .reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();

        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }

        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor
            );
        }

        this.onChange(nextEditorState);
    }

    promptForLink = (e) => {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

            let url = '';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }

            this.setState({
                showURLInputLink: true,
                urlValue: url,
            }, () => {
                setTimeout(() => this.refs.url.focus(), 0);
            });
        }
    }

    confirmLink = (e) => {
        e.preventDefault();
        const {editorState, urlValue} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            showURLInputLink: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }

    onLinkInputKeyDown = (e) => {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }

    removeLink = (e) => {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        let urlInput;
        if (this.state.showURLInput) {
            urlInput =
                <div style={styles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onURLInputKeyDown}
                    />
                    <button onMouseDown={this.confirmMedia}>
                        Confirm
                    </button>
                </div>;
        }


        let urlInputLink;
        if (this.state.showURLInputLink) {
            urlInputLink =
                <div style={styles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onLinkInputKeyDown}
                    />
                    <button onMouseDown={this.confirmLink}>
                        Confirm
                    </button>
                </div>;
        }

        return (
            <div>
                <div className="RichEditor-root">
                    <div style={styles.buttons}>
                        <button
                            onMouseDown={this.promptForLink}
                            style={{marginRight: 10}}>
                            Add Link
                        </button>
                        <button onMouseDown={this.removeLink}>
                            Remove Link
                        </button>
                    </div>
                    {urlInputLink}

                    <div style={styles.buttons}>
                        <button onMouseDown={this.addAudio} style={{marginRight: 10}}>
                            Add Audio
                        </button>
                        <button onMouseDown={this.addImage} style={{marginRight: 10}}>
                            Add Image
                        </button>
                        <button onMouseDown={this.addVideo} style={{marginRight: 10}}>
                            Add Video
                        </button>
                    </div>
                    {urlInput}
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <ColorControls
                            editorState={editorState}
                            onToggle={this.toggleColor}
                    />
                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockRendererFn={mediaBlockRenderer}
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            keyBindingFn={this.mapKeyToEditorCommand}
                            onChange={this.onChange}
                            placeholder="Tell a story..."
                            ref="editor"
                            spellCheck={true}
                        />
                        <input
                            onClick={this.logState}
                            style={styles.button}
                            type="button"
                            value="Log State"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
// Link Part
function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
};

// color part
class StyleButton1 extends Component {
                constructor(props) {
                super(props);
                this.onToggle = (e) => {
                e.preventDefault();
                this.props.onToggle(this.props.style);
               };
            }

                render() {
                let style;
                if (this.props.active) {
                style = {...styles.styleButton, ...colorStyleMap[this.props.style]};
            } else {
                style = styles.styleButton;
            }

                return (
                <span style={style} onMouseDown={this.onToggle}>
                {this.props.label}
                </span>
                );
            }
       }


// media Part
class StyleButton extends Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

const COLORS = [
                {label: 'Red', style: 'red'},
                {label: 'Orange', style: 'orange'},
                {label: 'Yellow', style: 'yellow'},
                {label: 'Green', style: 'green'},
                {label: 'Blue', style: 'blue'},
                {label: 'Indigo', style: 'indigo'},
                {label: 'Violet', style: 'violet'},
                ];

const ColorControls = (props) => {
                let currentStyle = props.editorState.getCurrentInlineStyle();
                return (
                <div style={styles.controls}>
                {COLORS.map(type =>
                    <StyleButton1
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                )}
                </div>
                );
         };

                // This object provides the styling information for our custom color
                // styles.
const colorStyleMap = {
                red: {
                color: 'rgba(255, 0, 0, 1.0)',
            },
                orange: {
                color: 'rgba(255, 127, 0, 1.0)',
            },
                yellow: {
                color: 'rgba(180, 180, 0, 1.0)',
            },
                green: {
                color: 'rgba(0, 180, 0, 1.0)',
            },
                blue: {
                color: 'rgba(0, 0, 255, 1.0)',
            },
                indigo: {
                color: 'rgba(75, 0, 130, 1.0)',
            },
                violet: {
                color: 'rgba(127, 0, 255, 1.0)',
            },
            };




function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }

    return null;
}

const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
    return <img src={props.src} style={styles.media} />;
};

const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};

const Media = (props) => {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'audio') {
        media = <Audio src={src} />;
    } else if (type === 'image') {
        media = <Image src={src} />;
    } else if (type === 'video') {
        media = <Video src={src} />;
    }

    return media;
};

const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 400,
        padding: 10,
        marginTop: 20,
        paddingTop: 20,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    media: {
        width: '100%',
        // Fix an issue with Firefox rendering video controls
        // with 'pre-wrap' white-space
        whiteSpace: 'initial'
    },

    controls: {
          fontFamily: '\'Helvetica\', sans-serif',
           fontSize: 14,
                marginBottom: 10,
                userSelect: 'none',
    },
    styleButton: {
        color: '#999',
        cursor: 'pointer',
        marginRight: 16,
        padding: '2px 0',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};


// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};


export default MyTextEditor;
{/*<div className="editor">*/}
{/*<button onClick={this._onBoldClick}>Bold</button>*/}
{/*<Editor ref={this.setDomEditorRef} handleKeyCommand={this.handleKeyCommand} editorState={this.state.editorState} onChange={this.onChange} />*/}