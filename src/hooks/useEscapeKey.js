import React from "react";

export function useEscapeKey(fn) {
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') fn();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [fn])
}