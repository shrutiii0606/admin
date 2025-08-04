'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocs = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/docs/swagger.json')
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return <div>Loading...</div>;
  }

  return <SwaggerUI spec={spec} />;
};

export default SwaggerDocs;
