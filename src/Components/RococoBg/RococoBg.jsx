import React from 'react';
import './RococoBg.css';

const RococoBackground = ({ children }) => {
    return (
        <div className="rococo-container">
            {/* Base layers */}
            <div className="wall-base"></div>
            <div className="distress-layer"></div>
            <div className="age-stains"></div>
            <div className="cracks"></div>
            <div className="damask-pattern"></div>

            {/* Large painted roses */}
            <div className="large-rose rose-topleft"></div>
            <div className="large-rose rose-topright"></div>
            <div className="large-rose rose-midleft"></div>
            <div className="large-rose rose-midright"></div>
            <div className="large-rose rose-bottomleft"></div>
            <div className="large-rose rose-bottomright"></div>

            {/* Gilded corners */}
            <div className="gold-corner corner-tl"></div>
            <div className="gold-corner corner-tr"></div>
            <div className="gold-corner corner-bl"></div>
            <div className="gold-corner corner-br"></div>

            {/* Golden ornate borders */}
            <div className="gold-border-top"></div>
            <div className="gold-border-bottom"></div>
            <div className="gold-border-left"></div>
            <div className="gold-border-right"></div>

            <div>
                {children}
            </div>
        </div>
    );
};

export default RococoBackground;