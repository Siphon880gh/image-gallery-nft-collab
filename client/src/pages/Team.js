import React from 'react';
import Figure from 'react-bootstrap/Figure'
import MeetTeam from '../assets/meetTheNoFTeam.png';
import Aidan from '../assets/team/aidan.jpg';
import Cassandra from '../assets/team/cassandra.jpg';
import Jonathan from '../assets/team/jonathan.jpg';
import Weng from '../assets/team/weng.jpg';
import "./Team.css";

const MeetTheTeam = () => {

    const teamMembers = [
        {
            name: "Aidan Guarniere",
            img: Aidan,
            html: ()=>(
                <React.Fragment>
                    <p className="desc-team-member">I like gardening, long walks on the beach, and MERN stack JavaScript. You can probably find me working on some code with a questionable amount of coffee nearby.</p>
                    <p>
                        <a href="https://github.com/AidanGuarniere" target="_blank" rel="noopener noreferrer">Github</a>
                        <span>&nbsp;|&nbsp;</span>
                        <a href="https://www.linkedin.com/in/aidan-guarniere-56299719b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </p>
                </React.Fragment>
            )
        },
        {
            name: "Cassandra Hurlbut",
            img: Cassandra,
            html: ()=>(
                <React.Fragment>
                    <p className="desc-team-member">Bachelors of Fine Arts in Cinema Screenwriting, certified Professional Association of Therapeutic Horsemanship Riding Instructor, certified Equine Assisted Growth And Learning Association Equine Specialist.</p>
                    <p className="desc-team-member">and now certified creative coding developer! Master of merging imagination and fun with practical application</p>
                    <p>
                        <a href="https://github.com/clhurlbut" target="_blank" rel="noopener noreferrer">Github</a>
                        <span>&nbsp;|&nbsp;</span>
                        <a href="https://www.linkedin.com/in/cassandra-hurlbut-7165081b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </p>
                </React.Fragment>
            )
        },
        {
            name: "Jonathan Wilferd",
            img: Jonathan,
            html: ()=>(
                <React.Fragment>
                    <p className="desc-team-member">Always striving to learn and understand how code works and continously striving to push myself out of my comfort zone to learn those new concepts. Took up a course at UCLA's Coding Bootcamp and am working</p>
                    <p className="desc-team-member">to become a better developer! </p>
                    <p>
                        <a href="https://github.com/jwilferd10" target="_blank" rel="noopener noreferrer">Github</a>
                        <span>&nbsp;|&nbsp;</span>
                        <a href="https://www.linkedin.com/in/jonathan-wilferd-3a6b461b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </p>
                </React.Fragment>
            )
        },
        {
            name: "Weng Fei Fung",
            img: Weng,
            html: ()=>(
                <React.Fragment>
                    <p className="desc-team-member">Passionate about all things coding especially web development, Weng has made this a hobby and side job for countless years.</p>
                    <p className="desc-team-member">Have worked with startups including Mixotype, companies like ExRx, and small gigs by word of mouth. He graduated from UCLA-Trilogy Coding Bootcamp on 4/8/2021.</p>
                    <p>
                        <a href="https://github.com/Siphon880gh/" target="_blank" rel="noopener noreferrer">Github</a>
                        <span>&nbsp;|&nbsp;</span>
                        <a href="https://www.linkedin.com/in/weng-fung" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <span>&nbsp;|&nbsp;</span>
                        <a href="https://www.youtube.com/user/Siphon880yt/videos" target="_blank" rel="noopener noreferrer">Youtube</a>
                    </p>
                </React.Fragment>
            )
        }
    ]

    return (
        <div className="page-team">
            <img className="team-title-img" src={MeetTeam}
                alt="Custom NOFT title"
            />

            <section>
            {teamMembers.map((teamMember, itr)=>{
                return (
                    <div className="teammember-section" key={itr}>
                        <h3>{teamMember.name}</h3>
                        <Figure>
                            <Figure.Image
                                alt="Team Member"
                                src={teamMember.img}
                            />
                            <Figure.Caption>
                                {teamMember.html()}
                            </Figure.Caption>
                        </Figure>
                    </div>
                )
            })}
            </section>

        </div>
    )
}

export default MeetTheTeam;