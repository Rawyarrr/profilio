import { useEffect, useRef } from 'react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        const moveCursor = (e) => {
            const { clientX, clientY } = e;

            // Cursor follows with slight delay
            if (cursor) {
                cursor.style.left = `${clientX}px`;
                cursor.style.top = `${clientY}px`;
            }

            // Dot follows immediately
            if (cursorDot) {
                cursorDot.style.left = `${clientX}px`;
                cursorDot.style.top = `${clientY}px`;
            }
        };

        const handleMouseEnter = () => {
            cursor?.classList.add('active');
        };

        const handleMouseLeave = () => {
            cursor?.classList.remove('active');
        };

        window.addEventListener('mousemove', moveCursor);

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor hidden md:block" style={{ transform: 'translate(-50%, -50%)' }}></div>
            <div ref={cursorDotRef} className="cursor-dot hidden md:block" style={{ transform: 'translate(-50%, -50%)' }}></div>
        </>
    );
};

export default Cursor;
