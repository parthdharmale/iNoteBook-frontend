import React, { useState, useEffect } from "react";

const Alert = (props) => {
  const [visible, setVisible] = useState(true);
  // Use effect to handle the alert visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      {visible && (
        <div className="alert alert-primary" role="alert">
          {props.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
