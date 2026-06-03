import { useEffect } from 'react';
import generateUniqueId from 'generate-unique-id';

export const UseUniqueSessionId = () => {
    useEffect(() => {
        if (localStorage.getItem('sessionId')) return;

        const newId = generateUniqueId({ length: 20, useLetters: true });
        localStorage.setItem('sessionId', newId);
    }, []);
};
