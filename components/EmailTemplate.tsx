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
    <Preview>Innovative Solutions for a Digital World - Sirius.Net.Co</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Img
            src="https://imgur.com/a/Rb6rNHw"
            alt="Sirius.Net.Co Logo"
            width="50"
            height="50"
          />
        </Section>

        {/* Hero Section */}
        <Section style={hero}>
          <Img
            src="https://imgur.com/a/pp5e5tH"
            alt="Digital Innovation"
            width="600"
            height="300"
          />
          <Heading style={heroHeading}>
            Innovative Solutions for a Digital World
          </Heading>
          <Text style={heroText}>
            Welcome, At Sirius.Net.Co, we're committed to
            delivering cutting-edge technology solutions that drive your
            business forward.
          </Text>
        </Section>

        {/* Dynamic Content from "body" Prop */}
        <Section>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </Section>

        {/* Call-to-Action */}
        <Section style={cta}>
          <Heading as="h2" style={ctaHeading}>
            Ready to Innovate?
          </Heading>
          <Text style={ctaText}>
            Let's discuss how Sirius.Net.Co can help your business thrive in the
            digital age.
          </Text>
          <Button href="https://sirius-net-co.framer.website/" style={button}>
            Get Started with Sirius.Net.Co
          </Button>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Sirius.Net.Co | 123 Tech Street, Innovation City, 12345 | +1 (555)
            123-4567 | info@sirius.net.co
          </Text>
          <Row style={socialLinks}>
            <Column>
              <Link href="https://www.linkedin.com/company/sirius-net-co/">
                LinkedIn
              </Link>
            </Column>
            <Column>
              <Link href="https://www.instagram.com/sirius.net.co">Instagram</Link>
            </Column>
          </Row>
          <Text style={footerText}>
            <Link href="https://sirius.net.co/unsubscribe">Unsubscribe</Link> |{" "}
            <Link href="https://sirius.net.co/privacy">Privacy Policy</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)}

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
};

const header = {
  backgroundColor: "#ECE190",
  padding: "20px",
  textAlign: "center" as const,
};

const headerLinks = {
  marginTop: "20px",
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
