import React, { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => {
  return useContext(BreadcrumbContext);
};

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbItems, setBreadcrumbItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
