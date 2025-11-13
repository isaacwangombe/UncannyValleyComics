import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* 🌆 Hero Section */}
      <section
        className="about-hero d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1603791452906-9e4c88e7d4a5?auto=format&fit=crop&w=1600&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="position-relative z-2">
          <h1 className="display-4 fw-bold mb-3">
            Welcome to the Uncanny Valley
          </h1>
          <p className="lead">
            Celebrating African and Diasporic creators, stories, and art — right
            from the heart of Nairobi.
          </p>
        </div>
      </section>

      {/* 🦸 About Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?auto=format&fit=crop&w=900&q=80"
              alt="African comics"
              className="img-fluid rounded-4 shadow-sm"
            />
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <h2 className="fw-bold mb-3">Who We Are</h2>
            <p className="text-muted">
              At <strong>Uncanny Valley Comics</strong>, we believe that the
              future of storytelling lies in diverse voices. From African
              superheroes to stories of the diaspora, our mission is to
              highlight underrepresented creators and inspire the next
              generation of comic book visionaries.
            </p>
            <p className="text-muted">
              We curate and sell comics, manga, games, art prints, and
              collectibles from across Africa and beyond. Our Nairobi home base
              doubles as a community space — a place where imagination thrives,
              and creators connect.
            </p>
          </Col>
        </Row>
      </Container>

      {/* 💰 Sell Your Comics */}
      <section className="about-section bg-light py-5">
        <Container>
          <Row className="align-items-center flex-md-row-reverse">
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1573497019368-8be88a5f8a41?auto=format&fit=crop&w=900&q=80"
                alt="Sell comics"
                className="img-fluid rounded-4 shadow-sm"
              />
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <h2 className="fw-bold mb-3">Sell Your Comics</h2>
              <p className="text-muted">
                Got comics, manga, or collectibles gathering dust? We'd love to
                give them a new home. We buy personal collections and original
                works directly from creators. Whether you're clearing space or
                selling your art, we want to hear from you!
              </p>
              <p className="text-muted">
                Reach out via email at{" "}
                <a href="mailto:uvcomicbooks@gmail.com">
                  uvcomicbooks@gmail.com
                </a>{" "}
                or message us through our social media pages.
              </p>
              <p className="text-muted small">
                P.S. We also buy games, art prints, and original books.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ✍️ Publish With Us */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="fw-bold mb-3">Publish With Us</h2>
            <p className="text-muted">
              Are you an aspiring comic book author or illustrator? Do you have
              a story to tell but don’t know where to start? Uncanny Valley
              Comics would love to publish your work.
            </p>
            <p className="text-muted">
              We offer editorial guidance, creative consultation, and
              connections to talented illustrators, colorists, and letterers.
              We’re especially excited about stories rooted in African and Black
              diaspora experiences and mythologies.
            </p>
            <p className="text-muted">
              Go ahead. Make your dreams come true — reach out to us at{" "}
              <a href="mailto:uvcomicbooks@gmail.com">uvcomicbooks@gmail.com</a>{" "}
              or through our social media links.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=80"
              alt="Publishing help"
              className="img-fluid rounded-4 shadow-sm"
            />
          </Col>
        </Row>
      </Container>

      {/* 📬 Contact Form */}
      <section className="about-contact bg-dark text-white py-5">
        <Container style={{ maxWidth: "720px" }}>
          <h2 className="fw-bold text-center mb-4">Get In Touch</h2>
          <p className="text-center text-muted mb-5">
            Have a question, collaboration idea, or submission? Drop us a
            message — we’d love to hear from you.
          </p>

          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your first name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your last name"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Tell us how we can help..."
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="light" size="lg" className="px-5">
                Send Message
              </Button>
            </div>
          </Form>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
