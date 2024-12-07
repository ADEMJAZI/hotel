import React, { useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';

function Loader() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="d-flex justify-content-center align-items-center"
    style={{ minHeight: '100vh' }}>
      <div className="sweet-loading text-center">
        <HashLoader
          color='#000'
          loading={loading}
          cssOverride=''
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
