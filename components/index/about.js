import React from "react";
import Clock from 'react-live-clock';

export default function About({ cards }) {
    if (cards != null)
        return (
            <section className="aboutme" id="aboutme">
                <div className="container">
                    <div className="aboutme-header">
                        <h2>About me</h2>
                    </div>
                    <div className="aboutme-body">
                        {cards.map((card, index) => (
                            <div className="aboutme-card" key={index}>
                                <div>
                                    <h4>{card.title}</h4>
                                    {card.type === 'clock' ? (
                                        <p>
                                            <Clock
                                                format={card.format}
                                                ticking={true}
                                                timezone={card.timezone} />
                                        </p>
                                    ) : (
                                        <p>{card.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    else
        return <></>;
};
