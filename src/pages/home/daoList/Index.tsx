import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from './list/Index';

export default function DaoList() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <List />
    </React.Fragment>
  );
}
