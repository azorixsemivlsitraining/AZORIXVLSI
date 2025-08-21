import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function URLAdminAccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for special admin access parameter
    const adminKey = searchParams.get('admin_access');
    const secretKey = 'azorix_admin_2024';
    
    if (adminKey === secretKey) {
      // Remove the parameter from URL and redirect to admin
      navigate('/admin', { replace: true });
    }
  }, [searchParams, navigate]);

  return null; // This component doesn't render anything
}
