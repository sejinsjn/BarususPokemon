import React from "react";
import Clock from 'react-live-clock';

export default function About() {
    return (
        <section className="aboutme" id="aboutme">
            <div className="container">
                <div className="aboutme-header">
                    <h2>About me</h2>
                </div>
                <div className="aboutme-body">
                    <div className="aboutme-card">
                        <div>
                            <h4>Main OT</h4>
                            <p>Barusu</p>
                        </div>
                    </div>
                    <div className="aboutme-card">
                        <div>
                            <h4>My current time</h4>
                            <p><Clock
                                format={'HH:mm:ss'}
                                ticking={true}
                                timezone={'Europe/Berlin'} /></p>
                        </div>
                    </div>
                    <div className="aboutme-card">
                        <div>
                            <h4>Switch FC</h4>
                            <p>SW-2175-4415-8615</p>
                        </div>
                    </div>
                    <div className="aboutme-card">
                        <div>
                            <h4>HOME FC</h4>
                            <p>PKCWBWYYMAQK</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};