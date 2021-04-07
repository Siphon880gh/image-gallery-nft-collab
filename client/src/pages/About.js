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
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                        <Card.Body>Hello! I'm another body</Card.Body>
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