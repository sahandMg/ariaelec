import React, { Component } from 'react';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';
import HeadlinesPicker from '../HeadlinesPicker/HeadlinesPicker';
import './HeadlinesButton.css';

export default class HeadlinesButton extends Component {
    onClick = () =>
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        this.props.onOverrideContent(HeadlinesPicker);

    render() {
        return (
            <div className="headlineButtonWrapper">
                <button onClick={this.onClick} className="headlineButton">
                    H
                </button>
            </div>
        );
    }
}