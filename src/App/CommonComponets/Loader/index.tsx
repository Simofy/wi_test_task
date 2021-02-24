import React, { useCallback, useEffect, useState } from 'react';
import './style.css';

export default function Loader({ loading }: { loading: boolean }) {
  const [transitionEnd, setTransitionEnd] = useState(!loading);
  const [spicyOpacity, setSpicyOpacity] = useState(false);
  const handleLoadingChange = useCallback(() => {
    setSpicyOpacity(loading);
    if (loading) {
      setTransitionEnd(false);
    }
    if (!loading && !transitionEnd) {
      setTimeout(() => {
        setTransitionEnd(true);
      }, 100);
    }
  }, [loading, transitionEnd]);
  useEffect(() => {
    handleLoadingChange();
  }, [handleLoadingChange, loading]);
  return !transitionEnd ? (
    <div
      className="spinner-loading"
      style={{
        opacity: spicyOpacity ? '1' : '0'
      }}
    >
      <div className="spinner-border" role="status" />
    </div>
  ) : null;
}
