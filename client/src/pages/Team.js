import React from 'react';
import Figure from 'react-bootstrap/Figure'
import MeetTeam from '../assets/meetTheNoFTeam.png';
import Aidan from '../assets/team/aidan.jpg';
import Cassandra from '../assets/team/cassandra.jpg';
import Jonathan from '../assets/team/jonathan.jpg';
import Weng from '../assets/team/weng.jpg';

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

            <section style={{textAlign:"center"}}>
                <h3>Aidan Guarniere</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={Aidan}
                    />
                    <Figure.Caption>
                        <p><a href="https://github.com/AidanGuarniere" target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/aidan-guarniere-56299719b/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p class="desc-team-member">I like gardening, long walks on the beach, and MERN stack JavaScript. You can probably find me working on some code with a questionable amount of coffee nearby.</p>
                    </Figure.Caption>
                </Figure>

                <h3>Cassandra Hurlbut</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={Cassandra}
                    />
                    <Figure.Caption>
                        <p><a href="https://github.com/clhurlbut" target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/cassandra-hurlbut-7165081b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p class="desc-team-member">Bachelors of Fine Arts in Cinema Screenwriting, certified Professional Association of Therapeutic Horsemanship Riding Instructor, certified Equine Assisted Growth And Learning Association Equine Specialist,</p>
                        <p class="desc-team-member">and now certified creative coding developer! Master of merging imagination and fun with practical application</p>
                    </Figure.Caption>
                </Figure>

                <h3>Jonathan Wilferd</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={Jonathan}
                    />
                    <Figure.Caption>
                        <p><a href="https://github.com/jwilferd10" target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/jonathan-wilferd-3a6b461b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p class="desc-team-member">Always striving to learn and understand how code works and continously striving to push myself out of my comfort zone to learn those new concepts. Took up a course at UCLA's Coding Bootcamp and am working</p>
                        <p class="desc-team-member">to become a better developer! </p>
                    </Figure.Caption>
                </Figure>

                <h3>Weng Fei Fung</h3>
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={Weng}
                    />
                    <Figure.Caption>
                        <p><a href="https://github.com/Siphon880gh/" target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/weng-fung" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                        <p><a href="https://www.youtube.com/user/Siphon880yt/videos" target="_blank" rel="noopener noreferrer">Youtube</a></p>
                        <p class="desc-team-member">Passionate about all things coding especially web development, Weng has made this a hobby and side job for countless years.</p>
                        <p class="desc-team-member">Have worked with startups including Mixotype, companies like ExRx, and small gigs by word of mouth. He graduated from UCLA-Trilogy Coding Bootcamp on 4/8/2021.</p>
                    </Figure.Caption>
                </Figure>
            </section>
        </div>
    )
}

export default MeetTheTeam;