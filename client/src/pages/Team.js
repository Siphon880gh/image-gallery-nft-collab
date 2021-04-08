import React from 'react';
import Figure from 'react-bootstrap/Figure'
import MeetTeam from '../assets/meetTheNoFTeam.png';


const MeetTheTeam = () => {

    return (
        <div>
            <img src={MeetTeam}
                alt="Custom NOFT title"
            />

            <section>
                <h2>About the NoFTeam</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>

            <section>
                <h3>Aidan Guarniere</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        <p><a href="https://github.com/AidanGuarniere" target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/aidan-guarniere-56299719b/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p>I like gardening, long walks on the beach, and MERN stack JavaScript. You can probably find me working on some code with a questionable amount of coffee nearby.</p>
                    </Figure.Caption>
                </Figure>

                <h3>Cassandra Hurlbut</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        <p><a href="https://github.com/clhurlbut" target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/cassandra-hurlbut-7165081b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p></p>
                    </Figure.Caption>
                </Figure>

                <h3>Jonathan Wilferd</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        <p><a href="https://github.com/jwilferd10" target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/jonathan-wilferd-3a6b461b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p></p>
                    </Figure.Caption>
                </Figure>

                <h3>Weng Fei Fung</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        <p><a href="https://github.com/Siphon880gh/" target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/weng-fung" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p></p>
                    </Figure.Caption>
                </Figure>
            </section>
        </div>
    )
}

export default MeetTheTeam;