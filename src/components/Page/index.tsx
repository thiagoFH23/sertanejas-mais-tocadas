import { Box, BoxProps, Container } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef } from 'react';

import { MotionBox } from '../MotionBox';

type PageProps = {
  children: ReactNode;
  title?: string;
} & BoxProps;

export const Page = ({ children, title, ...restProps }: PageProps) => {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  };

  useEffect(() => {
    if (router.pathname && pageRef) {
      pageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.pathname]);

  return (
    <MotionBox
      variants={container}
      initial="hidden"
      animate="show"
      ref={pageRef}
      w="100%"
      mx="auto"
    >
      <Head>
        <title>{title ? `${title}` : undefined}</title>
        <meta name="description" content="Top 100 músicas sertanejas" />
      </Head>
      <Box w="100%" {...restProps}>
        <Container centerContent p="0" h="100%" maxW="133rem">
          {children}
        </Container>
      </Box>
    </MotionBox>
  );
};
