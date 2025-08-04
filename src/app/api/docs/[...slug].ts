import { GetStaticProps, GetStaticPaths } from 'next';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { swaggerSpec } from '@/lib/swagger';

const ApiDoc = () => {
  return <SwaggerUI spec={swaggerSpec} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      spec: swaggerSpec,
    },
  };
};

export default ApiDoc;
