import React from 'react';
import { useAdminEdit } from '../../../context/AdminEditContext';
import { sortedSectorIds } from '../../../content/resourceModel';
export default function SectorOrder({ children, pageKey, className }) {
  const { sectorSettings } = useAdminEdit();
  const elements = React.Children.toArray(children).filter(React.isValidElement);
  const ids = elements.filter(child => child.props.sectorId).map(child => child.props.sectorId);
  const order = sortedSectorIds(ids, sectorSettings[pageKey] || {});
  return <div className={className}>{elements.sort((a,b) => order.indexOf(a.props.sectorId) - order.indexOf(b.props.sectorId))}</div>;
}
