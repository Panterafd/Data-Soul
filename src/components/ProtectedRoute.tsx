import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const role = localStorage.getItem('userRole');
  
  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}
