import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h2 className="banner">NIRVANA</h2>
                    </Col>
                    <Col md={6} className="text-md-right text-center">
                        <div className="footer-links">
                            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-link">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="social-link">
                                <FaInstagram size={24} />
                            </a>
                            <span className="contact-number">+123-456-7890</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
