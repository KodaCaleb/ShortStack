import React, {useState} from 'react';

export default function TagsInput({ value=[], onChange }) {
    const [tag, setTag] = useState('');

    const removeTag = (indexToRemove) => {
        onChange