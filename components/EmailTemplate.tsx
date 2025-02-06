import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export function EmailTemplate({ body }: { body: string }) {
  return (
    <Html>
      <Head />
      <Preview>
        Innovative Solutions for a Digital World - Sirius&#8203;.Net&#8203;.Co
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-2xl w-full py-5 rounded-lg overflow-hidden">
            {/* Header */}
            <Section className="bg-[#ECE190] p-5 text-center">
              <Img
                src="https://i.postimg.cc/6Q5bfdnD/Sirius.png"
                alt="Sirius.Net.Co Logo"
                width="50"
                height="50"
                className="mx-auto"
              />
            </Section>

            {/* Hero Section */}
            <Section className="bg-[#9669A4] text-white p-10 text-center">
              <Img
                src="https://i.postimg.cc/v8rQjspb/Frame-7.png"
                alt="Digital Innovation"
                width="600"
                height="300"
                className="w-full max-w-[600px] mx-auto"
              />
              <Heading className="text-2xl font-bold my-5">
                Innovative Solutions for a Digital World
              </Heading>
              <Text className="text-base leading-6">
                Welcome, At Sirius&#8203;.Net&#8203;.Co, we&apos;re committed to
                delivering cutting-edge technology solutions that drive your
                business forward.
              </Text>
            </Section>

            {/* Dynamic Content from "body" Prop */}
            <Section className="bg-[#F3E8FF] p-10 text-[#22264B]">
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </Section>

            {/* Call-to-Action */}
            <Section className="bg-[#9669A4] text-white p-10 text-center">
              <Heading as="h2" className="text-2xl font-bold mb-5">
                Ready to Innovate?
              </Heading>
              <Text className="text-base leading-6 mb-5">
                Let&apos;s discuss how Sirius&#8203;.Net&#8203;.Co can help your
                business thrive in the digital age.
              </Text>
              <Button
                href="https://sirius-net-co.framer.website/"
                className="bg-[#ECE190] text-[#22264B] py-3 px-5 text-base font-bold rounded no-underline"
              >
                Get Started with Sirius&#8203;.Net&#8203;.Co
              </Button>
            </Section>

            {/* Footer */}
            <Section className="bg-[#22264B] text-white p-5 text-center">
              <Text className="text-xs leading-5 mb-3">
                Sirius&#8203;.Net&#8203;.Co | 123 Tech Street, Innovation City,
                12345 | +44 7442 635237 | sirius.net.co@gmail.com
              </Text>
              <Row className="my-5">
                <Column>
                  <Link
                    href="https://www.linkedin.com/company/sirius-net-co/"
                    className="text-white no-underline text-sm mx-2"
                  >
                    LinkedIn
                  </Link>
                </Column>
                <Column>
                  <Link
                    href="https://github.com/Sirius-Net-Co"
                    className="text-white no-underline text-sm mx-2"
                  >
                    GitHub
                  </Link>
                </Column>
                <Column>
                  <Link
                    href="https://www.instagram.com/sirius.net.co"
                    className="text-white no-underline text-sm mx-2"
                  >
                    Instagram
                  </Link>
                </Column>
              </Row>
              <Text className="text-xs leading-5">
                <Link
                  href="https://sirius-net-co.framer.website/"
                  className="text-[#ECE190] no-underline"
                >
                  Unsubscribe
                </Link>{" "}
                |{" "}
                <Link
                  href="https://sirius-net-co.framer.website/"
                  className="text-[#ECE190] no-underline"
                >
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
