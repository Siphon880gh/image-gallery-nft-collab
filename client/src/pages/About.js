import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import AboutLogo from '../assets/aboutTitle.png';
const About = () => {

    return (
        <React.Fragment>
            <Container>
                <img src={AboutLogo}
                    alt="Noft Custom Icon" 
                />

                <section>
                <h2>What's an NFT?</h2>
                    <p>
                        Before we dive into explaining what a NoFT is, we would first like to explain a brief summary of what an NFT is first.
                        Before we dive into what a NoFT is and about, we would first like to explain what an NFT is.
                    </p>

                    <p>
                        NFTs stand for Non-Fungible-Tokens, these are best described as unique digital assets that are stored as Etherum Blockchain. This means that every NFT is unique, thus making them non-fungible. NFT assets can range from images, gifs, audio files, video-game items, and a multitude of other forms of digital creativity. There's a caveat to this, as there is likely no tangible difference between an original NFT digital asset versus a copy of that NFT.
                    </p>
                    <p>
                        This being noted, some people might think that NFTs are completely worthless and people are entitled to that belief. But we aren't here to discuss the vast nuanced potential of NFTs, we're here on this site to share free stuff.
                    </p>
                </section>

                <section>
                    <h2>So What Are NoFT's?</h2>
                    <p>
                        Here on our site we provide no NFTs; zero, zilch, nada. Instead, we provide their digital dopplegangers.  We would like to repeat that for everyone:
                    </p>
                    <h4>We do NOT provide NFTs</h4>
                    <p>
                    NoFT allows users to share, favorite, download, and discuss all of their favorite NFT works without actually interacting with real Non-Fungible-Tokens. All of the assets you see on this website are NoFTs, which are literally the publicly available files.
                    </p>
                </section>

                <section>
                    <h2>For More Information:</h2>
                </section>

                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            So a NoFT is just a non-unique mimic of an NFT?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            Sort of! NoFT posts retain whatever file structure the asset is posted in and are NOT connected to an Ethereum blockchain asset. When you post a jpeg of an NFT you created/found/bought, you are posting the actual jpeg file, not a non-fungible token. 
                            When someone downloads this post, they are downloading the jpeg file, not a non-fungible token. At no point is the user directly interacting with an NFT when they are on our website. No changes to the chain-of-title, no interaction with cryptocurrency wallets, no financial transactions of any kind.
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Awesome! So why does this exist?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            We respect the bluntness of your question. Let’s go over some reasons: 
                            <br></br>
                            1. NoFTs offer consumers the opportunity to enjoy near-identical mimicries of these digital works without a financial 
                            <br></br>
                            2. NoFT allows users to upload and download these files directly, no dev-tools needed
                            <br></br>
                            3. NoFT provides a platform for content creators and collectors to see what’s relevant in a free-distribution setting
                            <br></br>
                            4. Linking these NoFT posts to the market listings of their actual NFT originator can generate relevancy for artists and distributors
                            <br></br>
                            5.  It's fun to look at cool stuff people have made!
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            So What Inspired NoFT?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body>We wanted to create an environment for consumers to share some of their favorite NFT pieces with others who also appreciate the art. In this environment we wanted to develop a place where people can also favorite and like NoFTs to showcase what's currently popular. With the capability to add comments we want our users to provide feedback and talk about the NoFT! All of this in hopes to bring attention to existing NFTs and attention to the creators of these fantastical art pieces.</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            I'm Still Confused About NFTs
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            Don't worry it's not an easy concept to fully grasp, luckily there are more resources out there that'll help elaborate what exactly is an NFT.
                            <br></br>
                            <a href="https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq">NFTs, explained</a>
                            
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="4">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="4">
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="5">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="5">
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="6">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="6">
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                </Accordion>
            </Container>
        </React.Fragment>
    );
};

export default About;