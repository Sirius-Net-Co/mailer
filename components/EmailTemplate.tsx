import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Button,
} from "@react-email/components";

export function EmailTemplate({ body }: { body: string }) {
  return (
    <Html>
      <Head />
      <Preview>
        Innovative Solutions for a Digital World - Sirius.Net.Co
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://i.postimg.cc/6Q5bfdnD/Sirius.png"
              alt="Sirius.Net.Co Logo"
              width="50"
              height="50"
            />
          </Section>

          {/* Hero Section */}
          <Section style={hero}>
            <Img
              src="https://i.postimg.cc/v8rQjspb/Frame-7.png"
              alt="Digital Innovation"
              width="600"
              height="300"
            />
            <Heading style={heroHeading}>
              Innovative Solutions for a Digital World
            </Heading>
            <Text style={heroText}>
              Welcome, At Sirius&#8203;.Net&#8203;.Co, we&apos;re committed to
              delivering cutting-edge technology solutions that drive your
              business forward.
            </Text>
          </Section>

          {/* Dynamic Content from "body" Prop */}
          <Section style={bodySection}>
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </Section>

          {/* Call-to-Action */}
          <Section style={cta}>
            <Heading as="h2" style={ctaHeading}>
              Ready to Innovate?
            </Heading>
            <Text style={ctaText}>
              Let&apos;s discuss how Sirius&#8203;.Net&#8203;.Co can help your
              business thrive in the digital age.
            </Text>
            <Button href="https://sirius-net-co.framer.website/" style={button}>
              Get Started with Sirius&#8203;.Net&#8203;.Co
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Sirius&#8203;.Net&#8203;.Co | 123 Tech Street, Innovation City,
              12345 | +44 7442 635237 | sirius.net.co@gmail.com
            </Text>
            <Row style={socialLinks}>
              <Column>
                <Link
                  href="https://www.linkedin.com/company/sirius-net-co/"
                  style={socialLink}
                >
                  LinkedIn
                </Link>
              </Column>
              <Column>
                <Link
                  href="https://github.com/Sirius-Net-Co"
                  style={socialLink}
                >
                  GitHub
                </Link>
              </Column>
              <Column>
                <Link
                  href="https://www.instagram.com/sirius.net.co"
                  style={socialLink}
                >
                  Instagram
                </Link>
              </Column>
            </Row>
            <Text style={footerText}>
              <Link
                href="https://sirius-net-co.framer.website/"
                style={footerLink}
              >
                Unsubscribe
              </Link>{" "}
              |{" "}
              <Link
                href="https://sirius-net-co.framer.website/"
                style={footerLink}
              >
                Privacy Policy
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  borderRadius: "8px",
  overflow: "hidden",
};

const header = {
  backgroundColor: "#ECE190",
  padding: "20px",
  textAlign: "center" as const,
};

const hero = {
  backgroundColor: "#9669A4",
  color: "#ffffff",
  padding: "40px 20px",
  textAlign: "center" as const,
};

const heroHeading = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "20px 0",
};

const heroText = {
  fontSize: "16px",
  lineHeight: "24px",
};

const bodySection = {
  backgroundColor: "#F3E8FF",
  padding: "40px 20px",
  color: "#22264B",
};

const cta = {
  padding: "40px 20px",
  backgroundColor: "#9669A4",
  color: "#ffffff",
  textAlign: "center" as const,
};

const ctaHeading = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const ctaText = {
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "20px",
};

const button = {
  backgroundColor: "#ECE190",
  color: "#22264B",
  padding: "12px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "4px",
  textDecoration: "none",
};

const footer = {
  padding: "20px",
  backgroundColor: "#22264B",
  color: "#ffffff",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  lineHeight: "18px",
  margin: "10px 0",
};

const socialLinks = {
  margin: "20px 0",
};

const socialLink = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "14px",
  margin: "0 10px",
};

const footerLink = {
  color: "#ECE190",
  textDecoration: "none",
};
