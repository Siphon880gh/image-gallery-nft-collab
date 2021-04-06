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
                <h3>Name Example:</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        <p>Name:</p>
                        <p>Github:</p>
                        <p>Email:</p>
                        <p>Description</p>
                    </Figure.Caption>
                </Figure>

                <h3>Name Example:</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        <p>Name:</p>
                        <p>Github:</p>
                        <p>Email:</p>
                        <p>Description</p>
                    </Figure.Caption>
                </Figure>

                <h3>Name Example:</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        <p>Name:</p>
                        <p>Github:</p>
                        <p>Email:</p>
                        <p>Description</p>
                    </Figure.Caption>
                </Figure>

                <h3>Name Example:</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="holder.js/171x180"
                    />
                    <Figure.Caption>
                        <p>Name:</p>
                        <p>Github:</p>
                        <p>Email:</p>
                        <p>Description</p>
                    </Figure.Caption>
                </Figure>
            </section>
        </div>
    )
}

export default MeetTheTeam;