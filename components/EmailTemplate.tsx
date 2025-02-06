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
          <Container className="mx-auto w-full max-w-[600px] overflow-hidden rounded-lg py-5">
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
            <Section className="bg-[#9669A4] p-10 text-center text-white">
              <Img
                src="https://i.postimg.cc/v8rQjspb/Frame-7.png"
                alt="Digital Innovation"
                width="600"
                height="300"
              />
              <Heading className="my-5 text-2xl font-bold">
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
            <Section className="bg-[#9669A4] p-10 text-center text-white">
              <Heading as="h2" className="mb-5 text-2xl font-bold">
                Ready to Innovate?
              </Heading>
              <Text className="mb-5 text-base leading-6">
                Let&apos;s discuss how Sirius&#8203;.Net&#8203;.Co can help your
                business thrive in the digital age.
              </Text>
              <Button
                href="https://sirius-net-co.framer.website/"
                className="rounded bg-[#ECE190] px-5 py-3 text-base font-bold text-[#22264B] no-underline"
              >
                Get Started with Sirius&#8203;.Net&#8203;.Co
              </Button>
            </Section>

            {/* Footer */}
            <Section className="bg-[#22264B] p-5 text-center text-white">
              <Text className="mb-3 text-xs leading-5">
                Sirius&#8203;.Net&#8203;.Co | 123 Tech Street, Innovation City,
                12345 | +44 7442 635237 | sirius.net.co@gmail.com
              </Text>
              <Row className="my-5">
                <Column>
                  <Link
                    href="https://www.linkedin.com/company/sirius-net-co/"
                    className="mx-2 text-sm text-white no-underline"
                  >
                    LinkedIn
                  </Link>
                </Column>
                <Column>
                  <Link
                    href="https://github.com/Sirius-Net-Co"
                    className="mx-2 text-sm text-white no-underline"
                  >
                    GitHub
                  </Link>
                </Column>
                <Column>
                  <Link
                    href="https://www.instagram.com/sirius.net.co"
                    className="mx-2 text-sm text-white no-underline"
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
